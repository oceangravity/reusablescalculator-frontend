<template>
  <div ref="widget" class="relative" :style="{ 'z-index': props.zIndex }">
    <slot name="button" :selected="selected" :props="props" :toggle="toggle" :close="close">
      <button type="button" @mousedown="toggle" @blur="close" class="relative h-[34px] w-full bg-white border rounded-sm shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-0 focus:ring-gray-300 focus:border-gray-300 sm:text-sm">
        <span v-if="props.placeholder.length && !selected" class="block truncate text-xs text-gray-400">{{ props.placeholder }}</span>
        <span v-if="selected" class="block truncate text-xs">{{ selected.label }}</span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <img src="@/static/node-arrow.svg" alt="node arrow" width="6" class="rotate-90" />
        </span>
      </button>
    </slot>
    <slot name="list" :items="items" :active="active" :props="props" :select="select">
      <transition leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-show="active" class="overflow-hidden absolute w-full mt-1 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ul role="listbox" tabindex="0" class="overflow-auto py-1 max-h-60 text-base bg-white sm:text-sm">
            <li v-for="item in items" @mousedown="select(item)" :key="item.id" class="hover:bg-gray-100 text-gray-900 cursor-default select-none relative py-2 pl-10 pr-4" role="option" tabindex="-1">
              <span :class="{ 'font-normal text-gray-400': !item.selected, 'font-bold text-gray-400': item.selected }" class="block truncate text-xs">{{ item.label }}</span>
              <span v-if="item.selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
              </span>
            </li>
          </ul>
        </div>
      </transition>
    </slot>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from '@vue/runtime-dom'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from '@nuxtjs/composition-api'

interface Props {
  value: ListBoxItem
  list: any[]
  placeholder?: string
  zIndex?: number
}

const emit = defineEmits(['input', 'previous', 'next'])
const props = withDefaults(defineProps<Props>(), {
  list: () => [],
  placeholder: '',
  zIndex: 50,
})

// refs
const widget = ref<HTMLElement>()
const active = ref(false)
const items = ref<ListBoxItem[]>(props.list.map((item) => ({ ...item, selected: false })))

// computed
const selected = computed(() => find('selected', true))

// DOM
const cords = ref({ x: 0, y: 0 })
if (process.client) {
  window.addEventListener(
    'mousedown',
    (event: MouseEvent) => {
      cords.value = {
        x: event.clientX,
        y: event.clientY,
      }
      active.value && close()
    },
    true
  )
}

// hooks
onMounted(() => {
  addInternalClass()
})

// methods
const addInternalClass = () => {
  nextTick(() => {
    if (widget.value) {
      const ul = widget.value?.querySelector('ul')
      if (ul) {
        ul.classList.add('ts-list-widget-ul')
        const liPool = Array.from(ul.children)
        liPool.forEach((li) => {
          li.classList.add('ts-list-widget-li')
        })
      }
    }
  })
}
const toggle = () => {
  active.value = !active.value
  addInternalClass()
}
const close = () => {
  const clickedElement = document.elementFromPoint(cords.value.x, cords.value.y) as HTMLElement
  const check: boolean = !(clickedElement.classList.contains('ts-list-widget-ul') || !!clickedElement.closest('.ts-list-widget-ul'))
  if (check) active.value = false
}
const find = (property: keyof ListBoxItem, value: any) => items.value[items.value.findIndex((item: ListBoxItem) => item[property] === value)]
const select = (item: ListBoxItem) => {
  const selected = find('selected', true)
  if (selected) {
    selected.selected = false
  }

  const itemFound = find('id', item.id)
  if (itemFound) {
    itemFound.selected = true
    emit('input', item)
  }

  active.value = false
}

props.value && select(props.value)

// watchers
watch(
  () => props.value,
  (item) => {
    item && select(item)
  }
)

watch(
  () => props.list,
  (list) => {
    items.value = list.map((item) => ({ ...item, selected: false }))
  }
)
</script>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Listbox',
})
</script>
