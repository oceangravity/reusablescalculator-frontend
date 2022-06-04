<template>
  <div v-if="ready">
    <div class="relative w-screen max-w-full flex">
      <div class="relative hidden xl:flex flex-col items-end w-3/12 bg-[#EBF3FB] px-7 py-16 before:bottom-0 before:absolute before:right-0 before:w-px before:h-[calc(75%)] before:bg-[#79A3DC]">
        <img class="w-[200px] mb-4 hidden" src="@/static/company-logo.svg" alt="" />
        <div class="font-nunito text-[#003A70] text-[19px] font-semibold mb-16">Reusables Calculator</div>
        <div class="flex items-center text-[#43425D] text-[15px] max-w-[9rem] text-right">
          <span>General information Container</span>
          <img ref="step1" class="absolute right-0 -mr-[16px]" :src="`step-${activateStep1 ? 'activated' : 'deactivated'}.svg`" alt="" />
        </div>
        <div class="font-nunito text-white text-[180px] leading-none font-semibold mb-16 -mr-5 -mt-3">1</div>
      </div>

      <div class="flex flex-col flex-1 w-full xl:w-9/12 px-12 py-12">
        <div class="relative flex justify-center mb-[2rem]">
          <div class="text-[18px] text-center font-light max-w-[450px]">Compare a single use container with a reusable container and find out how much CO<sub>2</sub> and costs you can save!</div>
          <img class="absolute right-0 cursor-pointer" src="@/static/logout.svg" alt="" />
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex flex-col items-center gap-2 pb-5 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-[calc(50%)] before:bg-[#79A3DC]">
            <img class="w-[82px]" src="@/static/cups-1.svg" alt="" />
            <div class="text-[18px] text-[#003A70] font-black">Reusables containers</div>
            <img class="w-[80px]" src="@/static/recycle-icon.svg" alt="" />
          </div>
          <div class="flex flex-col items-center gap-8 pb-5 justify-end border border-transparent border-b-[#BBBBBB]">
            <img class="w-[82px]" src="@/static/cups-2.svg" alt="" />
            <div class="text-[20px] font-bold px-2 text-center font-nunito">General information container</div>
          </div>
          <div class="relative flex flex-col items-center gap-2 pb-5 border-b border-b-gray-300 before:absolute before:bottom-0 before:left-0 before:w-px before:h-[calc(50%)] before:bg-[#79A3DC]">
            <img class="w-[82px]" src="@/static/cups-3.svg" alt="" />
            <div class="text-[18px] text-[#003A70] font-black">Single-use container</div>
            <img class="w-[80px]" src="@/static/no-two.svg" alt="" />
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex flex-col justify-center items-end gap-2 py-1.5 px-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <input class="bg-[#F3FBFF] text-[14px] text-right rounded border w-1/2 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" type="text" />
          </div>
          <div class="flex flex-col items-center gap-8 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <div class="text-[14px]">Analysed container</div>
          </div>
          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <input class="bg-[#F3FBFF] text-[14px] rounded border w-1/2 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" type="text" />
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex flex-col justify-center items-end gap-2 py-1.5 px-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <div class="flex items-center gap-2 text-[14px] text-[#3A84FF]">
              <span>You don't know the exact weight of one piece?</span>
              <span
                @mousedown="
                  showWeightModal = true
                  currentType = 'reusableContainer'
                "
                class="cursor-pointer"
              >
                <img class="w-[24px]" src="@/static/cog-icon.svg" alt="" />
              </span>
            </div>
          </div>
          <div class="flex flex-col items-center gap-1 py-2 justify-end border border-transparent border-b-[#BBBBBB]">
            <img class="w-[35px]" src="@/static/weight-icon.svg" alt="" />
          </div>
          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <div class="flex items-center gap-2 text-[14px] text-[#3A84FF]">
              <span
                @mousedown="
                  showWeightModal = true
                  currentType = 'singleUseContainer'
                "
                class="cursor-pointer"
              >
                <img class="w-[24px]" src="@/static/cog-icon.svg" alt="" />
              </span>
              <span>You don't know the exact weight of one piece?</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex flex-col justify-center items-end gap-2 py-1.5 px-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <input disabled="disabled" readonly="readonly" v-model.number="store.calculator.reusableContainer.weightInG" class="disabled:bg-gray-200 disabled:outline-none bg-[#F3FBFF] text-[14px] text-right rounded border w-1/2 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" type="number" />
          </div>
          <div class="flex flex-col items-center gap-8 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <div class="text-[14px]">Weight in g</div>
          </div>
          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <input disabled="disabled" readonly="readonly" v-model.number="store.calculator.singleUseContainer.weightInG" class="disabled:bg-gray-200 disabled:outline-none bg-[#F3FBFF] text-[14px] rounded border w-1/2 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" type="number" />
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex flex-col justify-center items-end gap-2 py-1.5 px-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <input disabled="disabled" readonly="readonly" v-model.number="store.calculator.reusableContainer.weightLidInG" class="disabled:bg-gray-200 disabled:outline-none bg-[#F3FBFF] text-[14px] text-right rounded border w-1/2 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" type="number" />
          </div>
          <div class="flex flex-col items-center gap-8 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <div class="text-[14px]">Weight lid in g</div>
          </div>
          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <input disabled="disabled" readonly="readonly" v-model.number="store.calculator.singleUseContainer.weightLidInG" class="disabled:bg-gray-200 disabled:outline-none bg-[#F3FBFF] text-[14px] rounded border w-1/2 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" type="number" />
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="bg-[#CDE0F5] relative flex flex-col justify-center items-end gap-2 py-1.5 px-4 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <span class="text-[14px]">{{ new Intl.NumberFormat("en-US").format(calculator.weightTotal1ContainerPluslidInG("reusableContainer")) }}</span>
          </div>
          <div class="bg-[#EDF0F2] flex flex-col items-center gap-8 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <div class="text-[14px] font-medium">Weight total (1 container+lid) in g</div>
          </div>
          <div class="bg-[#CDE0F5] relative flex flex-col justify-center items-start gap-2 py-1.5 px-4 border-b border-b-gray-300 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <span class="text-[14px]">{{ new Intl.NumberFormat("en-US").format(calculator.weightTotal1ContainerPluslidInG("singleUseContainer")) }}</span>
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex flex-col justify-center items-end gap-2 py-1.5 px-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <div class="flex items-center gap-2 text-[14px] text-[#3A84FF]">
              <span>You don't know the price of one piece?</span>
              <span
                @mousedown="
                  showPriceModal = true
                  currentType = 'reusableContainer'
                "
                class="cursor-pointer"
              >
                <img class="w-[24px]" src="@/static/cog-icon.svg" alt="" />
              </span>
            </div>
          </div>
          <div class="flex flex-col items-center gap-1 py-2 justify-end border border-transparent border-b-[#BBBBBB]">
            <img class="w-[35px]" src="@/static/rounded-euro-icon.svg" alt="" />
          </div>
          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <div class="flex items-center gap-2 text-[14px] text-[#3A84FF]">
              <span
                @mousedown="
                  showPriceModal = true
                  currentType = 'singleUseContainer'
                "
                class="cursor-pointer"
              >
                <img class="w-[24px]" src="@/static/cog-icon.svg" alt="" />
              </span>
              <span>You don't know the price of one piece?</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex flex-col justify-center items-end gap-2 py-1.5 px-4 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <span class="text-[14px]">{{ new Intl.NumberFormat("en-US").format(Number(calculator.costsPerReusablesContainerInEuros("reusableContainer"))) }}</span>
          </div>
          <div class="flex flex-col items-center gap-8 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <div class="text-[14px]">Costs per reusables container in €</div>
          </div>
          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-4 border-b border-b-gray-300 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <span class="text-[14px]">{{ new Intl.NumberFormat("en-US").format(Number(calculator.costsPerReusablesContainerInEuros("singleUseContainer"))) }}</span>
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex flex-col justify-center items-end gap-2 py-1.5 px-4 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <span class="text-[14px]">{{ new Intl.NumberFormat("en-US").format(Number(calculator.costsPerLidInEuros("reusableContainer"))) }}</span>
          </div>
          <div class="flex flex-col items-center gap-8 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <div class="text-[14px]">Costs per lid in €</div>
          </div>
          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-4 border-b border-b-gray-300 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <span class="text-[14px]">{{ new Intl.NumberFormat("en-US").format(Number(calculator.costsPerLidInEuros("singleUseContainer"))) }}</span>
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="bg-[#FCE9F3] relative flex justify-between items-center gap-2 py-1.5 px-4 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <img src="@/static/euro-icon.svg" alt="" />
            <span class="text-[14px]">{{ new Intl.NumberFormat("en-US").format(Number(calculator.costsPerReusablesContainerInEurosTotal("reusableContainer"))) }}</span>
          </div>
          <div class="bg-[#E7EBEF] flex flex-col items-center gap-8 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <div class="text-[14px] font-medium">Costs total (1 container+lid) in €</div>
          </div>
          <div class="bg-[#FCE9F3] relative flex justify-between items-center gap-2 py-1.5 px-4 border-b border-b-gray-300 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <span class="text-[14px]">{{ new Intl.NumberFormat("en-US").format(Number(calculator.costsPerReusablesContainerInEurosTotal("singleUseContainer"))) }}</span>
            <img src="@/static/euro-icon.svg" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="relative w-screen max-w-full flex">
      <div class="relative hidden xl:flex flex-col items-end w-3/12 bg-[#EBF3FB] px-7 py-1 before:bottom-0 before:absolute before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
        <div class="flex items-center text-[#43425D] text-[15px] max-w-[10rem] text-right">
          <span>Container raw material and manufacturing</span>
          <img ref="step2" class="absolute right-0 -mr-[16px]" :src="`step-${activateStep2 ? 'activated' : 'deactivated'}.svg`" alt="" />
        </div>
        <div class="font-nunito text-white text-[180px] leading-none font-semibold mb-16 -mr-5 -mt-3">2</div>
      </div>

      <div class="flex flex-col flex-1 w-full xl:w-9/12 px-12 pb-12">
        <div class="grid grid-cols-3">
          <div class="relative flex flex-col justify-center items-center gap-2 pb-5 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-[calc(80%)] before:bg-[#79A3DC]">
            <img class="w-[55px]" src="@/static/recycle-icon.svg" alt="" />
          </div>
          <div class="flex flex-col items-center gap-8 pb-5 px-2 text-center justify-end border border-transparent border-b-[#BBBBBB]">
            <img class="w-[50px]" src="@/static/fabric-icon.svg" alt="" />
            <div class="text-[20px] font-bold font-nunito">Container raw material and manufacturing</div>
          </div>
          <div class="relative flex flex-col justify-center items-center gap-2 pb-5 border-b border-b-gray-300 before:absolute before:bottom-0 before:left-0 before:w-px before:h-[calc(80%)] before:bg-[#79A3DC]">
            <img class="w-[55px]" src="@/static/no-two.svg" alt="" />
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex flex-col justify-center items-end gap-4 py-1.5 px-4 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <div>
              <div class="flex items-start gap-2">
                <div class="flex flex-col justify-end items-end">
                  <span class="text-xs text-[#3A84FF]">From which raw material is the lid made?</span>
                  <span class="text-[14px]">{{ store.calculator.reusableContainer.rawMaterialLid.title }}</span>
                </div>
                <span
                  @mousedown="
                    currentType = 'reusableContainer'
                    property = 'rawMaterialLid'
                    showRawMaterialModal = true
                  "
                  class="cursor-pointer"
                >
                  <img src="@/static/cog-icon.svg" alt="" class="w-[24px]" />
                </span>
              </div>
            </div>
            <div>
              <div class="flex items-start gap-2">
                <div class="flex flex-col justify-end items-end">
                  <span class="text-xs text-[#3A84FF]">How is it manufactured?</span>
                  <span class="text-[14px]">{{ store.calculator.reusableContainer.manufacturedLid.title }}</span>
                </div>
                <span
                  @mousedown="
                    currentType = 'reusableContainer'
                    property = 'manufacturedLid'
                    showManufacturedModal = true
                  "
                  class="cursor-pointer"
                >
                  <img src="@/static/cog-icon.svg" alt="" class="w-[24px]" />
                </span>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-center gap-8 py-1.5 justify-center border border-transparent border-b-[#BBBBBB]">
            <div class="text-[14px]">Material Lid</div>
          </div>
          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-4 border-b border-b-gray-300 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <div>
              <div class="flex items-start gap-2">
                <span
                  @mousedown="
                    currentType = 'singleUseContainer'
                    property = 'rawMaterialLid'
                    showRawMaterialModal = true
                  "
                  class="cursor-pointer"
                >
                  <img src="@/static/cog-icon.svg" alt="" class="w-[24px]" />
                </span>
                <div class="flex flex-col justify-end items-start">
                  <span class="text-xs text-[#3A84FF]">From which raw material is the lid made?</span>
                  <span class="text-[14px]">{{ store.calculator.singleUseContainer.rawMaterialLid.title }}</span>
                </div>
              </div>
            </div>
            <div>
              <div class="flex items-start gap-2">
                <span
                  @mousedown="
                    currentType = 'singleUseContainer'
                    property = 'manufacturedLid'
                    showManufacturedModal = true
                  "
                  class="cursor-pointer"
                >
                  <img src="@/static/cog-icon.svg" alt="" class="w-[24px]" />
                </span>
                <div class="flex flex-col justify-end items-start">
                  <span class="text-xs text-[#3A84FF]">How is it manufactured?</span>
                  <span class="text-[14px]">{{ store.calculator.singleUseContainer.manufacturedLid.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex flex-col justify-center items-end gap-4 py-1.5 px-4 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <div>
              <div class="flex items-start gap-2">
                <div class="flex flex-col justify-end items-end">
                  <span class="text-xs text-[#3A84FF]">From which raw material is the container made?</span>
                  <span class="text-[14px]">{{ store.calculator.reusableContainer.rawMaterialContainer.title }}</span>
                </div>
                <span
                  @mousedown="
                    currentType = 'reusableContainer'
                    property = 'rawMaterialContainer'
                    showRawMaterialModal = true
                  "
                  class="cursor-pointer"
                >
                  <img src="@/static/cog-icon.svg" alt="" class="w-[24px]" />
                </span>
              </div>
            </div>
            <div>
              <div class="flex items-start gap-2">
                <div class="flex flex-col justify-end items-end">
                  <span class="text-xs text-[#3A84FF]">How is it manufactured?</span>
                  <span class="text-[14px]">{{ store.calculator.reusableContainer.manufacturedContainer.title }}</span>
                </div>
                <span
                  @mousedown="
                    currentType = 'reusableContainer'
                    property = 'manufacturedContainer'
                    showManufacturedModal = true
                  "
                  class="cursor-pointer"
                >
                  <img src="@/static/cog-icon.svg" alt="" class="w-[24px]" />
                </span>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-center gap-8 py-1.5 justify-center border border-transparent border-b-[#BBBBBB]">
            <div class="text-[14px]">Material Container</div>
          </div>
          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-4 border-b border-b-gray-300 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <div>
              <div class="flex items-start gap-2">
                <span
                  @mousedown="
                    currentType = 'singleUseContainer'
                    property = 'rawMaterialContainer'
                    showRawMaterialModal = true
                  "
                  class="cursor-pointer"
                >
                  <img src="@/static/cog-icon.svg" alt="" class="w-[24px]" />
                </span>
                <div class="flex flex-col justify-end items-start">
                  <span class="text-xs text-[#3A84FF]">From which raw material is the container made?</span>
                  <span class="text-[14px]">{{ store.calculator.singleUseContainer.rawMaterialContainer.title }}</span>
                </div>
              </div>
            </div>
            <div>
              <div class="flex items-start gap-2">
                <span
                  @mousedown="
                    currentType = 'singleUseContainer'
                    property = 'manufacturedContainer'
                    showManufacturedModal = true
                  "
                  class="cursor-pointer"
                >
                  <img src="@/static/cog-icon.svg" alt="" class="w-[24px]" />
                </span>
                <div class="flex flex-col justify-end items-start">
                  <span class="text-xs text-[#3A84FF]">How is it manufactured?</span>
                  <span class="text-[14px]">{{ store.calculator.singleUseContainer.manufacturedContainer.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="bg-[#B4DBC9] relative flex justify-between items-center gap-2 py-1.5 px-4 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <img src="@/static/c02-cloud.svg" alt="" />
            <span class="text-[14px]">{{ new Intl.NumberFormat("en-US").format(Number(calculator.gCO2PerContainerForManufacturingAndRawMaterials("reusableContainer"))) }}</span>
          </div>
          <div class="bg-[#E7EBEF] flex flex-col items-center gap-8 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <div class="text-[14px]">g CO<sub>2</sub> per container for manufacturing and raw materials</div>
          </div>
          <div class="bg-[#B4DBC9] relative flex justify-between items-center gap-2 py-1.5 px-4 border-b border-b-gray-300 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <span class="text-[14px]">{{ new Intl.NumberFormat("en-US").format(Number(calculator.gCO2PerContainerForManufacturingAndRawMaterials("singleUseContainer"))) }}</span>
            <img src="@/static/c02-cloud.svg" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="relative w-screen max-w-full flex">
      <div class="relative hidden xl:flex flex-col items-end w-3/12 bg-[#EBF3FB] px-7 py-1 before:bottom-0 before:absolute before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
        <div class="flex items-center relative text-[#43425D] text-[15px] max-w-[10rem] text-right">
          <span>Transport to the washing point*</span>
          <img ref="step3" class="absolute right-0 -mr-[43px]" :src="`step-${activateStep3 ? 'activated' : 'deactivated'}.svg`" alt="" />
        </div>
        <div class="font-nunito text-white text-[180px] leading-none font-semibold mb-16 -mr-5 -mt-3">3</div>
      </div>

      <div class="flex flex-col flex-1 w-full xl:w-9/12 px-12 pb-12">
        <div class="grid grid-cols-3">
          <div class="relative flex flex-col justify-center items-center gap-2 pb-5 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-[calc(80%)] before:bg-[#79A3DC]">
            <img class="w-[55px]" src="@/static/recycle-icon.svg" alt="" />
          </div>
          <div class="flex flex-col items-center gap-8 pb-5 px-2 text-center justify-end border border-transparent border-b-[#BBBBBB]">
            <img class="w-[55px]" src="@/static/truck-icon.svg" alt="" />
            <div class="text-[20px] font-bold font-nunito">Transport to the washing point*</div>
          </div>
          <div class="relative flex flex-col justify-center items-center gap-2 pb-5 before:absolute before:bottom-0 before:left-0 before:w-px before:h-[calc(80%)] before:bg-[#79A3DC]">
            <img class="w-[55px]" src="@/static/no-two.svg" alt="" />
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex justify-end items-center gap-2 py-1.5 px-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <input v-model.number="store.calculator.reusableContainer.distanceInKmForOnsiteWashingTypeZero" type="text" class="bg-[#F3FBFF] text-[14px] text-right rounded border w-1/2 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" />
            <span class="flex justify-start text-[15px] w-[23px]">Km</span>
          </div>
          <div class="flex flex-col items-center gap-8 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <div class="text-[14px]">Distance (round-way) in km (for onsite washing type 0)</div>
          </div>
          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-2 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]"></div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex justify-end items-center gap-2 py-1.5 px-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <input v-model.number="store.calculator.reusableContainer.literConsumptionVehicleInL100kmForDiesel" type="text" class="bg-[#F3FBFF] text-[14px] text-right rounded border w-1/2 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" />
            <span class="flex justify-start text-[15px] w-[23px]">L</span>
          </div>
          <div class="flex justify-center items-center gap-2 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <span class="text-[14px]">Liter consumption vehicle in L/100km</span>
            <ToolTip text="If no data is available: Ø car: 7L, Ø truck > 7.5 t: 18-21 L. Diesel is assumed as fuel." />
          </div>
          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-2 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]"></div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex justify-end items-center gap-2 py-1.5 px-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <input v-model.number="store.calculator.reusableContainer.numberOfTransportedReusableContainers" type="text" class="bg-[#F3FBFF] text-[14px] text-right rounded border w-1/2 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" />
            <span class="flex justify-start text-[15px] w-[23px]"></span>
          </div>
          <div class="flex flex-col items-center gap-8 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <div class="text-[14px]">Number of transported reusable containers</div>
          </div>
          <div class="relative flex flex-col justify-center items-center gap-2 py-1.5 px-2 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <div class="absolute w-2/3 text-[15px] text-[#FF6701] text-center">Not applicable for single-use containers</div>
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="bg-[#B4DBC9] relative flex justify-between items-center gap-2 py-1.5 pl-4 pr-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <img src="@/static/c02-cloud.svg" alt="" />
            <div class="flex justify-between items-center gap-2">
              <span class="text-[14px]">{{ new Intl.NumberFormat("en-US").format(Number(calculator.gCO2perContainerForTransport("reusableContainer"))) }}</span>
              <span class="flex justify-start text-[15px] w-[23px]">g</span>
            </div>
          </div>
          <div class="flex flex-col items-center gap-8 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <div class="text-[14px]">g CO<sub>2</sub> per container for transport</div>
          </div>
          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-2 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]"></div>
        </div>

        <div class="grid grid-cols-3">
          <div class="bg-[#FCE9F3] relative flex justify-between items-center gap-2 py-1.5 pl-4 pr-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <img src="@/static/euro-icon.svg" alt="" />
            <div class="flex justify-between items-center gap-2">
              <span class="text-[14px]">{{ new Intl.NumberFormat("en-US").format(Number(calculator.costsForTransportPerContainerInCtFormated("reusableContainer"))) }}</span>
              <span class="flex text-transparent justify-start text-[15px] w-[23px]">0</span>
            </div>
          </div>
          <div class="bg-[#FCE9F3] flex flex-col items-center gap-8 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <div class="text-[14px]">Costs for transport per container in ct</div>
          </div>
          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-2 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]"></div>
        </div>

        <div class="mt-4 flex justify-center text-[13px] font-light">*possibly negligible if travel has to be made for other reasons anyway or if washing is done on site.</div>
      </div>
    </div>

    <div class="relative w-screen max-w-full flex">
      <div class="relative hidden xl:flex flex-col items-end w-3/12 bg-[#EBF3FB] px-7 py-1 before:bottom-0 before:absolute before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
        <div class="flex items-center text-[#43425D] text-[15px] max-w-[10rem] text-right">
          <span>End of life</span>
          <img ref="step4" class="absolute right-0 -mr-[16px]" :src="`step-${activateStep4 ? 'activated' : 'deactivated'}.svg`" alt="" />
        </div>
        <div class="font-nunito text-white text-[180px] leading-none font-semibold mb-16 -mr-5 -mt-3">4</div>
      </div>

      <div class="flex flex-col flex-1 w-full xl:w-9/12 px-12 pb-12">
        <div class="grid grid-cols-3">
          <div class="relative flex flex-col justify-center items-center gap-2 pb-5 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-[calc(80%)] before:bg-[#79A3DC]">
            <img class="w-[55px]" src="@/static/recycle-icon.svg" alt="" />
          </div>
          <div class="flex flex-col items-center gap-8 pb-5 px-2 text-center justify-end border border-transparent border-b-[#BBBBBB]">
            <img class="w-[38px]" src="@/static/trash.svg" alt="" />
            <div class="text-[20px] font-bold font-nunito">End of life</div>
          </div>
          <div class="relative flex flex-col justify-center items-center gap-2 pb-5 border-b border-b-gray-300 before:absolute before:bottom-0 before:left-0 before:w-px before:h-[calc(80%)] before:bg-[#79A3DC]">
            <img class="w-[55px]" src="@/static/no-two.svg" alt="" />
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="hidden relative flex flex-col justify-center items-end gap-2 py-3 px-6 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <div class="relative w-full">
              <button class="flex justify-end text-right w-full cursor-pointer border bg-white focus:ring-2 focus:outline-none focus:ring-blue-300 rounded text-sm px-4 py-2.5 text-center inline-flex items-center" type="button">
                <span class="pl-4 truncate"> Disposal in general waste/incernation plastics </span>
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div class="hidden absolute mt-2 z-10 bg-white divide-y divide-gray-100 rounded shadow w-full block">
                <div class="flex flex-col gap-1 items-end hover:bg-gray-100 text-right cursor-pointer px-4 py-3 text-sm text-gray-900">
                  <div>Landfill</div>
                  <div class="text-xs">(forbidden in various countries)</div>
                </div>

                <div class="flex flex-col gap-1 items-end hover:bg-gray-100 text-right cursor-pointer px-4 py-3 text-sm text-gray-900">
                  <div>Composting</div>
                </div>

                <div class="flex flex-col gap-1 items-end hover:bg-gray-100 text-right cursor-pointer px-4 py-3 text-sm text-gray-900">
                  <div>Recycling via separate collection system or via dual systems</div>
                  <div class="text-xs">(the resulting CO<sub>2</sub> emissions are counted towards the raw material of the new product)</div>
                </div>
              </div>
            </div>
          </div>

          <div class="relative flex flex-col justify-center items-end gap-2 py-3 px-6 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <end-of-life-select-box-left></end-of-life-select-box-left>
          </div>

          <div class="flex flex-col items-center gap-8 py-1.5 justify-center border border-transparent border-b-[#BBBBBB]">
            <div class="text-[14px]">What does the end of life/disposal look like?</div>
          </div>

          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-4 border-b border-b-gray-300 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <end-of-life-select-box-right></end-of-life-select-box-right>
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="bg-[#B4DBC9] relative flex justify-between items-center gap-2 py-1.5 px-4 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <img src="@/static/c02-cloud.svg" alt="" />
            <span class="text-[14px]">{{ new Intl.NumberFormat("en-US").format(Number(calculator.gCO2perContainerForEOL("reusableContainer"))) }}</span>
          </div>
          <div class="bg-[#E7EBEF] flex flex-col items-center gap-8 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <div class="text-[14px]">g CO<sub>2</sub> per container for EOL</div>
          </div>
          <div class="bg-[#B4DBC9] relative flex justify-between items-center gap-2 py-1.5 px-4 border-b border-b-gray-300 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <span class="text-[14px]">{{ new Intl.NumberFormat("en-US").format(Number(calculator.gCO2perContainerForEOL("singleUseContainer"))) }}</span>
            <img src="@/static/c02-cloud.svg" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="relative w-screen max-w-full flex">
      <div class="relative hidden xl:flex flex-col items-end w-3/12 bg-[#EBF3FB] px-7 py-1 before:bottom-0 before:absolute before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
        <div class="flex items-center text-[#43425D] text-[15px] max-w-[10rem] text-right">
          <span>Washing</span>
          <img ref="step5" class="absolute right-0 -mr-[16px]" :src="`step-${activateStep5 ? 'activated' : 'deactivated'}.svg`" alt="" />
        </div>
        <div class="font-nunito text-white text-[180px] leading-none font-semibold mb-16 -mr-5 -mt-3">5</div>
      </div>

      <div class="flex flex-col flex-1 w-full xl:w-9/12 px-12">
        <div class="grid grid-cols-3">
          <div class="relative flex flex-col justify-center items-center gap-2 pb-5 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-[calc(80%)] before:bg-[#79A3DC]">
            <img class="w-[55px]" src="@/static/recycle-icon.svg" alt="" />
          </div>
          <div class="flex flex-col items-center gap-8 pb-5 px-2 text-center justify-end border border-transparent border-b-[#BBBBBB]">
            <img class="w-[55px]" src="@/static/washing.svg" alt="" />
            <div class="text-[20px] font-bold font-nunito">Washing</div>
          </div>
          <div class="relative flex flex-col justify-center items-center gap-2 pb-5 before:absolute before:bottom-0 before:left-0 before:w-px before:h-[calc(80%)] before:bg-[#79A3DC]">
            <img class="w-[55px]" src="@/static/no-two.svg" alt="" />
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex justify-end items-center gap-2 py-1.5 px-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <input v-model.number="store.calculator.reusableContainer.numberOfContainersPerWashCycleInDishwasher" type="text" class="bg-[#F3FBFF] text-[14px] text-right rounded border w-1/2 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" />
          </div>
          <div class="flex flex-col items-center gap-8 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <div class="text-[14px]">Number of containers per wash cycle in dishwasher</div>
          </div>
          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-2 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]"></div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex justify-end items-center gap-2 py-1.5 px-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <input v-model.number="store.energyConsumptionOfTheDishwasher" type="text" class="bg-[#F3FBFF] text-[14px] text-right rounded border w-1/2 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" />
          </div>
          <div class="flex justify-center items-center gap-2 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <span class="text-[14px]">Energy consumption of the dishwasher in kW</span>
            <ToolTip text="Enter here the power of the dishwasher used in kW (not kWh!) (industrial dishwashers are often between 4-15 kW and household dishwashers between 0.7 and 2.7 kW)" />
          </div>
          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-2 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]"></div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex justify-end items-center gap-2 py-1.5 px-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <input v-model.number="store.calculator.reusableContainer.runningTimeDishwasherPerWashCycleInSec" type="text" class="bg-[#F3FBFF] text-[14px] text-right rounded border w-1/2 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" />
          </div>
          <div class="flex justify-center items-center gap-2 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <span class="text-[14px]">Running time dishwasher per wash cycle in sec</span>
          </div>
          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-2 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]"></div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex justify-end items-center gap-2 py-1.5 px-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <electricity-select-box></electricity-select-box>
          </div>
          <div class="flex flex-col items-center gap-8 py-1.5 justify-center border border-transparent border-b-[#BBBBBB]">
            <div class="text-[14px]">What electricity is used to operate the dishwasher?</div>
          </div>
          <div class="relative flex flex-col justify-center items-center gap-2 py-1.5 px-2 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <div class="absolute w-2/3 text-[15px] text-[#FF6701] text-center"></div>
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="bg-[#B4DBC9] relative flex justify-between items-center gap-2 py-1.5 pl-4 pr-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <img src="@/static/c02-cloud.svg" alt="" />
            <div class="flex justify-between items-center gap-2">
              <span class="text-[14px]">{{ new Intl.NumberFormat("en-US").format(Number(calculator.CO2InGperContainer())) }}</span>
            </div>
          </div>
          <div class="bg-[#B4DBC9] flex flex-col items-center gap-8 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <div class="text-[14px]">CO<sub>2</sub> in g per container</div>
          </div>
          <div class="relative flex flex-col justify-center items-center gap-2 py-1.5 px-2 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <div class="absolute w-2/3 text-[15px] text-[#FF6701] text-center">Not applicable for single-use containers</div>
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex justify-end items-center gap-2 py-1.5 px-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <input v-model.number="store.costsPerKwhInCt" type="text" class="bg-[#F3FBFF] text-[14px] text-right rounded border w-1/2 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" />
          </div>
          <div class="flex justify-center items-center gap-2 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <span class="text-[14px]">Costs per kwh in ct (average Germany 2020: 31.89 ct/kwh)</span>
          </div>
          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-2 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]"></div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex justify-end items-center gap-2 py-1.5 px-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <input v-model.number="store.washingCyclesPerHour" type="text" class="bg-[#F3FBFF] text-[14px] text-right rounded border w-1/2 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" />
          </div>
          <div class="flex justify-center items-center gap-2 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <span class="text-[14px]">Washing cycles per hour</span>
            <ToolTip text="Calculated from running time dishwasher with 20 % set-up time, value can be overwritten with estimated value" />
          </div>
          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-2 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]"></div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex justify-end items-center gap-2 py-1.5 px-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <input v-model.number="store.washingContainersPerHour" type="text" class="bg-[#F3FBFF] text-[14px] text-right rounded border w-1/2 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" />
          </div>
          <div class="flex justify-center items-center gap-2 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <span class="text-[14px]">Washed containers per hour</span>
          </div>
          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-2 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]"></div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex justify-end items-center gap-2 py-1.5 px-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <input v-model.number="store.staffCosts" type="text" class="bg-[#F3FBFF] text-[14px] text-right rounded border w-1/2 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" />
          </div>
          <div class="flex justify-center items-center gap-2 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <span class="text-[14px]">Staff costs (incl. incidental wage costs) per hour in €</span>
          </div>
          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-2 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]"></div>
        </div>

        <div class="grid grid-cols-3 mb-16">
          <div class="bg-[#FCE9F3] relative flex justify-between items-center gap-2 py-1.5 pl-4 pr-2 border-b border-b-gray-300 before:absolute before:bottom-0 before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
            <img src="@/static/euro-icon.svg" alt="" />
            <div class="flex justify-between items-center gap-2">
              <span class="text-[14px] font-bold">{{ new Intl.NumberFormat("en-US").format(Number(calculator.costsWashingPerContainerInCt().toFixed(1))) }}</span>
            </div>
          </div>
          <div class="bg-[#FCE9F3] flex flex-col items-center gap-8 py-1.5 justify-end border border-transparent border-b-[#BBBBBB]">
            <div class="text-[14px]">Costs washing per container (energy + personal costs) in ct</div>
          </div>
          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-2 before:absolute before:bottom-0 before:left-0 before:w-px before:h-full before:bg-[#79A3DC]"></div>
        </div>

        <div class="grid grid-cols-3 pb-4">
          <div class="flex justify-center items-center bg-white">
            <img class="w-[82px]" src="@/static/cups-1.svg" alt="" />
          </div>
          <div></div>
          <div class="flex justify-center items-center bg-white">
            <img class="w-[82px]" src="@/static/cups-3.svg" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="relative w-screen max-w-full flex bg-[#E6EDF2]">
      <div class="relative hidden xl:flex flex-col items-end w-3/12 px-7 py-1 before:bottom-0 before:absolute before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
        <div class="flex items-center text-[#43425D] text-[15px] max-w-[10rem] text-right">
          <span>Total</span>
          <img ref="step6" class="absolute right-0 -mr-[16px] -mt-[30px]" :src="`step-${activateStep6 ? 'activated' : 'deactivated'}.svg`" alt="" />
        </div>
        <div class="font-nunito text-white text-[180px] leading-none font-semibold mb-16 -mr-5 -mt-3">></div>
      </div>

      <div class="flex flex-col flex-1 w-full xl:w-9/12 px-12 pb-12 pt-5">
        <div class="grid grid-cols-3">
          <div class="relative flex flex-col justify-center items-center gap-2 pb-5">
            <span class="text-[18px] font-black">Reusables containers</span>
            <img class="z-10 w-[80px]" src="@/static/recycle-icon.svg" alt="" />
            <div class="absolute rounded-t-md bg-white w-full h-2/5 bottom-0"></div>
          </div>
          <div class="flex flex-col items-center gap-8 pb-5 px-2 text-center justify-end">
            <div class="text-[20px] font-bold font-nunito">Total</div>
          </div>
          <div class="relative flex flex-col justify-center items-center gap-2 pb-5">
            <span class="text-[18px] font-black">Single-use container</span>
            <img class="z-10 w-[80px]" src="@/static/no-two.svg" alt="" />
            <div class="absolute rounded-t-md bg-white w-full h-2/5 bottom-0"></div>
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex justify-center items-center gap-2 py-1.5 px-2 border-t-2 border-[#D8DFE3] bg-white">
            <span class="text-[16px] font-bold">{{ new Intl.NumberFormat("en-US").format(Number(calculator.CO2container("reusableContainer"))) }} g</span>
          </div>
          <div class="relative flex justify-center items-center gap-2 py-1.5 px-2 border-t-2 border-[#C5CACE] bg-[#F5F5F5]">
            <img src="@/static/c02-cloud.svg" alt="" />
            <span class="text-[15px]">CO<sub>2</sub> container</span>
          </div>
          <div class="relative flex justify-center items-center gap-2 py-1.5 px-2 border-t-2 border-[#D8DFE3] bg-white">
            <span class="text-[16px] font-bold">{{ new Intl.NumberFormat("en-US").format(Number(calculator.CO2container("singleUseContainer"))) }} g</span>
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex justify-center items-center gap-2 py-1.5 px-2 border-t-2 border-[#D8DFE3] bg-white">
            <span class="text-[16px] font-bold">{{ new Intl.NumberFormat("en-US").format(Number(calculator.costsContainer("reusableContainer"))) }} €</span>
          </div>
          <div class="relative flex justify-center items-center gap-2 py-1.5 px-2 border-t-2 border-[#C5CACE] bg-[#F5F5F5]">
            <img src="@/static/euro-icon.svg" alt="" />
            <span class="text-[15px]">Costs container</span>
          </div>
          <div class="relative flex justify-center items-center gap-2 py-1.5 px-2 border-t-2 border-[#D8DFE3] bg-white">
            <span class="text-[16px] font-bold">{{ new Intl.NumberFormat("en-US").format(Number(calculator.costsContainer("singleUseContainer"))) }} €</span>
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="relative flex justify-center items-center gap-2 py-1.5 px-2 border-t-2 border-[#D8DFE3]">
            <div class="absolute rounded-b-md bg-white w-full h-[27px] top-0"></div>
          </div>
          <div class="relative flex justify-center items-center gap-2 py-1.5 px-2 border-t-2 border-[#C5CACE]"></div>
          <div class="relative flex justify-center items-center gap-2 py-1.5 px-2 border-t-2 border-[#D8DFE3]">
            <div class="absolute rounded-b-md bg-white w-full h-[27px] top-0"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative w-screen max-w-full flex bg-[#E6EDF2]">
      <div class="relative hidden xl:flex flex-col items-end w-3/12 px-7 py-1 before:bottom-0 before:absolute before:right-0 before:w-px before:h-full before:bg-[#79A3DC]">
        <div class="flex items-center text-[#43425D] text-[15px] max-w-[12rem] text-right">
          <div>
            <span>Results Break even-point</span>
            <span class="font-bold">When are reusables better?</span>
          </div>
          <img ref="step7" class="absolute right-0 -mr-[16px]" :src="`step-${activateStep7 ? 'activated' : 'deactivated'}.svg`" alt="" />
        </div>
        <div class="font-nunito text-white text-[180px] leading-none font-semibold mb-16 -mr-5 -mt-3"></div>
      </div>

      <div class="flex flex-col flex-1 w-full xl:w-9/12 px-12 pb-12 pt-5">
        <div class="text-[32px] text-center font-nunito">Results Break even-point</div>

        <div class="text-[32px] text-center font-nunito font-bold mb-8">When are reusables better?</div>

        <div class="grid grid-cols-2">
          <div class="relative flex flex-col justify-center items-center gap-2 pb-5">
            <img class="z-10 w-[80px]" src="@/static/break-co2.svg" alt="" />
            <div class="absolute rounded-tl-md bg-white w-full h-2/5 bottom-0"></div>
          </div>
          <div class="relative flex flex-col justify-center items-center gap-2 pb-5">
            <img class="z-10 w-[80px]" src="@/static/break-euro.svg" alt="" />
            <div class="absolute rounded-tr-md bg-white w-full h-2/5 bottom-0"></div>
          </div>
        </div>

        <div class="grid grid-cols-2">
          <div class="relative flex flex-col justify-center items-center gap-2 py-1.5 pl-4 pr-6 bg-white border-r-2 border-gray-300">
            <div class="flex items-center gap-2">
              break even point after: <span class="text-[34px] font-bold">{{ new Intl.NumberFormat("en-US").format(Number(calculator.minBreakevenpointDataCO2())) }}</span> reuses
            </div>
            <div class="text-center font-nunito font-bold text-[22px]">break even point CO<sub>2</sub></div>
            <div class="flex justify-between w-full text-xs">
              <div>CO<sub>2</sub> in g</div>
              <div class="flex justify-end gap-6">
                <div class="flex items-center gap-2">
                  <span class="w-6 h-1 bg-[#3A84FF] rounded"></span><span>CO<sub>2</sub> reusables</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-6 h-1 bg-[#F1AE56] rounded"></span><span>CO<sub>2</sub> Single use</span>
                </div>
              </div>
            </div>
            <client-only>
              <chart :chart-data.sync="chartDataCo2" :styles="chartStyle"></chart>
            </client-only>
          </div>
          <div class="relative flex flex-col justify-center items-center gap-2 py-1.5 pl-4 pr-8 bg-white">
            <div class="flex items-center gap-2">
              break even point after: <span class="text-[34px] font-bold">{{ new Intl.NumberFormat("en-US").format(Number(calculator.maxBreakevenpointDataCO2())) }}</span> reuses
            </div>
            <div class="text-center font-nunito font-bold text-[22px]">break even point costs</div>
            <div class="flex justify-between w-full text-xs">
              <div>CO<sub>2</sub> in g</div>
              <div class="flex justify-end gap-6">
                <div class="flex items-center gap-2"><span class="w-6 h-1 bg-[#3A84FF] rounded"></span><span>Costs reusables</span></div>
                <div class="flex items-center gap-2"><span class="w-6 h-1 bg-[#F1AE56] rounded"></span><span>Costs Single use</span></div>
              </div>
            </div>
            <client-only>
              <chart :chart-data.sync="chartDataCosts" :styles="chartStyle"></chart>
            </client-only>
          </div>
        </div>

        <div class="grid grid-cols-2">
          <div class="relative flex justify-center items-center gap-2 py-1.5 px-2">
            <div class="absolute rounded-b-md bg-white w-full h-[27px] top-0"></div>
          </div>
          <div class="relative flex justify-center items-center gap-2 py-1.5 px-2">
            <div class="absolute rounded-b-md bg-white w-full h-[27px] top-0"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative w-screen max-w-full flex bg-[#E6EDF2]">
      <div class="relative hidden xl:flex flex-col items-end w-3/12 px-7 py-1 before:top-0 before:absolute before:right-0 before:w-px before:h-[2rem] before:bg-[#79A3DC]">
        <div class="flex items-center text-[#43425D] text-[15px] max-w-[15rem] text-right">
          <div class="flex flex-col">
            <span>Simulation for {{ store.days }} {{ store.days > 1 ? 'days' : 'day' }}</span>
            <span class="font-bold">How much can I save by switching to reusables?</span>
          </div>
          <img ref="step8" class="absolute right-0 -mr-[16px] -mt-[0px]" :src="`step-${activateStep8 ? 'activated' : 'deactivated'}.svg`" alt="" />
        </div>
        <div class="font-nunito text-white text-[180px] leading-none font-semibold mb-16 -mr-5 -mt-3"></div>
      </div>

      <div class="flex flex-col flex-1 w-full xl:w-9/12 px-12 pb-12 pt-5">
        <div class="text-[32px] text-center font-nunito font-bold">Simulation for {{ store.days }} {{ store.days > 1 ? 'days' : 'day' }}</div>

        <div class="text-[32px] text-center font-nunito mb-16">How much can I save by switching to reusables?</div>

        <div class="grid grid-cols-2">
          <div class="relative flex flex-col justify-center items-center gap-2">
            <div class="absolute rounded-tl-md bg-white w-full h-[35px] bottom-0 border-b-2 border-[#E0E0E0]"></div>
          </div>
          <div class="relative flex flex-col justify-center items-center gap-2">
            <div class="absolute rounded-tr-md bg-white w-full h-[35px] bottom-0 border-b-2 border-[#E0E0E0]"></div>
          </div>
        </div>

        <div class="grid grid-cols-2 border-b-2">
          <div class="relative flex flex-col justify-center items-center gap-2">
            <div class="flex justify-end items-center bg-white w-full h-full px-4 py-2 text-[14px]">How many days?</div>
          </div>
          <div class="relative flex flex-col justify-center items-center gap-2">
            <div class="flex justify-start items-center bg-white w-full h-full px-4 py-2 text-[14px]">
              <input v-model="store.days" type="number" min="1" @input="onChangeInputDays" class="bg-[#F3FBFF] text-[14px] rounded border w-1/3 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 border-b-2">
          <div class="relative flex flex-col justify-center items-center gap-2">
            <div class="flex justify-end items-center bg-white w-full h-full px-4 py-2 text-[14px]">How many single-use cups are needed for {{ store.days }} {{ store.days > 1 ? 'days' : 'day' }}/event/time frame?</div>
          </div>
          <div class="relative flex flex-col justify-center items-center gap-2">
            <div class="flex justify-start items-center bg-white w-full h-full px-4 py-2 text-[14px]">
              <input v-model="store.HowManySingleUseCupsAreNeededFor1yearEventTimeFrame" type="text" class="bg-[#F3FBFF] text-[14px] rounded border w-1/3 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 border-b-2">
          <div class="relative flex flex-col justify-center items-center gap-2">
            <div class="flex justify-end items-center bg-white w-full h-full px-4 py-2 text-[14px]">How high do you estimate the defect/loss rate of the reusable container in %?</div>
          </div>
          <div class="relative flex flex-col justify-center items-center gap-2">
            <div class="flex justify-start items-center bg-white w-full h-full px-4 py-2 text-[14px]">
              <input v-model="store.HowHighDoYouEstimateTheDefectLossRateOfTheReusableCupsInPercentage" type="text" class="bg-[#F3FBFF] text-[14px] rounded border w-1/3 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 border-b-2">
          <div class="relative flex flex-col justify-center items-center gap-2">
            <div class="flex justify-end items-center bg-white w-full h-full px-4 py-2 text-[14px]">These single-use container can be replaced by</div>
          </div>
          <div class="relative flex flex-col justify-center items-center gap-2">
            <div class="flex justify-start items-center gap-2 bg-white w-full h-full px-4 py-2 text-[14px]">
              <input v-model="calculator.theseSingleUseCupsCanBeReplacedBy().toFixed(1)" type="text" disabled class="bg-gray-200 bg-[#F3FBFF] text-[14px] rounded border w-1/3 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" />
              <span>reusables</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 border-b border-gray-400">
          <div class="relative flex flex-col justify-center items-center gap-2 h-[60px]">
            <div class="flex justify-end items-start bg-white w-full h-full px-4 py-2 text-[14px] text-[#979EA2]">(assumption: 1 cup in use, 1 in storage, 1 in washing)</div>
          </div>
          <div class="relative flex flex-col justify-center items-center gap-2">
            <div class="flex justify-start items-center bg-white w-full h-full px-4 py-2 text-[14px]"></div>
          </div>
        </div>

        <div class="grid grid-cols-1 border-b-2 border-gray-400">
          <div class="relative flex flex-col justify-center items-center gap-2 h-[50px]">
            <div class="flex justify-center items-center bg-white w-full h-full px-4 py-2 text-[14px]">OPTIONAL: Does a dishwasher have to be purchased?</div>
            <div @mousedown="openOptional = !openOptional" :class="{ 'rotate-180': openOptional }" class="w-5 h-5 mx-4 flex justify-center items-center absolute self-end rounded-full cursor-pointer">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        <div v-show="openOptional">
          <div class="grid grid-cols-2 border-b-2">
            <div class="relative flex flex-col justify-center items-center gap-2">
              <div class="flex justify-end items-center bg-[#EDF0F2] w-full h-full px-4 py-2 text-[14px]">Used dishwasher</div>
            </div>
            <div class="relative flex flex-col justify-center items-center gap-2">
              <div class="flex justify-start items-center bg-[#EDF0F2] w-full h-full px-4 py-2 text-[14px]">
                <used-dishwasher-select-box></used-dishwasher-select-box>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 border-b-2">
            <div class="relative flex flex-col justify-center items-center gap-2">
              <div class="flex justify-end items-center bg-[#EDF0F2] w-full h-full px-4 py-2 text-[14px]">Expected lifespan dishwasher in years</div>
            </div>
            <div class="relative flex flex-col justify-center items-center gap-2">
              <div class="flex justify-start items-center bg-[#EDF0F2] w-full h-full px-4 py-2 text-[14px]">
                <input v-model="store.ExpectedLifespanDishwasherInYears" type="text" class="bg-white text-[14px] rounded border w-1/3 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" />
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2">
            <div class="relative flex flex-col justify-center items-center gap-2">
              <div class="flex justify-end items-center bg-[#EDF0F2] w-full h-full px-4 py-2 text-[14px]">Further costs in € for dishwasher for {{ store.days }} {{ store.days > 1 ? 'days' : 'day' }}</div>
            </div>
            <div class="relative flex flex-col justify-center items-center gap-2">
              <div class="flex justify-start items-center bg-[#EDF0F2] gap-2 w-full h-full px-4 py-2 text-[14px]">
                <input v-model="store.FurtherCostsInEurosForDishwasherFor1Year" type="text" class="bg-white text-[14px] rounded border w-1/3 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" />
                <span>€</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 border-b-2">
            <div class="relative flex flex-col justify-center items-center gap-2">
              <div class="flex justify-end items-center bg-[#EDF0F2] w-full h-full px-4 py-2 text-[14px] text-[#B7C4CB]">(e.g. costs for maintenance and dishwashing detergent)</div>
            </div>
            <div class="relative flex flex-col justify-center items-center gap-2">
              <div class="flex justify-start items-center bg-[#EDF0F2] gap-2 w-full h-full px-4 py-2 text-[14px]"></div>
            </div>
          </div>

          <div class="grid grid-cols-2 border-b-2">
            <div class="relative flex flex-col justify-center items-center gap-2">
              <div class="flex justify-end items-center bg-[#EDF0F2] w-full h-full px-4 py-2 text-[14px]">Renting/Purchase costs dishwasher in €</div>
            </div>
            <div class="relative flex flex-col justify-center items-center gap-2">
              <div class="flex justify-start items-center bg-[#EDF0F2] gap-2 w-full h-full px-4 py-2 text-[14px]">
                <input v-model="store.RentingPurchaseCostsDishwasherInEuro" type="text" class="bg-white text-[14px] rounded border w-1/3 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" />
                <span>€</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 border-b-2">
            <div class="relative flex flex-col justify-center items-center gap-2">
              <div class="flex justify-end items-center bg-[#EDF0F2] w-full h-full px-4 py-2 text-[14px]">Costs dishwasher per year in €</div>
            </div>
            <div class="relative flex flex-col justify-center items-center gap-2">
              <div class="flex justify-start items-center bg-[#EDF0F2] gap-2 w-full h-full px-4 py-2 text-[14px]">
                <input v-model="calculator.costsDishwasherPerYearFormated()" disabled type="text" class="disabled:bg-gray-300 bg-white text-[14px] rounded border w-1/3 px-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-0" />
                <span>€</span>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 bg-white p-4">
          <div class="flex flex-col flex-1 w-full px-12 pb-12 pt-5">
            <div class="grid grid-cols-3">
              <div class="relative flex flex-col justify-center items-center gap-2 pb-5">
                <span class="text-[18px] font-black">Reusables containers</span>
                <img src="@/static/recycle-icon.svg" alt="" class="z-10 w-[80px]" />
                <div class="absolute rounded-t-md bg-[#C2E5E8] w-full h-2/5 bottom-0"></div>
              </div>
              <div class="flex flex-col items-center gap-8 pb-5 px-2 text-center justify-end">
                <div class="text-[20px] font-bold"></div>
              </div>
              <div class="relative flex flex-col justify-center items-center gap-2 pb-5">
                <span class="text-[18px] font-black">Single-use container</span>
                <img src="@/static/no-two.svg" alt="" class="z-10 w-[80px]" />
                <div class="absolute rounded-t-md bg-[#EEDE9D] w-full h-2/5 bottom-0"></div>
              </div>
            </div>

            <div class="grid grid-cols-3">
              <div class="relative flex justify-center items-center gap-2 py-1.5 px-2 border-t-2 border-[#C5CACE] bg-[#C2E5E8]">
                <span class="text-[16px] font-bold">{{ new Intl.NumberFormat("en-US").format(Number(calculator.CO2total1YearEventReusablesFormated())) }} kg</span>
              </div>
              <div class="relative flex justify-center items-center gap-2 py-1.5 px-2 border-t-2 border-[#C5CACE] bg-[#F5F5F5]">
                <img src="@/static/co2-cloud.svg" alt="" />
                <span class="text-[15px]">CO<sub>2</sub> total {{ store.days }} {{ store.days > 1 ? 'days' : 'day' }}/event </span>
              </div>
              <div class="relative flex justify-center items-center gap-2 py-1.5 px-2 border-t-2 border-[#C5CACE] bg-[#EEDE9D]">
                <span class="text-[16px] font-bold">{{ new Intl.NumberFormat("en-US").format(Number(calculator.CO2total1YearEventSingleUseFormated())) }} kg</span>
              </div>
            </div>

            <div class="grid grid-cols-3">
              <div class="relative flex justify-center items-center gap-2 py-1.5 px-2 border-t-2 border-[#C5CACE] bg-[#C2E5E8]">
                <span class="text-[16px] font-bold">{{ new Intl.NumberFormat("en-US").format(Number(calculator.CostsTotal1YearReusablesFormated())) }} €</span>
              </div>
              <div class="relative flex justify-center items-center gap-2 py-1.5 px-2 border-t-2 border-[#C5CACE] bg-[#F5F5F5]">
                <img src="@/static/euro-icon.svg" alt="" />
                <span class="text-[15px]">Costs total {{ store.days }} {{ store.days > 1 ? 'days' : 'day' }}</span>
              </div>
              <div class="relative flex justify-center items-center gap-2 py-1.5 px-2 border-t-2 border-[#C5CACE] bg-[#EEDE9D]">
                <span class="text-[16px] font-bold">{{ new Intl.NumberFormat("en-US").format(Number(calculator.CostsTotal1YearSingleUseFormated())) }} €</span>
              </div>
            </div>

            <div class="grid grid-cols-3">
              <div class="relative flex justify-center items-center gap-2 py-1.5 px-2 border-t-2 border-[#C5CACE]">
                <div class="absolute rounded-b-md bg-[#C2E5E8] w-full h-[27px] top-0"></div>
              </div>
              <div class="relative flex justify-center items-center gap-2 py-1.5 px-2 border-t-2 border-[#C5CACE]"></div>
              <div class="relative flex justify-center items-center gap-2 py-1.5 px-2 border-t-2 border-[#C5CACE]">
                <div class="absolute rounded-b-md bg-[#EEDE9D] w-full h-[27px] top-0"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 bg-white font-nunito text-[20px] font-bold pb-4">
          <div class="relative flex justify-center items-center gap-2 py-1.5 px-2">
            <span>Savings from switching to reusable:</span>
          </div>
        </div>

        <div class="grid grid-cols-2 bg-white gap-24">
          <div class="relative flex flex-col justify-center items-end gap-2 py-1.5 px-2">
            <div class="flex flex-col justify-center items-center">
              <img class="mb-4" src="@/static/total-co2.svg" alt="" />
              <span class="text-[22px]">CO<sub class="text-xs">2</sub> savings:</span>
              <span class="text-[28px] font-bold">{{ new Intl.NumberFormat("en-US").format(Number(calculator.CO2savings())) }}</span>
            </div>
          </div>

          <div class="relative flex flex-col justify-center items-start gap-2 py-1.5 px-2">
            <div class="flex flex-col justify-center items-center">
              <img class="mb-4" src="@/static/total-euro.svg" alt="" />
              <span class="text-[22px]">Costs savings:</span>
              <span class="text-[28px] font-bold">{{ new Intl.NumberFormat("en-US").format(Number(calculator.CostSavings())) }}</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2">
          <div class="relative flex justify-center items-center gap-2 py-1.5 px-2">
            <div class="absolute rounded-bl-md bg-white w-full h-[35px] top-0"></div>
          </div>
          <div class="relative flex justify-center items-center gap-2 py-1.5 px-2">
            <div class="absolute rounded-br-md bg-white w-full h-[35px] top-0"></div>
          </div>
        </div>
      </div>
    </div>
    <weight-modal :type="currentType" :show.sync="showWeightModal"></weight-modal>
    <price-modal :type="currentType" :show.sync="showPriceModal"></price-modal>
    <raw-material-modal :type="currentType" :property="property" :show.sync="showRawMaterialModal"></raw-material-modal>
    <manufactured-modal :type="currentType" :property="property" :show.sync="showManufacturedModal"></manufactured-modal>
  </div>
</template>

<script setup lang="ts">
import Chart from "~/components/chart.vue"
import { reactive, ref, computed, onMounted, nextTick, useRouter } from "@nuxtjs/composition-api"
import { useStore } from "~/store/app"
import WeightModal from "@/components/WeightModal.vue"
import PriceModal from "@/components/PriceModal.vue"
import RawMaterialModal from "@/components/RawMaterialModal.vue"
import ManufacturedModal from "@/components/ManufacturedModal.vue"
import EndOfLifeSelectBoxLeft from "~/components/EndOfLifeSelectBoxLeft.vue"
import EndOfLifeSelectBoxRight from "~/components/EndOfLifeSelectBoxRight.vue"
import ElectricitySelectBox from "~/components/ElectricitySelectBox.vue"
import UsedDishwasherSelectBox from "~/components/UsedDishwasherSelectBox.vue"
import ToolTip from "~/layouts/ToolTip.vue"
import { useCalculator } from "~/composables/Calculator"

const calculator = useCalculator()
const store = useStore()
const router = useRouter()

const currentType = ref<"reusableContainer" | "singleUseContainer">("reusableContainer")
const property = ref("")
const ready = ref(false)
const openOptional = ref(false)

const chartStyle = reactive({
  height: "300px",
  width: "100%",
  position: "relative"
})

const chartDataCo2 = computed(() => {
  return {
    labels: Array.from({ length: 50 }, (_, i) => i + 1),
    datasets: calculator.breakevenpointDataCO2()
  }
})

const chartDataCosts = computed(() => {
  return {
    labels: Array.from({ length: 50 }, (_, i) => i + 1),
    datasets: calculator.breakevenpointDataCosts()
  }
})

const onChangeInputDays = () => {
  if (store.days <= 0) {
    store.days = 1
  }
}

const showWeightModal = ref(false)
const showPriceModal = ref(false)
const showRawMaterialModal = ref(false)
const showManufacturedModal = ref(false)

let activateStep1 = ref(false)
let activateStep2 = ref(false)
let activateStep3 = ref(false)
let activateStep4 = ref(false)
let activateStep5 = ref(false)
let activateStep6 = ref(false)
let activateStep7 = ref(false)
let activateStep8 = ref(false)

const step1 = ref()
const step2 = ref()
const step3 = ref()
const step4 = ref()
const step5 = ref()
const step6 = ref()
const step7 = ref()
const step8 = ref()

const checkSteps = () => {
  let windowHeight = window.innerHeight / 2

  nextTick(() => {
    activateStep1.value = step1.value.getBoundingClientRect().top < windowHeight
    activateStep2.value = step2.value.getBoundingClientRect().top < windowHeight
    activateStep3.value = step3.value.getBoundingClientRect().top < windowHeight
    activateStep4.value = step4.value.getBoundingClientRect().top < windowHeight
    activateStep5.value = step5.value.getBoundingClientRect().top < windowHeight
    activateStep6.value = step6.value.getBoundingClientRect().top < windowHeight
    activateStep7.value = step7.value.getBoundingClientRect().top < windowHeight
    activateStep8.value = step8.value.getBoundingClientRect().top < windowHeight
    window.requestAnimationFrame(checkSteps)
  })
}

onMounted(() => {
  if (process.client) {
    ready.value = true
    window.requestAnimationFrame(checkSteps)
  }
  checkSteps()
})

const logout = () => {
  window.localStorage.removeItem("token")
  return router.push(`/auth/login`)
}
</script>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"

export default defineComponent({
  middleware: []
})
</script>
