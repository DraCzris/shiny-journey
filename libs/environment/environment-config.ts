type Config = {
  CONSOLE_BACKEND_API_URL: string
  FEATURE_METRICS_ENABLED: boolean
  MARKETING_WEB_URL: string
  JIRA_INTEGRATION_BACKEND_API_URL: string
}

export const getEnvironmentConfig = (host: string): Config => {
  // for demo/staging server
  if (host.includes('demo.mywaypoint.io')) {
    return {
      CONSOLE_BACKEND_API_URL: 'https://console.api.demo.mywaypoint.io',
      MARKETING_WEB_URL: 'https://mywaypoint.ai',
      FEATURE_METRICS_ENABLED: true,
      JIRA_INTEGRATION_BACKEND_API_URL:
        'https://jira-integration.api.demo.mywaypoint.io',
    }
  }

  // for production server
  if (host.includes('.mywaypoint.ai')) {
    return {
      CONSOLE_BACKEND_API_URL: 'https://console.api.prod.mywaypoint.io',
      MARKETING_WEB_URL: 'https://mywaypoint.ai',
      FEATURE_METRICS_ENABLED: false,
      JIRA_INTEGRATION_BACKEND_API_URL:
        'https://jira-integration.api.prod.mywaypoint.io',
    }
  }

  return {
    CONSOLE_BACKEND_API_URL: 'http://localhost:8005',
    MARKETING_WEB_URL: 'https://mywaypoint.ai',
    FEATURE_METRICS_ENABLED: true,
    JIRA_INTEGRATION_BACKEND_API_URL: 'http://localhost:8001',
  }
}
