if (process.env.BROWSER) {
  throw new Error('Do not import `config.js` from inside the client-side code.');
}

module.exports = {
  // Node.js app
  port: process.env.PORT || 3000,

  // API Gateway
  api: {
    baseUrl: process.env.API_BASE_URL || 'http://localhost:9001',
  },

  // Database
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },
};
