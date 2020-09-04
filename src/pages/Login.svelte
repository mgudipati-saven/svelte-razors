<script>
  import loginUser from "../strapi/loginUser";
  import registerUser from "../strapi/registerUser";
  import { navigate } from "svelte-routing";
  import globalStore from "../stores/globalStore";

  let email = "";
  let password = "";
  let username = "default name";
  let isMember = true;

  $: isEmpty = !email || !password || !username || $globalStore.alert;

  function toggleMember() {
    isMember = !isMember;
    if (!isMember) {
      username = "";
    } else {
      username = "default username";
    }
  }

  async function handleSubmit() {
    globalStore.toggleAlert(true, "Loading data...please wait!");

    let user;

    if (isMember) {
      user = await loginUser({ email, password });
    } else {
      user = await registerUser({ email, password, username });
    }

    if (user) {
      navigate("/products");
      globalStore.toggleAlert(true, "Welcome to shopping madness!");
      return;
    }

    globalStore.toggleAlert(true, "Something went wrong, try again!", true);
  }
</script>

<section class="form">
  <h2 class="section-title">
    {#if isMember}sign in{:else}register{/if}
  </h2>
  <form class="login-form" on:submit|preventDefault={handleSubmit}>
    <div class="form-control">
      <label for="email">email</label>
      <input type="email" id="email" bind:value={email} />
    </div>
    <div class="form-control">
      <label for="password">password</label>
      <input type="password" id="password" bind:value={password} />
    </div>
    {#if !isMember}
      <div class="form-control">
        <label for="username">username</label>
        <input type="text" id="username" bind:value={username} />
      </div>
    {/if}
    {#if isEmpty}
      <p class="form-empty">please fill out all form fields</p>
    {/if}
    <button
      type="submit"
      class="btn btn-block btn-primary"
      class:disabled={isEmpty}
      disabled={isEmpty}>
      submit
    </button>
    {#if isMember}
      <p class="register-link">
        need to register?
        <button type="button" on:click={toggleMember}>Click here</button>
      </p>
    {:else}
      <p class="register-link">
        already a member?
        <button type="button" on:click={toggleMember}>Click here</button>
      </p>
    {/if}
  </form>
</section>
