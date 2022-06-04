<template>
  <div>
    <Transition name="modal-wrapper">
      <div v-if="props.show" :class="[props.justifyContent, props.alignItems]" class="overflow-y-auto bg-[#00000080] overflow-x-hidden fixed w-screen h-screen top-0 left-0 py-4 z-[100] h-modal md:inset-0 flex" aria-modal="true" role="dialog">
        <Transition name="modal">
          <div v-if="internalShow" class="relative px-4 w-full h-full md:h-auto" :class="[props.maxWidthClass]">
            <div class="relative bg-white rounded-lg shadow">
              <slot name="header" :close="close">
                <div class="flex justify-between items-start p-5 rounded-t border-b">
                  <h3 class="text-xl font-semibold text-gray-900 lg:text-2xl">Modal Title</h3>
                  <button @mousedown="close" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="defaultModal">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                </div>
              </slot>

              <slot name="body" :close="close">
                <div class="p-6 space-y-6">
                  <p class="text-base leading-relaxed text-gray-500">Modal Body</p>
                </div>
              </slot>

              <slot name="footer" :close="close">
                <div class="flex items-center p-6 gap-4 rounded-b border-t border-gray-200">
                  <button data-modal-toggle="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Button 1</button>
                  <button data-modal-toggle="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Button 2</button>
                </div>
              </slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// props
import { nextTick, ref, watch } from '@nuxtjs/composition-api'

interface Props {
  show: boolean
  maxWidthClass?: string
  justifyContent?: string
  alignItems?: string
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  maxWidthClass: 'max-w-4xl',
  justifyContent: 'justify-center',
  alignItems: 'items-center',
})

// refs
const internalShow = ref(false)
// emits
const emit = defineEmits<{
  (event: 'update:show', state: boolean): void
}>()

// methods
const close = () => {
  internalShow.value = false
  setTimeout(() => {
    emit('update:show', false)
  }, 250)
}

// watchers
watch(
  () => props.show,
  (state) => {
    nextTick(() => {
      internalShow.value = state
    })
  }
)
</script>

<style>
.modal-wrapper-enter-active {
  animation: modal-wrapper-in 0.5s;
}

.modal-wrapper-leave-active {
  animation: modal-wrapper-out 0.5s;
}

@keyframes modal-wrapper-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes modal-wrapper-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

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
