## AI-Assisted Framework Development

This framework was built from scratch using **Playwright, TypeScript, and API automation best practices**. I used **ChatGPT as an AI-assisted development and review tool** throughout the implementation.

ChatGPT was used to help with:

* Framework structure and folder organization
* TypeScript and Playwright implementation guidance
* API client and reusable fixture design
* Schema validation and assertion strategies
* Negative and authentication test scenarios
* CI/CD pipeline configuration using GitHub Actions
* Debugging TypeScript, Playwright, and CI/CD issues
* Reviewing and improving the framework for maintainability

The framework design, implementation decisions, test scenarios, debugging, execution, and validation were performed iteratively by me. ChatGPT was used as a **technical assistant and second pair of eyes**, rather than as a replacement for understanding or validating the automation.

This approach helped me build the framework incrementally—from the initial Playwright API setup through reusable clients, authentication, schemas, assertions, negative testing, smoke/regression execution, and GitHub Actions CI/CD.

---

## 1. Project Overview

This project demonstrates a maintainable API automation framework built from scratch using Playwright's `APIRequestContext`.

The framework covers:

* API functional testing
* Positive testing
* Negative testing
* Authentication testing
* CRUD workflow testing
* Response schema validation
* Reusable API assertions
* Smoke testing
* Regression testing
* TypeScript validation
* GitHub Actions CI/CD
* Secure environment configuration
* Playwright test reporting

The primary API used for automation is the **Restful Booker API**.

---

# 2. Framework Architecture

The framework follows a layered architecture:

```text
                    PLAYWRIGHT API FRAMEWORK
                              │
             ┌────────────────┴────────────────┐
             │                                 │
         TEST CASES                         CONFIG
             │                                 │
     ┌───────┼────────┐                Environment
     │       │        │                     │
   Smoke  Regression Negative              .env
     │       │        │                     │
     └───────┼────────┘                     │
             │                              │
             ▼                              ▼
        API FIXTURE ───────────────► API CLIENT
             │                         │
             │                    Booking API
             │                    Auth API
             │                         │
             ▼                         ▼
       ASSERTIONS ◄──────────── RESPONSE
             │
             ▼
       ZOD SCHEMAS
             │
             ▼
        TEST REPORT
             │
             ▼
       GITHUB ACTIONS
             │
       ┌─────┴─────┐
       ▼           ▼
     SMOKE      REGRESSION
```

### Core execution flow

```text
Test
  ↓
Fixture
  ↓
API Client
  ↓
API Request
  ↓
API Response
  ↓
Schema Validation
  ↓
Assertions
  ↓
Test Report
  ↓
CI/CD
```

---

# 3. Project Structure

```text
APIwithPlaywright/
│
├── clients/
│   ├── auth.client.ts
│   └── booking.client.ts
│
├── config/
│   └── environment.ts
│
├── data/
│   └── booking.data.ts
│
├── fixtures/
│   └── api.fixture.ts
│
├── schemas/
│   └── booking schemas
│
├── utils/
│   └── api.assertions.ts
│
├── tests/
│   └── api/
│       └── booking/
│           ├── booking-get.spec.ts
│           ├── booking-post.spec.ts
│           │
│           ├── negative/
│           │   ├── booking-negative.spec.ts
│           │   └── booking-auth-negative.spec.ts
│           │
│           └── workflows/
│               └── booking-crud.spec.ts
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

---

# 4. Responsibility of Each Layer

| Layer                | Responsibility                             |
| -------------------- | ------------------------------------------ |
| `tests/`             | Business scenarios and test cases          |
| `clients/`           | API endpoint implementation                |
| `fixtures/`          | Reusable test setup and API dependencies   |
| `schemas/`           | API response structure and type validation |
| `utils/`             | Reusable assertions                        |
| `data/`              | Test data models                           |
| `config/`            | Environment configuration                  |
| `.github/workflows/` | CI/CD execution                            |

The main design principle is:

> **Tests describe what is being tested. Clients describe how the API is called.**

This prevents HTTP implementation details from being duplicated throughout the test suite.

---

# 5. API Client Layer

## Booking Client

`clients/booking.client.ts` contains reusable booking API operations.

The client currently supports operations such as:

```text
GET    /booking
GET    /booking/{id}
POST   /booking
PUT    /booking/{id}
PATCH  /booking/{id}
DELETE /booking/{id}
```

Instead of writing HTTP request logic repeatedly inside tests:

```typescript
request.get('/booking/123');
request.post('/booking');
request.put('/booking/123');
```

tests use reusable client methods:

```typescript
bookingClient.getBookingById(bookingId);

bookingClient.createBooking(bookingData);

bookingClient.updateBooking(bookingId, bookingData);

