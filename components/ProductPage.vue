<template>
  <div v-if="visibility" class="h-full">
    <div v-if="$fetchState.pending" class="flex justify-center items-center min-h-[50vh]">
      <LoadingSpinner />
    </div>

    <div v-if="!$fetchState.pending && product">
      <nav class="flex py-4 px-3" aria-label="Breadcrumb">
        <ol class="inline-flex items-center flex-wrap">
          <li v-for="breadcrumb in product.categories">
            <div class="flex items-center">
              <span class="px-1 text-gray-100 select-none pointer-events-none" v-if="breadcrumb.level > 0">/</span>
              <a @mousedown="goToCategory(breadcrumb.id, breadcrumb.name)" class="cursor-pointer text-xs text-blue-400 hover:text-blue-900 hover:underline">{{ breadcrumb.name }}</a>
            </div>
          </li>
        </ol>
      </nav>

      <div class="flex flex-col xl:flex-row gap-8 mb-12 px-2">
        <div class="w-full xl:w-5/12 h-auto min-h-[200px] xl:min-h-[392px] xl:max-h-[392px]">
          <div :class="{ 'border-green-300': isECO }" class="min-w-full h-full border border-black min-h-max" style="content-visibility: auto; min-height: inherit">
            <div v-if="isECO" class="absolute bg-green-300 px-2 py-1 left-0 top-0 text-xs text-white rounded-br">ECO</div>
            <div class="flex flex-col gap-2 items-center h-full justify-center p-4" style="min-height: inherit">
              <div class="flex justify-center items-center relative max-h-full">
                <image-loader :src="product.image_url" :alt="product.name" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full xl:w-7/12">
          <div class="flex flex-col flex-1 mb-6">
            <h1 class="mb-4 text-[18px] leading-none">{{ product.name }}</h1>
            <p class="h-full flex-1 mb-4 text-[14px]">{{ product.extra_info.description }}</p>
          </div>

          <div class="flex flex-wrap gap-y-8">
            <div class="flex w-full xl:w-8/12 flex-col">
              <div class="flex mb-16">
                <span class="flex gap-2 text-[14px]">
                  <span>Código:</span>
                  <span>{{ product.external_id }}</span>
                </span>
              </div>

              <div class="flex items-center gap-4">
                <a :href="product.doc_technical_url" target="_blank" v-if="product.doc_technical_url">
                  <div class="flex gap-2 justify-center items-center px-6 py-2 bg-white border border-[#00adfc] cursor-pointer">
                    <img src="@/static/download.svg" alt="Descargar Ficha Técnica" />
                    <span>Ficha Técnica</span>
                  </div>
                </a>

                <a :href="product.doc_security_url" target="_blank" v-if="product.doc_security_url">
                  <div class="flex gap-2 justify-center items-center px-6 py-2 bg-white border border-[#00adfc] cursor-pointer">
                    <img src="@/static/download.svg" alt="Descargar Ficha Seguridad" />
                    Ficha de Seguridad
                  </div>
                </a>
              </div>
            </div>
            <div class="flex w-full xl:w-4/12">
              <div class="flex w-full flex-col bg-gray-100 px-4 py-4 gap-2 rounded">
                <div class="flex flex-col gap-4 text-sm pb-2">
                  <img width="42" src="@/static/budget-question.svg" alt="Solicitar Presupuesto" />
                  <span>¿Quieres solicitar un presupuesto de este producto?</span>
                </div>
                <div class="flex justify-center items-center">
                  <div @mousedown="showBudgetModal" class="flex gap-2 justify-center items-center text-[#ff8054] px-4 py-2 bg-white rounded border cursor-pointer">PEDIR PRESUPUESTO</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="product && product.extra_info && product.extra_info.usage" class="mb-12">
        <h2 class="text-base font-medium mb-4">Modo de Empleo</h2>
        <p class="text-[14px]">{{ product.extra_info.usage }}</p>
      </div>

      <div v-if="product && product.extra_info && product.extra_info.dosage" class="mb-12">
        <h2 class="text-base font-medium mb-4">Dosificación</h2>
        <p class="text-[14px]">{{ product.extra_info.dosage }}</p>
      </div>

      <div v-if="product && product.extra_safety_symbols && product.extra_safety_symbols.length && product.extra_safety_symbols.filter((item) => item.symbol_type_external_id === '2').length" class="mb-12">
        <h2 class="text-base font-medium mb-4">Símbolos de seguridad</h2>
        <ul class="text-[14px] flex flex-col gap-4">
          <li v-for="item in product.extra_safety_symbols" v-show="item.symbol_type_external_id === '2'" class="flex items-center gap-4">
            <template v-if="item.symbol_type_external_id === '2'">
              <img :src="item.image_url" alt="" />
              <span>{{ item.name }}</span>
            </template>
          </li>
        </ul>
      </div>

      <div v-if="product && product.extra_safety_symbols && product.extra_safety_symbols.length && product.extra_safety_symbols.filter((item) => item.symbol_type_external_id === '1').length" class="mb-12">
        <h2 class="text-base font-medium mb-4">Señales de Obligación</h2>
        <ul class="text-[14px] flex flex-col gap-4">
          <li v-for="item in product.extra_safety_symbols" v-show="item.symbol_type_external_id === '1'" class="flex items-center gap-4">
            <template v-if="item.symbol_type_external_id === '1'">
              <img :src="item.image_url" alt="" />
              <span>{{ item.name }}</span>
            </template>
          </li>
        </ul>
      </div>

      <div v-if="product && product.related_products">
        <h2 class="text-[18px] font-medium mb-4 text-center">También te puede interesar</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-[#f5f5f5] p-6 gap-y-4 gap-x-20">
          <product-item @mousedown.native="goToProduct(item)" :item="item" v-for="item in product.related_products" :key="item.id"></product-item>
        </div>
      </div>
    </div>
    <budget-modal :show.sync="budgetModalState" :product="product"></budget-modal>
  </div>
</template>

<script setup lang="ts">
import BudgetModal from '@/components/BudgetModal.vue'
import ImageLoader from '@/components/common/ImageLoader.vue'
import LoadingSpinner from '~/components/common/LoadingSpinner'
import ProductItem from '~/components/ProductItem.vue'
import { useAPI } from '~/composables/API'
import { computed, ref, useFetch, useRoute, useRouter, useContext, useMeta, onMounted, nextTick, watch } from '@nuxtjs/composition-api'
import { useUtils } from '~/composables/Utils'
import { useStore } from '~/store/app'
const store = useStore()

const { API } = useAPI()
const route = useRoute()
const router = useRouter()
const { slugify } = useUtils()
const { i18n, localePath } = useContext()

const routeId = computed(() => (route.value.params.id ? Number(route.value.params.id.split('_')[1]) : -1))
const product = ref<ProductResponse>()
const isECO = computed(() => product.value?.extra_info?.is_eco)
const visibility = computed(() => store.productVisibility)
const budgetModalState = ref(false)
const routeName = computed(() => (route.value.params.id ? Number(route.value.params.id.split('_')[0]) : ''))

const checkItem = (item: string) => {
  const blackList = ['box_type', 'box', 'packaging_quantity', 'packaging_unit', 'applications', 'environmental_notes', 'model', 'designation', 'packaging']
  return blackList.includes(item)
}

const { $fetch } = useFetch(async () => {
  if (!isNaN(routeId.value) && store.lastProductRoutePath !== route.value.fullPath && route.value && route.value.name?.startsWith('p-id')) {
    store.productVisibility = true
    const { data, status } = await API.getProduct(routeId.value)
    if (status === 200) {
      product.value = data as ProductResponse
      generateSEO()
    }
    store.setLastProductRoutePath(route.value.fullPath)
  }
})

const generateSEO = () => {
  // SEO
  store.SEO.title = String(product.value?.name)
  store.SEO.meta = []
  store.SEO.meta.push({ hid: 'og:title', property: 'og:title', content: product.value?.name })
  store.SEO.meta.push({ hid: 'description', property: 'description', content: product.value?.extra_info?.description ? product.value?.extra_info?.description : store.SEO.description })
  store.SEO.meta.push({ hid: 'og:description', property: 'og:description', content: product.value?.extra_info?.description ? product.value?.extra_info?.description : store.SEO.description })
}

useMeta(() => ({ title: store.SEO.title, meta: store.SEO.meta }))

const goToProduct = (item: RelatedProduct) => {
  window.scrollTo(0, 0)
  router.push(localePath(`/p/${slugify(item.name)}_${item.id}`))
}

const goToCategory = (id: number, name: string) => {
  router.push(localePath(`/catalogo/todos/alfabeticamente/${slugify(name)}_${id}/page_1`))
}

const showBudgetModal = () => {
  budgetModalState.value = true
}

onMounted(async () => {
  nextTick(() => {
    // store.visibility = true
  })
})

watch(
  () => route.value,
  () => {
    if (!isNaN(routeId.value)) {
      $fetch()
    }
  }
)
</script>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  head: {},
  layout: 'default',
})
</script>
