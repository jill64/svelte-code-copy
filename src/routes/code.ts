export const code = () =>
  /* html */ `
<script>
  import { CodeCopy } from 'svelte-code-copy'

  const code = 'Your code here'
</script>

<CodeCopy>
  <pre><code>{code}</code></pre>
</CodeCopy>
`.trim()
