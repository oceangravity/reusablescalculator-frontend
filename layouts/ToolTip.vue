<template>
  <span class="has-tooltip relative flex flex-col">
    <img src="@/static/info-icon.svg" alt="" />
    <span v-if="show" class="tooltip text-[13px] z-50 absolute px-3 py-2 ml-1 -translate-x-1/2 top-full mt-1 w-max min-w-full max-w-[360px] bg-[#EBF3FB] rounded border">
      {{ props.text }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref } from "@vue/runtime-dom"

const show = ref(false)

interface Props {
  text: string
}

const props = withDefaults(defineProps<Props>(), {
  text: "Enter here the power of the dishwasher used in kW (not kWh!) (industrial dishwashers are often between 4-15 kW and household dishwashers between 0.7 and 2.7 kW)"
})
</script>

<style>
.tooltip {
  @apply invisible absolute;
}

.has-tooltip:hover .tooltip {
  @apply visible z-50;
}
</style>
