<script>
  import { link } from "svelte-routing";
  import { fly, fade, blur } from "svelte/transition";

  import globalStore from "../../stores/globalStore";
  import ItemsList from "./ItemsList.svelte";
  import user from "../../stores/user";
</script>

<div class="cart-overlay" transition:blur>
  <div class="cart-container" transition:fly={{ x: 100 }}>
    <div class="cart" transition:fade={{ delay: 400 }}>
      <!-- cart header -->
      <div class="cart-header">
        <button
          class="btn-close"
          on:click={() => globalStore.toggle('cart', false)}>
          <i class="fas fa-window-close" />
        </button>
        <h2 class="cart-title">your bag</h2>
        <span />
      </div>
      <!-- cart items -->
      <ItemsList />
      <!-- cart footer -->
      <div class="cart-footer">
        {#if $user.jwt}
          <a
            href="/checkout"
            use:link
            class="btn btn-primary btn-block"
            on:click={() => globalStore.toggle('cart', false)}>
            Checkout
          </a>
        {:else}
          <p class="cart-login">
            in order to checkout please
            <a
              href="/login"
              use:link
              on:click={() => globalStore.toggle('cart', false)}>
              Login
            </a>
          </p>
        {/if}
      </div>
    </div>
  </div>
</div>
