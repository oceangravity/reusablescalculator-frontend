<template>
  <header class="sticky top-0 z-[60] bg-[#1c2c40] text-[#ffffff] text-[12px] font-semibold">
    <div class="max-w-[1250px] max-h-[60px] min-h-[60px] mx-auto flex">
      <div class="flex items-center justify-center xl:justify-start flex-1 flex-col xl:flex-row gap-5">
        <div class="flex items-center">
          <img src="/logo-head.png" alt="Prisma Logo" class="h-[37px]" />
        </div>
        <div v-show="visibility" class="absolute left-0 flex justify-end items-center flex-1 lg:hidden">
          <nav @mousedown="showCategory">
            <ul class="flex flex-col xl:flex-row ml-2 text-4xl cursor-pointer">
              <menu-icon></menu-icon>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import MenuIcon from '~/components/common/MenuIcon.vue'
import { computed } from '@nuxtjs/composition-api'
import { useStore } from '~/store/app'
const store = useStore()
const showCategory = () => (store.showCategoryMenu = !store.showCategoryMenu)
const visibility = computed(() => store.categoryVisibility)
</script>

<style scoped>
header {
  font-family: 'Poppins', serif;
}
</style>
