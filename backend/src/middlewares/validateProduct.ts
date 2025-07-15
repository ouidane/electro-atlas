import { z } from "zod";
import {
  createObjectIdSchema,
  stringToArraySchema,
  validateBody,
  validateQuery,
} from "./validate";

const productVariantBaseSchema = z.object({
  variation: z.string({ required_error: "Variation is required" }),
  sku: z.string({ required_error: "SKU is required" }),
  color: z.string().optional(),
  inventory: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val) : val),
    z.number().int().min(0),
  ),
  globalPrice: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val) : val),
    z.number().int().min(0),
  ),
  salePrice: z.preprocess(
    (val) =>
      val === "" ? undefined : typeof val === "string" ? parseInt(val) : val,
    z.number().int().min(0).optional(),
  ),
  saleStartDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().optional(),
  ),
  saleEndDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().optional(),
  ),
});

const productVariantSchema = productVariantBaseSchema
  .transform((data) => {
    const finalSalePrice = data.salePrice ?? data.globalPrice;
    const discountPercent =
      data.globalPrice > 0
        ? Math.round(
            ((data.globalPrice - finalSalePrice) / data.globalPrice) * 100,
          )
        : 0;

    return {
      ...data,
      salePrice: finalSalePrice,
      discountPercent,
    };
  })
  .refine(
    (data) =>
      !data.saleEndDate ||
      !data.saleStartDate ||
      data.saleEndDate > data.saleStartDate,
    {
      message: "saleEndDate must be after saleStartDate",
      path: ["saleEndDate"],
    },
  );
export type ProductVariant = z.infer<typeof productVariantSchema>;

