import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'token',
  () => {
    // const token = ref('')
    const userInfo = ref({})

    return { userInfo}
  },
  {
    persist: true
  }
)
