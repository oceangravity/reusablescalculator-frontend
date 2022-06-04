<template>
  <div class="lg:flex">
    <div class="hidden overflow-hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen">
      <div class="w-full overflow-hidden">
        <img class="w-full" src="@/static/login-01.svg" alt="" />
      </div>
    </div>
    <div class="flex flex-col w-full xl:w-1/2">
      <div class="py-12 bg-white flex justify-center lg:px-12">
        <div class="cursor-pointer flex items-center">
          <div>
            <img src="@/static/company-logo.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="flex flex-row justify-center flex-1 px-12 w-full">
        <div class="flex flex-col justify-between w-full xl:max-w-[510px]">
          <h2 class="font-nunito text-center text-2xl text-indigo-900 font-display font-semibold xl:text-[28px] xl:text-bold">Reusables Calculator</h2>
          <h2 class="text-center text-1xl text-indigo-900 font-display font-light xl:text-[20px]">Compare a single use container with a reusable container and find out how much CO2 and costs you can save!</h2>

          <nuxt-child></nuxt-child>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
}
</script>