const productSpecificationsSchema = z.object({
  certifications: z.string(),
  itemModelNumber: z.string().optional(),
  weight: z.number().optional(),
  dimensions: z.string().optional(),
  connectivity: z.array(z.string()).optional(),
  aspectRatio: z.string().optional(),
  displayTechnology: z.string().optional(),
  refreshRate: z.number().optional(),
  resolution: z.string().optional(),
  screenSize: z.number().optional(),
  cameraFrameRate: z.number().optional(),
  opticalZoom: z.number().optional(),
  meteringDescription: z.string().optional(),
  supportedFileFormat: z.array(z.string()).optional(),
  maximumAperture: z.number().optional(),
  imageStabilization: z.string().optional(),
  maximumFocalLength: z.number().optional(),
  expandedIsoMinimum: z.number().optional(),
  photoSensorTechnology: z.string().optional(),
  maximumWebcamImageResolution: z.number().optional(),
  batteries: z.string().optional(),
  videoCaptureResolution: z.string().optional(),
  flashMemoryType: z.string().optional(),
  printingTechnology: z.string().optional(),
  printerOutput: z.string().optional(),
  maximumPrintSpeed: z.number().optional(),
  printerMediaSizeMaximum: z.string().optional(),
  printMedia: z.array(z.string()).optional(),
  scannerType: z.string().optional(),
  compatibleDevices: z.array(z.string()).optional(),
  displayType: z.string().optional(),
  sheetSize: z.string().optional(),
  zoom: z.number().optional(),
  digitalZoom: z.number().optional(),
  lensConstruction: z.string().optional(),
  lensType: z.string().optional(),
  videoOutput: z.array(z.string()).optional(),
  photoSensorResolution: z.number().optional(),
  audioInput: z.array(z.string()).optional(),
  audioOutputType: z.array(z.string()).optional(),
  batteryAverageLife: z.number().optional(),
  sensorType: z.string().optional(),
  totalStillResolution: z.number().optional(),
  maximumImageSize: z.string().optional(),
  compatibleMountings: z.string().optional(),
  maxPrintspeedMonochrome: z.number().optional(),
  controllerType: z.string().optional(),
  shape: z.string().optional(),
  gps: z.string().optional(),
  chipsetBrand: z.string().optional(),
  videoOutputInterface: z.array(z.string()).optional(),
  cacheSize: z.number().optional(),
  graphicsCardDescription: z.string().optional(),
  numberOfProcessors: z.number().optional(),
  hardDiskFormFactor: z.string().optional(),
  hardDiskDescription: z.string().optional(),
  installationType: z.string().optional(),
  movementDetectionTechnology: z.string().optional(),
  mediaType: z.string().optional(),
  colorDepth: z.number().optional(),
  standardSheetCapacity: z.number().optional(),
  opticalSensorTechnology: z.string().optional(),
  audioEncoding: z.string().optional(),
  audioOutputMode: z.string().optional(),
  totalHdmiPorts: z.number().optional(),
  surroundSoundChannelConfiguration: z.string().optional(),
  careInstructions: z.string().optional(),
  speakerMaximumOutputPower: z.number().optional(),
  speakerMaximumVolume: z.number().optional(),
  fabricType: z.string().optional(),
  origin: z.string().optional(),
  operatingSystem: z.string().optional(),
  cellularTechnology: z.string().optional(),
  batteryPowerRating: z.number().optional(),
  batteryCapacity: z.number().optional(),
  wirelessNetworkTechnology: z.array(z.string()).optional(),
  material: z.array(z.string()).optional(),
  connectorType: z.array(z.string()).optional(),
  inputVoltage: z.string().optional(),
  mountingType: z.string().optional(),
  humanInterfaceInput: z.array(z.string()).optional(),
  wirelessCommunicationStandard: z.string().optional(),
  department: z.string().optional(),
  specificUsesForProduct: z.array(z.string()).optional(),
  ramSize: z.number().optional(),
  ramMemoryTechnology: z.string().optional(),
  memorySpeed: z.number().optional(),
  cpuSpeed: z.number().optional(),
  cpuModel: z.string().optional(),
  cpuBrand: z.string().optional(),
  hardDriveInterface: z.string().optional(),
  hardDriveSize: z.number().optional(),
  hardDrive: z.string().optional(),
  graphicsCoprocessor: z.string().optional(),
  graphicsRamSize: z.number().optional(),
  compatiblePlatform: z.array(z.string()).optional(),
  lockType: z.string().optional(),
  finishType: z.string().optional(),
  lampType: z.string().optional(),
  shadeColor: z.string().optional(),
  shadeMaterial: z.string().optional(),
  switchType: z.string().optional(),
  brightness: z.number().optional(),
  lightingMethod: z.string().optional(),
  controlType: z.string().optional(),
  controlMethod: z.string().optional(),
  bulbShapeSize: z.string().optional(),
  bulbBase: z.string().optional(),
  lightColor: z.string().optional(),
  capacity: z.number().optional(),
  cutType: z.string().optional(),
  telephoneType: z.string().optional(),
  powerSource: z.string().optional(),
  answeringSystemType: z.string().optional(),
  supportedInternetServices: z.array(z.string()).optional(),
  memoryStorageCapacity: z.number().optional(),
  wirelessCarrier: z.string().optional(),
  formFactor: z.string().optional(),
});
export type ProductSpecifications = z.infer<typeof productSpecificationsSchema>;

const createProductSchema = z.object({
  name: z.string().max(100),
  description: z.string().max(1000),
  brand: z.string(),
  modelName: z.string().optional(),
  whatsInTheBox: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  categoryId: createObjectIdSchema("Invalid categoryId"),
  subCategoryId: createObjectIdSchema("Invalid subCategoryId"),
  variant: productVariantSchema,
  specifications: productSpecificationsSchema,
});
export type CreateProductType = z.infer<typeof createProductSchema>;

const UpdateProductSchema = createProductSchema
  .extend({
    visibility: z.boolean().optional(),
    image: z.null().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
    path: [],
  });
export type UpdateProductType = z.infer<typeof UpdateProductSchema>;

