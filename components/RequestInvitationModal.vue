<template>
  <modal :show.sync="syncShow" max-width-class="max-w-xl" align-items="items-center">
    <template #header="{ close }">
      <div class="relative flex justify-center items-end px-4 pt-20 rounded-t">
        <h3 class="flex justify-center items-center font-nunito leading-none text-[22px] font-bold px-1 text-[#003A70]">Request an invitation</h3>
        <button @mousedown="close" type="button" class="absolute right-6 top-6 text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="defaultModal">
          <img src="@/static/close-popup.svg" alt="" />
        </button>
      </div>
    </template>

    <template #body="{ close }">
      <div class="flex min-h-[410px] max-h-[410px]" v-if="step === 'request'">
        <form @submit.prevent="invite" class="flex flex-col justify-start flex-1 pt-9 pb-12 xl:px-24" autocomplete="off">
          <div class="flex-1">
            <input v-model="name" name="new-name" id="new-name" autocomplete="new-name" class="pl-2 mb-8 w-full text-[15px] py-2 border-b-2 border-[#E9E9F0] focus:outline-none focus:border-indigo-500" type="text" placeholder="Name" />
            <input v-model="company" name="new-company" id="new-company" autocomplete="new-company" class="pl-2 mb-8 w-full text-[15px] py-2 border-b-2 border-[#E9E9F0] focus:outline-none focus:border-indigo-500" type="text" placeholder="Company" />
            <input v-model="email" name="new-email" id="new-email" autocomplete="new-email" class="pl-2 mb-8 w-full text-[15px] py-2 border-b-2 border-[#E9E9F0] focus:outline-none focus:border-indigo-500" type="email" placeholder="Email" />
            <div class="flex justify-center">
              <div class="flex text-[#43425D] text-[12px] items-center gap-1"><span>By clicking "Send“ you are accepting our</span><span class="text-[#0D6AFF] hover:underline cursor-pointer"><a href="https://www.inpacs.com/policies" target="_blank">Privacy policy.</a></span></div>
            </div>
          </div>
          <div class="flex justify-center">
            <button type="submit" @mousedown="invite" class="bg-[#79A3DC] text-gray-100 px-20 py-3 w-auto rounded-md tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">Send</button>
          </div>
        </form>
      </div>
      <div class="flex min-h-[410px] max-h-[410px]" v-else>
        <div class="flex flex-col justify-between flex-1 pt-12 pb-12 xl:px-24">
          <div class="flex flex-1 flex-col items-center">
            <img class="w-[20px] h-[20px] my-4" src="@/static/happy-face.svg" alt="" />
            <div class="flex text-[#43425D] text-[15px] items-center">Many thanks for your interest.</div>
            <div class="flex text-[#43425D] text-[15px] items-center">You will receive an invitation shortly.</div>
          </div>
          <div class="flex justify-center">
            <button @mousedown="close" class="bg-[#79A3DC] text-gray-100 px-20 py-3 w-auto rounded-md tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">Close</button>
          </div>
        </div>
      </div>
    </template>

    <template #footer="{ close }">
      <div></div>
    </template>
  </modal>
</template>

<script setup lang="ts">
import Modal from "@/components/common/Modal.vue"
import { ref, useRouter, watch } from "@nuxtjs/composition-api"
import { useCalculator } from "~/composables/Calculator"

const calculator = useCalculator()
const router = useRouter()

// props
interface Props {
  show: boolean
}

const props = withDefaults(defineProps<Props>(), {
  show: false
})

// refs
const syncShow = ref(false)
const step = ref("request")

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

const name = ref("")
const company = ref("")
const email = ref("")

const invite = async () => {
  if (name.value !== "" && company.value !== "" && email.value !== "") {
    const response = await calculator.createInvite(name.value, company.value, email.value)

    if (response.ok) {
      setTimeout(() => {
        step.value = "sent"
      }, 1000)
    } else {
      return router.push(`/auth/login`)
    }
  }
}
</script>
