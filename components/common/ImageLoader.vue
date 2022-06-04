<template>
  <div class="flex justify-center items-center relative h-[100%] min-h-[100%] max-h-[100%]">
    <loading-spinner v-if="loading" :classes="loadingSpinnerClasses" class="absolute" />
    <img v-if="error" class="max-w-full h-auto absolute" alt="No disponible" src="@/static/not-available.png" />
    <img :class="{ 'opacity-0': !ready, 'opacity-1': ready }" ref="image" loading="lazy" class="w-full h-full transition-opacity object-contain" :alt="props.alt" src="@/static/not-available.png" />
  </div>
</template>

<script setup lang="ts">
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import { onMounted, ref } from '@nuxtjs/composition-api'

// props
interface Props {
  src: any
  alt: string
}

const props = withDefaults(defineProps<Props>(), {})

// refs
const image = ref()
const error = ref(false)
const loading = ref(true)
const ready = ref(false)
const loadingSpinnerClasses = ref(['w-8', 'h-8', 'border-2', 'border-blue-400'])

// hooks
onMounted(() => {
  if (typeof props.src === 'string') {
    // manage image load
    const img = image.value

    // img.loading = 'lazy'

    img.onload = () => {
      loading.value = false
      ready.value = true
    }

    img.onerror = () => {
      loading.value = false
      error.value = true
    }

    img.src = props.src
  } else {
    loading.value = false
    error.value = true
  }
})
</script>
