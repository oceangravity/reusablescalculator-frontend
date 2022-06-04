<template>
  <div v-show="visibility">
    <div class="transition-all bg-[#fafafa] mb-14 border-b border-black">
      <nav v-if="categoryPath" class="flex pb-4 px-4" aria-label="Breadcrumb">
        <ol class="inline-flex items-center flex-wrap h-8">
          <li v-for="(breadcrumb, level) in categoryPath">
            <div v-if="breadcrumb.id === routeCategory" class="flex items-center">
              <span class="px-1 text-gray-100 select-none pointer-events-none" v-if="level > 0">/</span>
              <span class="text-xs">{{ breadcrumb.name }}</span>
            </div>
            <div v-else class="flex items-center cursor-pointer">
              <span class="px-1 text-gray-100 select-none pointer-events-none" v-if="level > 0">/</span>
              <a @mousedown="goToCategory(breadcrumb.id, breadcrumb.name)" class="text-xs text-blue-400 hover:text-blue-900 hover:underline">{{ breadcrumb.name }}</a>
            </div>
          </li>
        </ol>
      </nav>

      <h1 v-if="currentCategory" class="px-4 pb-2 text-[1.125rem]">{{ currentCategory.name }}</h1>

      <div v-if="fetchState.pending" class="flex justify-center items-center min-w-full" style="height: 50vh">
        <div class="flex justify-center">
          <LoadingSpinner />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-y-4 px-4 pb-4">
        <div v-if="fetchState.error" class="box">Error</div>

        <div v-else-if="fetchState.pending" v-for="item in fakeProducts" :key="item" class="min-w-full h-[332px] border-2 rounded-md opacity-0"></div>

        <product-item @open-budget-modal="showBudgetModal" v-show="productResponse.results.length && !fetchState.pending" @mousedown.native="goToProduct($event, item)" :item="item" v-for="item in productResponse.results" :key="item.id"></product-item>
      </div>

      <div v-if="productResponse.results.length === 0 && !fetchState.pending" class="min-w-full h-[332px]">
        <div class="flex items-center h-full justify-center p-4">
          <p class="font-bold text-gray-400">No se han encontrado productos.</p>
        </div>
      </div>
    </div>

    <div>
      <pagination @click.native="goToTop" v-if="!disabled && productResponse.total_pages > 1" :length="productResponse.total_pages" :total-visible="7" v-model="page">
        <template #prev-icon>
          <span class="fa fa-chevron-left">Anterior</span>
        </template>
        <template #next-icon>
          <span class="fa fa-chevron-right">Siguiente</span>
        </template>
      </pagination>
    </div>
    <budget-modal :show.sync="budgetModalState" :product="product"></budget-modal>
  </div>
</template>

<script setup lang="ts">
import BudgetModal from '@/components/BudgetModal.vue'
import Pagination from '~/components/common/Pagination.vue'
import ProductItem from '~/components/ProductItem.vue'
import LoadingSpinner from '~/components/common/LoadingSpinner.vue'

import { useFetch, ref, reactive, useRoute, computed, onMounted, nextTick, watch, useRouter, useContext, useMeta } from '@nuxtjs/composition-api'
import { useAPI } from '~/composables/API'
import { useUtils } from '~/composables/Utils'
import { useStore } from '~/store/app'
import useTree from '~/components/common/TreeState'

interface Product {
  name: string
  id: number
}

const { localePath } = useContext()

const store = useStore()

// utils
const { slugify, getDomain } = useUtils()

const { getNode, getPathFull } = useTree('categories')

// props
interface Props {
  query: ProductsQueryString
}

const props = withDefaults(defineProps<Props>(), {})

// router
const route = useRoute()
const router = useRouter()

// computed
const visibility = computed(() => store.categoryVisibility)
const categoryResponse = computed(() => store.categories)
const routeSearch = computed(() => route.value.query.q)
const routePage = computed(() => (route.value.params.page ? Number(route.value.params.page.split('_')[1]) : 1))
const routeFilter = computed(() => route.value.params.filter)
const routeOrder = computed(() => route.value.params.order)
const routeCategory = computed(() => (route.value.params.categorySlug ? Number(route.value.params.categorySlug.split('_')[1]) : -1))
const routeCategorySlug = computed(() => (route.value.params.categorySlug ? route.value.params.categorySlug.split('_')[0] : ''))
const routeName = computed(() => route.value.name)
const productResponse = computed(() => store.productsResponse as ProductsResponse)
const categoryPath = computed({
  get() {
    if (routeCategory.value !== -1) {
      const path: TreeNodeInterface[] = JSON.parse(JSON.stringify(getPathFull(routeCategory.value)))
      return path.reverse().map((item: TreeNodeInterface) => ({ id: item.id, name: item.name }))
    } else {
      return []
    }
  },
  set() {},
})

const currentCategory = computed({
  get() {
    if (routeCategory.value !== -1) {
      return JSON.parse(JSON.stringify(getNode(routeCategory.value)))
    } else {
      return undefined
    }
  },
  set() {},
})

