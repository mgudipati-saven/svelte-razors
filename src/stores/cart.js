import { writable, derived } from 'svelte/store'
import localCart from '../localCart'

const cart = writable(getStorageCart())

export const cartTotal = derived(cart, ($cart) => {
  let total = $cart.reduce((acc, curr) => {
    return (acc += curr.amount * curr.price)
  }, 0)

  return total.toFixed(2)
})

// local functions
const remove = (id, items) => {
  return items.filter((item) => item.id !== id)
}

const toggleAmount = (id, items, action) => {
  return items.map((item) => {
    let newAmount
    if (action === '+') {
      newAmount = item.amount + 1
    } else if (action === '-') {
      newAmount = item.amount - 1
    } else {
      newAmount = item.amount
    }

    return id === item.id ? { ...item, amount: newAmount } : { ...item }
  })
}

// global functions
export const removeItem = (id) => {
  cart.update((storeValue) => {
    return remove(id, storeValue)
  })
}

export const incrementAmount = (id) => {
  cart.update((storeValue) => {
    return toggleAmount(id, storeValue, '+')
  })
}

export const decrementAmount = (id) => {
  cart.update((storeValue) => {
    let item = storeValue.find((item) => item.id === id)
    let cart
    if (item.amount === 1) {
      cart = remove(id, storeValue)
    } else {
      cart = toggleAmount(id, storeValue, '-')
    }

    return [...cart]
  })
}

export const addToCart = (product) => {
  cart.update((storeValue) => {
    const { id, title, image, price } = product
    let item = storeValue.find((item) => item.id === id)
    let cart
    if (item) {
      cart = toggleAmount(id, storeValue, '+')
    } else {
      let newItem = { id, title, image, price, amount: 1 }
      cart = [...storeValue, newItem]
    }

    return cart
  })
}

// local storage
function getStorageCart() {
  return localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : []
}

export const setStorageCart = (cartValues) => {
  localStorage.setItem('cart', JSON.stringify(cartValues))
}

export default cart
