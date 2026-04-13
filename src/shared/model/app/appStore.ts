import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isInitialized = ref(false)

  function setInitialized(value: boolean) {
    isInitialized.value = value
  }

  return {
    isInitialized,
    setInitialized,
  }
})

