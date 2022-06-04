// @ts-check
import { defineStore } from "pinia"

const rawMaterialOptions = [
  { id: 0, title: "Unknown (use average)", value: 0 },
  { id: 1, title: "PP (thermoplast)", value: 1.96 },
  { id: 2, title: "PP with 50% recycled content", value: 1.38 },
  { id: 3, title: "PP with wood fibres", value: 1.65 },
  { id: 4, title: "PS", value: 3.48 },
  { id: 5, title: "PE", value: 3.9 },
  { id: 6, title: "PLA", value: 2.17 },
  { id: 7, title: "PC (polycarbonate)", value: 7.75 },
  { id: 8, title: "PBT", value: 4.13 },
  { id: 9, title: "ABS (thermoplast)", value: 3.86 },
  { id: 10, title: "PET", value: 3.06 },
  { id: 11, title: "rPET (recycled material)", value: 0.57 },
  { id: 12, title: "Melamin (duroplast)", value: 5.08 },
  { id: 13, title: "Aluminum", value: 8.81 },
  { id: 14, title: "Stainless steal", value: 5.5 },
  { id: 15, title: "Glass (manufacturing included)", value: 0.8 },
  { id: 16, title: "Ceramics (manufacturing included)", value: 0.62 },
  { id: 17, title: "Unbleached cardboard", value: 1.3 },
  { id: 18, title: "Bleached cardboard", value: 2.6 },
  { id: 19, title: "Palm leave (with manufacturing)", value: 1.04 },
  { id: 20, title: "Bagasse (with manufacturing)", value: 1.04 },
  { id: 21, title: "Molded paper (with manufacturing)", value: 1.04 }
] as ItemList[]

const manufacturedOptions = [
  { id: 0, title: "Unknown (use average)", value: 1.41 },
  { id: 1, title: "Injection molding (plastics)", value: 1.72 },
  { id: 2, title: 'Thermoforming/"deep drawing" (plastics)', value: 1.06 },
  { id: 3, title: 'Thermoforming/"deep drawing" PS', value: 1.12 },
  { id: 4, title: 'Thermoforming/"deep drawing" PET', value: 1.3 },
  { id: 5, title: "Stretch blow molding (e.g. PET bottle)", value: 2.15 },
  { id: 6, title: "Cold extrusion aluminum", value: 1.13 },
  { id: 7, title: "Hot extrusion stainless steel", value: 1.36 },
  { id: 8, title: "Manufacturing already included with raw material", value: 0 }
] as ItemList[]

const endOfLifeSelectBox = [
  {
    id: 0,
    title: "Disposal in general waste/incernation plastics",
    subtitle: "",
    value: 2.36
  },
  {
    id: 1,
    title: "Landfill",
    subtitle: "(forbidden in various countries)",
    value: 0.09
  },
  {
    id: 2,
    title: "Composting",
    subtitle: "",
    value: 0.261
  },
  {
    id: 3,
    title: "Recycling via separate collection system or via dual systems",
    subtitle: "(the resulting CO<sub>2</sub> emissions are counted towards the raw material of the new product)",
    value: 0
  }
] as ItemList[]

const electricitySelectBox = [
  {
    id: 0,
    title: "EU average energy mix",
    subtitle: "",
    value: 255
  },
  {
    id: 1,
    title: "Energy mix Germany",
    subtitle: "",
    value: 401
  },
  {
    id: 2,
    title: "Average green energy  Germany",
    subtitle: "",
    value: 40.1
  },
  {
    id: 3,
    title: "Hydropower",
    subtitle: "(Germany)",
    value: 2.7
  },
  {
    id: 4,
    title: "Wind energy off shore",
    subtitle: "(Germany)",
    value: 4.4
  },
  {
    id: 5,
    title: "Wind energy on shore",
    subtitle: "(Germany)",
    value: 8.8
  },
  {
    id: 6,
    title: "Solar",
    subtitle: "(Germany)",
    value: 55.7
  }
] as ItemList[]

