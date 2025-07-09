/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ArrayFamilyDto {
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  pageNumber: number;
  /** @format int32 */
  count: number;
  /** @format double */
  pageCount?: number;
  datas: FamilyDto[] | null;
}

export interface ArrayFlowDto {
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  pageNumber: number;
  /** @format int32 */
  count: number;
  /** @format double */
  pageCount?: number;
  datas: FlowDto[] | null;
}

export interface ArrayMessageDto {
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  pageNumber: number;
  /** @format int32 */
  count: number;
  /** @format double */
  pageCount?: number;
  datas: MessageDto[] | null;
}

export interface ArrayProductWithVarietyDto {
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  pageNumber: number;
  /** @format int32 */
  count: number;
  /** @format double */
  pageCount?: number;
  datas: ProductWithVarietyDto[] | null;
}

export interface ArrayStockDto {
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  pageNumber: number;
  /** @format int32 */
  count: number;
  /** @format double */
  pageCount?: number;
  datas: StocksStateDto[] | null;
}

export interface ArrayVariantDto {
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  pageNumber: number;
  /** @format int32 */
  count: number;
  /** @format double */
  pageCount?: number;
  datas: VariantDto[] | null;
}

export interface BaseEntite {
  /** @format uuid */
  id?: string;
  /** @format date-time */
  creationDate?: string;
  /** @format date-time */
  updateDate?: string;
}

export type BaseEntityRepo = BaseEntitySimple & {
  label?: string | null;
  image?: string | null;
};

export interface BaseEntitySimple {
  /** @format int32 */
  id?: number;
}

export type Calendar = BaseEntite & {
  variantName?: string | null;
  /** @format double */
  minGerminationTemperature?: number;
  scenarios?: Scenario[] | null;
  variant?: Variant | null;
  station?: Station | null;
  mustRefresh?: boolean;
};

export interface CalendarDto {
  /** @format uuid */
  variantId?: string;
  variant?: string | null;
  /** @format double */
  minGerminationTemperature?: number;
  scenario?: ScenarioDto[] | null;
}

export type Captcha = BaseEntite & {
  value?: string | null;
  isActive?: boolean;
  /** @format date-time */
  activationDate?: string;
};

export interface CaptchaDto {
  image?: string | null;
  /** @format uuid */
  id?: string;
}

export type Category = BaseEntityRepo & object;

export interface CategoryDto {
  /** @format int32 */
  id?: number;
  label?: string | null;
  image?: string | null;
}

export type Climate = BaseEntityRepo & {
  comment?: string | null;
};

export interface CredentialDto {
  /** @minLength 1 */
  email: string;
  /** @minLength 1 */
  password: string;
}

export interface Designation {
  name?: string | null;
  image?: string | null;
  imageSource?: string | null;
}

export type Email = BaseEntite & {
  address?: string | null;
  /** @format date-time */
  sendingDate?: string;
  subject?: string | null;
  content?: string | null;
  result?: string | null;
};

export interface EphemeridsDto {
  /** @format date */
  date?: string;
  currentDate: string | null;
  saintName: string | null;
  saying?: string | null;
  moonPhase: PhaseResult | null;
  sunData: SunDataDto | null;
  station: StationDto | null;
}

export type Event = BaseEntite & {
  /** @format date */
  date?: string;
  stage: Stage | null;
  flow?: Flow | null;
};

export interface EventDto {
  /** @format uuid */
  id?: string;
  stage?: StageDto | null;
  /** @format date */
  date?: string;
}

export type Family = BaseEntite & {
  designation?: Designation | null;
  description?: string | null;
  descriptionSource?: string | null;
  category?: Category | null;
  /** @format double */
  germinationMinimalTemperature?: number | null;
  /** @format double */
  germinationOptimaleTemperature?: number | null;
  /** @format int32 */
  minimalRisingTime?: number | null;
  /** @format int32 */
  maximumRisingTime?: number | null;
  /** @format double */
  idealGrowingTemperature?: number | null;
  /** @format double */
  zeroVegetation?: number | null;
  /** @format int32 */
  sunshineDuration?: number | null;
};

export interface FamilyDto {
  /** @format uuid */
  id?: string | null;
  name?: string | null;
  image?: string | null;
  imageSource?: string | null;
  description?: string | null;
  descriptionSource?: string | null;
  /** @format int32 */
  categoryId?: number;
  categoryName?: string | null;
  categoryImage?: string | null;
  /** @format double */
  germinationMinimalTemperature?: number | null;
  /** @format double */
  germinationOptimaleTemperature?: number | null;
  /** @format int32 */
  minimalRisingTime?: number | null;
  /** @format int32 */
  maximumRisingTime?: number | null;
  /** @format double */
  idealGrowingTemperature?: number | null;
  /** @format double */
  zeroVegetation?: number | null;
  /** @format int32 */
  sunshineDuration?: number | null;
}

export type Flow = BaseEntite & {
  variant: Variant;
  currentStage: Stage | null;
  events: Event[];
  isClosed?: boolean;
  /** @format int32 */
  year: number;
  /** @format int32 */
  numberOfDaysSinceStart?: number;
  user?: User | null;
};

