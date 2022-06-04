<template>
  <modal :show.sync="syncShow" max-width-class="max-w-2xl">
    <template #header="{ close }">
      <div class="flex justify-between items-center pr-2 pl-3 py-1 rounded-t border-b">
        <h3 class="flex justify-center text-base text-gray-500">SOLICITUD DE PRESUPUESTO</h3>
        <button @mousedown="close" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="defaultModal">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>
    </template>

    <template #body>
      <div class="pt-1 xl:px-2 xl:py-2 relative min-h-[250px]">
        <div v-show="!loaded" class="absolute left-0 top-0 w-full h-full flex justify-center items-center">
          <loading-spinner />
        </div>
        <div :class="{ 'opacity-0': !loaded }" class="flex flex-row gap-1">
          <div class="hidden xl:flex justify-end w-[128px] h-auto relative">
            <div class="absolute w-[123px] h-[83.5%] bottom-0 bg-gray-100 overflow-visible rounded-bl-3xl rounded-br-3xl"></div>
            <img class="absolute top-0 right-0" src="@/static/modal-figure.svg" alt="Presupuesto" width="128" />
          </div>
          <div class="flex w-full flex-1 relative">
            <div :class="{ 'opacity-0': !sendStatus }" class="absolute pointer-events-none top-0 left-0 flex w-full px-4 xl:px-6 bg-white flex-col overflow-scroll xl:overflow-hidden">
              <h2 class="p-6 text-white justify-center items-center text-center bg-[#68cd86] uppercase">¡Gracias por contactarnos!</h2>
              <h3 class="p-12">Hemos recibido correctamente tu solicitud y nuestro equipo contactará contigo lo antes posible.</h3>
            </div>

            <div :class="{ 'hidden': sendStatus }" class="flex w-full px-2 bg-white flex-col overflow-scroll xl:overflow-hidden">
              <h2 class="mb-2 text-gray-400 text-xs">
                ¡Hola! ¿Quieres solicitar un presupuesto para el producto
                <span class="font-medium">{{ props.product.name }}</span
                >? Déjanos un mensaje:
              </h2>
              <form ref="budgetForm" novalidate class="flex w-full flex-1 flex-col" autocomplete="off">
                <div class="form-group w-full">
                  <label for="form_name" class="form-label inline-block text-xs text-gray-700">Nombre<sup>*</sup></label>
                  <input v-model="formName" autocomplete="off" type="text" class="form-control h-[34px] block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-gray-200 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="form_name" aria-describedby="name" placeholder="" />
                  <small :class="[getErrorFor('formName') ? 'opacity-1' : 'opacity-0']" class="block min-h-[1rem] pl-1 mb-1 text-xs text-red-800">
                    {{ getErrorFor('formName') ? getErrorFor('formName').message : '' }}
                  </small>
                </div>
                <div class="flex flex-col xl:flex-row xl:gap-4 w-full">
                  <div class="form-group w-full">
                    <label for="form_email" class="form-label inline-block text-xs mb-1 text-gray-700">Email<sup>*</sup></label>
                    <input v-model="formEmail" autocomplete="off" type="text" class="form-control h-[34px] block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-gray-200 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="form_email" aria-describedby="name" placeholder="" />
                    <small :class="[getErrorFor('formEmail') ? 'opacity-1' : 'opacity-0']" class="block min-h-[1rem] pl-1 mb-1 text-xs text-red-800">
                      {{ getErrorFor('formEmail') ? getErrorFor('formEmail').message : '' }}
                    </small>
                  </div>
                  <div class="form-group w-full">
                    <label for="form_phone" class="form-label inline-block text-xs mb-1 text-gray-700">Teléfono<sup>*</sup></label>
                    <input v-model="formPhone" autocomplete="off" type="text" class="form-control h-[34px] block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-gray-200 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="form_phone" aria-describedby="name" placeholder="" />
                    <small :class="[getErrorFor('formPhone') ? 'opacity-1' : 'opacity-0']" class="block min-h-[1rem] pl-1 mb-1 text-xs text-red-800">
                      {{ getErrorFor('formPhone') ? getErrorFor('formPhone').message : '' }}
                    </small>
                  </div>
                </div>
                <div class="flex flex-col xl:flex-row xl:gap-4 w-full">
                  <div class="form-group w-full">
                    <label for="form_enterprise" class="form-label inline-block text-xs mb-1 text-gray-700">Empresa</label>
                    <input v-model="formEnterprise" autocomplete="off" type="text" class="form-control h-[34px] block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-gray-200 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="form_enterprise" aria-describedby="name" placeholder="" />
                    <small :class="[getErrorFor('formEnterprise') ? 'opacity-1' : 'opacity-0']" class="block min-h-[1rem] pl-1 mb-1 text-xs text-red-800">
                      {{ getErrorFor('formEnterprise') ? getErrorFor('formEnterprise').message : '' }}
                    </small>
                  </div>
                  <div class="form-group w-full">
                    <label for="form_location" class="form-label inline-block text-xs mb-1 text-gray-700">Provincia<sup>*</sup></label>
                    <list-box id="form_location" :list="locations" v-model="formLocation">
                      <template #list="{ items, active, props, select }">
                        <transition leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
                          <div v-show="active" class="overflow-hidden absolute w-full mt-2 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <ul role="listbox" tabindex="0" class="overflow-auto py-1 max-h-32 text-base bg-white sm:text-sm">
                              <li v-for="item in items" @mousedown="select(item)" :key="item.id" class="hover:bg-gray-100 text-gray-900 cursor-default select-none relative py-2 pl-2 pr-4" role="option" tabindex="-1">
                                <span :class="{ 'font-normal text-gray-400': !item.selected, 'font-bold text-gray-400': item.selected }" class="block truncate text-xs">{{ item.label }}</span>
                              </li>
                            </ul>
                          </div>
                        </transition>
                      </template>
                    </list-box>
                    <small :class="[getErrorFor('formLocation') ? 'opacity-1' : 'opacity-0']" class="block min-h-[1rem] pl-1 mb-1 text-xs text-red-800">
                      {{ getErrorFor('formLocation') ? getErrorFor('formLocation').message : '' }}
                    </small>
                  </div>
                </div>
                <div class="form-group w-full">
                  <label for="form_message" class="form-label inline-block text-xs mb-1 text-gray-700">Mensaje</label>
                  <textarea v-model="formMessage" class="max-h-[40px] form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-gray-200 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none resize-none" id="form_message" aria-describedby="form_message" placeholder="" />
                  <small :class="[getErrorFor('formMessage') ? 'opacity-1' : 'opacity-0']" class="block min-h-[1rem] pl-1 mb-1 text-xs text-red-800">
                    {{ getErrorFor('formMessage') ? getErrorFor('formMessage').message : '' }}
                  </small>
                </div>
                <div class="form-group form-check">
                  <input v-model="formTOS" type="checkbox" class="form-checkbox" id="form_tos" />
                  <label class="cursor-pointer form-check-label text-xs inline-block text-gray-800" for="form_tos">He leído y acepto los <a target="_blank" class="hover:underline" href="https://www.orbishigiene.com/wp-content/themes/orbishigiene/assets/doc/AvisoLegal.pdf">términos y condiciones</a> de uso</label>
                  <small :class="[getErrorFor('formTOS') ? 'opacity-1' : 'opacity-0']" class="block min-h-[1rem] pl-4 text-xs text-red-800">
                    {{ getErrorFor('formTOS') ? getErrorFor('formTOS').message : '' }}
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #footer="{ close }">
      <div class="flex justify-center items-center p-2 gap-4 rounded-b border-t border-gray-200">
        <div v-if="sendStatus" @mousedown="close" class="flex gap-2 min-w-[6rem] justify-center items-center hover:bg-gray-200 hover:text-gray-600 text-gray-400 px-2 py-1 bg-white rounded-sm border cursor-pointer text-xs">Cerrar</div>
        <div v-if="!sendStatus" @mousedown="close" class="flex gap-2 min-w-[6rem] justify-center items-center hover:bg-[#e82c2b] hover:text-white text-[#b6b4b6] px-2 py-1 bg-white rounded-sm border hover:border-[#e82c2b] cursor-pointer text-xs">Cancelar</div>
        <div v-if="!sendStatus" @mousedown="onSubmit" class="flex gap-2 min-w-[6rem] justify-center items-center hover:bg-blue-800 hover:border-blue-800 hover:text-white text-gray-100 px-2 py-1 bg-[#00adfc] rounded-sm border border-[#00adfc] cursor-pointer text-xs">Enviar</div>
      </div>
    </template>
  </modal>
