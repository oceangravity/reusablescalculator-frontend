<template>
  <div class="w-full">
    <div class="relative min-h-[36px] z-10 border-2 border-gray-200 rounded-md">
      <div class="flex items-center">
        <div class="w-3/12">
          <list-box :list="allCategories" v-model="categorySelected">
            <template #button="{ toggle, close, selected, props }">
              <button type="button" @mousedown="toggle" @blur="close" class="relative min-h-[32px] w-full bg-white pl-3 pr-10 py-2 rounded-l-md border-r-2 text-left cursor-default focus:outline-none focus:ring-0 focus:ring-gray-300 focus:border-gray-300 sm:text-sm">
                <span v-if="props.placeholder.length && !selected" class="block truncate text-xs text-gray-400">{{ props.placeholder }}</span>
                <span v-if="selected" class="block truncate text-xs">{{ selected.label }}</span>
                <span class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <img src="@/static/node-arrow.svg" alt="node arrow" width="6" class="rotate-90" />
                </span>
              </button>
            </template>
            <template #list="{ items, active, select, props }">
              <transition leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <ul v-show="active" role="listbox" tabindex="0" class="absolute w-full py-1 mt-1.5 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  <li v-for="item in items" @mousedown="select(item)" :key="item.id" class="hover:bg-gray-100 text-gray-900 cursor-default select-none relative py-2 pl-10 pr-4" role="option" tabindex="-1">
                    <span :class="{ 'font-normal text-gray-400': !item.selected, 'font-bold text-gray-400': item.selected }" class="block truncate text-xs">{{ item.label }}</span>
                    <span v-if="item.selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </span>
                  </li>
                </ul>
              </transition>
            </template>
          </list-box>
        </div>
        <div class="flex flex-1">
          <input v-model="query" @keydown.enter="doSearch" autocomplete="off" class="bg-white w-full h-8 pl-3 pr-1 text-xs focus:outline-none" type="search" name="search" placeholder="Search" />
          <button @mousedown="doSearch" type="submit" class="flex justify-center items-center bg-white rounded-r-md px-3">
            <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 56.966 56.966" xml:space="preserve" width="512px" height="512px">
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ListBox from '~/components/common/Listbox.vue'
import { computed, ref, useContext, useRoute, useRouter, watch } from '@nuxtjs/composition-api'
import { useUtils } from '~/composables/Utils'
import { useStore } from '~/store/app'

const { localePath } = useContext()

const store = useStore()

// utils
const { slugify, encodeBase64, decodeBase64 } = useUtils()

// router
const route = useRoute()
const router = useRouter()

// refs
const query = ref()
const allCategories = ref<CategoryItem[]>(store.allCategories)
const categorySelected = ref<CategoryItem>(store.allCategories[0])
const routePage = computed(() => (route.value.params.page ? Number(route.value.params.page.split('_')[1]) : 1))
const routeFilter = computed(() => route.value.params.filter)
const routeSearch = computed(() => route.value.query.q)

// methods
const doSearch = () => {
  // TODO: I need to ask about elastic_relevance
  let newSearch = query.value.length ? encodeBase64(query.value) : '-'
  router.push(localePath(`/catalogo/${newSearch}/${categorySelected.value.id}/${routeFilter.value}/elastic_relevance/${slugify(categorySelected.value.label)}/page/${routePage.value}`))
}

// watch
watch(
  () => query.value,
  (query) => {
    if (!query.length) {
      doSearch()
    }
  }
)

watch(
  () => routeSearch.value,
  (searchString) => {
    if (searchString === '-') {
      query.value = ''
    } else {
      query.value = searchString
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
