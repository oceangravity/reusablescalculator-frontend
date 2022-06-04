<template>
  <div class="flex flex-col justify-between flex-1 mt-6">
    <h2 class="text-center text-1xl text-[#4D4F5C] font-display font-light xl:text-[16px] mb-5">RESET PASSWORD</h2>
    <h2 class="text-center text-1xl text-[#43425D] font-display font-light xl:text-[13px] mb-10">Your password must be at least 8 characters long.</h2>
    <form @submit.prevent="reset" class="flex flex-col justify-start flex-1 xl:px-16" autocomplete="off">
      <input name="new-user" id="new-user" autocomplete="new-user" class="hidden mb-8 w-full text-[15px] py-2 border-b-2 border-[#E9E9F0] focus:outline-none focus:border-indigo-500" type="text" placeholder="Username" />
      <input v-model="password" name="old-password" id="old-password" autocomplete="old-password" class="pl-2 mb-8 w-full text-[15px] py-2 border-b-2 border-[#E9E9F0] focus:outline-none focus:border-indigo-500" type="password" placeholder="Password" />
      <input v-model="confirmPassword" name="new-password" id="new-password" autocomplete="new-password" class="pl-2 mb-8 w-full text-[15px] py-2 border-b-2 border-[#E9E9F0] focus:outline-none focus:border-indigo-500" type="password" placeholder="Confirm Password" />
      <div class="flex justify-center mt-10">
        <button type="submit" class="bg-[#79A3DC] text-gray-100 px-20 py-3 w-auto rounded-md tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">Login</button>
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

const calculator = useCalculator()
const router = useRouter()

const password = ref()
const confirmPassword = ref()

const reset = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get('confirm')

  if (password.value === confirmPassword.value && password.value.length >= 8 && token) {
    const response = await calculator.passwordResetConfirm(token, password.value)

    if (response.ok) {
      return router.push(`/auth/login`)
    } else {
      return router.push(`/auth/login`)
    }
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
