<template>
  <div class="px-4 py-3 flex flex-wrap justify-end gap-4 bg-[#fafafa] flex-col lg:flex-row">
    <div class="flex gap-2 items-center">
      <span class="text-xs min-w-[80px] text-right">Ver Productos:</span>

      <div class="w-full lg:w-56">
        <list-box :list="filterBy" v-model="filterBySelected" :z-index="59">
          <template #list="{ items, active, select, props }">
            <transition leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
              <div v-show="active" class="overflow-hidden absolute w-full mt-2 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <ul role="listbox" tabindex="0" class="overflow-auto py-1 max-h-[calc(70vh)] text-base bg-white sm:text-sm">
                  <li v-for="item in items" @mousedown="select(item)" :key="item.id" class="hover:bg-gray-100 text-gray-900 cursor-default select-none relative py-2 pl-2 pr-4" role="option" tabindex="-1">
                    <span :class="{ 'font-normal text-gray-400': !item.selected, 'font-bold text-gray-400': item.selected }" class="block truncate text-xs">{{ item.label }}</span>
                  </li>
                </ul>
              </div>
            </transition>
          </template>
        </list-box>
      </div>
    </div>
    <div class="flex gap-2 items-center">
      <span class="text-xs min-w-[80px] text-right">Ordernar por:</span>

      <div class="w-full lg:w-56">
        <list-box :list="orderBy" v-model="orderBySelected">
          <template #list="{ items, active, select, props }">
            <transition leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
              <div v-show="active" class="overflow-hidden absolute w-full mt-2 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <ul role="listbox" tabindex="0" class="overflow-auto py-1 max-h-[calc(70vh)] text-base bg-white sm:text-sm">
                  <li v-for="item in items" @mousedown="select(item)" :key="item.id" class="hover:bg-gray-100 text-gray-900 cursor-default select-none relative py-2 pl-2 pr-4" role="option" tabindex="-1">
                    <span :class="{ 'font-normal text-gray-400': !item.selected, 'font-bold text-gray-400': item.selected }" class="block truncate text-xs">{{ item.label }}</span>
                  </li>
                </ul>
              </div>
            </transition>
          </template>
        </list-box>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ListBox from '~/components/common/Listbox.vue'
import { computed, ref, useContext, useRoute, useRouter, watch } from '@nuxtjs/composition-api'
import { useStore } from '~/store/app'
import { useUtils } from '~/composables/Utils'

const { localePath } = useContext()

const store = useStore()

// utils
const { getFilterToSlug, getSlugToFilter, getOrderToSlug, getSlugToOrder } = useUtils()

// router
const route = useRoute()
const router = useRouter()

// computed
const routePage = computed(() => (route.value.params.page ? Number(route.value.params.page.split('_')[1]) : 1))
const routeSearch = computed(() => route.value.query.q)
const routeFilter = computed(() => getSlugToFilter(route.value.params.filter))
const routeOrder = computed(() => getSlugToOrder(route.value.params.order))
const routeCategorySlug = computed(() => route.value.params.categorySlug)

// refs
const filterBy = ref<FilterBy[]>(store.filterBy)
const filterBySelected = ref<FilterBy>(store.getFilterBy(routeFilter.value as FilterByValue))
const orderBy = ref<OrderBy[]>(store.orderBy)
const orderBySelected = ref<OrderBy>(store.getOrderBy(routeOrder.value as OrderByKey))

// watch
watch(
  () => filterBySelected.value,
  (filter) => {
    if (filter && routeCategorySlug.value) {
      router.push(localePath(`/catalogo/${getFilterToSlug(filter.value)}/${getOrderToSlug(routeOrder.value)}/${routeCategorySlug.value}/page_1${routeSearch.value ? `?q=${routeSearch.value}` : ''}`))
    }
  }
)

watch(
  () => orderBySelected.value,
  (order) => {
    if (order && routeCategorySlug.value) {
      router.push(localePath(`/catalogo/${getFilterToSlug(routeFilter.value)}/${getOrderToSlug(order.key)}/${routeCategorySlug.value}/page_1${routeSearch.value ? `?q=${routeSearch.value}` : ''}`))
    }
  }
)

watch(
  () => routeFilter.value,
  (filter) => {
    if (filter) {
      filterBySelected.value = store.getFilterBy(filter as FilterByValue)
    }
  }
)

watch(
  () => routeOrder.value,
  (order) => {
    if (order) {
      orderBySelected.value = store.getOrderBy(order as OrderByKey)
    }
  }
)
</script>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  head: {},
})
</script>