</template>

<script setup lang="ts">
import Modal from '@/components/common/Modal.vue'
import ListBox from '@/components/common/Listbox.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import { ref, watch } from '@nuxtjs/composition-api'
import { useUtils } from '~/composables/Utils'

const { validateEmail } = useUtils()

interface Error {
  field: string
  message: string
}

interface Product {
  name: string
  id: number
}

// props
interface Props {
  show: boolean
  product: Product
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
})

// refs
const syncShow = ref(false)
const errorsBag = ref<Error[]>([])
const loaded = ref(false)
const sendStatus = ref(false)
const budgetForm = ref()
const formName = ref('')
const formEmail = ref('')
const formEnterprise = ref('')
const formPhone = ref('')
const formLocation = ref()
const formMessage = ref('')
const formTOS = ref('')
const locations = ref<LocationsItemList[]>([])

// emits
const emit = defineEmits<{
  (event: 'update:show', state: boolean): void
}>()

// watchers
watch(
  () => props.show,
  (state) => {
    if (state && !loaded.value) {
      loadLocations()
    }
    syncShow.value = state
    errorsBag.value = []
    loaded.value = false
    sendStatus.value = false
  }
)

watch(
  () => syncShow.value,
  (state) => {
    emit('update:show', state)
  }
)

// methods

