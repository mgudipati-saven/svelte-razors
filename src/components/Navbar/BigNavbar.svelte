<script>
  import { link } from "svelte-routing";
  import CartButton from "../Cart/CartButton.svelte";
  import links from "../../constants/links";
  import LoginLink from "../LoginLink.svelte";
</script>

<nav class="navbar">
  <div class="nav-container">
    <div class="nav-center">
      <ul class="nav-links">
        {#each links as navLink}
          <li>
            <a href={navLink.url} use:link>{navLink.text}</a>
          </li>
        {/each}
      </ul>
      <a href="/">
        <img src="/assets/images/logo.svg" alt="razors logo" />
      </a>
      <div class="nav-aside">
        <LoginLink />
        <CartButton />
      </div>
    </div>
  </div>
</nav>
