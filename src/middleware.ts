import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const startTime = Date.now();
  const response = await next();
  const duration = Date.now() - startTime;

  const logEntry = {
    timestamp: new Date().toISOString(),
    method: context.request.method,
    url: context.url.pathname,
    status: response.status,
    durationMs: duration,
    userAgent: context.request.headers.get('user-agent') || 'unknown'
  };

  console.log(JSON.stringify(logEntry));
  return response;
});
