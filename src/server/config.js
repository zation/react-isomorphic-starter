if (process.env.BROWSER) {
  throw new Error('Do not import `config.js` from inside the client-side code.');
}

const { env: { PORT, API_BASE_URL, GOOGLE_TRACKING_ID, LOG_DIR } } = process;

module.exports = {
  // Node.js app
  port: PORT || 3000,

  // API Gateway
  api: {
    baseUrl: API_BASE_URL || 'http://localhost:9001',
  },

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

  logDir: LOG_DIR || './logs',
};