export interface FlowDetailDto {
  product?: ProductWithVarietyDto | null;
  isClosed?: boolean;
  /** @format int32 */
  year?: number;
  /** @format double */
  numberOfDaysSinceStart?: number;
  currentStage?: StageDto | null;
  events?: EventDto[] | null;
}

export interface FlowDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  variantId?: string;
  name: string | null;
  variety: string | null;
  image: string | null;
  category: CategoryDto | null;
  startStage: StageDto | null;
  /** @format date */
  startDate: string;
  /** @format date */
  expectedHarvestDate?: string | null;
  expiredHarvestDate?: boolean;
}

export interface ForecastStationDto {
  /** @format uuid */
  id?: string;
  codeDepartement?: string | null;
  name?: string | null;
  /** @format double */
  latitude?: number;
  /** @format double */
  longitude?: number;
  climateName?: string | null;
}

export enum Hemispheres {
  Northern = 'Northern',
  Southern = 'Southern',
}

export type HttpValidationProblemDetails = ProblemDetails & {
  errors?: Record<string, string[]>;
  [key: string]: any;
};

export interface MeDto {
  name: string | null;
  email: string | null;
  typeUser: TypesUser;
}

export type Message = BaseEntite & {
  image?: string | null;
  content?: string | null;
  user?: User | null;
};

export interface MessageDto {
  /** @format uuid */
  id?: string;
  image?: string | null;
  content?: string | null;
  /** @format date-time */
  creationDate?: string;
  isSpecific?: boolean;
}

export interface MonthTabDto {
  isActive?: boolean;
  isIndoor?: boolean;
  /** @format double */
  averageTemperature?: number;
}

export interface NewFlowDto {
  /** @format uuid */
  variantId?: string;
  /** @format int32 */
  startStageId: number;
  /** @format date */
  startDate: string;
}

export interface NewStageDto {
  /** @format int32 */
  id?: number;
  /** @format date */
  date?: string;
}

export interface NewStockDto {
  /** @format uuid */
  productId?: string;
}

export type Package = BaseEntite & {
  /** @format date */
  expirationDate?: string;
  /** @format double */
  remainingQuantity?: number;
  /** @format date */
  purchaseDate?: string;
  hasExpiratedPackage?: boolean;
};

export interface PackageDto {
  /** @format uuid */
  id?: string;
  /** @format date-time */
  expirationDate: string;
  /** @format double */
  remainingQuantity: number;
  /** @format date-time */
  purchaseDate?: string;
}

export interface PhaseResult {
  name?: string | null;
  emoji?: string | null;
  /** @format double */
  daysIntoCycle?: number;
  hemisphere?: Hemispheres;
  /** @format date-time */
  moment?: string;
  /** @format double */
  visibility?: number;
}

export type PhysicalMeasurements = BaseEntite & {
  /** @format int32 */
  month?: number;
  /** @format double */
  maxTemperature?: number;
  /** @format double */
  minTemperature?: number;
  /** @format double */
  averageTemperature?: number;
  /** @format double */
  sunDuration?: number;
  station: Station | null;
};

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
}

export interface ProductWithDescriptionDto {
  /** @format uuid */
  id?: string;
  familyName?: string | null;
  familyImage?: string | null;
  name?: string | null;
  image?: string | null;
  imageSource?: string | null;
  description?: string | null;
  descriptionSource?: string | null;
  /** @format int32 */
  maxMaturationDaysCount?: number;
  /** @format int32 */
  minMaturationDaysCount?: number;
  seeding?: Sowing | null;
  harvesting?: Sowing | null;
  /** @format double */
  germinationMinimalTemperature?: number | null;
  /** @format double */
  germinationOptimaleTemperature?: number | null;
  /** @format double */
  minimalRisingTime?: number | null;
  /** @format double */
  maximumRisingTime?: number | null;
  /** @format double */
  idealGrowingTemperature?: number | null;
  /** @format double */
  zeroVegetation?: number | null;
  /** @format int32 */
  sunshineDuration?: number | null;
}

export interface ProductWithNameDto {
  name?: string | null;
  image?: string | null;
  category?: CategoryDto | null;
}

export type ProductWithVarietyDto = ProductWithNameDto & {
  /** @format uuid */
  id?: string;
  variety?: string | null;
};

export interface ResetPasswordRequestDto {
  /** @minLength 1 */
  email: string;
}

export type ResetPasswordResponseDto = ResetPasswordRequestDto & {
  /** @minLength 1 */
  resetWord: string;
  /** @minLength 1 */
  newPassword: string;
};

export type Scenario = BaseEntite & {
  germinationRisk?: boolean;
  startingIndoor?: boolean;
  /** @format int32 */
  seedingMonth?: number;
  /** @format int32 */
  harvestMonth?: number;
  /** @format int32 */
  estimatedMaturationDuration?: number;
  /** @format int32 */
  estimatedRisingDuration?: number;
  /** @format double */
  maxTemperatureInStats?: number;
  /** @format double */
  minTemperatureInStats?: number;
  /** @format double */
  averageTemperatureInStats?: number;
};

