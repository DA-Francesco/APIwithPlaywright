# 🚀 Playwright TypeScript API Automation Framework

A **maintainable and scalable API automation framework** built from scratch using **Playwright, TypeScript, and Node.js**, with Playwright's `APIRequestContext` as the foundation for API communication.

The framework is designed to demonstrate how API automation can be structured as a **real-world test solution**, rather than simply creating individual API test scripts.

It includes:

* 🔌 API functional testing
* ✅ Positive testing
* ❌ Negative testing
* 🔐 Authentication testing
* 🔄 CRUD workflow testing
* 🧾 Response schema validation using Zod
* ♻️ Reusable API assertions
* 🚦 Smoke testing
* 🔁 Regression testing
* 📘 TypeScript validation
* 🔒 Secure environment configuration
* 📊 Playwright reporting
* 🌳 Git version control
* 🚀 GitHub Actions CI/CD

> **Application Under Test:** Restful Booker API

---

# 🧭 1. Understanding the Framework Design

The goal of this project is not to create a collection of API scripts.

The goal is to understand **how an API automation framework should be designed so that it can grow without becoming difficult to maintain.**

A practical way to approach framework design is:

```text
1️⃣ Understand the API
        ↓
2️⃣ Identify business scenarios
        ↓
3️⃣ Identify reusable API operations
        ↓
4️⃣ Design the framework layers
        ↓
5️⃣ Create API clients
        ↓
6️⃣ Create reusable fixtures
        ↓
7️⃣ Separate test data
        ↓
8️⃣ Add schema validation
        ↓
9️⃣ Add reusable assertions
        ↓
🔟 Organize Smoke & Regression
        ↓
1️⃣1️⃣ Add reporting
        ↓
1️⃣2️⃣ Integrate CI/CD
```

The key principle is:

> 🧠 **Tests should describe what is being tested, while API clients should handle how the API is called.**

---

# 🏗️ 2. Framework Architecture

The framework follows a **layered architecture**.

```text
                    🧪 PLAYWRIGHT API FRAMEWORK
                              │
             ┌────────────────┴────────────────┐
             │                                 │
        🧪 TEST LAYER                    ⚙️ CONFIGURATION
             │                                 │
      ┌──────┼────────┐                  Environment
      │      │        │                       │
    🚦      🔁       ❌                      .env
   Smoke  Regression Negative                   │
      │      │        │                         │
      └──────┼────────┘                         │
             │                                  │
             ▼                                  │
       🧩 API FIXTURES ───────────────► 🔌 API CLIENTS
             │                            │
             │                       Auth Client
             │                       Booking Client
             │                            │
             ▼                            ▼
       🔍 ASSERTIONS ◄────────────── 📦 API RESPONSE
             │
             ▼
       🧾 ZOD SCHEMAS
             │
             ▼
        📊 TEST REPORT
             │
             ▼
        🚀 GITHUB ACTIONS
             │
        ┌────┴─────┐
        ▼          ▼
      SMOKE     REGRESSION
```

---

# 🔄 3. Core Execution Flow

The complete execution flow can be simplified to:

```text
🧪 Test
   ↓
🧩 Fixture
   ↓
🔌 API Client
   ↓
🌐 API Request
   ↓
📦 API Response
   ↓
🧾 Schema Validation
   ↓
🔍 Assertions
   ↓
📊 Test Report
   ↓
🚀 CI/CD
```

Each layer has a specific responsibility.

That separation is what makes the framework easier to maintain.

---

# 📁 4. Project Structure