const queryFiltersSchema = z
  .object({
    color: stringToArraySchema,
    brand: stringToArraySchema,
    query: z.string(),
    categoryId: createObjectIdSchema("Invalid categoryId"),
    subCategoryId: createObjectIdSchema("Invalid subCategoryId"),
    isFeatured: z
      .string()
      .transform((val) => val === "true" || val === "yes" || val === "1"),
    minRating: z.string().transform((val) => parseFloat(val)),
    maxRating: z.string().transform((val) => parseFloat(val)),
    minPrice: z.string().transform((val) => parseFloat(val)),
    maxPrice: z.string().transform((val) => parseFloat(val)),
    minStock: z.string().transform((val) => parseInt(val)),
    maxStock: z.string().transform((val) => parseInt(val)),
    minDiscount: z.string().transform((val) => parseFloat(val)),
    maxDiscount: z.string().transform((val) => parseFloat(val)),
    createdAfter: z.string().datetime(),
    createdBefore: z.string().datetime(),
    updatedAfter: z.string().datetime(),
    updatedBefore: z.string().datetime(),
    // Specification-related parameters
    connectivity: stringToArraySchema,
    aspectRatio: stringToArraySchema,
    displayTechnology: stringToArraySchema,
    refreshRate: stringToArraySchema,
    resolution: stringToArraySchema,
    screenSize: stringToArraySchema,
    cameraFrameRate: stringToArraySchema,
    opticalZoom: stringToArraySchema,
    meteringDescription: stringToArraySchema,
    supportedFileFormat: stringToArraySchema,
    maximumAperture: stringToArraySchema,
    imageStabilization: stringToArraySchema,
    maximumFocalLength: stringToArraySchema,
    expandedIsoMinimum: stringToArraySchema,
    photoSensorTechnology: stringToArraySchema,
    maximumWebcamImageResolution: stringToArraySchema,
    videoCaptureResolution: stringToArraySchema,
    flashMemoryType: stringToArraySchema,
    printingTechnology: stringToArraySchema,
    printerOutput: stringToArraySchema,
    maximumPrintSpeed: stringToArraySchema,
    printerMediaSizeMaximum: stringToArraySchema,
    printMedia: stringToArraySchema,
    scannerType: stringToArraySchema,
    compatibleDevices: stringToArraySchema,
    displayType: stringToArraySchema,
    sheetSize: stringToArraySchema,
    zoom: stringToArraySchema,
    digitalZoom: stringToArraySchema,
    lensConstruction: stringToArraySchema,
    lensType: stringToArraySchema,
    videoOutput: stringToArraySchema,
    photoSensorResolution: stringToArraySchema,
    audioInput: stringToArraySchema,
    audioOutputType: stringToArraySchema,
    batteryAverageLife: stringToArraySchema,
    sensorType: stringToArraySchema,
    totalStillResolution: stringToArraySchema,
    maximumImageSize: stringToArraySchema,
    compatibleMountings: stringToArraySchema,
    maxPrintspeedMonochrome: stringToArraySchema,
    controllerType: stringToArraySchema,
    shape: stringToArraySchema,
    gps: stringToArraySchema,
    chipsetBrand: stringToArraySchema,
    videoOutputInterface: stringToArraySchema,
    cacheSize: stringToArraySchema,
    graphicsCardDescription: stringToArraySchema,
    numberOfProcessors: stringToArraySchema,
    hardDiskFormFactor: stringToArraySchema,
    hardDiskDescription: stringToArraySchema,
    installationType: stringToArraySchema,
    movementDetectionTechnology: stringToArraySchema,
    mediaType: stringToArraySchema,
    colorDepth: stringToArraySchema,
    standardSheetCapacity: stringToArraySchema,
    opticalSensorTechnology: stringToArraySchema,
    audioEncoding: stringToArraySchema,
    audioOutputMode: stringToArraySchema,
    totalHdmiPorts: stringToArraySchema,
    surroundSoundChannelConfiguration: stringToArraySchema,
    careInstructions: stringToArraySchema,
    speakerMaximumOutputPower: stringToArraySchema,
    speakerMaximumVolume: stringToArraySchema,
    fabricType: stringToArraySchema,
    origin: stringToArraySchema,
    operatingSystem: stringToArraySchema,
    cellularTechnology: stringToArraySchema,
    batteryPowerRating: stringToArraySchema,
    batteryCapacity: stringToArraySchema,
    wirelessNetworkTechnology: stringToArraySchema,
    material: stringToArraySchema,
    connectorType: stringToArraySchema,
    inputVoltage: stringToArraySchema,
    mountingType: stringToArraySchema,
    humanInterfaceInput: stringToArraySchema,
    wirelessCommunicationStandard: stringToArraySchema,
    department: stringToArraySchema,
    specificUsesForProduct: stringToArraySchema,
    ramSize: stringToArraySchema,
    ramMemoryTechnology: stringToArraySchema,
    memorySpeed: stringToArraySchema,
    cpuModel: stringToArraySchema,
    cpuBrand: stringToArraySchema,
    hardDriveInterface: stringToArraySchema,
    hardDriveSize: stringToArraySchema,
    hardDrive: stringToArraySchema,
    graphicsCoprocessor: stringToArraySchema,
    graphicsRamSize: stringToArraySchema,
    compatiblePlatform: stringToArraySchema,
    lockType: stringToArraySchema,
    finishType: stringToArraySchema,
    lampType: stringToArraySchema,
    shadeColor: stringToArraySchema,
    shadeMaterial: stringToArraySchema,
    switchType: stringToArraySchema,
    brightness: stringToArraySchema,
    lightingMethod: stringToArraySchema,
    controlType: stringToArraySchema,
    controlMethod: stringToArraySchema,
    bulbShapeSize: stringToArraySchema,
    bulbBase: stringToArraySchema,
    lightColor: stringToArraySchema,
    capacity: stringToArraySchema,
    cutType: stringToArraySchema,
    telephoneType: stringToArraySchema,
    powerSource: stringToArraySchema,
    answeringSystemType: stringToArraySchema,
    supportedInternetServices: stringToArraySchema,
    memoryStorageCapacity: stringToArraySchema,
    wirelessCarrier: stringToArraySchema,
    formFactor: stringToArraySchema,
  })
  .partial();
