import dotenv from 'dotenv';

/**
 * Loads environment variables from the local .env file.
 *
 * The .env file contains environment-specific configuration
 * such as API URLs and credentials and must never be committed.
 */
dotenv.config();

/**
 * Centralized environment configuration.
 *
 * Keeping environment variables in one place prevents tests and
 * API clients from accessing process.env directly throughout
 * the framework.
 */
export const environment = {
  apiBaseUrl: process.env.API_BASE_URL,
  apiUsername: process.env.API_USERNAME,
  apiPassword: process.env.API_PASSWORD,
};

/**
 * Validates that all mandatory environment variables are available.
 *
 * Failing early during startup is preferable to receiving a
 * confusing authentication or connection failure later.
 */
if (
  !environment.apiBaseUrl ||
  !environment.apiUsername ||
  !environment.apiPassword
) {
  throw new Error(
    'Missing required environment variables. Check your .env file.'
  );
}