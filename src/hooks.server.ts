import { hooks } from '@jill64/npm-demo-layout'
import { init } from '@jill64/sentry-sveltekit-cloudflare/server'

const { onHandle, onError } = init(
  'https://699af0b5eb8d7dc3c9b447b30c691148@o4505814639312896.ingest.sentry.io/4506375279869952'
)

export const handle = onHandle(hooks)
export const handleError = onError()