export type QueryFiltersType = z.infer<typeof queryFiltersSchema>;

const getProductsQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(10),
    sort: z
      .string()
      .regex(
        /^[+-]?(createdAt|updatedAt|name|rating|numOfReviews|price|discount|popularity|bestSelling|stockAvailability|score)(,[+-]?(createdAt|updatedAt|name|rating|numOfReviews|price|discount|popularity|bestSelling|stockAvailability|score))*$/,
      )
      .optional(),
    filters: queryFiltersSchema.optional(),
  })
  .refine(
    (data) => {
      if (data.filters?.minRating && data.filters?.maxRating) {
        return data.filters.minRating <= data.filters.maxRating;
      }
      return true;
    },
    {
      message: "minRating must be less than or equal to maxRating",
      path: ["filters", "minRating"],
    },
  )
  .refine(
    (data) => {
      if (data.filters?.minPrice && data.filters?.maxPrice) {
        return data.filters.minPrice <= data.filters.maxPrice;
      }
      return true;
    },
    {
      message: "minPrice must be less than or equal to maxPrice",
      path: ["filters", "minPrice"],
    },
  )
  .refine(
    (data) => {
      if (data.filters?.minStock && data.filters?.maxStock) {
        return data.filters.minStock <= data.filters.maxStock;
      }
      return true;
    },
    {
      message: "minStock must be less than or equal to maxStock",
      path: ["filters", "minStock"],
    },
  )
  .refine(
    (data) => {
      if (data.filters?.minDiscount && data.filters?.maxDiscount) {
        return data.filters.minDiscount <= data.filters.maxDiscount;
      }
      return true;
    },
    {
      message: "minDiscount must be less than or equal to maxDiscount",
      path: ["filters", "minDiscount"],
    },
  )
  .refine(
    (data) => {
      if (data.filters?.createdAfter && data.filters?.createdBefore) {
        return (
          new Date(data.filters.createdAfter) <=
          new Date(data.filters.createdBefore)
        );
      }
      return true;
    },
    {
      message: "createdAfter must be before or equal to createdBefore",
      path: ["filters", "createdAfter"],
    },
  )
  .refine(
    (data) => {
      if (data.filters?.updatedAfter && data.filters?.updatedBefore) {
        return (
          new Date(data.filters.updatedAfter) <=
          new Date(data.filters.updatedBefore)
        );
      }
      return true;
    },
    {
      message: "updatedAfter must be before or equal to updatedBefore",
      path: ["filters", "updatedAfter"],
    },
  );
export type GetProductsQueryType = z.infer<typeof getProductsQuerySchema>;

export const validateProduct = validateBody(createProductSchema);
export const validateUpdateProduct = validateBody(UpdateProductSchema);
export const validateUpdateProductVisibility = validateBody(
  z.object({
    visibility: z.boolean(),
  }),
);
export const validateQueryFilters = validateQuery(queryFiltersSchema);
export const validateGetProductsQuery = validateQuery(getProductsQuerySchema);
