<template>
  <product-list :query="query"></product-list>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, useRoute, useRouter, watch } from '@nuxtjs/composition-api'
import ProductList from '~/components/ProductList.vue'
import { useStore } from '~/store/app'
import { useUtils } from '~/composables/Utils'

const store = useStore()

// utils
const { getSlugToOrder } = useUtils()

// router
const route = useRoute()
const router = useRouter()

// computed
const visibility = computed(() => store.categoryVisibility)
const routePage = computed(() => (route.value.params.page ? Number(route.value.params.page.split('_')[1]) : 1))
const routeSearch = computed(() => route.value.query.q)
const routeFilter = computed(() => route.value.params.filter)
const routeOrder = computed(() => getSlugToOrder(route.value.params.order))
const routeCategory = computed(() => (route.value.params.categorySlug ? Number(route.value.params.categorySlug.split('_')[1]) : -1))
const routeCategorySlug = computed(() => (route.value.params.categorySlug ? route.value.params.categorySlug.split('_')[0] : ''))
const isOutlet = computed(() => (routeFilter.value === 'outlet' ? 'True' : ''))
const isEco = computed(() => (routeFilter.value === 'eco' ? 'True' : ''))
const isCovid = computed(() => (routeFilter.value === 'covid' ? 'True' : ''))
const ordering = computed(() => {
  const order = store.getOrderBy(routeOrder.value as OrderByKey)
  let final: string = ''

  switch (routeOrder.value as OrderByKey) {
    case 'most_consumed':
    case 'less_consumed':
    case 'by_family':
      final = `-has_image,${order},name`
      break
    case 'alphabetically':
      final = `-has_image,name`
      break
    case 'elastic_relevance':
      final = `elastic_relevance`
      break
  }
  return final
})
//
// refs
const disabled = ref(true)
const query = reactive<ProductsQueryString>({
  search: routeSearch.value ? String(routeSearch.value) : '',
  page: Number(routePage.value),
  category: Number(routeCategory.value),
  complete: 'True',
  only_usual_products: false,
  ordering: ordering.value,
  consumption: false,
  is_outlet: isOutlet.value,
  is_eco: isEco.value,
  is_covid: isCovid.value,
  add_extra_products: 'True',
})

// hooks
onMounted(async () => {
  nextTick(() => {
    disabled.value = false
  })
})

// watch
watch(
  () => route.value.query.q,
  (q) => {
    query.search = q ? String(q) : ''
  }
)

watch(
  () => route.value,
  () => {
    if (!isNaN(routeCategory.value) && routeCategory.value !== -1) {
      query.search = routeSearch.value ? String(routeSearch.value) : ''
      query.page = Number(routePage.value)
      query.category = Number(routeCategory.value)
      query.complete = 'True'
      query.only_usual_products = false
      query.ordering = ordering.value
      query.consumption = false
      query.is_outlet = isOutlet.value
      query.is_eco = isEco.value
      query.is_covid = isCovid.value
      query.add_extra_products = 'True'
    }
  }
)
</script>
