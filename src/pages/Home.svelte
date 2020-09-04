<script>
  import { link } from "svelte-routing";
  import Hero from "../components/Hero.svelte";
  import Featured from "../components/Products/Featured.svelte";
</script>

<Hero>
  <a href="/products" class="btn btn-primary btn-hero" use:link>shop now</a>
</Hero>
<Featured title="featured products" />
