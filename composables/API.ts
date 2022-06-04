import { useAxiosInstance } from './AxiosInstance'
import { ref, useContext } from '@nuxtjs/composition-api'
import { useUtils } from '~/composables/Utils'

const { slugify } = useUtils()

const cancelToken = ref()

export function useAPI() {
  // const { redirect, store } = useContext()

  const { axiosInstance } = useAxiosInstance({
    baseUrl: `${process.env.APIUrl}`,
  })

  axiosInstance.onRequest((config) => {
    // axiosInstance.setToken('function-or-string', 'Bearer')

    cancelToken.value = axiosInstance.CancelToken.source()
    config.cancelToken = cancelToken.value.token
  })

  axiosInstance.onError(() => {
    // const categories = store.getters.categories
    // redirect(`/catalogo/${categories.id}/${slugify(categories.name)}/page/1`)
  })

  const API = {
    cancelPreviousRequest(): void {
      if (cancelToken.value) {
        cancelToken.value.cancel('Cancelled previous request')
      }
    },
    getCategories() {
      return axiosInstance.get(`public_categories/`)
    },
    getProducts(query: ProductsQueryString) {
      return axiosInstance.get(`public_products/`, {
        params: query,
      })
    },
    getProduct(id: number) {
      return axiosInstance.get(`public_products/${id}/?consumption=false`)
    },
  }

  return {
    API,
  }
}
