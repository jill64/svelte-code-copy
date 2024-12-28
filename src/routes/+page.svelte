<script lang="ts">
  import { CodeCopy } from '$lib'
  import { theme, toast } from '@jill64/npm-demo-layout'
  import { HighlightSvelte } from 'svelte-highlight'
  import { code } from './code'
</script>

<main>
  <output>
    <CodeCopy
      color="inherit"
      onCopy={(promise) =>
        $toast.promise(promise, {
          success: 'Copied!',
          error: 'Failed to copy',
          loading: 'Copying...'
        })}
      effect={$theme === 'dark' ? 'pop' : 'push'}
    >
      {#snippet codeBlock()}
        <HighlightSvelte code={code()}></HighlightSvelte>
      {/snippet}
    </CodeCopy>
  </output>
</main>
