<template>
  <div class="flex flex-col h-screen justify-between">
    <main class="w-full h-auto max-w-7xl mx-auto flex px-2 pb-10 flex-col">
      <header class="flex gap-4 px-2 pt-4">
        <search-bar></search-bar>
      </header>

      <div class="w-full flex flex-col sm:flex-row flex-grow">
        <main role="main" class="w-full h-full flex flex-col flex-grow px-2 py-4">
          <Nuxt keep-alive />
        </main>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import SearchBar from '~/components/SearchBar.vue'
</script>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'product',
  middleware: ['ssrInit'],
})
</script>
