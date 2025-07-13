import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Shop",
    newTab: false,
    path: "/products?sort=rating",
  },
  {
    id: 3,
    title: "Contact",
    newTab: false,
    path: "/contact",
  }
];

export const categories = [
  {
    _id: "65a0a8e63e8480d8cc796b34",
    name: "camera & photo",
  },
  {
    _id: "65a0a8e63e8480d8cc796b40",
    name: "smartphones & tablets",
  },
  {
    _id: "65a0a8e63e8480d8cc796b5c",
    name: "laptops & computers",
  },
  {
    _id: "65a0a8e73e8480d8cc796b6e",
    name: "audio",
  },
  {
    _id: "65a0a8e73e8480d8cc796b90",
    name: "office electronics",
  },
  {
    _id: "65a0a8e53e8480d8cc796b26",
    name: "television & video",
  },
];

export const allDepartments = [
  {
    _id: "65a0a8e53e8480d8cc796b26",
    name: "television & video",
    subCategories: [
      {
        _id: "65a0a8e53e8480d8cc796b28",
        name: "televisions",
      },
      {
        _id: "65a0a8e53e8480d8cc796b2a",
        name: "streaming media player",
      },
      {
        _id: "65a0a8e53e8480d8cc796b29",
        name: "home theater systems",
      },
    ],
  },
  {
    _id: "65a0a8e63e8480d8cc796b34",
    name: "camera & photo",
    subCategories: [
      {
        _id: "65a0a8e63e8480d8cc796b36",
        name: "wearable & action cameras",
      },
      {
        _id: "65a0a8e63e8480d8cc796b37",
        name: "digital cameras",
      },
      {
        _id: "65a0a8e63e8480d8cc796b3a",
        name: "camera lenses",
      },
      {
        _id: "65a0a8e63e8480d8cc796b38",
        name: "camcorders",
      },
      {
        _id: "65a0a8e63e8480d8cc796b39",
        name: "photo printers",
      },
      {
        _id: "677f214e7d15a3f322d46da0",
        name: "security cameras",
      },
    ],
  },
  {
    _id: "65a0a8e63e8480d8cc796b40",
    name: "smartphones & tablets",
    subCategories: [
      {
        _id: "65a0a8e63e8480d8cc796b42",
        name: "smartphones",
      },
      {
        _id: "65a0a8e63e8480d8cc796b43",
        name: "tablets",
      },
      {
        _id: "65a0a8e63e8480d8cc796b45",
        name: "smartwatches",
      },
      {
        _id: "65a0a8e63e8480d8cc796b46",
        name: "phone cases",
      },
      {
        _id: "65a0a8e63e8480d8cc796b47",
        name: "chargers",
      },
    ],
  },
  {
    _id: "65a0a8e63e8480d8cc796b5c",
    name: "laptops & computers",
    subCategories: [
      {
        _id: "65a0a8e63e8480d8cc796b63",
        name: "graphics cards",
      },
      {
        _id: "65a0a8e63e8480d8cc796b61",
        name: "desktops",
      },
      {
        _id: "65a0a8e63e8480d8cc796b5e",
        name: "gaming laptops",
      },
      {
        _id: "65a0a8e63e8480d8cc796b62",
        name: "external hard drives",
      },
      {
        _id: "65a0a8e63e8480d8cc796b60",
        name: "macbooks",
      },
      {
        _id: "65a0a8e63e8480d8cc796b5f",
        name: "traditional laptops",
      },
      {
        _id: "65a0a8e63e8480d8cc796b64",
        name: "mouse",
      },
    ],
  },
  {
    _id: "65a0a8e73e8480d8cc796b6e",
    name: "audio",
    subCategories: [
      {
        _id: "65a0a8e73e8480d8cc796b73",
        name: "receivers",
      },
      {
        _id: "65a0a8e73e8480d8cc796b70",
        name: "headphones",
      },
      {
        _id: "65a0a8e73e8480d8cc796b72",
        name: "audio & video accessories",
      },
      {
        _id: "65a0a8e73e8480d8cc796b71",
        name: "speakers",
      },
    ],
  },
  {
    _id: "65a0a8e73e8480d8cc796b90",
    name: "office electronics",
    subCategories: [
      {
        _id: "65a0a8e83e8480d8cc796b92",
        name: "printers",
      },
      {
        _id: "65a0a8e83e8480d8cc796b95",
        name: "office phones",
      },
      {
        _id: "65a0a8e83e8480d8cc796b93",
        name: "scanners",
      },
      {
        _id: "65a0a8e83e8480d8cc796b94",
        name: "fax machines",
      },
      {
        _id: "65a0a8e83e8480d8cc796b96",
        name: "shredders",
      },
    ],
  },
];
