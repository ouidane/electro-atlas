import { Types } from "mongoose";

export const FIELD_TYPES = {
  EXACT: "exact",
  TEXT: "text",
  BOOLEAN: "boolean",
  RANGE: "range",
  DATE_RANGE: "dateRange",
  OBJECT_ID: "objectId",
  IN: "in",
} as const;

export type FieldType = (typeof FIELD_TYPES)[keyof typeof FIELD_TYPES];

export interface FieldConfig {
  type: FieldType;
  searchFields?: string[];
  searchField?: string;
  afterField?: string;
  beforeField?: string;
  minField?: string;
  maxField?: string;
  caseSensitive?: boolean;
}

export type FieldConfigMap = Record<string, FieldConfig>;

export type RawFilterValue =
  | string
  | number
  | boolean
  | Date
  | string[]
  | null
  | undefined;

export type RawFilters = Record<string, RawFilterValue>;

export interface MongooseFilterOperators {
  $gte?: number | Date;
  $lte?: number | Date;
  $gt?: number | Date;
  $lt?: number | Date;
  $in?: (string | number | Types.ObjectId)[];
  $nin?: (string | number | Types.ObjectId)[];
  $regex?: string | RegExp;
  $options?: string;
  $exists?: boolean;
  $ne?: string | number | boolean | Date | Types.ObjectId;
  $eq?: string | number | boolean | Date | Types.ObjectId;
}

export type MongooseFilterValue =
  | string
  | string[]
  | number
  | boolean
  | Date
  | Types.ObjectId
  | MongooseFilterOperators;

export type MongooseFilter = {
  [key: string]: MongooseFilterValue;
} & {
  $or?: Array<{ [key: string]: MongooseFilterValue }>;
  $and?: Array<{ [key: string]: MongooseFilterValue }>;
};

const DEFAULT_CONFIG_MAP: FieldConfigMap = {
  createdAt: {
    type: FIELD_TYPES.DATE_RANGE,
    afterField: "createdAfter",
    beforeField: "createdBefore",
  },
  updatedAt: {
    type: FIELD_TYPES.DATE_RANGE,
    afterField: "updatedAfter",
    beforeField: "updatedBefore",
  },
};

export function buildMongoFilter(
  filters: RawFilters = {},
  config: FieldConfigMap,
): MongooseFilter {
  // const mongoFilter: Record<string, MongooseFilter> = {};
  const mongoFilter: MongooseFilter = {};

  const configMap = { ...DEFAULT_CONFIG_MAP, ...config };

  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || value === null || value === "") continue;

    // Check direct match first
    let fieldName = key;
    let conf = configMap[key];

    if (!conf) {
      const match = Object.entries(configMap).find(
        ([, c]) =>
          c.minField === key ||
          c.maxField === key ||
          c.afterField === key ||
          c.beforeField === key ||
          c.searchField === key,
      );
      if (match) {
        fieldName = match[0];
        conf = match[1];
      }
    }

    if (!conf) continue;

    switch (conf.type) {
      case FIELD_TYPES.EXACT:
        mongoFilter[fieldName] = value as string;
        break;

      case FIELD_TYPES.OBJECT_ID:
        mongoFilter[fieldName] = new Types.ObjectId(value as string);
        break;

      case FIELD_TYPES.BOOLEAN:
        mongoFilter[fieldName] = Boolean(value);
        break;

      case FIELD_TYPES.IN:
        mongoFilter[fieldName] = {
          $in: Array.isArray(value)
            ? value
            : [value as string | Types.ObjectId],
        };
        break;

      case FIELD_TYPES.TEXT:
        if (conf.searchFields && conf.searchFields.length > 0) {
          mongoFilter.$or = conf.searchFields.map((f) => ({
            [f]: {
              $regex: value as string,
              $options: conf.caseSensitive ? "" : "i",
              // $regex: new RegExp(value as string, "i"),
            },
          }));
        }
        break;

      case FIELD_TYPES.RANGE:
        if (!mongoFilter[fieldName]) mongoFilter[fieldName] = {};
        if (conf.minField && filters[conf.minField] !== undefined)
          (mongoFilter[fieldName] as MongooseFilterOperators).$gte = filters[
            conf.minField
          ] as number;
        if (conf.maxField && filters[conf.maxField] !== undefined)
          (mongoFilter[fieldName] as MongooseFilterOperators).$lte = filters[
            conf.maxField
          ] as number;
        break;

      case FIELD_TYPES.DATE_RANGE:
        if (!mongoFilter[fieldName]) mongoFilter[fieldName] = {};
        if (conf.afterField && filters[conf.afterField] !== undefined)
          (mongoFilter[fieldName] as MongooseFilterOperators).$gte = new Date(
            filters[conf.afterField] as string,
          );
        if (conf.beforeField && filters[conf.beforeField] !== undefined)
          (mongoFilter[fieldName] as MongooseFilterOperators).$lte = new Date(
            filters[conf.beforeField] as string,
          );
        break;

      default:
        break;
    }
  }

  return mongoFilter;
}

export type SortDirection = 1 | -1;

export type SortOptions = Record<string, SortDirection>;

type SortFields = Record<string, { field: string }>;

interface ParsedSortField {
  field: string;
  direction: SortDirection;
}

const DEFAULT_ALLOWED_SORT_FIELDS: SortFields = {
  createdAt: { field: "createdAt" },
  updatedAt: { field: "updatedAt" },
};

export const buildSortQuery = (
  sort: string,
  allowedSortFields: SortFields,
): SortOptions => {
  // Merge default allowed fields with the provided ones
  const combinedAllowedFields = {
    ...DEFAULT_ALLOWED_SORT_FIELDS,
    ...allowedSortFields,
  };

  const parsedFields = sort
    .split(",")
    .map((field): ParsedSortField | null => {
      const trimmedField = field.trim();
      if (!trimmedField) return null;

      const isDescending = trimmedField.startsWith("-");
      const fieldName = isDescending ? trimmedField.slice(1) : trimmedField;

      const dbField = combinedAllowedFields[fieldName]?.field;
      if (!dbField) return null;

      return {
        field: dbField,
        direction: isDescending ? -1 : 1,
      };
    })
    .filter((field): field is ParsedSortField => field !== null)
    .reduce<SortOptions>((acc, { field, direction }) => {
      acc[field] = direction;
      return acc;
    }, {});

  return parsedFields;
};