bookingClient.deleteBooking(bookingId);
```

### Benefits

* Reduces duplication
* Centralizes endpoint implementation
* Makes tests easier to read
* Simplifies maintenance
* Makes API operations reusable

---

# 6. Authentication Client

`clients/auth.client.ts` is responsible for authentication.

The authentication flow is:

```text
Username + Password
        ↓
      /auth
        ↓
 Authentication Token
        ↓
Authenticated API operations
```

Credentials are obtained from the environment configuration instead of being hardcoded.

Authenticated booking operations use the generated token through the appropriate authorization mechanism.

This separates authentication logic from business API logic.

---

# 7. Environment Configuration

Environment configuration is centralized in:

```text
config/environment.ts
```

The framework uses:

```text
API_BASE_URL
API_USERNAME
API_PASSWORD
```

Local execution uses a `.env` file.

Example:

```text
API_BASE_URL=<your-api-base-url>
API_USERNAME=<your-api-username>
API_PASSWORD=<your-api-password>
```

The `.env` file is excluded from Git using `.gitignore`.

A `.env.example` file is maintained as a template:

```text
API_BASE_URL=
API_USERNAME=
API_PASSWORD=
```

This allows developers to understand which variables are required without exposing credentials.

---

# 8. Fixtures

The framework uses a reusable Playwright API fixture:

```text
fixtures/api.fixture.ts
```

The fixture provides reusable API dependencies to tests.

Instead of every test manually creating:

```text
APIRequestContext
AuthClient
BookingClient
Authentication token
```

the fixture manages the required setup.

Tests can therefore directly consume:

```typescript
async ({ bookingClient })
```

### Benefits

* Reusable setup
* Less duplicated code
* Cleaner tests
* Centralized dependency management
* Easier authentication handling

---

# 9. Test Data

Test data is separated from API implementation.

The framework uses a booking data model to represent valid booking payloads.

For example:

```text
firstname
lastname
totalprice
depositpaid
bookingdates
additionalneeds
```

This allows positive tests to use strongly typed data while negative tests can intentionally provide malformed or incomplete payloads when required.

---

# 10. Schema Validation

The framework uses **Zod** for response schema validation.

HTTP status validation alone is not sufficient.

For example:

```text
HTTP 200
```

only tells us that the request was accepted successfully.

It does not guarantee that the response body has the correct:

* fields
* data types
* nested structure
* required properties

Schema validation provides an additional API contract check.

Conceptually:

```text
API Response
     │
     ├── HTTP Status
     │
     ├── Content Type
     │
     └── Response Schema
             │
             ├── Required fields
             ├── Data types
             └── Nested structure
```

This helps detect API contract and serialization issues that may not be visible through status-code assertions alone.

---

# 11. Reusable Assertions

Common API validations are centralized in:

```text
utils/api.assertions.ts
```

The framework contains reusable assertions such as:

```text
expectStatus()
expectResponseOk()
expectJsonContentType()
```

Instead of duplicating status validation throughout every test, tests can use a common assertion utility.

Example:

```typescript
expectStatus(response, 200);
```

### Benefits

* Consistent validations
* Reduced duplication
* Easier maintenance
* Cleaner test cases
* Centralized error messages

---

# 12. Positive API Testing

The framework contains positive scenarios for booking APIs.

Examples include:

```text
Get all bookings
Get booking by ID
Create booking
Update booking
Partial update
Delete booking
```

These validate expected API behavior under valid conditions.

---

# 13. Negative API Testing

Negative scenarios are maintained separately:

```text
tests/api/booking/negative/
```

Examples include:

* Non-existent booking ID
* Missing required fields
* Invalid request data
* Invalid data types
* Missing authentication
* Invalid authentication token

Negative testing verifies that the API rejects invalid requests correctly.

An important principle used in the framework is:

> **Expected errors are successful test outcomes when the test is intentionally validating error handling.**

For example:

```text
Invalid authentication
        ↓
403 Forbidden
        ↓
Expected
        ↓
Test passes
```

---

# 14. Authentication Negative Testing

The framework contains dedicated authentication-negative scenarios.

Examples:

```text
Update without authentication
Update using an invalid authentication token
```

The API is expected to reject these requests.

For example:

```text
Expected response:
403 Forbidden
```

A `403` appearing in the test log does not necessarily mean the test failed.

The test passes when the actual response matches the expected behavior.

---

# 15. CRUD Workflow Testing

The framework contains an API workflow test:

```text
tests/api/booking/workflows/booking-crud.spec.ts
```

The workflow validates multiple API operations together.

Conceptually:

```text
CREATE
  ↓
READ
  ↓
UPDATE
  ↓
VERIFY
  ↓