```text
APIwithPlaywright/
│
├── 📁 clients/
│   ├── auth.client.ts
│   └── booking.client.ts
│
├── 📁 config/
│   └── environment.ts
│
├── 📁 data/
│   └── booking.data.ts
│
├── 📁 fixtures/
│   └── api.fixture.ts
│
├── 📁 schemas/
│   └── booking schemas
│
├── 📁 utils/
│   └── api.assertions.ts
│
├── 📁 tests/
│   └── 📁 api/
│       └── 📁 booking/
│           ├── booking-get.spec.ts
│           ├── booking-post.spec.ts
│           │
│           ├── 📁 negative/
│           │   ├── booking-negative.spec.ts
│           │   └── booking-auth-negative.spec.ts
│           │
│           └── 📁 workflows/
│               └── booking-crud.spec.ts
│
├── 📁 .github/
│   └── 📁 workflows/
│       └── playwright.yml
│
├── 📄 .env
├── 📄 .env.example
├── 📄 .gitignore
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 playwright.config.ts
└── 📄 tsconfig.json
```

---

# 🧩 5. Responsibility of Each Layer

| Layer                   | Responsibility                                |
| ----------------------- | --------------------------------------------- |
| 🧪 `tests/`             | Business scenarios and test cases             |
| 🔌 `clients/`           | API endpoint implementation                   |
| 🧩 `fixtures/`          | Reusable test setup and API dependencies      |
| 🧾 `schemas/`           | API response structure and runtime validation |
| 🔍 `utils/`             | Reusable API assertions                       |
| 📦 `data/`              | Test data and payload models                  |
| ⚙️ `config/`            | Environment configuration                     |
| 🚀 `.github/workflows/` | CI/CD execution                               |

### The most important separation

```text
Tests
  ↓
What are we testing?

Clients
  ↓
How do we call the API?

Schemas
  ↓
What should the response look like?

Assertions
  ↓
What makes the test pass or fail?

Configuration
  ↓
Which environment and credentials are being used?
```

---

# 🔌 6. API Client Layer

The API client layer contains reusable implementations for interacting with API endpoints.

Instead of placing HTTP request logic directly inside every test, the framework centralizes it inside dedicated clients.

---

## 📦 Booking Client

`clients/booking.client.ts` contains reusable booking operations.

The client supports operations such as:

```text
GET    /booking
GET    /booking/{id}
POST   /booking
PUT    /booking/{id}
PATCH  /booking/{id}
DELETE /booking/{id}
```

Instead of writing this repeatedly inside tests:

```typescript
request.get('/booking/123');
request.post('/booking');
request.put('/booking/123');
```

the test can use meaningful client methods:

```typescript
bookingClient.getBookingById(bookingId);

bookingClient.createBooking(bookingData);

bookingClient.updateBooking(bookingId, bookingData);

bookingClient.deleteBooking(bookingId);
```

### Why?

Because the test should communicate **business intent**, not HTTP implementation details.

### Benefits

* ♻️ Reduces duplication
* 📍 Centralizes endpoint implementation
* 📖 Makes tests easier to read
* 🛠️ Simplifies maintenance
* 🔄 Makes API operations reusable

---

# 🔐 7. Authentication Client

`clients/auth.client.ts` is responsible for authentication.

The authentication flow is:

```text
Username + Password
        ↓
      /auth
        ↓
🔑 Authentication Token
        ↓
Authenticated API Operations
```

Credentials are retrieved from environment configuration instead of being hardcoded into test cases.

This keeps authentication logic separate from business API operations.

---

# ⚙️ 8. Environment Configuration

Environment-specific configuration is centralized in:

```text
config/environment.ts
```

Typical configuration values include:

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

A `.env.example` file provides a safe template:

```text
API_BASE_URL=
API_USERNAME=
API_PASSWORD=
```

This gives new developers a clear understanding of the required configuration without exposing credentials.

> 🔒 **Never commit real credentials or secrets to source control.**

---

# 🧩 9. Playwright Fixtures

The framework uses a reusable API fixture:

```text
fixtures/api.fixture.ts
```

The fixture provides API dependencies required by tests.

Instead of every test manually creating:

```text
APIRequestContext
AuthClient
BookingClient
Authentication Token
```

the fixture can manage the required setup.

Tests can then consume the required dependency directly:

```typescript
async ({ bookingClient })
```

