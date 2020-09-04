<script>
  import { link } from "svelte-routing";
  import CartButton from "../Cart/CartButton.svelte";
  import globalStore from "../../stores/globalStore";
</script>

<nav class="navbar">
  <div class="nav-center">
    <button
      class="btn-sidebar-toggle"
      on:click={() => globalStore.toggle('sidebar', true)}>
      <i class="fas fa-bars" />
    </button>
    <a href="/" class="nav-logo" use:link>
      <img src="/assets/images/logo.svg" alt="razors logo" />
    </a>
    <CartButton />
  </div>
</nav>
