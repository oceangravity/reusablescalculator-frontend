declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

type QueryBoolean = 'True' | 'False' | ''

interface ProductsQueryString {
  search: string | undefined
  page: number
  category: number
  complete: string
  only_usual_products: boolean
  ordering: string
  consumption: boolean
  is_outlet: QueryBoolean
  is_eco: QueryBoolean
  is_covid: QueryBoolean
  add_extra_products: QueryBoolean
}

interface ItemList {
  id: number
  title?: string
  subtitle?: string
  value?: number | string
}

interface StateProperties {
  [key: string]: string | number | ItemList
  lifeDisposal: number
  electricity: number
  piecesInPackagingUnit: number
  weightPackagingUnitInKg: number
  piecesInPackagingLidUnit: number
  weightPackagingLidUnitInKg: number
  costsTotalPackagingUnitContainerInEuro: number
  costsTotalPackagingUnitLidInEuro: number
  rawMaterialLid: ItemList
  manufacturedLid: ItemList
  rawMaterialContainer: ItemList
  manufacturedContainer: ItemList
  endOfLifeSelectBox: ItemList
  electricitySelectBox: ItemList
  weightInG: number
  weightLidInG: number

  distanceInKmForOnsiteWashingTypeZero: number
  fuel: number
  literConsumptionVehicleInL100kmForDiesel: number
  numberOfTransportedReusableContainers: number
  numberOfContainersPerWashCycleInDishwasher: number
  energyConsumptionOfTheDishwasherInKW: number
  runningTimeDishwasherPerWashCycleInSec: number





}

interface State {
  [key: string]: StateProperties | ItemList
  reusableContainer: StateProperties
  singleUseContainer: StateProperties
  usedDishWasher: ItemList
}

interface Supplier {
  id: number
  orbis_supplier_number?: string
  name: string
}

interface ProductResult {
  id: number
  external_id: string
  name: string
  supplier: Supplier
  packets_by_package: number
  quantity_by_packet?: any
  has_image: boolean
  image_url: string
  category: number
  is_outlet: boolean
  is_eco: boolean
  is_covid: boolean
}

interface ProductsResponse {
  count: number
  next: string
  previous?: any
  total_pages: number
  results: ProductResult[]
}

interface CategoryResponse {
  id: number
  name: string
  image_url: string
  children: CategoryResponse[]
  level: number
  parent?: any
  isOpen?: boolean
}

interface TreeNodeInterface {
  id: number
  name: string
  children: TreeNodeInterface[]
  isOpen: boolean
  parent: number
}

type TreeNodeKey = keyof TreeNodeInterface

interface TotalPagesByCategory {
  [key: string]: number
}

interface App {
  productResponse: ProductsResponse
  TotalPagesByCategory: TotalPagesByCategory
}

interface AppState {
  App: App
}

interface ListBoxItem {
  id: number
  label: string
  value: number | string
  selected: boolean
}

type OrderByValue = '-rutero_consumption' | 'rutero_consumption' | 'name' | 'category'
type OrderByKey = 'most_consumed' | 'less_consumed' | 'alphabetically' | 'by_family' | 'elastic_relevance'

interface OrderBy {
  id: number
  label: string
  value: OrderByValue
  key: OrderByKey
}

type FilterByValue = 'is_covid' | 'is_eco' | 'is_outlet' | 'all'

interface LocationsItemList {
  id: number
  label: string
  value: string
}

interface FilterBy {
  id: number
  label: string
  value: FilterByValue
}

interface CategoryItem {
  id: number
  label: string
  value: number
}

interface Category {
  id: number
  name: string
  image_url: string
  level: number
  parent_id?: number
}

interface MeasurementUnit {
  id: number
  external_id: string
  name: string
  quantity: number
}

interface RelatedProduct {
  id: number
  external_id: string
  supplier_reference: string
  is_network: boolean
  is_outlet: boolean
  is_eco: boolean
  is_covid: boolean
  name: string
  description: string
  supplier: Supplier
  price: string
  is_usual_price: boolean
  special_price?: any
  final_price?: any
  stock_controlled: boolean
  affects_stock: boolean
  stock: number
  obsolete: boolean
  locked: boolean
  packets_by_package: number
  quantity_by_packet?: any
  has_image: boolean
  image_url: string
  max_discount: string
  currency_code: string
  currency_symbol: string
  center_2y_consumptions: any[]
  total_consumption: number
  measurement_unit: MeasurementUnit
  aditional_measurement_units?: any
  category: number
  favourite: boolean
  erp_description?: any
}

interface BoxType {
  value: number
  display: string
}

interface GenericType {
  value: number
  display: string
}

interface Supplier3 {
  url: string
  orbis_supplier_number: string
  name: string
  id: number
}

interface ProductType {
  name: string
  id: number
}

interface PackagingUnit {
  value: number
  display: string
}

interface Brand {
  name: string
  id: number
}

interface Category3 {
  name: string
  level: number
  id: number
}

interface PackagingType {
  name: string
  abbr: string
  id: number
}

