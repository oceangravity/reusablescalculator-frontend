<template>
  <modal :show.sync="syncShow" max-width-class="max-w-3xl" align-items="items-center">
    <template #header="{ close }">
      <div class="relative flex justify-center items-center px-6 pb-5 pt-6 rounded-t border-b-2">
        <h3 class="flex justify-center items-center leading-none text-[15px] px-1 text-[#003A70]">You don't know the price of one piece?</h3>
        <button @mousedown="close" type="button" class="right-6 top-6 text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="defaultModal">
          <img src="@/static/close-popup.svg" alt="" />
        </button>
      </div>
    </template>

    <template #body="{ close }">
      <div class="flex relative items-center">
        <div class="grid grid-cols-1 bg-white gap-x-10 gap-y-2 px-6 py-10 w-3/5">
          <div class="flex-1">
            <div class="flex flex-row justify-between items-center">
              <span class="text-[14px]">Costs total packaging unit container in €</span>
              <input v-model.number="store.calculator[props.type].costsTotalPackagingUnitContainerInEuro" type="number" class="w-[80px] bg-[#F3FBFF] text-[14px] text-right rounded border px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0">
            </div>
          </div>
          <div class="flex-1">
            <div class="flex flex-row justify-between items-center">
              <span class="text-[14px]">Costs total packaging unit lid in €</span>
              <input v-model.number="store.calculator[props.type].costsTotalPackagingUnitLidInEuro" type="number" class="w-[80px] bg-[#F3FBFF] text-[14px] text-right rounded border px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0">
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #footer="{ close }">
      <div class="flex justify-center border-t-2 py-3">
        <button @mousedown="close" class="bg-[#79A3DC] text-[16px] text-white px-12 py-2.5 w-auto rounded tracking-wide focus:outline-none focus:shadow-outline hover:bg-indigo-600">OK</button>
      </div>
    </template>
  </modal>
</template>

<script setup lang="ts">
import Modal from "@/components/common/Modal.vue"
import { ref, watch } from "@nuxtjs/composition-api"
import { useStore } from '~/store/app'

const store = useStore()

// props
interface Props {
  show: boolean
  type: 'reusableContainer' | 'singleUseContainer'
}

const props = withDefaults(defineProps<Props>(), {
  show: false
})

// refs
const syncShow = ref(false)

// emits
const emit = defineEmits<{
  (event: "update:show", state: boolean): void
}>()

// watchers
watch(
  () => props.show,
  state => {
    syncShow.value = state
  }
)

watch(
  () => syncShow.value,
  state => {
    emit("update:show", state)
  }
)
</script>
