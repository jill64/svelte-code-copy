<!----- BEGIN GHOST DOCS HEADER ----->

# svelte-code-copy

[![npm-version](https://img.shields.io/npm/v/svelte-code-copy)](https://npmjs.com/package/svelte-code-copy) [![npm-license](https://img.shields.io/npm/l/svelte-code-copy)](https://npmjs.com/package/svelte-code-copy) [![npm-download-month](https://img.shields.io/npm/dm/svelte-code-copy)](https://npmjs.com/package/svelte-code-copy) [![npm-min-size](https://img.shields.io/bundlephobia/min/svelte-code-copy)](https://npmjs.com/package/svelte-code-copy) [![ci.yml](https://github.com/jill64/svelte-code-copy/actions/workflows/ci.yml/badge.svg)](https://github.com/jill64/svelte-code-copy/actions/workflows/ci.yml) [![website](https://img.shields.io/website?up_message=working&down_message=down&url=https%3A%2F%2Fsvelte-code-copy.jill64.dev)](https://svelte-code-copy.jill64.dev)

❏ Just wrap it with this

## [Demo](https://svelte-code-copy.jill64.dev)

<!----- END GHOST DOCS HEADER ----->

## Installation

```bash
npm i svelte-code-copy
```

## Usage

`pre` is optional.
`<CodeCopy>` copies the `innerText` of `<code>`

```svelte
<script>
  import { CodeCopy } from 'svelte-code-copy'
</script>

<CodeCopy>
  <pre>
    <code>
      <!-- Your code block -->
    </code>
  </pre>
</CodeCopy>
```

## Props

[full details](./src/lib//CodeCopy.svelte)

| Prop         | Type       | Default       |
| ------------ | ---------- | ------------- |
| onCopy       | `function` | `undefined`   |
| size         | `number`   | 18            |
| background   | `string`   | `transparent` |
| color        | `string`   | `whitesmoke`  |
| success      | `string`   | `green`       |
| error        | `string`   | `red`         |
| top          | `string`   | 0.5rem        |
| right        | `string`   | 0.5rem        |
| border       | `string`   | `none`        |
| padding      | `string`   | 0.25rem       |
| borderRadius | `string`   | 0.25rem       |
| margin       | `string`   | 0             |
| effect       | `string`   | `pop`         |
| duration     | `number`   | 150           |
