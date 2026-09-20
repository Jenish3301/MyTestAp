/**
 * Environment and Build Configuration
 * Handles different environments and build settings
 */

export const Config = {
  APP_NAME: 'MyTestAp',
  APP_VERSION: '1.0.0',
  
  // Feature Flags
  FEATURES: {
    ENABLE_LOGS: true,
    ENABLE_ANALYTICS: false,
    ENABLE_CRASH_REPORTING: false,
  },

  // API Configuration
  API: {
    TIMEOUT: 30000, // 30 seconds
    RETRY_COUNT: 3,
  },

  // Permission Settings
  PERMISSIONS: {
    REQUEST_TIMEOUT: 5000,
    SHOW_RATIONALE: true,
  },

  // UI Configuration
  UI: {
    SPLASH_DURATION: 2000, // 2 seconds
    ANIMATION_DURATION: 300, // ms
    DEBOUNCE_DELAY: 300, // ms
  },

  // Logging
  LOG: {
    ENABLED: true,
    PREFIX: '[MyTestAp]',
  },
};

/**
 * Logger utility for consistent logging across app
 */
export const Logger = {
  info: (message: string, data?: any) => {
    if (Config.LOG.ENABLED) {
      console.log(`${Config.LOG.PREFIX} INFO:`, message, data);
    }
  },

  warn: (message: string, data?: any) => {
    if (Config.LOG.ENABLED) {
      console.warn(`${Config.LOG.PREFIX} WARN:`, message, data);
    }
  },

  error: (message: string, error?: any) => {
    if (Config.LOG.ENABLED) {
      console.error(`${Config.LOG.PREFIX} ERROR:`, message, error);
    }
  },

  debug: (message: string, data?: any) => {
    if (Config.LOG.ENABLED) {
      console.debug(`${Config.LOG.PREFIX} DEBUG:`, message, data);
    }
  },
};

/**
 * Error handling utility
 */
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const ErrorCodes = {
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  DEVICE_INFO_FAILED: 'DEVICE_INFO_FAILED',
  IMAGE_PICKER_FAILED: 'IMAGE_PICKER_FAILED',
  FORM_VALIDATION_FAILED: 'FORM_VALIDATION_FAILED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

/**
 * Safe async wrapper
 */
export const safeAsync = async <T>(
  asyncFunction: () => Promise<T>,
  defaultValue: T
): Promise<T> => {
  try {
    return await asyncFunction();
  } catch (error) {
    Logger.error('Async operation failed:', error);
    return defaultValue;
  }
};
