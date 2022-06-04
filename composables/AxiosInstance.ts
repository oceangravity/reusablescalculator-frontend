import { useContext } from '@nuxtjs/composition-api'

export function useAxiosInstance(options: { baseUrl: string }) {
  const { $axios } = useContext()

  const axiosInstance = $axios.create({
    headers: {},
  })

  axiosInstance.setBaseURL(options.baseUrl)

  return {
    axiosInstance,
  }
}
