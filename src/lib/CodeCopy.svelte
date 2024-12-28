<script lang="ts">
  import { observable } from '@jill64/svelte-observer'
  import type { Snippet } from 'svelte'
  import { CheckIcon, CopyIcon, LoaderIcon, XIcon } from 'svelte-feather-icons'
  import { hydrated } from 'svelte-hydrated'
  import { fade } from 'svelte/transition'

  let {
    /**
     * Execute at the start of copying.
     * @param promise Promise to resolve when copying is complete.
     */
    onCopy = undefined,

    /** Icon size (px) */
    size = 18,
    background = 'transparent',
    color = 'whitesmoke',
    success = 'green',
    error = 'red',
    top = '0.5rem',
    right = '0.5rem',
    border = 'none',
    padding = '0.25rem',
    borderRadius = '0.25rem',
    margin = '0',

    /** Effect when button interaction */
    effect = 'pop',

    /** Fade duration after mount */
    duration = 150,

    children
  }: {
    onCopy?: (promise: Promise<string>) => void
    size?: number
    background?: string
    color?: string
    success?: string
    error?: string
    top?: string
    right?: string
    border?: string
    padding?: string
    borderRadius?: string
    margin?: string
    effect?: 'none' | 'push' | 'pop'
    duration?: number
    children: Snippet
  } = $props()

  let { status, observed } = $derived(observable())

  let dom: HTMLElement | null

  let onClick = $derived(
    observed(async () => {
      const source =
        dom?.getElementsByTagName('code')[0].innerText.replace(/\n$/, '') ?? ''

      const promise = navigator.clipboard.writeText(source)

      onCopy?.(promise.then(() => source))

      await promise
    })
  )

  let textColor = $derived(
    status === 'FULFILLED' ? success : status === 'REJECTED' ? error : color
  )

  let iconSize = $derived(size.toString())
</script>

<div bind:this={dom} style:position="relative">
  {#if $hydrated}
    <button
      transition:fade={{ duration }}
      title="Copy"
      style:--button-background={background}
      style:cursor="pointer"
      style:color={textColor}
      style:top
      style:right
      style:margin
      style:padding
      style:border
      style:border-radius={borderRadius}
      style:position="absolute"
      style:display="inline-flex"
      style:align-items="center"
      style:justify-content="center"
      data-button-effect={effect}
      onclick={onClick}
    >
      {#if status === 'IDLE'}
        <CopyIcon size={iconSize} />
      {:else if status === 'PENDING'}
        <LoaderIcon size={iconSize} />
      {:else if status === 'FULFILLED'}
        <CheckIcon size={iconSize} />
      {:else}
        <XIcon size={iconSize} />
      {/if}
    </button>
  {/if}
  {@render children()}
</div>

<style>
  button {
    background: var(--button-background);
  }
  button[data-button-effect='push']:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  button[data-button-effect='push']:active {
    background: rgba(0, 0, 0, 0.2);
  }
  button[data-button-effect='pop']:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  button[data-button-effect='pop']:active {
    background: rgba(255, 255, 255, 0.15);
  }
</style>
