import { z } from "zod";

const queryFiltersSchema = z
  .object({
    color: z.string(),
    brand: z.string(),
    query: z.string(),
    categoryId: z.string(),
    subCategoryId: z.string(),
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
    connectivity: z.string(),
    aspectRatio: z.string(),
    displayTechnology: z.string(),
    refreshRate: z.string(),
    resolution: z.string(),
    screenSize: z.string(),
    cameraFrameRate: z.string(),
    opticalZoom: z.string(),
    meteringDescription: z.string(),
    supportedFileFormat: z.string(),
    maximumAperture: z.string(),
    imageStabilization: z.string(),
    maximumFocalLength: z.string(),
    expandedIsoMinimum: z.string(),
    photoSensorTechnology: z.string(),
    maximumWebcamImageResolution: z.string(),
    videoCaptureResolution: z.string(),
    flashMemoryType: z.string(),
    printingTechnology: z.string(),
    printerOutput: z.string(),
    maximumPrintSpeed: z.string(),
    printerMediaSizeMaximum: z.string(),
    printMedia: z.string(),
    scannerType: z.string(),
    compatibleDevices: z.string(),
    displayType: z.string(),
    sheetSize: z.string(),
    zoom: z.string(),
    digitalZoom: z.string(),
    lensConstruction: z.string(),
    lensType: z.string(),
    videoOutput: z.string(),
    photoSensorResolution: z.string(),
    audioInput: z.string(),
    audioOutputType: z.string(),
    batteryAverageLife: z.string(),
    sensorType: z.string(),
    totalStillResolution: z.string(),
    maximumImageSize: z.string(),
    compatibleMountings: z.string(),
    maxPrintspeedMonochrome: z.string(),
    controllerType: z.string(),
    shape: z.string(),
    gps: z.string(),
    chipsetBrand: z.string(),
    videoOutputInterface: z.string(),
    cacheSize: z.string(),
    graphicsCardDescription: z.string(),
    numberOfProcessors: z.string(),
    hardDiskFormFactor: z.string(),
    hardDiskDescription: z.string(),
    installationType: z.string(),
    movementDetectionTechnology: z.string(),
    mediaType: z.string(),
    colorDepth: z.string(),
    standardSheetCapacity: z.string(),
    opticalSensorTechnology: z.string(),
    audioEncoding: z.string(),
    audioOutputMode: z.string(),
    totalHdmiPorts: z.string(),
    surroundSoundChannelConfiguration: z.string(),
    careInstructions: z.string(),
    speakerMaximumOutputPower: z.string(),
    speakerMaximumVolume: z.string(),
    fabricType: z.string(),
    origin: z.string(),
    operatingSystem: z.string(),
    cellularTechnology: z.string(),
    batteryPowerRating: z.string(),
    batteryCapacity: z.string(),
    wirelessNetworkTechnology: z.string(),
    material: z.string(),
    connectorType: z.string(),
    inputVoltage: z.string(),
    mountingType: z.string(),
    humanInterfaceInput: z.string(),
    wirelessCommunicationStandard: z.string(),
    department: z.string(),
    specificUsesForProduct: z.string(),
    ramSize: z.string(),
    ramMemoryTechnology: z.string(),
    memorySpeed: z.string(),
    cpuModel: z.string(),
    cpuBrand: z.string(),
    hardDriveInterface: z.string(),
    hardDriveSize: z.string(),
    hardDrive: z.string(),
    graphicsCoprocessor: z.string(),
    graphicsRamSize: z.string(),
    compatiblePlatform: z.string(),
    lockType: z.string(),
    finishType: z.string(),
    lampType: z.string(),
    shadeColor: z.string(),
    shadeMaterial: z.string(),
    switchType: z.string(),
    brightness: z.string(),
    lightingMethod: z.string(),
    controlType: z.string(),
    controlMethod: z.string(),
    bulbShapeSize: z.string(),
    bulbBase: z.string(),
    lightColor: z.string(),
    capacity: z.string(),
    cutType: z.string(),
    telephoneType: z.string(),
    powerSource: z.string(),
    answeringSystemType: z.string(),
    supportedInternetServices: z.string(),
    memoryStorageCapacity: z.string(),
    wirelessCarrier: z.string(),
    formFactor: z.string(),
  })
  .partial();
export type QueryFiltersSchema = z.infer<typeof queryFiltersSchema>;

export const getProductsQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(10),
    sort: z
      .string()
      .regex(
        /^[+-]?(createdAt|updatedAt|name|rating|numOfReviews|price|discount|popularity|bestSelling|stockAvailability|score)(,[+-]?(createdAt|updatedAt|name|rating|numOfReviews|price|discount|popularity|bestSelling|stockAvailability|score))*$/
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  );
export type GetProductsQuerySchema = z.infer<typeof getProductsQuerySchema>;
