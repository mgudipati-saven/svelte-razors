<script>
  import globalStore from "../../stores/globalStore";
  import cart from "../../stores/cart";

  $: total = $cart.reduce((acc, curr) => {
    return (acc += curr.amount);
  }, 0);
</script>

<div
  class="btn-cart-container"
  on:click={() => globalStore.toggle('cart', true)}>
  <button class="btn-cart-toggle">
    <i class="fas fa-cart-plus" />
  </button>
  <span class="btn-cart-items">{total}</span>
</div>
