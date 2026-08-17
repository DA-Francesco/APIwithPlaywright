import { defineConfig } from '@playwright/test';
import { environment } from './config/environment';

/**
 * Playwright configuration for API automation.
 *
 * API-specific settings such as the base URL and common headers
 * are centralized here so individual tests do not need to repeat them.
 */
export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    baseURL: environment.apiBaseUrl,

    extraHTTPHeaders: {
      Accept: 'application/json',
    },

    trace: 'on-first-retry',
  },
});