### Benefits

* ♻️ Reusable setup
* 🧹 Cleaner tests
* 🚫 Less duplicated code
* 🔧 Centralized dependency management
* 🔐 Easier authentication handling

---

# 📦 10. Test Data

Test data is separated from API implementation.

The booking data model contains fields such as:

```text
firstname
lastname
totalprice
depositpaid
bookingdates
additionalneeds
```

This allows tests to work with structured and strongly typed test data.

For negative testing, invalid or incomplete payloads can intentionally be created to verify API error handling.

The principle is:

> **Separate the data used by the test from the code that performs the API operation.**

---

# 🧾 11. Response Schema Validation

The framework uses **Zod** for runtime API response schema validation.

A status code such as:

```text
HTTP 200
```

only tells us that the API returned a successful HTTP response.

It does **not** guarantee that the response body contains the expected structure.

For example, we may need to verify:

* Required fields
* Data types
* Nested objects
* Array structures
* Response properties

The validation flow becomes:

```text
📦 API Response
      │
      ├── HTTP Status
      │
      ├── Content Type
      │
      └── 🧾 Zod Schema
              │
              ├── Required fields
              ├── Data types
              └── Response structure
```

This gives the framework an additional layer of **API contract validation**.

---

# 🔍 12. Reusable API Assertions

Common validations are centralized in:

```text
utils/api.assertions.ts
```

Examples include:

```text
expectStatus()
expectResponseOk()
expectJsonContentType()
```

Instead of repeating the same validation logic throughout every test:

```typescript
expectStatus(response, 200);
```

can be reused wherever required.

### Benefits

* ♻️ Consistent validation
* 🧹 Less duplicated code
* 📖 Cleaner tests
* 🛠️ Easier maintenance
* 💬 Consistent failure messages

---

# ✅ 13. Positive API Testing

The framework contains positive API scenarios covering expected behavior.

Examples include:

```text
GET all bookings
GET booking by ID
CREATE booking
UPDATE booking
PATCH booking
DELETE booking
```

These scenarios verify that the API behaves correctly when valid requests and data are provided.

---

# ❌ 14. Negative API Testing

Negative scenarios are organized separately under:

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

The purpose is to verify that the API **rejects invalid requests correctly**.

An important testing principle is:

> 🎯 **An expected error is a successful test outcome when the test is specifically validating that error condition.**

For example:

```text
Invalid authentication
        ↓
403 Forbidden
        ↓
Expected behavior
        ↓
✅ Test Passes
```

---

# 🔐 15. Authentication Negative Testing

Dedicated authentication-negative scenarios validate protected API operations.

Examples:

```text
Update without authentication
Update with invalid authentication token
```

The API is expected to reject unauthorized requests.

For example:

```text
Expected:
403 Forbidden
```

Therefore, seeing `403` in the test output does **not automatically mean the test failed**.

The test passes when the actual response matches the expected behavior.

---

# 🔄 16. CRUD Workflow Testing

The framework contains an end-to-end API workflow:

```text
tests/api/booking/workflows/booking-crud.spec.ts
```

The workflow validates multiple API operations together.

Conceptually:

```text
🆕 CREATE
   ↓
📖 READ
   ↓
✏️ UPDATE
   ↓
🔍 VERIFY
   ↓
🗑️ DELETE
   ↓
🔍 VERIFY
```

This is different from testing each endpoint independently.

A CRUD workflow validates that multiple API operations work correctly **together as a business flow**.

---

# 🚦 17. Smoke Testing

Smoke testing focuses on critical functionality that should be validated quickly.

The framework uses the Playwright tag:

```text
@smoke
```

Current smoke suite:

```text
2 tests
```

Run smoke tests using:

```bash
npm run test:smoke
```

Conceptually:

```text
🚦 Smoke Test
     ↓
Critical API functionality
     ↓
Fast feedback
     ↓
Release confidence
```

Smoke testing answers:

> **"Is the critical API functionality working?"**

