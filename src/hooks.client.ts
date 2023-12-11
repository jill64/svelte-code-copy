import { init } from '@jill64/sentry-sveltekit-cloudflare/client'

const onError = init(
  'https://699af0b5eb8d7dc3c9b447b30c691148@o4505814639312896.ingest.sentry.io/4506375279869952'
)

export const handleError = onError()
