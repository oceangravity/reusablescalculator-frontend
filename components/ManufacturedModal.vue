<template>
  <modal :show.sync="syncShow" max-width-class="max-w-3xl" align-items="items-center">
    <template #header="{ close }">
      <div class="relative flex justify-center items-center px-6 pb-5 pt-6 rounded-t border-b-2">
        <h3 class="flex justify-center items-center leading-none text-[15px] px-1 text-[#003A70]">What raw material is the reusable container made of?</h3>
        <button @mousedown="close" type="button" class="right-6 top-6 text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="defaultModal">
          <img src="@/static/close-popup.svg" alt="" />
        </button>
      </div>
    </template>

    <template #body="{ close }">
      <div class="flex flex-col relative justify-center items-center">
        <div class="text-[14px] font-medium self-start px-6 pt-6">Raw material</div>
        <div class="flex w-full relative justify-center items-center pb-5">
          <div class="absolute w-px h-[calc(100%-40px)] bg-gray-400"></div>
          <div class="columns-2 w-full max-h-[235px] columns-2 text-[14px] bg-white flex-1 gap-x-10 gap-y-2 px-6 p-5">
            <div v-for="option in store.manufacturedOptions" :key="option.id" class="flex w-full items-center gap-1 cursor-pointer hover:text-gray-400 select-none">
              <input type="radio" :id="option.id" name="options" v-model="store.calculator[props.type][props.property]" :value="option" />
              <label class="w-full cursor-pointer" :for="option.id">{{ option.title }}</label>
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
import { useStore } from "~/store/app"

const store = useStore()

// props
interface Props {
  show: boolean
  type: "reusableContainer" | "singleUseContainer"
  property: string
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

const selected = ref(0)

// watchers
watch(
  () => props.show,
  state => {
    console.log(props.type)
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