---

# 🔁 18. Regression Testing

Regression testing provides broader API coverage.

The framework uses:

```text
@regression
```

Current regression suite:

```text
7 tests
```

Run regression tests using:

```bash
npm run test:regression
```

Regression testing answers:

> **"Have recent changes broken existing API functionality?"**

---

# ⚖️ 19. Smoke vs Regression

```text
             TEST SUITE
                 │
        ┌────────┴────────┐
        ▼                 ▼
     🚦 SMOKE          🔁 REGRESSION
        │                 │
      Small             Larger
      Fast              Broader
      Critical          Comprehensive
      2 tests           7 tests
```

### Smoke

Used for **fast confidence**.

### Regression

Used for **broader confidence**.

Both serve different purposes and should not be treated as interchangeable.

---

# 📘 20. TypeScript Validation

The framework performs TypeScript validation before API test execution:

```bash
npx tsc --project tsconfig.json --noEmit
```

The `--noEmit` option validates the TypeScript project without generating JavaScript output.

This can detect issues such as:

* Invalid imports
* Incorrect types
* Missing properties
* Invalid method names
* Type mismatches
* Syntax errors

TypeScript validation is also incorporated into the CI pipeline.

---

# 🚀 21. CI/CD with GitHub Actions

The framework is integrated with **GitHub Actions**.

The CI pipeline follows this flow:

```text
👨‍💻 Git Push / Pull Request
            ↓
      🐙 GitHub Actions
            ↓
    📥 Checkout Repository
            ↓
     🟢 Setup Node.js
            ↓
        📦 npm ci
            ↓
🎭 Install Playwright Browsers
            ↓
    📘 TypeScript Validation
            ↓
       🚦 Smoke Tests
            ↓
     🔁 Regression Tests
            ↓
     📊 Upload Report
```

The workflow is defined in:

```text
.github/workflows/playwright.yml
```

---

# 🔄 22. CI/CD Triggers

The pipeline supports multiple execution methods.

### Push

Runs when code is pushed to:

```text
main
```

### Pull Request

Runs when a pull request targets:

```text
main
```

### Manual Execution

The workflow also supports:

```text
workflow_dispatch
```

This allows a tester or developer to manually trigger the pipeline from GitHub Actions.

---

# 🔒 23. CI/CD Secrets

Sensitive credentials are not stored directly inside the workflow.

The CI pipeline receives:

```text
API_BASE_URL
API_USERNAME
API_PASSWORD
```

from GitHub repository secrets.

The flow is:

```text
🔐 GitHub Secrets
       ↓
🚀 GitHub Actions
       ↓
⚙️ Environment Variables
       ↓
config/environment.ts
       ↓
🔌 API Client
```

This prevents credentials from being committed to source control.

---

# 📊 24. Playwright Reporting

Playwright reporting is used to provide execution visibility.

After execution, the CI workflow uploads:

```text
playwright-report/
```

as a GitHub Actions artifact.

This allows the test report to be reviewed even after the CI job has completed.

The report is configured with a retention period of:

```text
30 days
```

---

# 📈 25. Current Test Coverage

The current framework contains:

```text
🚦 Smoke
   2 tests

🔁 Regression
   7 tests
```

Recent CI validation confirmed:

```text
Smoke:
✅ 2 passed

Regression:
✅ 7 passed
```

The regression suite also includes authentication-negative scenarios where:

```text
403 Forbidden
```

is an **expected response**.

---

# 🧠 26. How to Think About Adding a New API Test

When adding a new test, avoid immediately writing request code inside the test.

Follow this process:

### 1️⃣ Identify the business scenario

```text
User should be able to create a booking
```

### 2️⃣ Identify the API endpoint

```text
POST /booking
```

### 3️⃣ Check whether a client method exists

```text
bookingClient.createBooking()
```

### 4️⃣ Prepare test data

```text
booking.data.ts
```

### 5️⃣ Send the request through the client

