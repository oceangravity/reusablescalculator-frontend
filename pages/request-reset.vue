<template>
  <div class="flex flex-col justify-between flex-1 mt-6">
    <h2 class="text-center text-[#43425D] font-display font-light text-[13px] mb-10">
      If you forgot your password, put your email address and we will send instructions to restore your password.
    </h2>
    <form @submit.prevent="requestReset" class="flex flex-col justify-start flex-1 xl:px-16" autocomplete="off">
      <input name="new-user" id="new-user" autocomplete="new-user" class="hidden mb-8 w-full text-[15px] py-2 border-b-2 border-[#E9E9F0] focus:outline-none focus:border-indigo-500" type="text" placeholder="Username" />
      <input v-model="email" name="old-email" id="old-email" autocomplete="old-email" class="pl-2 mb-8 w-full text-[15px] py-2 border-b-2 border-[#E9E9F0] focus:outline-none focus:border-indigo-500" type="text" placeholder="e-mail" />
      <div class="flex justify-center mt-10">
        <button type="submit" class="bg-[#79A3DC] text-gray-100 px-20 py-3  min-w-[297px] rounded-md tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">Restore Password</button>
      </div>
      <div class="flex justify-center mt-10">
        <button @mousedown="router.push(`/auth/login`)" type="button" class="bg-[#79A3DC] text-gray-100 px-20 py-3 min-w-[297px] rounded-md tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">Login</button>
      </div>
      <div class="flex justify-center mt-10">
        <div class="flex text-[#43425D] text-[13px] items-center gap-1"><span>By clicking "Submit“ you are accepting our</span><span class="text-[#0D6AFF] hover:underline cursor-pointer"><a href="https://www.inpacs.com/policies" target="_blank">Privacy policy.</a></span></div>
      </div>
    </form>
    <div class="my-8 text-[10px] font-display text-gray-700 text-center">Copyright © 2022 INPACS GmbH</div>
  </div>
</template>

<script setup lang="ts">
import { ref, useRouter } from '@nuxtjs/composition-api'
import RequestInvitationModal from '~/components/RequestInvitationModal.vue'
import { useCalculator } from '~/composables/Calculator'
import { useUtils } from '~/composables/Utils'

const calculator = useCalculator()
const router = useRouter()
const utils = useUtils()

const email = ref()

const requestReset = async () => {
  if (utils.validateEmail(email.value)) {
    await calculator.passwordResetRequest(email.value)
    return router.push(`/auth/login`)
  }
}
</script>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'reset-password',
  layout: 'login',
})
</script>
