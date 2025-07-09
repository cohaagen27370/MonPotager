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

import {
  ArrayFamilyDto,
  ArrayFlowDto,
  ArrayMessageDto,
  ArrayProductWithVarietyDto,
  ArrayStockDto,
  ArrayVariantDto,
  CalendarDto,
  CaptchaDto,
  CategoryDto,
  CredentialDto,
  EphemeridsDto,
  FamilyDto,
  FlowDetailDto,
  ForecastStationDto,
  HttpValidationProblemDetails,
  MeDto,
  NewFlowDto,
  NewStageDto,
  NewStockDto,
  PackageDto,
  ProblemDetails,
  ProductWithDescriptionDto,
  ProductWithNameDto,
  ProductWithVarietyDto,
  ResetPasswordRequestDto,
  ResetPasswordResponseDto,
  StageDto,
  StockDto,
  StockQuantityDto,
  TokenDto,
  UserDto,
  Variant,
  VariantDto,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class V1<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Admin
   * @name GetAllProducts
   * @summary Get add products
   * @request GET:/v1/admin/products
   * @secure
   */
  getAllProducts = (
    query: {
      /** @format int32 */
      pageNumber: number;
      /**
       * @format int32
       * @default 10
       */
      pageSize?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ArrayVariantDto, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/admin/products`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name GetAllFamilies
   * @summary Get all families
   * @request GET:/v1/admin/families
   * @secure
   */
  getAllFamilies = (
    query: {
      /** @format int32 */
      pageNumber: number;
      /**
       * @format int32
       * @default 10
       */
      pageSize?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ArrayFamilyDto, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/admin/families`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name AddNewFamily
   * @summary Add new family
   * @request POST:/v1/admin/families
   * @secure
   */
  addNewFamily = (data: FamilyDto, params: RequestParams = {}) =>
    this.request<string, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/admin/families`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name DeleteFamily
   * @summary Remove a family
   * @request DELETE:/v1/admin/families/{familyId}
   * @secure
   */
  deleteFamily = (familyId: string, params: RequestParams = {}) =>
    this.request<void, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/admin/families/${familyId}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name UpdateFamily
   * @summary Update a family
   * @request PUT:/v1/admin/families/{familyId}
   * @secure
   */
  updateFamily = (familyId: string, data: FamilyDto, params: RequestParams = {}) =>
    this.request<void, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/admin/families/${familyId}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name AddNewProduct
   * @summary Add new products
   * @request POST:/v1/admin/families/{familyId}/products
   * @secure
   */
  addNewProduct = (familyId: string, data: VariantDto, params: RequestParams = {}) =>
    this.request<string, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/admin/families/${familyId}/products`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name UpdateProduct
   * @summary Update existing product
   * @request PUT:/v1/admin/products/{productId}
   * @secure
   */
  updateProduct = (productId: string, data: VariantDto, params: RequestParams = {}) =>
    this.request<Variant, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/admin/products/${productId}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name DeleteProduct
   * @summary Remove a product
   * @request DELETE:/v1/admin/products/{variantId}
   * @secure
   */
  deleteProduct = (variantId: string, params: RequestParams = {}) =>
    this.request<void, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/admin/products/${variantId}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name GenerateCaptcha
   * @summary Create a new captcha
   * @request POST:/v1/users/captcha
   * @secure
   */
  generateCaptcha = (params: RequestParams = {}) =>
    this.request<CaptchaDto, void>({
      path: `/v1/users/captcha`,
      method: 'POST',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AddNewUser
   * @summary Add a new user
   * @request POST:/v1/users
   * @secure
   */
  addNewUser = (data: UserDto, params: RequestParams = {}) =>
    this.request<string, string | void>({
      path: `/v1/users`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name Login
   * @summary Login and get token
   * @request POST:/v1/users/login
   * @secure
   */
  login = (data: CredentialDto, params: RequestParams = {}) =>
    this.request<TokenDto, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/users/login`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name GetMe
   * @summary Get informations of the authenticated user
   * @request GET:/v1/users/me
   * @secure
   */
  getMe = (params: RequestParams = {}) =>
    this.request<MeDto, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/users/me`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name ResetPassword
   * @summary Asking for resetting current password
   * @request POST:/v1/users/reset/request
   * @secure
   */
  resetPassword = (data: ResetPasswordRequestDto | ResetPasswordResponseDto, params: RequestParams = {}) =>
    this.request<void, string | void>({
      path: `/v1/users/reset/request`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name GetResetPasswordResponse
   * @request POST:/v1/users/reset/response
   * @secure
   */
  getResetPasswordResponse = (data: ResetPasswordResponseDto, params: RequestParams = {}) =>
    this.request<void, string | void>({
      path: `/v1/users/reset/response`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Calendar
   * @name GetCalendars
   * @summary Get seeding calendar
   * @request GET:/v1/calendars
   * @secure
   */
  getCalendars = (
    query?: {
      /**
       * True if you want only the best scenario
       * @default false
       */
      onlyBest?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<CalendarDto[], (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/calendars`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Calendar
   * @name GetCalendarForOneProduct
   * @summary Get seeding calendar for one product
   * @request GET:/v1/calendar/{variantId}
   * @secure
   */
  getCalendarForOneProduct = (variantId: string, params: RequestParams = {}) =>
    this.request<CalendarDto, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/calendar/${variantId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Check
   * @name CheckEmail
   * @summary Check if email already exists
   * @request GET:/v1/check/email
   * @secure
   */
  checkEmail = (
    query: {
      /** Email value */
      value: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<boolean, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/check/email`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Check
   * @name CheckCaptcha
   * @summary Check if captcha is ok
   * @request GET:/v1/check/captcha
   * @secure
   */
  checkCaptcha = (
    query: {
      /** The value of the typed message */
      value: string;
      /**
       * The Id of the captcha
       * @format uuid
       */
      id: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<boolean, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/check/captcha`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Check
   * @name FindNearestStation
   * @summary Found nearest station
   * @request GET:/v1/station/nearest
   * @secure
   */
  findNearestStation = (
    query: {
      /**
       * The latitude of the user position
       * @format double
       */
      latitude: number;
      /**
       * The longitude of the user position
       * @format double
       */
      longitude: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ForecastStationDto, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/station/nearest`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Ephemerids
   * @name GetEphemerids
   * @summary get the ephemerids of the day
   * @request GET:/v1/ephemerids
   * @secure
   */
  getEphemerids = (params: RequestParams = {}) =>
    this.request<EphemeridsDto, ProblemDetails | HttpValidationProblemDetails>({
      path: `/v1/ephemerids`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Flow
   * @name AddANewFlow
   * @summary Add a new flow
   * @request POST:/v1/flow
   * @secure
   */
  addANewFlow = (data: NewFlowDto, params: RequestParams = {}) =>
    this.request<string, string | void>({
      path: `/v1/flow`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Flow
   * @name GetAllFlows
   * @summary Get all flows for a user
   * @request GET:/v1/flows
   * @secure
   */
  getAllFlows = (
    query?: {
      /**
       * Number of the page
       * @format int32
       * @default 1
       */
      pageNumber?: number;
      /**
       * Size of the page
       * @format int32
       * @default 10
       */
      pageSize?: number;
      /**
       * Year of the flows
       * @format int32
       * @default 9999
       */
      year?: number;
      /**
       * Indicate we want only not harvested flows
       * @default true
       */
      notHarvested?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<ArrayFlowDto, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/flows`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Flow
   * @name GetAFlow
   * @summary Get one flow
   * @request GET:/v1/flows/{flowId}
   * @secure
   */
  getAFlow = (flowId: string, params: RequestParams = {}) =>
    this.request<FlowDetailDto, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/flows/${flowId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Flow
   * @name AddAEventOnAFlow
   * @summary Add a new event in a existing flow
   * @request POST:/v1/flow/{flowId}/step
   * @secure
   */
  addAEventOnAFlow = (flowId: string, data: NewStageDto, params: RequestParams = {}) =>
    this.request<string, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/flow/${flowId}/step`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Messaging
   * @name GetMessages
   * @summary Get current messages
   * @request GET:/v1/messages
   * @secure
   */
  getMessages = (
    query?: {
      /**
       * number of the page
       * @format int32
       * @default 0
       */
      pageNumber?: number;
      /**
       * size of the page
       * @format int32
       * @default 10
       */
      pageSize?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ArrayMessageDto, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/messages`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Package
   * @name AddNewPackageInStock
   * @summary Add a new package in stock
   * @request POST:/v1/stock/{stockId}/package
   * @secure
   */
  addNewPackageInStock = (stockId: string, data: PackageDto, params: RequestParams = {}) =>
    this.request<string, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/stock/${stockId}/package`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Package
   * @name UpdatePackage
   * @summary Update a package in stock
   * @request PATCH:/v1/package/{packageId}
   * @secure
   */
  updatePackage = (packageId: string, data: StockQuantityDto, params: RequestParams = {}) =>
    this.request<void, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/package/${packageId}`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Photo
   * @name AdminPhotoCreate
   * @summary Loading photo
   * @request POST:/v1/admin/photo
   * @secure
   */
  adminPhotoCreate = (
    data: {
      /** @format binary */
      file?: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<string, any>({
      path: `/v1/admin/photo`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.FormData,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Product
   * @name GetVariantsByCriterias
   * @summary Get variants by filters
   * @request GET:/v1/products/search
   * @secure
   */
  getVariantsByCriterias = (
    query?: {
      /** Name of the family or of the variant */
      q?: string;
      /**
       * Size of the page
       * @format int32
       */
      pageSize?: number;
      /**
       * Number of the page
       * @format int32
       */
      pageNumber?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ArrayProductWithVarietyDto, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/products/search`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Product
   * @name GetVariantsByFamilyName
   * @summary Get variants by family
   * @request GET:/v1/families/{name}/variants
   * @secure
   */
  getVariantsByFamilyName = (name: string, params: RequestParams = {}) =>
    this.request<
      (ProductWithNameDto | ProductWithVarietyDto)[],
      (ProblemDetails | HttpValidationProblemDetails) | void
    >({
      path: `/v1/families/${name}/variants`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Product
   * @name GetMostSearchedProducts
   * @request GET:/v1/products/searched
   * @secure
   */
  getMostSearchedProducts = (params: RequestParams = {}) =>
    this.request<
      (ProductWithNameDto | ProductWithVarietyDto)[],
      (ProblemDetails | HttpValidationProblemDetails) | void
    >({
      path: `/v1/products/searched`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Product
   * @name GetProductById
   * @summary Get one product by its Id
   * @request GET:/v1/product/{productId}/details
   * @secure
   */
  getProductById = (productId: string, params: RequestParams = {}) =>
    this.request<ProductWithDescriptionDto, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/product/${productId}/details`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Repository
   * @name GetAllStations
   * @summary Get all stations
   * @request GET:/v1/repository/stations
   * @secure
   */
  getAllStations = (params: RequestParams = {}) =>
    this.request<ForecastStationDto[], void>({
      path: `/v1/repository/stations`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Repository
   * @name GetCategories
   * @summary Get all product categories
   * @request GET:/v1/repository/categories
   * @secure
   */
  getCategories = (params: RequestParams = {}) =>
    this.request<CategoryDto[], void>({
      path: `/v1/repository/categories`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Repository
   * @name GetStagesByCategory
   * @summary Get all stages
   * @request GET:/v1/repository/stages
   * @secure
   */
  getStagesByCategory = (
    query?: {
      /** @format int32 */
      category?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<StageDto[], void>({
      path: `/v1/repository/stages`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Repository
   * @name GetStartStagesByCategory
   * @summary Get all stages
   * @request GET:/v1/repository/stages/start
   * @secure
   */
  getStartStagesByCategory = (
    query?: {
      /** @format int32 */
      category?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<StageDto[], void>({
      path: `/v1/repository/stages/start`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Repository
   * @name GetFamilies
   * @summary Get all families
   * @request GET:/v1/repository/families
   * @secure
   */
  getFamilies = (params: RequestParams = {}) =>
    this.request<(ProductWithNameDto | ProductWithVarietyDto)[], void>({
      path: `/v1/repository/families`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Stage
   * @name GetStagesPossibleByFlow
   * @summary Get possibles steps
   * @request GET:/v1/flow/{flowId}/stages
   * @secure
   */
  getStagesPossibleByFlow = (flowId: string, params: RequestParams = {}) =>
    this.request<StageDto[], (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/flow/${flowId}/stages`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Stock
   * @name GetAStockForAProduct
   * @summary Get a seed stock by product
   * @request GET:/v1/stock/product/{productId}
   * @secure
   */
  getAStockForAProduct = (productId: string, params: RequestParams = {}) =>
    this.request<StockDto, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/stock/product/${productId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Stock
   * @name GetAStockById
   * @summary Get a seed stock
   * @request GET:/v1/stock/{stockId}
   * @secure
   */
  getAStockById = (stockId: string, params: RequestParams = {}) =>
    this.request<StockDto, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/stock/${stockId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Stock
   * @name GetAllStocks
   * @summary Get all seed stock
   * @request GET:/v1/stocks
   * @secure
   */
  getAllStocks = (
    query?: {
      /**
       * Number of the page
       * @format int32
       * @default 1
       */
      pageNumber?: number;
      /**
       * Size of the page
       * @format int32
       * @default 10
       */
      pageSize?: number;
      /**
       * To get only stocks > 0
       * @default true
       */
      notEmptyOnly?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<ArrayStockDto, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/stocks`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Stock
   * @name AddANewStock
   * @summary Add a new seed stock
   * @request POST:/v1/stock
   * @secure
   */
  addANewStock = (data: NewStockDto, params: RequestParams = {}) =>
    this.request<string, (ProblemDetails | HttpValidationProblemDetails) | void>({
      path: `/v1/stock`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
