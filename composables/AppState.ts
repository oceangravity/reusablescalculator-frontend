import { reactive } from '@nuxtjs/composition-api'

const AppState = reactive<AppState>({
  App: {
    productResponse: {
      count: 0,
      next: '',
      previous: '',
      total_pages: 0,
      results: [],
    },
    TotalPagesByCategory: {}
  }
})

export default AppState
