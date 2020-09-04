<script>
  import user, { logoutUser } from "../stores/user";
  import globalStore from "../stores/globalStore";
  import { link } from "svelte-routing";
</script>

{#if $user.jwt}
  <a
    href="/"
    class="logout-btn"
    use:link
    on:click={() => {
      logoutUser();
      globalStore.toggle('sidebar', false);
    }}>
    logout
  </a>
{:else}
  <a
    href="/login"
    use:link
    on:click={() => globalStore.toggle('sidebar', false)}>
    login
  </a>
{/if}
