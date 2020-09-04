<script>
  import BigNavbar from "./BigNavbar.svelte";
  import SmallNavbar from "./SmallNavbar.svelte";
  import globalStore from "../../stores/globalStore";

  let screenWidth;

  $: if (screenWidth > 992) {
    globalStore.toggle("sidebar", false);
  }
</script>

<svelte:window bind:innerWidth={screenWidth} />

{#if screenWidth > 992}
  <BigNavbar />
{:else}
  <SmallNavbar />
{/if}