```text
Test
 ↓
BookingClient
 ↓
POST /booking
```

### 6️⃣ Validate the response

```text
Status
 ↓
Content Type
 ↓
Schema
 ↓
Business Assertions
```

### 7️⃣ Add the appropriate tag

```text
@smoke
```

or:

```text
@regression
```

### 8️⃣ Run locally

```text
Test → Validate → Debug → Commit
```

This keeps the framework consistent as more tests are added.

---

# 🧩 27. Separation of Responsibilities

One of the most important concepts in this framework is **separation of concerns**.

### ❌ Avoid

```text
Test
 ├── HTTP request implementation
 ├── Authentication
 ├── Test data
 ├── Schema validation
 ├── Assertions
 └── Business logic
```

Everything becomes mixed together.

### ✅ Prefer

```text
Test
 └── Business scenario

Fixture
 └── Test dependencies

API Client
 └── API implementation

Schema
 └── Response contract

Assertion Utility
 └── Common validations

Test Data
 └── Input data

Configuration
 └── Environment & credentials

CI/CD
 └── Automated execution
```

This architecture reduces coupling between individual components.

---

# 🐛 28. Debugging Approach

When an API test fails, investigate systematically.

```text
❌ Test Failure
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
Check Assertions
      ↓
Check Playwright Report
      ↓
🔍 Identify Root Cause
```

For CI failures:

```text
GitHub Actions
      ↓
Failed Step
      ↓
Test Output
      ↓
Playwright Report
      ↓
Root Cause Analysis
```

The objective is not simply to make the test green.

The objective is to determine whether:

```text
Application defect
        OR
Automation defect
        OR
Test-data issue
        OR
Environment issue
```

caused the failure.

---

# 🔄 29. Example API Execution Flow

For a create-booking test:

```text
🧪 Test
   │
   │ bookingClient.createBooking()
   ▼
🔌 BookingClient
   │
   │ POST /booking
   ▼
🌐 Restful Booker API
   │
   │ JSON Response
   ▼
📦 Response
   │
   ├── HTTP Status
   │
   ├── Content-Type
   │
   ├── 🧾 Zod Schema
   │
   └── 🔍 Business Assertions
            │
            ▼
        ✅ PASS / ❌ FAIL
```

This is the core execution flow to remember when explaining the framework.

---

# 🎯 30. Key Design Principles

The framework is built around the following principles.

### 🧩 Separation of Concerns

Each layer has a defined responsibility.

### ♻️ Reusability

Common API operations, fixtures, schemas, and assertions are centralized.

### 📖 Readability

Tests should clearly communicate the scenario being validated.

### 🛠️ Maintainability

Changes to API implementation should ideally be isolated to the client layer.

### 📘 Type Safety

TypeScript provides compile-time type checking.

### 🧾 Contract Validation

Zod provides runtime response schema validation.

### 🔒 Security

Credentials are externalized through environment variables and GitHub Secrets.

### 🚦 Test Classification

Smoke and regression tests are separated based on their purpose.

### 🚀 CI/CD Readiness

The framework can execute automatically through GitHub Actions.

---

# 🤖 31. AI-Assisted Development

This framework was built **from scratch with the assistance of ChatGPT** for:

* 🧠 Framework architecture discussions
* 📚 Learning and understanding Playwright/TypeScript concepts
* 🐛 Debugging and troubleshooting
* 🔍 Code review and improvement
* 🏗️ Exploring automation design patterns
* 📖 Improving documentation and maintainability

The framework's implementation, design decisions, testing approach, and final validation were reviewed and understood during development.

> **The objective was not simply to generate code, but to use AI as a development and learning assistant while understanding the architecture and implementation of the framework.**

---

# 🎤 32. How to Explain This Framework in an Interview

A concise explanation could be:

