<template>
  <tree :data="categoryResponse" :instance-id="treeId" :open-path="routeCategory">
    <template #root="{ item, props }">
      <div class="flex items-center gap-3 px-2 py-2 bg-[#1592e61a]">
        <img src="@/static/hamburazul.png" width="32" class="w-[42px] h-[42px] border-solid border border-gray-300" alt="" />
        <div @mousedown="openNode(item)" class="text-[15px]" :class="{ 'ts-category-item-root-selected': item.id === routeCategory, 'ts-category-item-root-normal': item.id !== routeCategory }">{{ item.name }}</div>
        <close-menu class="lg:hidden text-3xl cursor-pointer" @mousedown.native.prevent="closeMenuAction"></close-menu>
        <img src="@/static/node-arrow.svg" alt="node arrow" width="10" class="hidden rotate-90" />
      </div>
    </template>
    <template #item="{ item, props }">
      <div v-if="item.level > maxLevels" class="hidden"></div>
      <div v-else-if="item.name" class="relative flex items-center gap-2 bg-transparent pl-1" :class="{ 'gap-1': item.level === 2, 'gap-2': item.level === 1, 'pt-2': item.level === 1 && item.isOpen, 'py-2': item.level === 1 && !item.isOpen, 'py-0': item.level === 3 }" @mousedown="openNode(item)">
        <div v-if="item.level === 1" class="flex justify-center bg-transparent" style="width: 35px; height: 35px">
          <img :src="item.image_url" :alt="item.name" style="min-width: 35px; min-height: 35px" />
        </div>
        <div v-else-if="item.children.length" class="flex justify-center items-center w-4 h-4">
          <img v-if="item.level < maxLevels" src="@/static/node-arrow.svg" alt="node arrow" :class="['transition-all', { 'rotate-90': item.isOpen }]" />
        </div>
        <div v-else-if="!item.children.length" class="flex justify-center w-4 h-4"></div>
        <div v-if="item.level === 1" class="relative flex flex-1 w-full h-[35px]" :class="{ 'ts-level-1-before': !item.isOpen }">
          <div :class="{ 'ts-category-item-selected': item.id === routeCategory, 'ts-category-item-normal': item.id !== routeCategory }">{{ item.name }}</div>
        </div>
        <div v-if="item.level === 2" class="relative flex flex-1 w-full">
          <div :class="{ 'ts-category-item-level-2-selected': item.id === routeCategory || item.isOpen, 'ts-category-item-level-2-normal': item.id !== routeCategory }">{{ item.name }}</div>
        </div>
        <div v-if="item.level === 3" class="relative flex flex-1 w-full">
          <div :class="{ 'ts-category-item-level-3-selected': item.id === routeCategory, 'ts-category-item-level-3-normal': item.id !== routeCategory }">{{ item.name }}</div>
        </div>
      </div>
    </template>
  </tree>
</template>

<script setup lang="ts">
import CloseMenu from '@/components/common/CloseMenu.vue'
import Tree from '@/components/common/TreeRoot.vue'
import useTree from '@/components/common/TreeState'
import { onMounted, ref, useRouter, useRoute, computed, useMeta, watch, useContext, nextTick } from '@nuxtjs/composition-api'
import { useAPI } from '~/composables/API'
import { useUtils } from '~/composables/Utils'
import { useStore } from '~/store/app'

const { localePath } = useContext()

const store = useStore()

// utils
const { slugify } = useUtils()

// router
const route = useRoute()
const router = useRouter()

// computed
const routePage = computed(() => (route.value.params.page ? Number(route.value.params.page.split('_')[1]) : 1))
const routeSearch = computed(() => route.value.query.q)
const routeFilterBy = computed(() => route.value.params.filter)
const routeOrderBy = computed(() => route.value.params.order)
const routeCategory = computed(() => (route.value.params.categorySlug ? Number(route.value.params.categorySlug.split('_')[1]) : 0))
const categoryResponse = computed(() => store.categories)

// refs
const maxLevels = ref(3)
const treeId = ref('categories')
const lastOpened = ref(routeCategory.value)
const category = ref(route.value.params.page ? route.value.params.page.split('_')[1] : 1)
const node = ref(store.getNode(routeCategory.value))

// tree
const { init, open, close, getPath, getNode, openPath, setIndent, instance } = useTree(treeId.value)

setIndent((node: CategoryResponse) => {
  if (node.level === 1) {
    return 'pl-11'
  } else if (node.level === 2) {
    return 'pl-5'
  } else if (node.level >= 3) {
    return 'pl-2'
  }
})

// API
const { API } = useAPI()

// hooks
onMounted(() => {})

// methods
const toogleBanner = (level: number) => {
  const banner = document.querySelector('#main-banner') as HTMLElement

  const offsetHeight = banner.offsetHeight
  banner.style.height = `${offsetHeight}px`

  if (!banner.getAttribute('initialHeight')) {
    banner.setAttribute('initialHeight', `${offsetHeight}px`)
  }

  if (banner && level > 0) {
    setTimeout(() => {
      banner.style.height = `0px`
    }, 1)
  }

  if (banner && level === 0) {
    setTimeout(() => {
      banner.style.height = String(banner.getAttribute('initialHeight'))
    }, 1)
  }
}

const openNode = function (item: CategoryResponse) {
  // close previous path
  if (lastOpened.value && getNode(lastOpened.value)) {
    const lastOpenedPath = getPath(lastOpened.value)
    lastOpenedPath.forEach((item) => {
      close(item)
    })
  }

  // open new path
  openPath(item.id)

  // hide banner if level eq 0
  toogleBanner(item.level)

  lastOpened.value = item.id

  // close Menu
  closeMenuAction()

  window.scrollTo(0, 0)

  router.push(localePath(`/catalogo/${routeFilterBy.value}/${route.value.params.order}/${slugify(item.name)}_${item.id}/page_1${routeSearch.value ? `?q=${routeSearch.value}` : ''}`))
}

const closeMenuAction = () => {
  store.showCategoryMenu = false
}

// watchers
watch(
  () => routeCategory.value,
  (category) => {
    if (!isNaN(category)) {
      const item: CategoryResponse = getNode(Number(category)) as CategoryResponse
      item && openNode(item)
    }
  }
)
</script>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  head: {},
  name: 'CategoryList',
})
</script>
