import { UploadApiResponse, TransformationOptions } from "cloudinary";
import { Buffer } from "buffer";
import cloudinary from "../config/cloudinary";
import { logger } from "../utils/logger";
import { ImageType } from "../models";

// =============== Constants ===============
export const IMAGE_SIZES = {
  TINY: 200,
  MEDIUM: 400,
  LARGE: 800,
} as const;

// =============== Types & Interfaces ===============
export interface ImageBuffer {
  buffer: Buffer;
  mimetype: string;
}

interface UploadOptions {
  folder?: string;
  transformation?: TransformationOptions | TransformationOptions[];
  quality?: string;
  format?: string;
  resourceType?: string;
}

export class CloudinaryService {
  constructor(
    private readonly defaultOptions: UploadOptions = {},
    private readonly defaultImageOptions: Record<string, unknown> = {}
  ) {}

  // Uploads a single image to Cloudinary
  async uploadImage(
    image: ImageBuffer,
    uploadPreset: string,
    imageName: string,
    options: UploadOptions = {}
  ): Promise<ImageType> {
    const dataURI = this.bufferToDataURI(image);
    const { format, quality, ...safeUploadOptions } = {
      ...this.defaultOptions,
      ...options,
    };

    const result = await this.uploadToCloudinary(
      dataURI,
      uploadPreset,
      imageName,
      safeUploadOptions
    );

    const imageUrls = this.generateImageUrls(result.public_id, {
      ...this.defaultImageOptions,
      format,
      quality,
    });

    return imageUrls;
  }

  // Replaces an existing image with a new one
  async replaceImage(
    oldPublicId: string,
    newImage: ImageBuffer,
    uploadPreset: string,
    imageName: string,
    options: UploadOptions = {}
  ): Promise<ImageType> {
    await this.destroyImage(oldPublicId, { invalidate: true });
    return this.uploadImage(newImage, uploadPreset, imageName, options);
  }

  // Deletes an image from Cloudinary
  async destroyImage(
    publicId: string,
    options: { invalidate?: boolean } = {}
  ): Promise<void> {
    const result = await cloudinary.uploader.destroy(publicId, options);

    if (result.result !== "ok" && result.result !== "not_found") {
      logger.warn(
        `Cloudinary: Unexpected result while deleting ${publicId}`,
        result
      );
    }
  }

  // Converts a buffer to a data URI string
  private bufferToDataURI(image: ImageBuffer): string {
    const b64 = Buffer.from(image.buffer).toString("base64");
    return `data:${image.mimetype};base64,${b64}`;
  }

  // Uploads an image to Cloudinary with enhanced options and error handling
  private async uploadToCloudinary(
    dataURI: string,
    uploadPreset: string,
    imageName: string,
    options: UploadOptions = {}
  ): Promise<UploadApiResponse> {
    const defaultOptions = {
      upload_preset: uploadPreset,
      public_id: imageName,
      ...options,
    };

    return cloudinary.uploader.upload(dataURI, defaultOptions);
  }

  // Generates optimized image URLs with specified transformations
  private generateImageUrls(
    publicId: string,
    options: {
      format?: string;
      quality?: string;
      defaultTransformation?: Record<string, unknown>;
    } = {}
  ): ImageType {
    const {
      format = "auto",
      quality = "auto",
      defaultTransformation = {},
    } = options;

    const transformImage = (width: number, height: number): string =>
      cloudinary.url(publicId, {
        width,
        height,
        crop: "fit",
        secure: true,
        fetch_format: format,
        quality,
        ...defaultTransformation,
      });

    return {
      publicId,
      tiny: transformImage(IMAGE_SIZES.TINY, IMAGE_SIZES.TINY),
      medium: transformImage(IMAGE_SIZES.MEDIUM, IMAGE_SIZES.MEDIUM),
      large: transformImage(IMAGE_SIZES.LARGE, IMAGE_SIZES.LARGE),
      // original: cloudinary.url(publicId, {
      //   secure: true,
      //   fetch_format: format,
      //   quality,
      //   ...defaultTransformation,
      // }),
    };
  }
}