> **"I built an API automation framework from scratch using Playwright, TypeScript, and Playwright's APIRequestContext. I designed it using a layered architecture where the test layer contains business scenarios and the client layer handles API implementation.**
>
> **I created reusable clients for authentication and booking CRUD operations, Playwright fixtures for common API setup, and centralized environment configuration. I separated test data from implementation and added Zod schema validation so that we validate not only HTTP status codes but also the structure and data types of API responses.**
>
> **I also implemented positive, negative, authentication and CRUD workflow scenarios and organized the suite into smoke and regression tests using Playwright tags.**
>
> **For quality and maintainability, I added reusable API assertions, TypeScript validation and Playwright reporting. Finally, I integrated the framework with GitHub Actions so that TypeScript validation, smoke tests and regression tests can execute automatically on code changes, with the Playwright report uploaded as a CI artifact."**

---

# 🧠 33. Framework Flow to Remember

If you need to explain the framework quickly, remember this:

```text
🧪 TEST
   ↓
🧩 FIXTURE
   ↓
🔌 CLIENT
   ↓
🌐 API
   ↓
📦 RESPONSE
   ↓
🧾 SCHEMA
   +
🔍 ASSERTIONS
   ↓
📊 REPORT
   ↓
🚀 CI/CD
```

And remember each responsibility:

```text
🔌 Clients
→ How to call the API

🧩 Fixtures
→ How to prepare reusable dependencies

🧪 Tests
→ What to test

🧾 Schemas
→ What the response should look like

🔍 Assertions
→ What should pass or fail

📦 Data
→ What input to send

⚙️ Config
→ Which environment and credentials to use

🚀 CI/CD
→ When and where tests execute
```

---

# 📈 34. Future Enhancements

The framework can be extended further with:

* 🌍 Multiple environment execution such as QA/UAT
* ⏰ Scheduled regression execution
* 📜 API contract testing
* 🎲 Dynamic test-data generation
* 🗄️ Database validation
* 📊 Enhanced reporting
* 🔁 Retry strategies for transient failures
* ⚡ Parallel execution optimization
* 🧹 Automated test-data cleanup
* 🔗 Azure DevOps/Jira integration
* 🔌 Additional API modules
* 📈 API reliability and performance monitoring

These are **potential future enhancements** and are not represented as currently implemented features.

---

# 🛠️ 35. Technology Stack

| Technology                    | Purpose                              |
| ----------------------------- | ------------------------------------ |
| 🎭 **Playwright**             | API automation and test execution    |
| 📘 **TypeScript**             | Programming language and type safety |
| 🧾 **Zod**                    | Runtime schema validation            |
| 🟢 **Node.js**                | Runtime environment                  |
| 🔐 **dotenv**                 | Environment configuration            |
| 🌳 **Git**                    | Version control                      |
| 🐙 **GitHub**                 | Source repository                    |
| 🚀 **GitHub Actions**         | CI/CD                                |
| 📊 **Playwright HTML Report** | Test reporting                       |

---

# 🏁 36. Final Takeaway

A good API automation framework is **more than a collection of API requests**.

It should provide structure around:

```text
🧪 Test Design
      +
🔌 API Abstraction
      +
🧩 Reusable Fixtures
      +
📦 Test Data
      +
🧾 Schema Validation
      +
🔍 Assertions
      +
🔒 Secure Configuration
      +
🚦 Smoke Testing
      +
🔁 Regression Testing
      +
📊 Reporting
      +
🚀 CI/CD
```

The result is a framework that is:

**Readable → Reusable → Maintainable → Scalable → CI/CD Ready**

---

## 🎯 One-Line Definition

> **A Playwright TypeScript API automation framework that uses reusable API clients, fixtures, schema validation, centralized assertions, secure configuration, smoke/regression suites, and GitHub Actions to provide maintainable and scalable API test automation.**


#🤖 **AI-Assisted Development**
This framework was built from scratch with the assistance of ChatGPT for framework design discussions, Playwright/TypeScript learning, debugging, code review, and exploring best practices. The implementation and architectural decisions were reviewed, tested, and understood during development.
