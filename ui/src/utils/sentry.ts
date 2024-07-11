import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'https://2a9a86ec5e5728b5cd5ff1217b88a59a@o230370.ingest.us.sentry.io/4507582603198464',

  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],

  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions

  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/ruian-sg-api\.poom\.dev/],

  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})
