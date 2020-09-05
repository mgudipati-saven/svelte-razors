<script>
  import { onMount } from "svelte";
  import { navigate, link } from "svelte-routing";
  import user from "../stores/user";
  import cart, { cartTotal } from "../stores/cart";
  import submitOrder from "../strapi/submitOrder";
  import globaStore from "../stores/globalStore";

  let name = "";

  // strip vars
  let cardElement;
  let cardErrors;
  let card;
  let stripe;
  let elements;

  $: isEmpty = !name || $globaStore.alert;

  onMount(() => {
    if (!$user.jwt) {
      navigate("/");
      return;
    }
    if ($cartTotal > 0) {
      stripe = Stripe(
        "pk_test_51HNbbHLZi2HP4POQAhOSUjdqXDPO16hB1bKgGUx4PDTTqDdXXtHkAFwY5fKhuQVugMt7XQjgKQop86Ulx0XrDbgO00kmrooZFW"
      );

      elements = stripe.elements();
      card = elements.create("card");
      card.mount(cardElement);
      card.addEventListener("change", (event) => {
        if (event.error) {
          cardErrors.textContent = event.error.message;
        } else {
          cardErrors.textContent = "";
        }
      });
    }
  });

  async function handleSubmit() {
    globaStore.toggleAlert(true, "submitting order...please wait!");
    let res = await stripe.createToken(card).catch((err) => console.log(err));
    const { token } = res;

    if (token) {
      const { id } = token;
      let order = await submitOrder({
        name,
        total: $cartTotal,
        items: $cart,
        stripeToken: id,
        userToken: $user.jwt,
      });

      if (order) {
        globaStore.toggleAlert(true, "your order is complete!");
        cart.set([]);
        localStorage.setItem("cart", JSON.stringify([]));
        navigate("/");
        return;
      } else {
        globaStore.toggleAlert(
          true,
          "there was an error with your order. please try again.",
          true
        );
      }
    } else {
      console.log(res);
    }
  }
</script>

{#if $cartTotal > 0}
  <section class="form">
    <h2 class="section-title">checkout</h2>
    <form class="checkout-form" on:submit|preventDefault={handleSubmit}>
      <h3>order total: ${$cartTotal}</h3>
      <div class="form-control">
        <label for="name">your name</label>
        <input type="text" id="name" bind:value={name} />
      </div>
      <!-- stripe -->
      <div class="stripe-input">
        <label for="card-element">credit or debit card</label>
        <p class="stripe-info">
          test using this credit card: <span>4242 4242 4242 4242</span>
          <br /> enter any 5 digits for the zip code <br /> enter any 3 digits for
          the CVS
        </p>
        <div id="card-element" bind:this={cardElement} />
        <div id="card-errors" bind:this={cardErrors} role="alert" />
      </div>
      {#if isEmpty}
        <p class="form-empty">pleas fill out name field</p>
      {/if}
      <button
        class="btn btn-block btn-primary"
        disabled={isEmpty}
        class:disabled={isEmpty}>submit</button>
    </form>
  </section>
{:else}
  <div class="checkout-empty">
    <h2>your cart is empty</h2>
    <a href="/products" class="btn btn-primary" use:link>fill it</a>
  </div>
{/if}
