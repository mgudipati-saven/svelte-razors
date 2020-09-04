import { writable, derived } from 'svelte/store'
import localProducts from '../localProducts'

// flatten products
const flattenProducts = (data) => {
  return data.map((item) => {
    let image = item.image.url
    return { ...item, image }
  })
}

const store = writable(flattenProducts([...localProducts]))

// derived store for featured products
export const featured = derived(store, ($store) => {
  return $store.filter((item) => item.featured)
})

// subscribe
// set
// update

export default store
