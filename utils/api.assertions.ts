import { expect, APIResponse } from '@playwright/test';
import { ZodType } from 'zod';

/**
 * Verifies that an API response has the expected HTTP status code.
 *
 * This assertion is reusable across all API resources.
 *
 * Example:
 * expectStatus(response, 200);
 */
export function expectStatus(
  response: APIResponse,
  expectedStatus: number
): void {

  expect(
    response.status(),
    `Expected HTTP status ${expectedStatus}, but received ${response.status()}`
  ).toBe(expectedStatus);
}

/**
 * Verifies that the API response was successful.
 *
 * Playwright considers HTTP status codes in the 200-299 range
 * as successful responses.
 */
export function expectResponseOk(
  response: APIResponse
): void {

  expect(
    response.ok(),
    `Expected successful API response, but received HTTP ${response.status()}`
  ).toBeTruthy();
}

/**
 * Verifies that the API response contains the expected Content-Type.
 *
 * This ensures that the API is returning the response in the
 * format expected by the client.
 */
export function expectJsonContentType(
  response: APIResponse
): void {

  const contentType = response.headers()['content-type'];

  expect(
    contentType,
    'Expected API response to contain a JSON Content-Type header'
  ).toContain('application/json');
}

/**
 * Validates an API response body against a Zod schema.
 *
 * The response body is initially treated as unknown because
 * data received from an external API cannot be trusted until
 * it has been validated.
 *
 * If validation fails, the Zod validation errors are included
 * in the Playwright test failure.
 */
export function expectSchema<T>(
  responseBody: unknown,
  schema: ZodType<T>
): T {

  const validationResult = schema.safeParse(responseBody);

  // Explicitly handle schema validation failure.
  // This also allows TypeScript to narrow validationResult.data
  // to the expected type T.
  if (!validationResult.success) {

    throw new Error(
      `API response schema validation failed:\n${JSON.stringify(
        validationResult.error.issues,
        null,
        2
      )}`
    );
  }

  // Schema validation succeeded, so data is guaranteed to
  // conform to the expected type.
  return validationResult.data;
}