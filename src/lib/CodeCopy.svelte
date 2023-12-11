<script lang="ts">
  import { observable } from '@jill64/async-observer'
  import { onMount } from 'svelte'
  import { CheckIcon, CopyIcon, LoaderIcon, XIcon } from 'svelte-feather-icons'
  import { fade } from 'svelte/transition'

  /**
   * Execute at the start of copying.
   * @param promise Promise to resolve when copying is complete.
   */
  export let onCopy: ((promise: Promise<string>) => void) | undefined =
    undefined

  /** Icon size (px) */
  export let size = 18

  export let background = 'transparent'
  export let color = 'whitesmoke'
  export let success = 'green'
  export let error = 'red'
  export let top = '0.5rem'
  export let right = '0.5rem'
  export let border = 'none'
  export let padding = '0.25rem'
  export let borderRadius = '0.25rem'
  export let margin = '0'

  /** Effect when button interaction */
  export let effect: 'none' | 'push' | 'pop' = 'pop'

  /** Fade duration after mount */
  export let duration = 150

  const { status, observed } = observable()

  let dom: HTMLElement | null

  const onClick = observed(async () => {
    const source =
      dom?.getElementsByTagName('code')[0].innerText.replace(/\n$/, '') ?? ''

    const promise = navigator.clipboard.writeText(source)

    onCopy?.(promise.then(() => source))

    await promise
  })

  $: textColor =
    $status === 'FULFILLED' ? success : $status === 'REJECTED' ? error : color

  $: iconSize = size.toString()

  let visible = false

  onMount(() => {
    visible = true
  })
</script>

<div bind:this={dom} style:position="relative">
  {#if visible}
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
      on:click={onClick}
    >
      {#if $status === 'IDLE'}
        <CopyIcon size={iconSize} />
      {:else if $status === 'PENDING'}
        <LoaderIcon size={iconSize} />
      {:else if $status === 'FULFILLED'}
        <CheckIcon size={iconSize} />
      {:else}
        <XIcon size={iconSize} />
      {/if}
    </button>
  {/if}
  <slot />
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
