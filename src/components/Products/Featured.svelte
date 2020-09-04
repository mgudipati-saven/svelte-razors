<script>
  import { featured } from "../../stores/products";
  import Loading from "../Loading.svelte";
  import Product from "./Product.svelte";

  export let title = "";
</script>

{#if $featured.length === 0}
  <Loading />
{:else}
  <section class="section">
    <h2 class="section-title">{title}</h2>
    <div class="products-center">
      {#each $featured as product (product.id)}
        <Product {product} />
      {:else}
        <Loading />
      {/each}
    </div>
  </section>
{/if}
