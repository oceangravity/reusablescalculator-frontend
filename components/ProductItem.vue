<template>
  <div :class="{ 'border-[#9ce16d]': isECO, 'border-[#f0bd4e]': isOUTLET, 'border-white': !isECO && !isOUTLET }" class="transition duration-300 border hover:border-[#1592e6] relative cursor-pointer min-w-full h-[332px] bg-white">
    <div v-if="isECO" class="absolute z-10 bg-[#9ce16d] px-1 py-1 left-0 top-0 text-[10px] text-white">ECO</div>
    <div v-if="isOUTLET" class="absolute z-10 bg-[#f0bd4e] px-1 py-1 left-0 top-0 text-[10px] text-white">OUTLET</div>
    <div class="flex flex-col gap-2 items-center h-full justify-between p-[9px] rounded-md">
      <div class="flex z-0 justify-center items-center overflow-hidden relative w-40 min-h-[160px] max-h-[160px]">
        <image-loader :src="props.item.image_url" :alt="props.item.name" />
      </div>
      <div class="flex flex-col gap-2 w-full">
        <div class="flex justify-center items-start leading-none overflow-ellipsis overflow-hidden uppercase text-center text-[14px] h-14">
          <h2 class="max-h-[2.5rem] ts-line-clamp-3 overflow-hidden">
            {{ props.item.name }}
          </h2>
        </div>
        <div class="flex px-2 gap-1 items-center w-full h-6font-bold text-[14px] text-[#adadad]">
          <span>ID:</span>
          <span>{{ props.item.external_id }}</span>
        </div>
        <div class="flex w-full justify-end">
          <div @mousedown.prevent.stop.exact.self="showBudgetModal({ name: props.item.name, id: props.item.id })" class="flex justify-center items-center text-xs text-gray-500 bg-[#eff3f6] border border-[#e6e8e9] hover:bg-[#ff8054] hover:text-gray-200 px-[0.65rem] py-[0.3765rem] transition rounded">PEDIR PRESUPUESTO €</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageLoader from '@/components/common/ImageLoader.vue'
import { computed, ref } from '@nuxtjs/composition-api'

interface Product {
  name: string
  id: number
}

// props
interface Props {
  item: ProductResponse
}

// emits
const emit = defineEmits<{
  (event: 'open-budget-modal', product: Product): void
}>()

const props = withDefaults(defineProps<Props>(), {})

const isECO = computed(() => props.item.is_eco)
const isOUTLET = computed(() => props.item.is_outlet)

const showBudgetModal = (product: Product) => {
  emit('open-budget-modal', product)
}
</script>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  head: {},
  name: 'ProductItem',
})
</script>