DELETE
  ↓
VERIFY
```

This differs from isolated endpoint testing because it validates that multiple API operations work together as a business flow.

---

# 16. Smoke Testing

Smoke tests represent the critical API functionality that should be validated quickly.

The framework uses the Playwright tag:

```text
@smoke
```

Current smoke suite:

```text
2 tests
```

Execution:

```bash
npm run test:smoke
```

which runs:

```bash
playwright test tests/api --grep @smoke
```

Smoke testing answers:

> **"Is the critical API functionality working?"**

---

# 17. Regression Testing

Regression tests provide broader coverage.

The framework uses:

```text
@regression
```

Current regression suite:

```text
7 tests
```

Execution:

```bash
npm run test:regression
```

which runs:

```bash
playwright test tests/api --grep @regression
```

Regression testing answers:

> **"Have recent changes broken existing API functionality?"**

---

# 18. Smoke vs Regression

```text
Smoke
  ↓
Small
Fast
Critical functionality
2 tests

Regression
  ↓
Broader coverage
More scenarios
7 tests
```

Smoke provides fast confidence.

Regression provides broader confidence.

---

# 19. TypeScript Validation

The framework performs a TypeScript validation before executing API tests:

```bash
npx tsc --project tsconfig.json --noEmit
```

The `--noEmit` option validates the TypeScript project without generating JavaScript output.

This catches issues such as:

* Invalid imports
* Incorrect types
* Missing properties
* Invalid method names
* Type mismatches
* Syntax errors

The validation is also executed in CI.

---

# 20. CI/CD Pipeline

The framework is integrated with **GitHub Actions**.

Workflow:

```text
Git Push / Pull Request
          ↓
    GitHub Actions
          ↓
   Checkout Repository
          ↓
    Setup Node.js
          ↓
      npm ci
          ↓
Install Playwright Browsers
          ↓
 TypeScript Validation
          ↓
     Smoke Tests
          ↓
   Regression Tests
          ↓
 Upload Playwright Report
```

The workflow is defined in:

```text
.github/workflows/playwright.yml
```

---

# 21. CI/CD Triggers

The pipeline currently supports:

### Push

The pipeline runs when code is pushed to:

```text
main
```

### Pull Request

The pipeline runs when a pull request targets:

```text
main
```

### Manual Execution

The workflow also supports:

```text
workflow_dispatch
```

This allows a tester or developer to manually execute the pipeline from GitHub Actions.

---

# 22. CI Environment Secrets

Credentials are never stored directly in the GitHub workflow.

The workflow receives:

```text
API_BASE_URL
API_USERNAME
API_PASSWORD
```

from GitHub repository secrets.

Conceptually:

```text
GitHub Secrets
      ↓
GitHub Actions Environment Variables
      ↓
environment.ts
      ↓
API Client
```

This prevents sensitive credentials from being committed to source control.

---

# 23. Playwright Reporting

After test execution, the GitHub Actions workflow uploads:

```text
playwright-report/
```

as a GitHub Actions artifact.

This allows failed or completed test runs to be investigated after the CI job finishes.

The report is configured to be retained for:

```text
30 days
```

---

# 24. Current Test Execution

The current framework contains:

```text
Smoke       → 2 tests
Regression  → 7 tests
```

Recent CI validation confirmed:

```text
Smoke:
2 passed

Regression:
7 passed
```

The regression suite also includes authentication-negative scenarios where `403 Forbidden` is an expected API response.

---

# 25. Why This Architecture?

The framework follows the principle of separation of responsibilities.

```text
Tests
  ↓
Describe business scenarios

Fixtures
  ↓
Provide reusable dependencies

Clients
  ↓
Handle API operations

Schemas
  ↓
Validate response contracts

Assertions
  ↓
Validate expected behavior

Configuration
  ↓
Manage environments and credentials

CI/CD
  ↓
Execute and report automatically
```

This makes the framework easier to:

* Maintain
* Extend
* Debug
* Reuse
* Scale
* Integrate into CI/CD

---

# 26. How to Run Locally

## Install dependencies

```bash
npm ci
```

## Configure environment

Create a `.env` file:

```text
API_BASE_URL=<your-api-base-url>
API_USERNAME=<your-api-username>
API_PASSWORD=<your-api-password>
```

## Validate TypeScript

```bash
npx tsc --project tsconfig.json --noEmit
```

## Run all API tests

```bash
npm run test:api
```

## Run smoke tests

```bash
npm run test:smoke
```

## Run regression tests

```bash
npm run test:regression
```

## Open Playwright report

```bash
npm run report
```

---

# 27. Debugging Approach

When a test fails, the framework provides multiple layers for investigation.

```text
Test Failure
     ↓
