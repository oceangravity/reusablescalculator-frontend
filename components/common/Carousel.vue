<template>
  <div class="flex justify-center items-center min-w-full min-h-full">
    <div class="w-full min-h-[100px] h-[200px] relative">
      <Transition name="carousel">
        <img class="absolute top-0 left-0 w-full h-full" :key="active" :src="props.data[active].src" alt="banner" />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from '@nuxtjs/composition-api'

interface Slide {
  id: number
  src: string
}

interface Props {
  data: Array<Slide>
}

const props = withDefaults(defineProps<Props>(), {})

const active = ref(0)

onMounted(() => {
  setInterval(() => {
    let next = active.value + 1
    if (next + 1 > props.data.length) next = 0
    active.value = next
  }, 5000)
})
</script>

<style>
.carousel-enter-active {
  animation: carousel-in 1s;
}

.carousel-leave-active {
  animation: carousel-out 1s;
}

@keyframes carousel-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes carousel-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
