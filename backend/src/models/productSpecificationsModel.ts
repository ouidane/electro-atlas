import { InferSchemaType, Schema } from "mongoose";

export const ProductSpecificationsSchema = new Schema(
  {
    certifications: { type: String, required: true },
    itemModelNumber: { type: String },
    weight: { type: String },
    dimensions: { type: String },
    connectivity: { type: String },
    aspectRatio: { type: String },
    displayTechnology: { type: String },
    refreshRate: { type: String },
    resolution: { type: String },
    screenSize: { type: String },
    compatiblePlatform: { type: String },
    batteries: { type: String },
    supportedInternetServices: { type: String },
    mountingType: { type: String },
    compatibleDevices: { type: String },
    controllerType: { type: String },
    AudioOutputMode: { type: String },
    surroundSoundChannelConfiguration: { type: String },
    connectorType: { type: String },
    TotalHdmiPorts: { type: String },
    AudioEncoding: { type: String },
    formFactor: { type: String },
    supportedFileFormat: { type: String },
    maximumAperture: { type: String },
    photoSensorTechnology: { type: String },
    videoCaptureResolution: { type: String },
    flashMemoryType: { type: String },
    maximumFocalLength: { type: String },
    shape: { type: String },
    batteryCapacity: { type: String },
    opticalZoom: { type: String },
    meteringDescription: { type: String },
    imageStabilization: { type: String },
    compatibleMountings: { type: String },
    expandedIsoMinimum: { type: String },
    maximumWebcamImageResolution: { type: String },
    printingTechnology: { type: String },
    printerOutput: { type: String },
    maximumPrintSpeed: { type: String },
    maxPrintspeedMonochrome: { type: String },
    printerMediaSizeMaximum: { type: String },
    printMedia: { type: String },
    scannerType: { type: String },
    displayType: { type: String },
    sheetSize: { type: String },
    controlMethod: { type: String },
    memoryStorageCapacity: { type: String },
    material: { type: String },
    gps: { type: String },
    operatingSystem: { type: String },
    cellularTechnology: { type: String },
    batteryPowerRating: { type: String },
    humanInterfaceInput: { type: String },
    cpuModel: { type: String },
    wirelessCarrier: { type: String },
    ramSize: { type: String },
    ramMemoryTechnology: { type: String },
    cpuSpeed: { type: String },
    wirelessNetworkTechnology: { type: String },
    specificUsesForProduct: { type: String },
    controlType: { type: String },
    chipsetBrand: { type: String },
    graphicsCardDescription: { type: String },
    numberOfProcessors: { type: String },
    cpuBrand: { type: String },
    hardDrive: { type: String },
    hardDriveSize: { type: String },
    powerSource: { type: String },
    graphicsCoprocessor: { type: String },
    hardDriveInterface: { type: String },
    memorySpeed: { type: String },
    graphicsRamSize: { type: String },
    WirelessCommunicationStandard: { type: String },
    department: { type: String },
    inputVoltage: { type: String },
    lensType: { type: String },
    speakerMaximumOutputPower: { type: String },
    hardDiskDescription: { type: String },
    audioOutputType: { type: String },
    cacheSize: { type: String },
    installationType: { type: String },
    videoOutputInterface: { type: String },
    movementDetectionTechnology: { type: String },
    finishType: { type: String },
    colorDepth: { type: String },
    mediaType: { type: String },
    standardSheetCapacity: { type: String },
    telephoneType: { type: String },
    answeringSystemType: { type: String },
    capacity: { type: String },
    cutType: { type: String },
    opticalSensorTechnology: { type: String },
    lampType: { type: String },
  },
  {
    _id: false,
  },
);

// Infer the type directly from schema
export type ProductSpecificationsDoc = InferSchemaType<
  typeof ProductSpecificationsSchema
>;
