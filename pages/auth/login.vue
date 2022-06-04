<template>
  <div class="flex flex-col justify-between flex-1 mt-6">
    <h2 class="text-center text-1xl text-indigo-900 font-display font-light xl:text-[16px] mb-10">Welcome back! Please login to your account.</h2>
    <form @submit.prevent="login" class="flex flex-col justify-start flex-1 xl:px-16" autocomplete="off">
      <input v-model="email" name="new-user" id="new-user" autocomplete="new-user" class="pl-2 mb-8 w-full text-[15px] py-2 border-b-2 border-[#E9E9F0] focus:outline-none focus:border-indigo-500" type="text" placeholder="Username" />
      <div class="relative flex">
        <input v-model="password" name="new-password" id="new-password" autocomplete="new-password" class="pl-2 mb-8 w-full text-[15px] py-2 border-b-2 border-[#E9E9F0] focus:outline-none focus:border-indigo-500" :type="inputPassordType" placeholder="Password" />
        <div @mousedown="changeInputPasswortdType" class="w-[18px] h-[18px] absolute flex justify-center items-center top-2 right-2 cursor-pointer">
          <img class="w-[18px]" :src="`../eye-${inputPassordType === 'text' ? 'closed' : 'open'}.svg`" alt="" />
        </div>
      </div>
      <div class="flex justify-between items-center text-[13px]">
        <div class="flex items-center gap-2 cursor-pointer">
          <input id="remember-me" class="cursor-pointer" type="checkbox" />
          <label for="remember-me" class="cursor-pointer">Remember me</label>
        </div>
        <div @mousedown="router.push(`/request-reset`)" class="cursor-pointer">Forgot Password</div>
      </div>
      <div class="flex justify-center mt-10">
        <button class="bg-[#79A3DC] text-gray-100 px-20 py-3 w-auto rounded-md tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">Login</button>
      </div>
      <div class="flex justify-center mt-10">
        <div class="flex items-center gap-2 cursor-pointer" @mousedown="showRequestInvitationModal = true">
          <img src="@/static/login-hand.svg" alt="" />
          <span class="flex items-center leading-none mt-2 cursor-pointer text-[16px] text-[#0D6AFF]">Request an invitation</span>
        </div>
      </div>
    </form>
    <div class="my-8 text-[10px] font-display text-gray-700 text-center">Copyright © 2022 INPACS GmbH</div>
    <request-invitation-modal :show.sync="showRequestInvitationModal"></request-invitation-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, useRouter } from "@nuxtjs/composition-api"
import RequestInvitationModal from "@/components/RequestInvitationModal.vue"
import { useCalculator } from "~/composables/Calculator"

const calculator = useCalculator()
const router = useRouter()

const showRequestInvitationModal = ref(false)

const email = ref("")
const password = ref("")
const inputPassordType = ref<"text" | "password">("password")

const changeInputPasswortdType = () => {
  if (inputPassordType.value === "password") {
    inputPassordType.value = "text"
  } else {
    inputPassordType.value = "password"
  }
}

const login = async () => {
  if (email.value !== "" && password.value !== "") {
    const response = await calculator.login(email.value, password.value)

    if (response.ok) {
      const data = await response.json()

      window.localStorage.setItem("token", data.access)

      setTimeout(() => {
        return router.push(`/calculator`)
      }, 1000)
    } else {
      return router.push(`/auth/login`)
    }
  }
}
</script>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"

export default defineComponent({
  name: "login",
  layout: "login"
})
</script>