Check HTTP Status
     ↓
Check Response Body
     ↓
Check Request Payload
     ↓
Check Authentication
     ↓
Check Schema Validation
     ↓
Check Assertion
     ↓
Check Playwright Report
```

For CI failures:

```text
GitHub Actions
      ↓
Failed Step
      ↓
Test Output
      ↓
Playwright Report Artifact
      ↓
Root Cause Analysis
```

---

# 28. Example Framework Flow

For a create-booking test:

```text
Test
 │
 │ bookingClient.createBooking()
 ▼
BookingClient
 │
 │ POST /booking
 ▼
Restful Booker API
 │
 │ JSON Response
 ▼
Response
 │
 ├── Status validation
 │
 ├── Content-Type validation
 │
 ├── Zod schema validation
 │
 └── Business assertions
        │
        ▼
      PASS / FAIL
```

This is the core flow to remember when explaining the framework in an interview.

---

# 29. Key Design Principles

The framework follows these principles:

### Separation of concerns

Tests should not contain unnecessary HTTP implementation details.

### Reusability

Common API operations and assertions are centralized.

### Maintainability

Changes to an API endpoint can be made in the client layer rather than across multiple tests.

### Type safety

TypeScript and Zod provide compile-time and runtime validation respectively.

### Security

Credentials are externalized through environment variables and GitHub Secrets.

### Test isolation

Tests are organized by purpose: functional, negative, workflow, smoke and regression.

### CI readiness

The framework can execute automatically through GitHub Actions.

---

# 30. Framework Explanation for an Interview

A concise explanation of the framework:

> I built an API automation framework using Playwright with TypeScript. I designed it using a layered architecture where test cases are separated from API implementation.
>
> The test layer contains positive, negative and workflow scenarios. I created API client classes for authentication and booking CRUD operations, so the HTTP implementation is centralized and reusable.
>
> I used Playwright fixtures for reusable API setup and centralized environment configuration. Credentials are stored outside the source code using `.env` locally and GitHub Secrets in CI.
>
> For validation, I created reusable API assertions and added Zod schema validation to validate response structure and data types in addition to HTTP status codes.
>
> I also separated the tests into smoke and regression suites using Playwright tags. The current smoke suite contains 2 tests and the regression suite contains 7 tests.
>
> Finally, I integrated the framework with GitHub Actions. The pipeline installs dependencies, validates TypeScript, executes smoke and regression tests, and uploads the Playwright report. The pipeline can execute automatically on push or pull requests and can also be triggered manually.
>
> The main objective was to build a maintainable, reusable and CI-ready API automation framework rather than simply creating individual API test scripts.

---

# 31. Framework Flow to Remember

The easiest way to remember the entire framework is:

```text
TEST
  ↓
FIXTURE
  ↓
CLIENT
  ↓
API
  ↓
RESPONSE
  ↓
SCHEMA + ASSERTIONS
  ↓
REPORT
  ↓
CI/CD
```

And remember the responsibility of each layer:

```text
Clients     → How to call the API
Fixtures    → How to prepare the test
Tests       → What to test
Schemas     → What the response should look like
Assertions  → What should pass/fail
Config      → Where credentials/environment come from
CI/CD       → When and where tests execute
```

---

# 32. Future Enhancements

Potential future improvements include:

* Environment selection such as QA/UAT
* Scheduled regression execution
* API contract testing
* Dynamic test data generation
* Database validation
* Enhanced reporting
* Retry strategy for transient failures
* Parallel execution optimization
* Test data cleanup
* Azure DevOps/Jira integration
* Additional API modules beyond Booking
* Performance and reliability monitoring

These are **future enhancements**, not features currently claimed as implemented.

---

# 33. Technology Stack

| Technology             | Purpose                              |
| ---------------------- | ------------------------------------ |
| Playwright             | API automation and test execution    |
| TypeScript             | Programming language and type safety |
| Zod                    | Runtime schema validation            |
| Node.js                | Runtime environment                  |
| dotenv                 | Environment configuration            |
| Git                    | Version control                      |
| GitHub                 | Source repository                    |
| GitHub Actions         | CI/CD                                |
| Playwright HTML Report | Test reporting                       |

---

# 34. Summary

The framework was built with the following objective:

> **Build a maintainable API automation framework that separates test scenarios from API implementation, validates both API behavior and response contracts, supports negative testing, and executes reliably through CI/CD.**

Core architecture:

```text
Playwright
    +
TypeScript
    +
API Clients
    +
Fixtures
    +
Zod Schemas
    +
Reusable Assertions
    +
Positive / Negative / Workflow Tests
    +
Smoke / Regression
    +
GitHub Actions
    =
Maintainable API Automation Framework
```
