import { useStore } from "~/store/app"

export function useCalculator() {
  const costsPerReusablesContainerInEuros = (type: "reusableContainer" | "singleUseContainer") => {
    const store = useStore()
    const calc = store.calculator[type].costsTotalPackagingUnitContainerInEuro / store.calculator[type].piecesInPackagingUnit
    if (isNaN(calc) || !isFinite(calc)) return Number("0").toFixed(0)
    return round(calc, 1).toFixed(1)
  }

  const costsPerLidInEuros = (type: "reusableContainer" | "singleUseContainer") => {
    const store = useStore()
    const calc = store.calculator[type].costsTotalPackagingUnitLidInEuro / store.calculator[type].piecesInPackagingLidUnit
    if (isNaN(calc) || !isFinite(calc)) return Number("0").toFixed(0)
    return round(calc, 1).toFixed(1)
  }

  const costsPerReusablesContainerInEurosTotal = (type: "reusableContainer" | "singleUseContainer") => {
    return (Number(costsPerReusablesContainerInEuros(type)) + Number(costsPerLidInEuros(type))).toFixed(1)
  }

  const gCO2PerContainerForManufacturingAndRawMaterials = (type: "reusableContainer" | "singleUseContainer") => {
    const store = useStore()
    const calc = ((store.calculator[type].weightInG / 1000) * Number(store.calculator[type].rawMaterialContainer.value) + (store.calculator[type].weightLidInG / 1000) * Number(store.calculator[type].rawMaterialLid.value) + (store.calculator[type].weightInG / 1000) * Number(store.calculator[type].manufacturedContainer.value) + (store.calculator[type].weightLidInG / 1000) * Number(store.calculator[type].manufacturedLid.value)) * 1000
    return round(calc, 0).toFixed(0)
  }

  const literConsumptionPerRoute = (type: "reusableContainer" | "singleUseContainer") => {
    const store = useStore()
    return (store.calculator[type].literConsumptionVehicleInL100kmForDiesel / 100) * store.calculator[type].distanceInKmForOnsiteWashingTypeZero
  }

  const CO2EmissionsPerRouteInKg = (type: "reusableContainer" | "singleUseContainer") => {
    return 3.24 * literConsumptionPerRoute(type)
  }

  const kgCO2perReusablesContainerForTransport = (type: "reusableContainer" | "singleUseContainer") => {
    const store = useStore()
    return CO2EmissionsPerRouteInKg(type) / store.calculator[type].numberOfTransportedReusableContainers
  }

  const gCO2perContainerForTransport = (type: "reusableContainer" | "singleUseContainer") => {
    const calc = Number(kgCO2perReusablesContainerForTransport(type) * 1000)
    if (isNaN(calc) || !isFinite(calc)) return Number("0").toFixed(0)
    return round(calc, 0).toFixed(0)
  }

  const totalTransportCostsForAllReusablesContainerInEuro = () => {
    const store = useStore()
    return literConsumptionPerRoute("reusableContainer") * store.calculator.reusableContainer.fuel
  }

  const costsForTransportPerContainerInCt = () => {
    const store = useStore()
    return (totalTransportCostsForAllReusablesContainerInEuro() / store.calculator.reusableContainer.numberOfTransportedReusableContainers) * 100
  }

  const costsForTransportPerContainerInCtFormated = () => {
    const calc = costsForTransportPerContainerInCt()
    if (isNaN(calc) || !isFinite(calc)) return Number("0").toFixed(0)
    return round(calc, 0).toFixed(0)
  }

  const weightTotal1ContainerPluslidInG = (type: "reusableContainer" | "singleUseContainer") => {
    const store = useStore()
    return store.calculator[type].weightInG + store.calculator[type].weightLidInG
  }

  const gCO2perContainerForEOL = (type: "reusableContainer" | "singleUseContainer") => {
    const store = useStore()
    const calc = (Number(weightTotal1ContainerPluslidInG(type)) / 1000) * Number(store.calculator[type].endOfLifeSelectBox.value) * 1000
    if (isNaN(calc) || !isFinite(calc)) return Number("0").toFixed(0)
    return round(calc, 0).toFixed(0)
  }

  const dishwasherRuntimePerWashCycleInH = () => {
    const store = useStore()
    return Number(store.calculator.reusableContainer.runningTimeDishwasherPerWashCycleInSec) / 3600
  }

  const KwhConsumedPerWashCycle = () => {
    const store = useStore()
    return store.energyConsumptionOfTheDishwasher * dishwasherRuntimePerWashCycleInH()
  }

  const consumedKwhPerHourFlushing = () => {
    const store = useStore()
    return KwhConsumedPerWashCycle() * store.washingCyclesPerHour
  }

  const stromCosts = () => {
    const store = useStore()
   return consumedKwhPerHourFlushing() * store.costsPerKwhInCt / 100
  }

  const CO2InGperContainer = () => {
    const store = useStore()
    const calc = (Number(store.calculator.reusableContainer.electricitySelectBox.value) * KwhConsumedPerWashCycle()) / store.calculator.reusableContainer.numberOfContainersPerWashCycleInDishwasher
    if (isNaN(calc) || !isFinite(calc)) return Number("0").toFixed(0)
    return round(calc, 1).toFixed(1)
  }

  const costsWashingPerContainerInCt = () => {
    const store = useStore()
    return stromCosts() / store.washingContainersPerHour + (store.staffCosts * 100) / store.washingContainersPerHour
  }

  const CO2container = (type: "reusableContainer" | "singleUseContainer") => {
    const calc = Number(CO2InGperContainer()) + Number(gCO2perContainerForEOL(type)) + Number(gCO2PerContainerForManufacturingAndRawMaterials(type)) + Number(gCO2perContainerForTransport(type))
    if (isNaN(calc) || !isFinite(calc)) return Number("0").toFixed(0)
    return round(calc, 1).toFixed(1)
  }

  const costsContainer = (type: "reusableContainer" | "singleUseContainer") => {
    let calc: number
    if (type === "reusableContainer") {
      calc = Number(costsWashingPerContainerInCt()) / 100 + Number(costsPerReusablesContainerInEurosTotal(type)) + Number(costsForTransportPerContainerInCt()) / 100
    } else {
      calc = Number(costsPerReusablesContainerInEurosTotal("singleUseContainer"))
    }
    if (isNaN(calc) || !isFinite(calc)) return Number("0").toFixed(0)
    return round(calc, 1).toFixed(1)
  }

  const generateBreakevenpointDataCO2 = () => {
    const data = {
      CO2Mehrweg: [] as number[],
      CO2Einweg: [] as number[],
      Differenz: [] as number[],
      Differenz2: [] as number[],
      MinDifferenz: [] as number[],
      Breakevenpoint: [] as number[]
    }

    for (let i = 1; i < 51; i++) {
      const CO2Mehrweg = (Number(CO2InGperContainer()) + Number(gCO2perContainerForEOL("reusableContainer")) / i + Number(gCO2PerContainerForManufacturingAndRawMaterials("reusableContainer")) / i + Number(gCO2perContainerForTransport("reusableContainer"))) * i
      const CO2Einweg = (Number(gCO2PerContainerForManufacturingAndRawMaterials("singleUseContainer")) + Number(gCO2perContainerForEOL("singleUseContainer"))) * i
      const Differenz = CO2Mehrweg - CO2Einweg
      const Differenz2 = Differenz < 0 ? -Differenz : Differenz

      data.CO2Mehrweg.push(CO2Mehrweg)
      data.CO2Einweg.push(CO2Einweg)
      data.Differenz.push(Differenz)
      data.Differenz2.push(Differenz2)
    }

    const MinDifferenz = Math.min(...data.Differenz2)

    for (let i = 1; i < 51; i++) {
      data.MinDifferenz.push(MinDifferenz)
    }

    for (let i = 1; i < 51; i++) {
      if (data.Differenz2[i - 1] === MinDifferenz) {
        data.Breakevenpoint.push(i)
      }
    }

    return data
  }

  const breakevenpointDataCO2 = () => {
    const data = generateBreakevenpointDataCO2()

    const ReusableContainer = {
      borderColor: "#3A84FF",
      fill: false,
      data: data.CO2Mehrweg
    }

    const SingleUseContainer = {
      borderColor: "#F1AE56",
      fill: false,
      data: data.CO2Einweg
    }

    return [ReusableContainer, SingleUseContainer]
  }

  const minBreakevenpointDataCO2 = () => {
    console.log(generateBreakevenpointDataCO2())
    const calc = Math.min(...generateBreakevenpointDataCO2().Breakevenpoint)
    if (isNaN(calc) || !isFinite(calc)) return Number("0").toFixed(0)
    return calc.toFixed(0)
  }

  const maxBreakevenpointDataCO2 = () => {
    const calc = Math.max(...generateBreakevenpointDataCO2().Breakevenpoint)
    if (isNaN(calc) || !isFinite(calc)) return Number("0").toFixed(0)
    return calc.toFixed(0)
  }

  const generateBreakevenpointDataCosts = () => {
    const data = {
      KostenMehrweg: [] as number[],
      KostenEinweg: [] as number[],
      Differenz: [] as number[],
      Differenz2: [] as number[],
      MinDifferenz: [] as number[],
      Breakevenpoint: [] as number[]
    }

    for (let i = 1; i < 51; i++) {
      const KostenMehrweg = Number(costsWashingPerContainerInCt()) / 100 + Number(costsPerReusablesContainerInEurosTotal("reusableContainer")) / i + Number(costsForTransportPerContainerInCt()) / 100
      const KostenEinweg = Number(costsPerReusablesContainerInEurosTotal("singleUseContainer")) * i
      const Differenz = KostenMehrweg - KostenEinweg
      const Differenz2 = Differenz < 0 ? -Differenz : Differenz

      data.KostenMehrweg.push(KostenMehrweg)
      data.KostenEinweg.push(KostenEinweg)
      data.Differenz.push(Differenz)
      data.Differenz2.push(Differenz2)
    }

    const MinDifferenz = Math.min(...data.Differenz2)

    for (let i = 1; i < 51; i++) {
      data.MinDifferenz.push(MinDifferenz)
    }

    for (let i = 1; i < 51; i++) {
      if (data.Differenz2[i - 1] === data.Differenz2[MinDifferenz]) {
        data.Breakevenpoint.push(i)
      }
    }

    return data
  }

  const breakevenpointDataCosts = () => {
    const data = generateBreakevenpointDataCosts()

    const ReusableContainer = {
      borderColor: "#3A84FF",
      fill: false,
      data: data.KostenMehrweg
    }

    const SingleUseContainer = {
      borderColor: "#F1AE56",
      fill: false,
      data: data.KostenEinweg
    }

    return [ReusableContainer, SingleUseContainer]
  }

  const weightInGAvailability = (type: "reusableContainer" | "singleUseContainer") => {
    const store = useStore()
    return store.calculator[type].piecesInPackagingUnit > 0 && store.calculator[type].weightPackagingUnitInKg > 0
  }

  const weightLidInGAvailability = (type: "reusableContainer" | "singleUseContainer") => {
    const store = useStore()
    return store.calculator[type].piecesInPackagingLidUnit > 0 && store.calculator[type].weightPackagingLidUnitInKg > 0
  }

  const theseSingleUseCupsCanBeReplacedBy = () => {
    const store = useStore()
    return (store.HowManySingleUseCupsAreNeededFor1yearEventTimeFrame / store.days) * 3 + (((store.HowManySingleUseCupsAreNeededFor1yearEventTimeFrame / store.days) * 3) / 100) * store.HowHighDoYouEstimateTheDefectLossRateOfTheReusableCupsInPercentage
  }

  const CO2forManufacturingDishwasherInGforOneYear = () => {
    const store = useStore()
    return (Number(store.calculator.usedDishWasher.value) * 1000) / store.ExpectedLifespanDishwasherInYears
  }

  const costsDishwasherPerYear = () => {
    const store = useStore()
    return store.RentingPurchaseCostsDishwasherInEuro / store.ExpectedLifespanDishwasherInYears + store.FurtherCostsInEurosForDishwasherFor1Year
  }

  const costsDishwasherPerYearFormated = () => {
    const calc = costsDishwasherPerYear()
    if (isNaN(calc) || !isFinite(calc)) return Number("0").toFixed(0)
    return calc.toFixed(0)
  }

  const CO2total1YearEventReusables = () => {
    return (Number(CO2container("reusableContainer")) * theseSingleUseCupsCanBeReplacedBy() + CO2forManufacturingDishwasherInGforOneYear()) / 1000
  }

  const CO2total1YearEventReusablesFormated = () => {
    const calc = CO2total1YearEventReusables()
    if (isNaN(calc) || !isFinite(calc)) return Number("0").toFixed(0)
    return calc.toFixed(0)
  }

  const CO2total1YearEventSingleUse = () => {
    const store = useStore()
    return (Number(CO2container("singleUseContainer")) * store.HowManySingleUseCupsAreNeededFor1yearEventTimeFrame) / 1000
  }

  const CO2total1YearEventSingleUseFormated = () => {
    const calc = CO2total1YearEventSingleUse()
    if (isNaN(calc) || !isFinite(calc)) return Number("0").toFixed(0)
    return calc.toFixed(0)
  }

  const CostsTotal1YearReusables = () => {
    return Number(costsContainer("reusableContainer")) * theseSingleUseCupsCanBeReplacedBy() + costsDishwasherPerYear()
  }

  const CostsTotal1YearReusablesFormated = () => {
    const calc = CostsTotal1YearReusables()
    if (isNaN(calc) || !isFinite(calc)) return Number("0").toFixed(0)
    return calc.toFixed(0)
  }

  const CostsTotal1YearSingleUse = () => {
    const store = useStore()
    return Number(costsContainer("singleUseContainer")) * store.HowManySingleUseCupsAreNeededFor1yearEventTimeFrame
  }

  const CostsTotal1YearSingleUseFormated = () => {
    const calc = CostsTotal1YearSingleUse()
    if (isNaN(calc) || !isFinite(calc)) return Number("0").toFixed(0)
    return calc.toFixed(0)
  }

  const CO2savings = () => {
    const calc = CO2total1YearEventSingleUse() - CO2total1YearEventReusables()
    if (isNaN(calc) || !isFinite(calc)) return Number("0").toFixed(0)
    return calc.toFixed(0)
  }

  const CostSavings = () => {
    const calc = CostsTotal1YearSingleUse() - CostsTotal1YearReusables()
    if (isNaN(calc) || !isFinite(calc)) return Number("0").toFixed(0)
    return calc.toFixed(0)
  }

  const createInvite = (name: string, company: string, email: string) => {
    const data = new FormData()
    data.append("name", name)
    data.append("company", company)
    data.append("email", email)
    return fetch("https://rc-inpacs.orbitacloud.com/backend/api/v1/invites/", {
      method: "POST",
      body: data
    })
  }

  const passwordResetRequest = (email: string) => {
    const data = new FormData()
    data.append("email", email)
    return fetch(`https://rc-inpacs.orbitacloud.com/backend/api/v1/password_reset/`, {
      method: "POST",
      body: data
    })
  }

  const passwordResetConfirm = (token: string, password: string) => {
    const data = new FormData()
    data.append("token", token)
    data.append("password", password)
    return fetch(`https://rc-inpacs.orbitacloud.com/backend/api/v1/password_reset/confirm/`, {
      method: "POST",
      body: data
    })
  }

  const login = (username: string, password: string) => {
    const data = new FormData()
    data.append("username", username)
    data.append("password", password)
    return fetch(`https://rc-inpacs.orbitacloud.com/backend/api/v1/token/`, {
      method: "POST",
      body: data
    })
  }

  const round = (value: number, precision: number) => {
    const multiplier = Math.pow(10, precision || 0)
    return Math.round(value * multiplier) / multiplier
  }

  return {
    costsForTransportPerContainerInCtFormated,
    round,
    passwordResetConfirm,
    login,
    passwordResetRequest,
    createInvite,
    CostSavings,
    CO2savings,
    CostsTotal1YearSingleUse,
    CostsTotal1YearSingleUseFormated,
    CostsTotal1YearReusables,
    CostsTotal1YearReusablesFormated,
    CO2total1YearEventSingleUseFormated,
    CO2total1YearEventSingleUse,
    CO2total1YearEventReusablesFormated,
    CO2total1YearEventReusables,
    costsDishwasherPerYearFormated,
    costsDishwasherPerYear,
    CO2forManufacturingDishwasherInGforOneYear,
    theseSingleUseCupsCanBeReplacedBy,
    weightInGAvailability,
    weightLidInGAvailability,
    costsPerReusablesContainerInEuros,
    costsPerLidInEuros,
    costsPerReusablesContainerInEurosTotal,
    gCO2PerContainerForManufacturingAndRawMaterials,
    literConsumptionPerRoute,
    CO2EmissionsPerRouteInKg,
    kgCO2perReusablesContainerForTransport,
    gCO2perContainerForTransport,
    costsForTransportPerContainerInCt,
    gCO2perContainerForEOL,
    weightTotal1ContainerPluslidInG,
    dishwasherRuntimePerWashCycleInH,
    KwhConsumedPerWashCycle,
    CO2InGperContainer,
    costsWashingPerContainerInCt,
    CO2container,
    costsContainer,
    generateBreakevenpointDataCO2,
    generateBreakevenpointDataCosts,
    breakevenpointDataCO2,
    minBreakevenpointDataCO2,
    maxBreakevenpointDataCO2,
    breakevenpointDataCosts
  }
}
