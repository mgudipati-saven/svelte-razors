<script>
  import { link } from "svelte-routing";

  import Loading from "../components/Loading.svelte";
  import products from "../stores/products";
  import globaStore from "../stores/globalStore";
  import { addToCart } from "../stores/cart";

  export let id;
  export let location;

  $: product = $products.find((item) => item.id == parseInt(id));
</script>

<svelte:head>
  <title>{!product ? 'single product' : product.title}</title>
</svelte:head>

{#if !product}
  <Loading />
{:else}
  <section class="single-product">
    <a href="/products" class="btn btn-primary" use:link>back to products</a>
    <div class="single-product-container">
      <article class="single-product-image">
        <img src={product.image} alt={product.title} />
      </article>
      <article>
        <h1>{product.title}</h1>
        <h2>${product.price}</h2>
        <p>{product.description}</p>
        <button
          class="btn btn-primary btn-block"
          on:click={() => {
            addToCart(product);
            globaStore.toggle('cart', true);
          }}>
          add to cart
        </button>
      </article>
    </div>
  </section>
{/if}
