<template>
  <ul ref="container" :class="['pagination', { disabled: disabled }]">
    <li ref="navPrev">
      <button :class="['pagination-navigation', { disabled: isValueFirst }]" v-on="isValueFirst ? {} : { click: goPrevious }">
        <slot name="prev-icon">$prev</slot>
      </button>
    </li>

    <li v-for="(item, index) in items" :key="'paging_' + index">
      <span v-if="isNaN(Number(item))" class="pagination-more">{{ item }}</span>

      <button v-else type="button" :class="['pagination-item', { active: item === value }]" @click="$emit('input', item)">{{ item }}</button>
    </li>

    <li ref="navNext">
      <button type="button" :class="['pagination-navigation', { disabled: isValueLast }]" v-on="isValueLast ? {} : { click: goNext }">
        <slot name="next-icon">$next</slot>
      </button>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from '@vue/runtime-dom'
import { computed, onMounted, onUnmounted, ref } from '@nuxtjs/composition-api'
import { useUtils } from '@/composables/Utils'
const { debounce } = useUtils()

const emit = defineEmits(['input', 'previous', 'next'])
const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  length: {
    type: Number,
    default: 0,
    validator: (val: number) => val % 1 === 0,
  },
  // when number of page buttons exceeds the parent container,
  // it will truncate the buttons automatically
  totalVisible: Number,
  disabled: Boolean,
})

const maxButtons = ref(0)
const container = ref()
const navNext = ref()

// computed
const isValueLast = computed((): boolean => props.value >= props.length)
const isValueFirst = computed((): boolean => props.value <= 1)
const items = computed((): any[] => {
  const maxLength = props.totalVisible && props.totalVisible > maxButtons.value ? maxButtons.value : props.totalVisible || maxButtons.value

  if (props.length <= maxLength || maxLength < 1) {
    return getRange(1, props.length)
  }

  const even = maxLength % 2 === 0 ? 1 : 0
  const left = Math.floor(maxLength / 2)
  const right = props.length - left + 1 + even

  if (props.value > left && props.value < right) {
    const start = props.value - left + 2
    const end = props.value + left - 2 - even

    return [1, '...', ...getRange(start, end), '...', props.length]
  } else if (props.value === left) {
    const end = props.value + left - 1 - even

    return [...getRange(1, end), '...', props.length]
  } else if (props.value === right) {
    const start = props.value - left + 1

    return [1, '...', ...getRange(start, props.length)]
  } else {
    return [...getRange(1, left), '...', ...getRange(right, props.length)]
  }
})

// methods
const goNext = (e: Event) => {
  e.preventDefault()
  emit('input', props.value + 1)
  emit('next')
}

const goPrevious = (e: Event) => {
  e.preventDefault()
  emit('input', props.value - 1)
  emit('previous')
}

const getRange = (from: number, to: number): any[] => {
  const range = []

  from = from > 0 ? from : 1

  for (let i = from; i <= to; i++) {
    range.push(i)
  }

  return range
}

const setMaxButtons = () => {
  const containerWidth = container.value && container.value.parentElement ? container.value.parentElement.clientWidth : window.innerWidth

  const navButton = (navNext.value as HTMLElement)?.getBoundingClientRect()

  // width of the items considering navItem.height = item.width
  const navItemsWidth = navButton.width * 2

  maxButtons.value = Math.floor((containerWidth - navItemsWidth) / navButton.height)
}

const debouncedOnResize = debounce(() => {
  setMaxButtons()
}, 10)

// hooks
onMounted(() => {
  setMaxButtons()

  window.addEventListener('resize', debouncedOnResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', debouncedOnResize)
})
</script>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'pagination',
})
</script>

<style lang="scss" scoped>
$theme: (
  'background': white,
  'foreground': #dadee1,
  'primary': #eff3f6,
);

$size: (
  'font': 14px,
  'x': 50px,
  'y': 34px,
);

// COMPONENT

.pagination-item,
.pagination-navigation,
.pagination-more {
  height: map-get($size, 'y');
  margin: 0.3rem;
  font-size: map-get($size, 'font');
  color: map-get($theme, 'foreground');
}

.pagination-item,
.pagination-navigation {
  background-color: map-get($theme, 'background');
  border-radius: 0;
  border: 1px solid #dadee1;
  transition-property: opacity, color, background-color;
  transition-duration: 160ms;
  transition-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1);
}

.pagination-item {
  padding: 0 5px;

  &.active {
    background-color: #eff3f6 !important;
    color: #dadee1 !important;
    border-color: #eff3f6 !important;
  }
}

.pagination-navigation {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  text-decoration: none;

  &.disabled {
    //opacity: 0.6;
    cursor: default;
  }

  &:hover:not(.disabled),
  &:focus:not(.disabled) {
    background-color: map-get($theme, 'background');
  }

  &:active:not(.disabled) {
    background-color: map-get($theme, 'background');
  }
}

.pagination-more {
  display: inline-flex;
  align-items: flex-end;
  justify-content: center;
}

.pagination {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  width: 100%;
  margin: 0;
  padding-left: 0;
  list-style-type: none;
}

// LAYOUT

.container {
  margin: 0 auto;
  padding: 0 1rem 50px;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;

  input {
    width: 60px;
    margin-left: 0.3rem;
    margin-right: 1.5rem;
  }
}

.stage-container {
  padding: 10px 0;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.pagination li {
  margin: 0 2px;
  display: inline-block;
}

.pagination li a,
.pagination li button {
  float: none;
  color: #494f58;
  font-size: 14px;
  border-color: #dadee1;
  min-width: 54px;
  display: block;
  padding: 0 10px;
}

.pagination li:first-child a,
.pagination li:first-child span,
.pagination li:last-child a,
.pagination li:last-child span {
  border-radius: 0;
  -moz-border-radius: 0;
  -webkit-border-radius: 0;
}

.pagination li.active button,
.pagination li.active span {
  background-color: #eff3f6 !important;
  color: #dadee1 !important;
  border-color: #eff3f6 !important;
}

.pagination > li > button:hover {
  z-index: 2;
  color: #23527c;
  background-color: #eee;
  border-color: #ddd;
}
</style>
