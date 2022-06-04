<template>
  <select-box :options="store.usedDishWasher" @select="select">
    <template #button="{ open, close, selected }">
      <button @mousedown="open" @blur="close" class="z-10 flex justify-start w-1/3 cursor-pointer border bg-white focus:ring-2 focus:outline-none focus:ring-blue-300 rounded text-sm pl-1 pr-2 py-1 text-center inline-flex items-center" type="button">
        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
        <span class="pl-4 truncate"> {{ selected && selected.title }} </span>
      </button>
    </template>

    <template #list="{ select, selected, hidden, options }">
      <Transition name="modal">
        <div v-if="!hidden" class="absolute overflow-hidden mt-2 z-20 bg-white divide-y divide-gray-100 rounded shadow w-auto block">
          <div v-for="item in options" :key="item.id" @mousedown="select(item)" :class="{ 'bg-gray-100': item.id === selected.id }" class="flex flex-col gap-1 overflow-hidden hover:bg-gray-100 cursor-pointer px-4 py-3 text-sm text-gray-900">
            <div v-html="item.title"></div>
            <div v-if="item.subtitle" v-html="item.subtitle" class="text-xs"></div>
          </div>
        </div>
      </Transition>
    </template>
  </select-box>
</template>

<script setup lang="ts">
import SelectBox from "@/components/common/SelectBox.vue"
import { useStore } from '~/store/app'

const store = useStore()

// methods
const select = (selected: ItemList) => {
  store.calculator.usedDishWasher = selected
}
</script>

