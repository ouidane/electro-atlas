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
  },
  // {
  //   id: 6,
  //   title: "pages",
  //   newTab: false,
  //   path: "/",
  //   submenu: [
  //     {
  //       id: 61,
  //       title: "Shop With Sidebar",
  //       newTab: false,
  //       path: "/shop-with-sidebar",
  //     },
  //     {
  //       id: 62,
  //       title: "Shop Without Sidebar",
  //       newTab: false,
  //       path: "/shop-without-sidebar",
  //     },
  //     {
  //       id: 64,
  //       title: "Checkout",
  //       newTab: false,
  //       path: "/checkout",
  //     },
  //     {
  //       id: 65,
  //       title: "Cart",
  //       newTab: false,
  //       path: "/cart",
  //     },
  //     {
  //       id: 66,
  //       title: "Wishlist",
  //       newTab: false,
  //       path: "/wishlist",
  //     },
  //     {
  //       id: 67,
  //       title: "Sign in",
  //       newTab: false,
  //       path: "/signin",
  //     },
  //     {
  //       id: 68,
  //       title: "Sign up",
  //       newTab: false,
  //       path: "/signup",
  //     },
  //     {
  //       id: 69,
  //       title: "My Account",
  //       newTab: false,
  //       path: "/my-account",
  //     },
  //     {
  //       id: 70,
  //       title: "Contact",
  //       newTab: false,
  //       path: "/contact",
  //     },
  //     {
  //       id: 62,
  //       title: "Error",
  //       newTab: false,
  //       path: "/error",
  //     },
  //     {
  //       id: 63,
  //       title: "Mail Success",
  //       newTab: false,
  //       path: "/mail-success",
  //     },
  //   ],
  // },
  // {
  //   id: 7,
  //   title: "blogs",
  //   newTab: false,
  //   path: "/",
  //   submenu: [
  //     {
  //       id: 71,
  //       title: "Blog Grid with sidebar",
  //       newTab: false,
  //       path: "/blogs/blog-grid-with-sidebar",
  //     },
  //     {
  //       id: 72,
  //       title: "Blog Grid",
  //       newTab: false,
  //       path: "/blogs/blog-grid",
  //     },
  //     {
  //       id: 73,
  //       title: "Blog details with sidebar",
  //       newTab: false,
  //       path: "/blogs/blog-details-with-sidebar",
  //     },
  //     {
  //       id: 74,
  //       title: "Blog details",
  //       newTab: false,
  //       path: "/blogs/blog-details",
  //     },
  //   ],
  // },
];

export const categories = [
  {
    _id: "65a0a8e63e8480d8cc796b34",
    name: "camera & photo",
    description: "Equipment and accessories related to photography.",
  },
  {
    _id: "65a0a8e63e8480d8cc796b40",
    name: "smartphones & tablets",
    description:
      "Mobile devices and accessories for communication and productivity.",
  },
  {
    _id: "65a0a8e63e8480d8cc796b5c",
    name: "laptops & computers",
    description: "Computing devices and related accessories.",
  },
  {
    _id: "65a0a8e73e8480d8cc796b6e",
    name: "audio",
    description: "Sound-related devices and accessories.",
  },
  {
    _id: "65a0a8e73e8480d8cc796b90",
    name: "office electronics",
    description: "Devices and equipment commonly used in office environments.",
  },
  {
    _id: "65a0a8e53e8480d8cc796b26",
    name: "television & video",
    description: "Devices and equipment related to visual entertainment.",
  },
];
