export const code = () =>
  /* html */ `
<script>
  import { CodeCopy } from 'svelte-code-copy'

  const code = 'Your code here'
</script>

<CodeCopy>
  {#snippet codeBlock()}
    <pre><code>{code}</code></pre>
  {/snippet}
</CodeCopy>
`.trim()