interface ExtraInfo {
  dispensers_depth: string
  dispensers_width: string
  dispensers_height: string
  dispensers_material: string
  dishes_material: string
  dishes_diameter: string
  cloths_fabric: string
  cloths_size: string
  glasses_measurements: string
  glasses_cover: GenericType
  glasses_material: string
  glasses_capacity: string
  cutlery_material: string
  cutlery_length: string
  drink_straws_material: string
  drink_straws_diameter: string
  drink_straws_length: string
  covers_material: string
  covers_measuremments: string
  boxes_material: string
  boxes_height: string
  boxes_width: string
  boxes_length: string
  trays_cover: GenericType
  trays_material: string
  tray_compartments: string
  trays_height: string
  trays_width: string
  trays_length: string
  feather_total_height: string
  feather_pole_height_min: string
  feather_pole_height_max: string
  feather_feathers_length: string
  feather_handle_material: string
  feather_feathers_material: string
  flat_mopping_pole_material: string
  flat_mopping_base_material: string
  flat_mopping_base_color: string
  flat_mopping_pole_height_min: string
  flat_mopping_pole_height_max: string
  flat_mopping_bracket_width: string
  flat_mopping_bracket_length: string
  flat_mopping_base_width: string
  flat_mopping_base_length: string
  dustpans_pole_material: string
  dustpans_Color: string
  dustpans_base_material: string
  dustpans_pole_height: string
  dustpans_depth: string
  dustpans_width: string
  handles_poles_thread: string
  handles_poles_pole_material: string
  handles_poles_base_material: string
  handles_poles_pole_color: string
  handles_poles_base_color: string
  handles_poles_pole_weight: string
  handles_poles_grammage: string
  handles_poles_diameter: string
  handles_poles_thickness: string
  handles_poles_pole_height_min: string
  handles_poles_pole_height_max: string
  handles_poles_base_width: string
  handles_poles_base_length: string
  floor_squeegees_pole_material: string
  floor_squeegees_pole_height: string
  floor_squeegees_thread: string
  floor_squeegees_strecher_material: string
  floor_squeegees_width: string
  floor_squeegees_rubber: string
  mops_thread: string
  mops_length: string
  mops_grammage: string
  mops_thickness: string
  mops_fabric: string
  brushes_thread: string
  brushes_height: string
  brushes_width: string
  brushes_length: string
  brushes_hardness: string
  brushes_fabric: string
  brushes_color: string
  brushes_base_material: string
  scrapers_blades_blade_material: string
  scrapers_blades_handle_length: string
  scrapers_blades_handle_material: string
  scrapers_blades_base_material: string
  scrapers_blades_width: string
  washers_handle_material: string
  washers_cover_material: string
  washers_width: string
  buckets_weight: string
  buckets_height: string
  buckets_width: string
  buckets_length: string
  buckets_volume: string
  buckets_material: string
  window_squeegees_handle_material: string
  window_squeegees_channel_material: string
  window_squeegees_width: string
  poles_height_min: string
  poles_height_max: string
  poles_material: string
  scourers_diameter: string
  scourers_cloths_total_length: string
  scourers_cloths_length: string
  scourers_cloths_width: string
  scourers_cloths_thickness: string
  scourers_cloths_weight: string
  scourers_cloths_dimensions: string
  gloves_certifications: string
  gloves_pair_weight: string
  gloves_unitary_weight: string
  gloves_size: string
  gloves_sizes: GenericType
  gloves_unfolded_length: string
  gloves_usage_type: GenericType
  wrap_weight: string
  wrap_thickness: string
  wrap_length: string
  wrap_width: string
  wrapping_type: GenericType
  bag_density: GenericType
  material: GenericType
  gauge: string
  width: string
  length: string
  unfolded_width: string
  unfolded_length: string
  folded_width: string
  folded_length: string
  total_length: string
  service_length: string
  services: string
  tube_diameter: string
  roll_diameter: string
  roll_width: string
  pulp_grammage: string
  layers: string
  pulp_type: GenericType
  candles_motive: string
  candles_material: string
  candles_odor: string
  candles_height: string
  generic_material: string
  candles_duration: string
  candles_diameter: string
  candles_color: string
  candles_dimension: string
  description_short: string
  is_discontinued: boolean
  box_quantity: number
  dosage: string
  generic_capacity: string
  weight_gross: string
  generic_height: string
  generic_width: string
  pallet: string
  generic_length: string
  weight_net: string
  designation: string
  box: string
  model: string
  usage: string
  product: number
  color: string
  box_type: BoxType
  name: string
  packaging: string
  viscosity: string
  fragrance: string
  supplier: Supplier3
  product_type: ProductType
  packaging_unit: PackagingUnit
  applications: string
  external_published: boolean
  packaging_quantity: string
  appearance: string
  id: number
  box_weight: string
  ha_register: boolean
  density: string
  eco_certifications: any[]
  environmental_notes: string
  sustainability_index: string
  is_adr: boolean
  is_eco: boolean
  is_outlet: boolean
  description: string
  brand: Brand
  fragrance_es: string
  category: Category3
  created: Date
  modified: Date
  packaging_type: PackagingType
  box_volume: string
  fragrance_en: string
  ph: string
  ph_1_percent: boolean
}

interface ExtraSafetySymbol {
  id: number
  name: string
  symbol_type: string
  symbol_type_external_id: string
  image_url: string
}

interface ProductResponse {
  id: number
  external_id: string
  name: string
  description?: any
  category?: Category
  supplier?: Supplier
  supplier_reference: string
  packages_by_pallet?: any
  packets_by_package: number
  quantity_by_packet?: any
  is_covid: boolean
  is_eco: boolean
  is_outlet: boolean
  measurement_unit?: MeasurementUnit
  has_image: boolean
  image_url: string
  images: string[]
  doc_technical_url: string
  doc_security_url: string
  categories_root: Category[]
  categories: Category[]
  related_products: RelatedProduct[]
  extra_info?: ExtraInfo
  extra_images: string[]
  safety_symbol_type_obligation_id: string
  safety_symbol_type_security_id: string
  extra_safety_symbols?: ExtraSafetySymbol[]
}

interface ProductResponsePool {
  [id: number]: ProductResponse
}

interface FlatTree {
  [id: number]: TreeNodeInterface
}
