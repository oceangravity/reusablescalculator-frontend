<template>
  <div class="relative w-full">
    <slot name="button" :open="open" :close="close" :selected="selectedObject"></slot>

    <Transition name="modal">
      <slot name="list" :hidden="hidden" :select="select" :selected="selected" :options="props.options"></slot>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, computed } from "@nuxtjs/composition-api"

interface ItemList {
  id: number
  title?: string
  subtitle?: string
  value?: number | string
}

interface Props {
  options: Array<ItemList>
}

const props = withDefaults(defineProps<Props>(), {
  options: () => []
})

// refs
const hidden = ref(true)
const selected = ref<ItemList>({ id: 0 })

// emits
const emit = defineEmits<{
  (event: "select", value: any): void
}>()

// computed
const selectedObject = computed(() => {
  const options = props.options.filter(item => item.id === selected.value.id)
  return options.length ? options[0] : undefined
})

// methods
const close = () => {
  nextTick(() => {
    hidden.value = true
  })
}

const open = () => {
  hidden.value = !hidden.value
}

const select = (value: any) => {
  close()
  selected.value = value
  emit("select", value)
}
</script>

<style>
.modal-enter-active {
  animation: modal-in 0.5s;
}

.modal-leave-active {
  animation: modal-out 0.5s;
}

@keyframes modal-in {
  0% {
    opacity: 0;
    transform: translateY(-10vh);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes modal-out {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10vh);
  }
}
</style>