const usedDishWasher = [
  {
    id: 0,
    title: "Household dishwasher",
    subtitle: "",
    value: 295
  },
  {
    id: 1,
    title: "Industrial dishwasher",
    subtitle: "",
    value: 464
  },
  {
    id: 2,
    title: "Used/second hand dishwasher",
    subtitle: "",
    value: 0
  }
] as ItemList[]

export const useStore = defineStore({
  id: "app",
  state: () => ({
    calculator: {
      reusableContainer: {
        lifeDisposal: 0,
        electricity: 0,
        piecesInPackagingUnit: 0,
        weightPackagingUnitInKg: 0,
        piecesInPackagingLidUnit: 0,
        weightPackagingLidUnitInKg: 0,
        costsTotalPackagingUnitLidInEuro: 0,
        costsTotalPackagingUnitContainerInEuro: 0,
        manufacturedLid: manufacturedOptions[0],
        rawMaterialLid: rawMaterialOptions[0],
        manufacturedContainer: manufacturedOptions[0],
        rawMaterialContainer: rawMaterialOptions[0],
        endOfLifeSelectBox: endOfLifeSelectBox[0],
        electricitySelectBox: electricitySelectBox[0],
        weightInG: 0,
        weightLidInG: 0,

        distanceInKmForOnsiteWashingTypeZero: 0,
        fuel: 1.5,
        numberOfTransportedReusableContainers: 0,
        literConsumptionVehicleInL100kmForDiesel: 0,
        numberOfContainersPerWashCycleInDishwasher: 0,
        energyConsumptionOfTheDishwasherInKW: 8,
        runningTimeDishwasherPerWashCycleInSec: 300

      },
      singleUseContainer: {
        lifeDisposal: 0,
        electricity: 0,
        piecesInPackagingUnit: 0,
        weightPackagingUnitInKg: 0,
        piecesInPackagingLidUnit: 0,
        weightPackagingLidUnitInKg: 0,
        costsTotalPackagingUnitLidInEuro: 0,
        costsTotalPackagingUnitContainerInEuro: 0,
        manufacturedLid: manufacturedOptions[0],
        rawMaterialLid: rawMaterialOptions[0],
        manufacturedContainer: manufacturedOptions[0],
        rawMaterialContainer: rawMaterialOptions[0],
        endOfLifeSelectBox: endOfLifeSelectBox[0],
        electricitySelectBox: electricitySelectBox[0],
        weightInG: 0,
        weightLidInG: 0,

        distanceInKmForOnsiteWashingTypeZero: 0,
        fuel: 1.5,
        numberOfTransportedReusableContainers: 0,
        literConsumptionVehicleInL100kmForDiesel: 0,
        numberOfContainersPerWashCycleInDishwasher: 0,
        energyConsumptionOfTheDishwasherInKW: 8,
        runningTimeDishwasherPerWashCycleInSec: 300
      },
      usedDishWasher: usedDishWasher[0]
    } as State,
    rawMaterialOptions: rawMaterialOptions,
    manufacturedOptions: manufacturedOptions,
    endOfLifeSelectBox: endOfLifeSelectBox,
    electricitySelectBox: electricitySelectBox,
    usedDishWasher: usedDishWasher,
    HowManySingleUseCupsAreNeededFor1yearEventTimeFrame: 0 as number,
    HowHighDoYouEstimateTheDefectLossRateOfTheReusableCupsInPercentage: 0 as number,
    TheseSingleUseCupsCanBeReplacedBy: 0 as number,
    ExpectedLifespanDishwasherInYears: 0 as number,
    FurtherCostsInEurosForDishwasherFor1Year: 0 as number,
    CO2forManufacturingDishwasherInGforOneYear: 0 as number,
    RentingPurchaseCostsDishwasherInEuro: 0 as number,
    energyConsumptionOfTheDishwasher: 8 as number,
    runningTimeDishwasherPerWashCycleInSec: 300 as number,
    costsPerKwhInCt: 28 as number,
    washingCyclesPerHour: 9.6 as number,
    washingContainersPerHour: 480 as number,
    staffCosts: 0 as number,
    days: 365 as number
  }),

  getters: {},

  actions: {
    setCalculator(type: "reusableContainer" | "singleUseContainer", property: string, value: number | string) {
      this.calculator[type][property] = value
    }
  }
})