const submitForm = () => {
  budgetForm.value.submit()
}

const check = () => {
  errorsBag.value = []

  if (formName.value.length === 0) {
    errorsBag.value.push({ field: 'formName', message: "Campo 'Nombre' requerido" })
  }

  if (formEmail.value.length === 0) {
    errorsBag.value.push({ field: 'formEmail', message: "Campo 'Email' requerido" })
  } else if (!validateEmail(formEmail.value)) {
    errorsBag.value.push({ field: 'formEmail', message: 'Por favor ingrese un email correcto' })
  }

  if (formPhone.value.length === 0) {
    errorsBag.value.push({ field: 'formPhone', message: "Campo 'Teléfono' requerido" })
  }

  if (formEnterprise.value.length === 0) {
    errorsBag.value.push({ field: 'formEnterprise', message: "Campo 'Empresa' requerido" })
  }

  if (!formLocation.value) {
    errorsBag.value.push({ field: 'formLocation', message: "Campo 'Provincia' requerido" })
  }

  if (!formTOS.value) {
    errorsBag.value.push({ field: 'formTOS', message: 'Debe aceptar los Términos y Condiciones' })
  }

  return !errorsBag.value.length
}

const send = async () => {
  // show loading spinner
  loaded.value = false

  // make the request
  const response = await fetch(`${process.env.APIUrl}public_quotation_request/`, {
    method: 'POST',
    headers: new Headers({
      Authorization: '',
      'Content-Type': 'application/json;charset=UTF-8',
    }),
    body: JSON.stringify({
      name: formName.value,
      email: formEmail.value,
      business_name: formEnterprise.value,
      phone: formPhone.value,
      request_region: {
        id: formLocation.value.id,
      },
      text: formMessage.value,
      product: {
        id: props.product.id,
      },
    }),
  })

  // show loading spinner
  loaded.value = true

  if (response.status === 201) {
    errorsBag.value = []
    sendStatus.value = true
  }
}

const onSubmit = async () => {
  if (check()) {
    await send()
  }
}

const getErrorFor = (field: string): Error | undefined => {
  const error = errorsBag.value.filter((error) => error.field === field)
  if (error.length) return error[0]
  return undefined
}

const loadLocations = async () => {
  const response = await fetch(`${process.env.APIUrl}request_regions/`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json;charset=UTF-8',
    }),
  })

  if (response.status === 200) {
    const data = await response.json()
    locations.value = data.results.map((item: { id: number; name: string }) => ({ id: item.id, label: item.name, value: item.id }))
    loaded.value = true
  }
}
</script>