export interface ScenarioDto {
  monthTab?: MonthTabDto[] | null;
  startingIndoor?: boolean;
  /** @format int32 */
  seedingMonth?: number;
  /** @format int32 */
  harvestMonth?: number;
  /** @format int32 */
  maturationDuration?: number;
  /** @format int32 */
  risingDuration?: number;
  germinationRisk?: boolean;
  /** @format double */
  minTemperatureInStats?: number;
  /** @format double */
  maxTemperatureInStats?: number;
  /** @format double */
  averageTemperatureInStats?: number;
}

export type Search = BaseEntite & {
  searchDesignation?: Designation | null;
  /** @format int32 */
  searchCount?: number;
};

export interface Sowing {
  january?: boolean;
  february?: boolean;
  march?: boolean;
  april?: boolean;
  may?: boolean;
  june?: boolean;
  july?: boolean;
  august?: boolean;
  september?: boolean;
  october?: boolean;
  november?: boolean;
  december?: boolean;
}

export type Stage = BaseEntityRepo & {
  /** @format int32 */
  rank?: number;
  isMultiple?: boolean;
  category: Category;
};

export interface StageDto {
  /** @format int32 */
  id?: number;
  label?: string | null;
  image?: string | null;
  /** @format int32 */
  rank?: number;
}

export type Station = BaseEntite & {
  inseeCode?: string | null;
  code?: string | null;
  name?: string | null;
  tendency?: string | null;
  /** @format double */
  latitude?: number;
  /** @format double */
  longitude?: number;
  /** @format int32 */
  altitude?: number;
  isDepartment?: boolean;
  climate?: Climate | null;
};

export interface StationDto {
  climatName?: string | null;
  climatImage?: string | null;
  climatComment?: string | null;
  stationName?: string | null;
  codeDepartment?: string | null;
  inseeCode?: string | null;
}

export type Stock = BaseEntite & {
  variant?: Variant | null;
  packages?: Package[] | null;
  user?: User | null;
};

export interface StockDto {
  /** @format uuid */
  id?: string;
  packages?: PackageDto[] | null;
  product: ProductWithVarietyDto;
}

export interface StockQuantityDto {
  /** @format double */
  remainingQuantity: number;
}

export interface StocksStateDto {
  /** @format uuid */
  id: string;
  /** @format uuid */
  productId: string;
  productName: string | null;
  productVariety: string | null;
  varietyImage: string | null;
  /** @format double */
  seedQuantity?: number;
  /** @format int32 */
  packageCount?: number;
  hasExpiratedPackage?: boolean;
  /** @format date-time */
  expirationDate?: string;
}

export interface SunDataDto {
  currentSeason?: string | null;
  sunRise?: string | null;
  sunSet?: string | null;
  deltaDuration?: string | null;
  sunDuration?: string | null;
}

export interface TokenDto {
  token: string | null;
  /** @format double */
  expires_in: number;
  token_type: string | null;
  scope: string | null;
}

export enum TypesUser {
  NONE = 'NONE',
  SIMPLEUSER = 'SIMPLEUSER',
  ADMINISTRATOR = 'ADMINISTRATOR',
}

export type User = BaseEntite & {
  /** @minLength 1 */
  name: string;
  /**
   * @format email
   * @minLength 1
   */
  email: string;
  /**
   * @format password
   * @minLength 1
   */
  password: string;
  active: boolean;
  resetWord?: string | null;
  /** @format date-time */
  expirationResetDate?: string | null;
  typeUser?: TypesUser;
  station?: Station | null;
};

export interface UserDto {
  /** @minLength 1 */
  name: string;
  /** @minLength 1 */
  email: string;
  /** @minLength 1 */
  password: string;
  captchaValue?: string | null;
  /** @format uuid */
  captchaId?: string | null;
  /** @format uuid */
  stationId?: string | null;
}

export type Variant = BaseEntite & {
  designation?: Designation | null;
  sowingMonths?: Sowing | null;
  harvestMonths?: Sowing | null;
  /** @format int32 */
  minMaturationDaysCount?: number;
  /** @format int32 */
  maxMaturationDaysCount?: number;
  family?: Family | null;
};

export interface VariantDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  familyId?: string;
  name?: string | null;
  familyName?: string | null;
  image?: string | null;
  imageSource?: string | null;
  familyImage?: string | null;
  description?: string | null;
  descriptionSource?: string | null;
  /** @format int32 */
  maxMaturationDaysCount?: number;
  /** @format int32 */
  minMaturationDaysCount?: number;
  sowingMonths?: Sowing | null;
  harvestMonths?: Sowing | null;
  /** @format int32 */
  categoryId?: number;
  categoryName?: string | null;
  categoryImage?: string | null;
  /** @format double */
  germinationMinimalTemperature?: number | null;
  /** @format double */
  germinationOptimaleTemperature?: number | null;
  /** @format double */
  minimalRisingTime?: number | null;
  /** @format double */
  maximumRisingTime?: number | null;
  /** @format double */
  idealGrowingTemperature?: number | null;
  /** @format double */
  zeroVegetation?: number | null;
  /** @format int32 */
  sunshineDuration?: number | null;
}
