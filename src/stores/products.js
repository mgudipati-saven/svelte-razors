import { writable, derived } from 'svelte/store'
import getProducts from '../strapi/getProducts'
import url from '../strapi/URL'

// flatten products
const flattenProducts = (data) => {
  return data.map((item) => {
    // let image = item.image.url
    let image = `${url}${item.image.url}`
    return { ...item, image }
  })
}

const store = writable([], () => {
  setProducts()
  return () => {}
})

async function setProducts() {
  let products = await getProducts()

  if (products) {
    products = flattenProducts(products)
    store.set(products)
  }
}

// derived store for featured products
export const featured = derived(store, ($store) => {
  return $store.filter((item) => item.featured)
})

// subscribe
// set
// update

export default store