// refs
const product = reactive({ name: '', id: -1 } as Product)
const internalQuery = ref(props.query)
const page = ref(Number(routePage.value))
const disabled = ref(true)
const orderBy = ref<OrderBy[]>(store.orderBy)
const budgetModalState = ref(false)

const showBudgetModal = (currentProduct: Product) => {
  product.name = currentProduct.name
  product.id = currentProduct.id
  budgetModalState.value = true
  console.log(product)
}

// API
const { API } = useAPI()

// refs
const fakeProducts = ref(new Array(Number(100)))

// fetch
const { fetchState, $fetch } = useFetch(async () => {
  if (store.lastCategoryRoutePath !== route.value.fullPath && route.value && route.value.name?.startsWith('catalogo-filter-order-categorySlug')) {
    store.categoryVisibility = true
    await API.cancelPreviousRequest()
    const { data, status } = await API.getProducts(internalQuery.value)
    if (status === 200) {
      store.setProductsResponse(data)
      generateSEO()
    }
    store.setLastCategoryRoutePath(route.value.fullPath)
  }
})

// hooks
onMounted(async () => {
  nextTick(() => {
    disabled.value = false
  })
})

// methods
const goToCategory = (id: number, name: string) => {
  router.push(localePath(`/catalogo/todos/alfabeticamente/${slugify(name)}_${id}/page_1`))
}

const goToProduct = (event: Event, item: ProductResult) => {
  router.push(localePath(`/p/${slugify(item.name)}_${item.id}`))
}

const goToTop = (): void => {
  window.scroll({
    top: 0,
    left: 0,
  })
}

const generateSEO = () => {
  /**
   * SEO
   */

  // title
  store.SEO.title = categoryPath.value[categoryPath.value.length - 1].name

  // ldJson
  store.ldJson.itemListElement = store.productsResponse.results.map((item: any, index: number) => {
    return {
      '@type': 'ListItem',
      position: index + 1,
      url: `${getDomain()}/catalogo/todos/alfabeticamente/${slugify(item.name)}_${item.id}/page_1`,
    }
  })
  store.ldJson.numberOfItems = store.productsResponse.count
  store.ldJson.mainEntityOfPage['@id'] = `${getDomain()}${route.value.fullPath}`
  store.ldJson.mainEntityOfPage.breadcrumb.itemListElement = categoryPath.value.map((item, index) => {
    return {
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': `${getDomain()}/catalogo/todos/alfabeticamente/${slugify(item.name)}_${item.id}/page_1`,
        name: `${getDomain()}`,
      },
    }
  })

  store.SEO.description = store.SEO.description.replace('CURRENT_CATEGORY_NAME', currentCategory.value.name)

  store.ldJson.mainEntityOfPage.headline = String(store.SEO.title)
  store.ldJson.mainEntityOfPage.description = String(store.SEO.description)
  store.ldJson.mainEntityOfPage.Specialty = String(store.SEO.title)
  store.ldJson.mainEntityOfPage.publisher = {
    '@type': 'Organization',
    name: `${getDomain()}`,
    url: `${getDomain()}`,
  }
  store.SEO.scripts = []
  store.SEO.scripts.push({ type: 'application/ld+json', json: store.ldJson })

  // meta
  store.SEO.meta = []
  store.SEO.meta.push({ hid: 'og:title', property: 'og:title', content: `${store.SEO.title}` })
  store.SEO.meta.push({ hid: 'description', property: 'description', content: store.SEO.description })
  store.SEO.meta.push({ hid: 'og:description', property: 'og:description', content: store.SEO.description })
  store.SEO.meta.push({ hid: 'og:type', property: 'og:type', content: `article` })
  store.SEO.meta.push({ hid: 'og:locate', property: 'og:locate', content: `es_ES` })
  store.SEO.meta.push({ hid: 'og:site_name', property: 'og:site_name', content: `${getDomain()}${route.value.fullPath}` })
  store.SEO.meta.push({ hid: 'og:url', property: 'og:url', content: `${getDomain()}${route.value.fullPath}` })
  store.SEO.meta.push({ name: 'robots', content: `index, follow` })

  // link
  store.SEO.links = []
  store.SEO.links.push({ rel: 'canonical', href: `${getDomain()}${route.value.fullPath}` })
}

useMeta(() => ({ link: store.SEO.links, script: store.SEO.scripts, meta: store.SEO.meta, title: store.SEO.title }))

// watchers
watch(
  () => page.value,
  (pageValue) => {
    if (!isNaN(pageValue) && route.value.name?.startsWith('catalogo-filter-order-categorySlug')) {
      nextTick(() => router.push(localePath(`/catalogo/${routeFilter.value}/${routeOrder.value}/${routeCategorySlug.value}_${routeCategory.value}/page_${pageValue || 1}${routeSearch.value ? `?q=${routeSearch.value}` : ''}`)))
    }
  }
)

watch(
  () => routePage.value,
  (pageValue) => {
    page.value = Number(pageValue)
    internalQuery.value.page = Number(pageValue)
    $fetch()
  }
)

watch(
  () => props.query,
  () => {
    $fetch()
  },
  { deep: true }
)

watch(
  () => store.ldJson,
  () => {
    $fetch()
  },
  { deep: true, immediate: true }
)
</script>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  head: {},
})
</script>
