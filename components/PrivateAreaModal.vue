<template>
  <modal :show.sync="syncShow" max-width-class="max-w-xl" align-items="items-start">
    <template #header="{ close }">
      <div class="flex justify-between items-center p-4 rounded-t border-b">
        <h3 class="flex justify-center items-center leading-none text-base px-1 text-[#205081]">Bienvenido al área privada de cliente</h3>
        <button @mousedown="close" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="defaultModal">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>
    </template>

    <template #body>
      <div class="pt-1 xl:p-6 relative">
        <div class="flex flex-row">
          <div class="flex w-full flex-1 relative">
            <div class="flex w-full px-4 xl:px-6 bg-white flex-col overflow-scroll xl:overflow-hidden">
              <p class="text-[#777777] text-[15px] font-light">Selecciona la sede desde la que te damos servicio.</p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #footer="{ close }">
      <div class="flex justify-center items-center p-4 gap-4 rounded-b border-t border-gray-200">
        <a target="_blank" href="https://www.pedrosa.net/clientes-mallorca.php"><div class="flex gap-2 min-w-[10rem] justify-center items-center hover:bg-gray-200 hover:text-gray-600 text-[#4c5667] px-4 py-2 bg-white rounded-sm border cursor-pointer">MALLORCA</div></a>
        <a target="_blank" href="https://www.pedrosa.net/clientes-ibiza.php"><div class="flex gap-2 min-w-[10rem] justify-center items-center hover:bg-gray-200 hover:text-gray-600 text-[#4c5667] px-4 py-2 bg-white rounded-sm border cursor-pointer">IBIZA</div></a>
        <a target="_blank" href="https://www.pedrosa.net/clientes-menorca.php"><div class="flex gap-2 min-w-[10rem] justify-center items-center hover:bg-gray-200 hover:text-gray-600 text-[#4c5667] px-4 py-2 bg-white rounded-sm border cursor-pointer">MENORCA</div></a>
      </div>
    </template>
  </modal>
</template>

<script setup lang="ts">
import Modal from '@/components/common/Modal.vue'
import { ref, watch } from '@nuxtjs/composition-api'

// props
interface Props {
  show: boolean
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
})

// refs
const syncShow = ref(false)

// emits
const emit = defineEmits<{
  (event: 'update:show', state: boolean): void
}>()

// watchers
watch(
  () => props.show,
  (state) => {
    syncShow.value = state
  }
)

watch(
  () => syncShow.value,
  (state) => {
    emit('update:show', state)
  }
)
</script>
