import { writable } from 'svelte/store'

const globalStore = writable({
  sidebar: false,
  cart: false,
  alert: false,
  alertText: 'default alert',
  alertDanger: false,
})

const store = {
  subscribe: globalStore.subscribe,
  toggle: (item, value) => {
    globalStore.update((storeValues) => {
      return { ...storeValues, [item]: value }
    })
  },
  toggleAlert: (value, alertText = 'default', alertDanger = false) => {
    globalStore.update((storeValues) => {
      return {
        ...storeValues,
        alert: value,
        alertText,
        alertDanger,
      }
    })
  },
}

export default store
