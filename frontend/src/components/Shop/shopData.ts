import { Product } from "@/types/product";

const shopData: {
  data: Product[];
  metadata: {
    page: number;
    limit: number;
    totalDocs: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number;
    filters: {
      query: string;
    };
  };
  links: {
    self: string;
    next?: string;
    prev?: string;
  };
} = {
  data: [
    {
      _id: "685de0077153e286d808c0a2",
      name: "SAMSUNG GALAXY S21 FE 5G CELL PHONE, FACTORY UNLOCKED ANDROID SMARTPHONE, 256GB, 120HZ DISPLAY SCREEN, PRO GRADE CAMERA, ALL DAY INTELLIGENT BATTERY, US VERSION, GRAPHITE",
      isFeatured: true,
      image: {
        publicId: "amazon",
        tiny: "https://m.media-amazon.com/images/I/31UKfQj4sLL._AC_US40_.jpg",
        medium:
          "https://m.media-amazon.com/images/I/6196aSa4qHL._AC_SY450_.jpg",
        large:
          "https://m.media-amazon.com/images/I/6196aSa4qHL._AC_SL1500_.jpg",
      },
      reviews: {
        avgRate: 0,
        roundAvgRate: 0,
        count: 0,
      },
      createdAt: "2025-06-27T00:04:23.821Z",
      updatedAt: "2025-06-28T21:06:12.844Z",
      variant: {
        variation: "SMA-SAM-GRA-6297",
        sku: "SMA-SAM-GRA-1892",
        color: "Graphite",
        inventory: 22,
        globalPrice: 76999,
        salePrice: 76999,
        discountPercent: 0,
        saleStartDate: "2025-06-27T00:04:23.820Z",
        salePriceDecimal: "769.99",
        globalPriceDecimal: "769.99",
        isInStock: true,
      },
      score: 5.39421796798706,
      highlights: [
        {
          score: 2.10354161262512,
          path: "name",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
            {
              value:
                " GALAXY S21 FE 5G CELL PHONE, FACTORY UNLOCKED ANDROID SMARTPHONE, 256GB, 120HZ DISPLAY SCREEN, PRO GRADE CAMERA, ALL DAY INTELLIGENT BATTERY, US VERSION, GRAPHITE",
              type: "text",
            },
          ],
        },
        {
          score: 2.52081203460693,
          path: "description",
          texts: [
            {
              value:
                "Whether you're a gaming guru, social star or fashionista, ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value:
                " Galaxy S21 FE 5G is jam-packed with features that help you get more out of whatever you're into, including an All-Day Intelligent Battery,¹ a powerful processor, a smooth and strong display, a triple-lens camera and more. ",
              type: "text",
            },
          ],
        },
        {
          score: 2.82370734214783,
          path: "brand",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
          ],
        },
      ],
    },
    {
      _id: "685de0367153e286d808c3b2",
      name: "FREEWELL MAGNETIC FOLDABLE PHONE TRIPOD STAND SELFIE STICK FOR IPHONE & SAMSUNG - ARCA-COMPATIBLE & RIG ANGLE ADJUSTMENT & MAGSAFE COMPATIBLE FOR VERSATILE SMARTPHONE FILMMAKING",
      isFeatured: true,
      image: {
        publicId: "amazon",
        tiny: "https://m.media-amazon.com/images/I/41hzHz2ejTL._AC_US40_.jpg",
        medium:
          "https://m.media-amazon.com/images/I/71dbwduoHAL._AC_SY450_.jpg",
        large:
          "https://m.media-amazon.com/images/I/71dbwduoHAL._AC_SL1500_.jpg",
      },
      reviews: {
        avgRate: 0,
        roundAvgRate: 0,
        count: 0,
      },
      createdAt: "2025-06-27T00:05:10.811Z",
      updatedAt: "2025-06-28T21:06:28.913Z",
      variant: {
        variation: "PC-FRE-NS-9068",
        sku: "PC-FRE-NS-8786",
        color: "Not Specified",
        inventory: 20,
        globalPrice: 6999,
        salePrice: 4999,
        discountPercent: 29,
        saleStartDate: "2025-06-27T00:05:10.810Z",
        salePriceDecimal: "49.99",
        globalPriceDecimal: "69.99",
        isInStock: true,
      },
      score: 3.90539455413818,
      highlights: [
        {
          score: 2.08260154724121,
          path: "name",
          texts: [
            {
              value:
                "FREEWELL MAGNETIC FOLDABLE PHONE TRIPOD STAND SELFIE STICK FOR IPHONE & ",
              type: "text",
            },
            {
              value: "SAMSUNG",
              type: "hit",
            },
            {
              value:
                " - ARCA-COMPATIBLE & RIG ANGLE ADJUSTMENT & MAGSAFE COMPATIBLE FOR VERSATILE SMARTPHONE FILMMAKING",
              type: "text",
            },
          ],
        },
        {
          score: 2.08260154724121,
          path: "description",
          texts: [
            {
              value:
                "Freewell Magnetic Foldable Phone Tripod Stand Selfie Stick for iPhone & ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value:
                " - Arca-Compatible & Rig angle Adjustment & MagSafe Compatible for Versatile Smartphone Filmmaking",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      _id: "685de03b7153e286d808c40f",
      name: "PHONE RING HOLDER - JCHIEN TRANSPARENT UNIVERSAL FINGER GRIP KICKSTAND CELL PHONE RING STAND HOLDER COMPATIBLE WITH IPHONE SAMSUNG SMARTPHONES 2 PACK - GOLD",
      isFeatured: true,
      image: {
        publicId: "amazon",
        tiny: "https://m.media-amazon.com/images/I/41dpehqLDeL._AC_US40_.jpg",
        medium:
          "https://m.media-amazon.com/images/I/61vAqBeMMUL._AC_SY450_.jpg",
        large:
          "https://m.media-amazon.com/images/I/61vAqBeMMUL._AC_SL1500_.jpg",
      },
      reviews: {
        avgRate: 0,
        roundAvgRate: 0,
        count: 0,
      },
      createdAt: "2025-06-27T00:05:15.968Z",
      updatedAt: "2025-06-28T21:06:30.716Z",
      variant: {
        variation: "PC-JCH-GOL-8316",
        sku: "PC-JCH-GOL-2020",
        color: "Gold",
        inventory: 15,
        globalPrice: 499,
        salePrice: 499,
        discountPercent: 0,
        saleStartDate: "2025-06-27T00:05:15.968Z",
        salePriceDecimal: "4.99",
        globalPriceDecimal: "4.99",
        isInStock: true,
      },
      score: 3.94441509246826,
      highlights: [
        {
          score: 2.14706587791443,
          path: "name",
          texts: [
            {
              value:
                "PHONE RING HOLDER - JCHIEN TRANSPARENT UNIVERSAL FINGER GRIP KICKSTAND CELL PHONE RING STAND HOLDER COMPATIBLE WITH IPHONE ",
              type: "text",
            },
            {
              value: "SAMSUNG",
              type: "hit",
            },
            {
              value: " SMARTPHONES 2 PACK - GOLD",
              type: "text",
            },
          ],
        },
        {
          score: 2.19294953346252,
          path: "description",
          texts: [
            {
              value:
                "Phone Ring Holder - JCHIEN Transparent Universal Finger Grip Kickstand Cell Phone Ring Stand Holder Compatible with iPhone ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value: " Smartphones",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      _id: "685de0397153e286d808c3dc",
      name: "BUNDLE: SMALLRIG UNIVERSAL SMARTPHONE VIDEO RIG FOR IPHONE FOR SAMSUNG 2791B+SIDE HANDLE 3838+3894+MINI TRIPOD FOR CAMERA BUT2664",
      isFeatured: true,
      image: {
        publicId: "amazon",
        tiny: "https://m.media-amazon.com/images/I/51BfHryWdrL._AC_US40_.jpg",
        medium:
          "https://m.media-amazon.com/images/I/61LgL54MgYL._AC_SY450_.jpg",
        large:
          "https://m.media-amazon.com/images/I/61LgL54MgYL._AC_SL1500_.jpg",
      },
      reviews: {
        avgRate: 0,
        roundAvgRate: 0,
        count: 0,
      },
      createdAt: "2025-06-27T00:05:13.079Z",
      updatedAt: "2025-06-28T21:06:29.690Z",
      variant: {
        variation: "PC-SMA-BLA-3299",
        sku: "PC-SMA-BLA-2264",
        color: "Black",
        inventory: 22,
        globalPrice: 14150,
        salePrice: 14150,
        discountPercent: 0,
        saleStartDate: "2025-06-27T00:05:13.078Z",
        salePriceDecimal: "141.5",
        globalPriceDecimal: "141.5",
        isInStock: true,
      },
      score: 4.00748682022095,
      highlights: [
        {
          score: 2.23786640167236,
          path: "name",
          texts: [
            {
              value:
                "BUNDLE: SMALLRIG UNIVERSAL SMARTPHONE VIDEO RIG FOR IPHONE FOR ",
              type: "text",
            },
            {
              value: "SAMSUNG",
              type: "hit",
            },
            {
              value:
                " 2791B+SIDE HANDLE 3838+3894+MINI TRIPOD FOR CAMERA BUT2664",
              type: "text",
            },
          ],
        },
        {
          score: 2.23786640167236,
          path: "description",
          texts: [
            {
              value:
                "Bundle: SmallRig Universal Smartphone Video Rig for iPhone for ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value:
                " 2791B+Side Handle 3838+3894+Mini Tripod for Camera BUT2664",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      _id: "685de03e7153e286d808c433",
      name: "FREEWELL 6X TELEPHOTO LENS FOR SMARTPHONES – 17MM THREAD PROFESSIONAL ZOOM LENS FOR IPHONE & SAMSUNG",
      isFeatured: true,
      image: {
        publicId: "amazon",
        tiny: "https://m.media-amazon.com/images/I/31+SWVXuByL._AC_US40_.jpg",
        medium:
          "https://m.media-amazon.com/images/I/61Q9sH2j5uL._AC_SY450_.jpg",
        large:
          "https://m.media-amazon.com/images/I/61Q9sH2j5uL._AC_SL1500_.jpg",
      },
      reviews: {
        avgRate: 0,
        roundAvgRate: 0,
        count: 0,
      },
      createdAt: "2025-06-27T00:05:18.119Z",
      updatedAt: "2025-06-28T21:06:31.349Z",
      variant: {
        variation: "PC-FRE-UNK-1166",
        sku: "PC-FRE-UNK-6120",
        color: "unknown",
        inventory: 7,
        globalPrice: 14999,
        salePrice: 14999,
        discountPercent: 0,
        saleStartDate: "2025-06-27T00:05:18.119Z",
        salePriceDecimal: "149.99",
        globalPriceDecimal: "149.99",
        isInStock: true,
      },
      score: 4.26220178604126,
      highlights: [
        {
          score: 2.34720492362976,
          path: "name",
          texts: [
            {
              value:
                "FREEWELL 6X TELEPHOTO LENS FOR SMARTPHONES – 17MM THREAD PROFESSIONAL ZOOM LENS FOR IPHONE & ",
              type: "text",
            },
            {
              value: "SAMSUNG",
              type: "hit",
            },
          ],
        },
        {
          score: 2.34720492362976,
          path: "description",
          texts: [
            {
              value:
                "Freewell 6x Telephoto Lens for Smartphones – 17mm Thread Professional Zoom Lens for iPhone & ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
          ],
        },
      ],
    },
    {
      _id: "685de0167153e286d808c195",
      name: "SAMSUNG GALAXY XCOVER6 PRO 5G | RUGGED (IP68 RATED) UNLOCKED (VERIZON, AT&T, T-MOBILE, US CELLULAR) | DUAL SIM (1 NANO + 1 ESIM) | 128GB | US VERSION (2022 MODEL) | BLACK (SM-G736UZKEXAA)",
      isFeatured: true,
      image: {
        publicId: "amazon",
        tiny: "https://m.media-amazon.com/images/I/41MBQHCOzNL._AC_US40_.jpg",
        medium:
          "https://m.media-amazon.com/images/I/61wOkVzeqBL._AC_SY450_.jpg",
        large:
          "https://m.media-amazon.com/images/I/61wOkVzeqBL._AC_SL1500_.jpg",
      },
      reviews: {
        avgRate: 0,
        roundAvgRate: 0,
        count: 0,
      },
      createdAt: "2025-06-27T00:04:38.232Z",
      updatedAt: "2025-06-28T21:06:18.624Z",
      variant: {
        variation: "SMA-SAM-BLA-4028",
        sku: "SMA-SAM-BLA-2027",
        color: "Black",
        inventory: 11,
        globalPrice: 60799,
        salePrice: 60799,
        discountPercent: 0,
        saleStartDate: "2025-06-27T00:04:38.231Z",
        salePriceDecimal: "607.99",
        globalPriceDecimal: "607.99",
        isInStock: true,
      },
      score: 4.51196956634522,
      highlights: [
        {
          score: 2.05357885360718,
          path: "name",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
            {
              value:
                " GALAXY XCOVER6 PRO 5G | RUGGED (IP68 RATED) UNLOCKED (VERIZON, AT&T, T-MOBILE, US CELLULAR) | DUAL SIM (1 NANO + 1 ESIM) | 128GB | US VERSION (2022 MODEL) | BLACK (SM-G736UZKEXAA)",
              type: "text",
            },
          ],
        },
        {
          score: 3.87729287147522,
          path: "description",
          texts: [
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value:
                " does not guarantee device performance in all extreme conditions. ²1.5M drop is only tested with case on, without case the device itself can withstand a drop from 1.2M. ³Water resistant in up to 5 feet of water for up to 30 minutes. ",
              type: "text",
            },
          ],
        },
        {
          score: 2.82370734214783,
          path: "brand",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
          ],
        },
      ],
    },
    {
      _id: "685de0257153e286d808c294",
      name: "SAMSUNG GALAXY TAB S9+ 5G PLUS 12.4” 256GB (VERIZON) PLUS WIFI ANDROID TABLET, SNAPDRAGON 8 GEN 2 PROCESSOR, AMOLED SCREEN, S PEN INCLUDED, LONG BATTERY LIFE, AUTO FOCUS CAMERA, DOLBY AUDIO, GRAPHITE",
      isFeatured: true,
      image: {
        publicId: "amazon",
        tiny: "https://m.media-amazon.com/images/I/31gC3WHGmnL._AC_US40_.jpg",
        medium:
          "https://m.media-amazon.com/images/I/71RXkwrLY4L._AC_SY450_.jpg",
        large:
          "https://m.media-amazon.com/images/I/71RXkwrLY4L._AC_SL1500_.jpg",
      },
      reviews: {
        avgRate: 0,
        roundAvgRate: 0,
        count: 0,
      },
      createdAt: "2025-06-27T00:04:53.330Z",
      updatedAt: "2025-06-28T21:06:23.490Z",
      variant: {
        variation: "TAB-SAM-GRA-7701",
        sku: "TAB-SAM-GRA-5526",
        color: "Graphite",
        inventory: 6,
        globalPrice: 105813,
        salePrice: 105813,
        discountPercent: 0,
        saleStartDate: "2025-06-27T00:04:53.330Z",
        salePriceDecimal: "1058.13",
        globalPriceDecimal: "1058.13",
        isInStock: true,
      },
      score: 4.63642883300781,
      highlights: [
        {
          score: 2.02005982398987,
          path: "name",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
            {
              value:
                " GALAXY TAB S9+ 5G PLUS 12.4” 256GB (VERIZON) PLUS WIFI ANDROID TABLET, SNAPDRAGON 8 GEN 2 PROCESSOR, AMOLED SCREEN, S PEN INCLUDED, LONG BATTERY LIFE, AUTO FOCUS CAMERA, DOLBY AUDIO, GRAPHITE",
              type: "text",
            },
          ],
        },
        {
          score: 6.35233306884766,
          path: "description",
          texts: [
            {
              value: "****Wall charger sold separately; use only ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value: " approved chargers and cables. ",
              type: "text",
            },
          ],
        },
        {
          score: 2.82370734214783,
          path: "brand",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
          ],
        },
      ],
    },
    {
      _id: "685de0787153e286d808c808",
      name: "SAMSUNG T7 SHIELD 2TB PORTABLE SSD, USB 3.2 GEN2, RUGGED, IP65 RATED, FOR PHOTOGRAPHERS, CONTENT CREATORS AND GAMING, EXTERNAL SOLID STATE DRIVE (MU-PE2T0R/AM, 2022), BLUE",
      isFeatured: true,
      image: {
        publicId: "amazon",
        tiny: "https://m.media-amazon.com/images/I/21a+pKv8HmL._AC_US40_.jpg",
        medium:
          "https://m.media-amazon.com/images/I/61L9DmGqVgL._AC_SY450_.jpg",
        large:
          "https://m.media-amazon.com/images/I/61L9DmGqVgL._AC_SL1500_.jpg",
      },
      reviews: {
        avgRate: 0,
        roundAvgRate: 0,
        count: 0,
      },
      createdAt: "2025-06-27T00:06:16.981Z",
      updatedAt: "2025-06-28T21:06:50.092Z",
      variant: {
        variation: "EHD-SAM-BLU-6425",
        sku: "EHD-SAM-BLU-9033",
        color: "Blue",
        inventory: 8,
        globalPrice: 28499,
        salePrice: 15999,
        discountPercent: 44,
        saleStartDate: "2025-06-27T00:06:16.980Z",
        salePriceDecimal: "159.99",
        globalPriceDecimal: "284.99",
        isInStock: true,
      },
      score: 4.71780252456665,
      highlights: [
        {
          score: 2.10051774978638,
          path: "name",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
            {
              value:
                " T7 SHIELD 2TB PORTABLE SSD, USB 3.2 GEN2, RUGGED, IP65 RATED, FOR PHOTOGRAPHERS, CONTENT CREATORS AND GAMING, EXTERNAL SOLID STATE DRIVE (MU-PE2T0R/AM, 2022), BLUE",
              type: "text",
            },
          ],
        },
        {
          score: 6.3453860282898,
          path: "description",
          texts: [
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value:
                " T7 Shield Portable SSD delivers high performance on-the-go, not matter the terrain. ",
              type: "text",
            },
          ],
        },
        {
          score: 2.82370734214783,
          path: "brand",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
          ],
        },
      ],
    },
    {
      _id: "685de0157153e286d808c186",
      name: 'SAMSUNG GALAXY Z FOLD6 5G 1TB (UNLOCKED) FOLDABLE AI SMARTPHONE, 7.6" LARGE SCREEN, 1856X2160 120HZ DISPLAY, HANDSFREE LIVE INTERPRETER, AI PHOTO EDITS, W/WIRELESS CHARGER, NAVY',
      isFeatured: true,
      image: {
        publicId: "amazon",
        tiny: "https://m.media-amazon.com/images/I/31vhobx92hL._AC_US40_.jpg",
        medium:
          "https://m.media-amazon.com/images/I/41xMwHu7q4L._AC_SY450_.jpg",
        large:
          "https://m.media-amazon.com/images/I/41xMwHu7q4L._AC_SL1500_.jpg",
      },
      reviews: {
        avgRate: 0,
        roundAvgRate: 0,
        count: 0,
      },
      createdAt: "2025-06-27T00:04:37.359Z",
      updatedAt: "2025-06-28T21:06:18.340Z",
      variant: {
        variation: "SMA-SAM-NAV-8434",
        sku: "SMA-SAM-NAV-2471",
        color: "Navy",
        inventory: 8,
        globalPrice: 159997,
        salePrice: 159997,
        discountPercent: 0,
        saleStartDate: "2025-06-27T00:04:37.358Z",
        salePriceDecimal: "1599.97",
        globalPriceDecimal: "1599.97",
        isInStock: true,
      },
      score: 4.94578361511231,
      highlights: [
        {
          score: 2.08260154724121,
          path: "name",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
            {
              value:
                ' GALAXY Z FOLD6 5G 1TB (UNLOCKED) FOLDABLE AI SMARTPHONE, 7.6" LARGE SCREEN, 1856X2160 120HZ DISPLAY, HANDSFREE LIVE INTERPRETER, AI PHOTO EDITS, W/WIRELESS CHARGER, NAVY',
              type: "text",
            },
          ],
        },
        {
          score: 6.44516658782959,
          path: "description",
          texts: [
            {
              value: "Step into a new era of mobile technology with the ",
              type: "text",
            },
            {
              value: "SAMSUNG",
              type: "hit",
            },
            {
              value: " Galaxy Z Fold6. ",
              type: "text",
            },
          ],
        },
        {
          score: 2.82370734214783,
          path: "brand",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
          ],
        },
      ],
    },
    {
      _id: "685de01f7153e286d808c22e",
      name: 'SAMSUNG GALAXY TAB A9+ (128GB, 8GB) 11.0" ANDROID WI-FI TABLET, ALL DAY BATTERY, SNAPDRAGON 695 (6NM), INTERNATIONAL MODEL X210 (GRAPHITE)',
      isFeatured: true,
      image: {
        publicId: "amazon",
        tiny: "https://m.media-amazon.com/images/I/318IAvgjxlL._AC_US40_.jpg",
        medium:
          "https://m.media-amazon.com/images/I/41Bv4zv+y8L._AC_SY450_.jpg",
        large:
          "https://m.media-amazon.com/images/I/41Bv4zv+y8L._AC_SL1500_.jpg",
      },
      reviews: {
        avgRate: 0,
        roundAvgRate: 0,
        count: 0,
      },
      createdAt: "2025-06-27T00:04:47.239Z",
      updatedAt: "2025-06-28T21:06:21.627Z",
      variant: {
        variation: "TAB-SAM-GRA-2810",
        sku: "TAB-SAM-GRA-4038",
        color: "Graphite",
        inventory: 17,
        globalPrice: 19999,
        salePrice: 19999,
        discountPercent: 0,
        saleStartDate: "2025-06-27T00:04:47.239Z",
        salePriceDecimal: "199.99",
        globalPriceDecimal: "199.99",
        isInStock: true,
      },
      score: 5.30016183853149,
      highlights: [
        {
          score: 2.20652318000793,
          path: "name",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
            {
              value:
                ' GALAXY TAB A9+ (128GB, 8GB) 11.0" ANDROID WI-FI TABLET, ALL DAY BATTERY, SNAPDRAGON 695 (6NM), INTERNATIONAL MODEL X210 (GRAPHITE)',
              type: "text",
            },
          ],
        },
        {
          score: 4.7228274345398,
          path: "description",
          texts: [
            {
              value: "Plus, the preloaded ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value:
                " Kids app provides a safe digital environment for your little ones to happily learn and play. ",
              type: "text",
            },
          ],
        },
        {
          score: 5.23577356338501,
          path: "description",
          texts: [
            {
              value:
                "Trusted by parents: Give your kids a safe place to learn and play with the ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value: " Kids app. ",
              type: "text",
            },
          ],
        },
        {
          score: 2.82370734214783,
          path: "brand",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
          ],
        },
      ],
    },
    {
      _id: "685de0227153e286d808c25e",
      name: "SAMSUNG GALAXY TAB S6 LITE 10.4' 64GB WIFI ANDROID TABLET, S PEN INCLUDED, GAMING READY, LONG BATTERY LIFE, SLIM METAL DESIGN, EXPANDABLE STORAGE, US VERSION, OXFORD GRAY, AMAZON EXCLUSIVE (2024)",
      isFeatured: true,
      image: {
        publicId: "amazon",
        tiny: "https://m.media-amazon.com/images/I/41G-t5WVhGL._AC_US40_.jpg",
        medium:
          "https://m.media-amazon.com/images/I/71-hJGtkLWL._AC_SY450_.jpg",
        large:
          "https://m.media-amazon.com/images/I/71-hJGtkLWL._AC_SL1500_.jpg",
      },
      reviews: {
        avgRate: 0,
        roundAvgRate: 0,
        count: 0,
      },
      createdAt: "2025-06-27T00:04:50.040Z",
      updatedAt: "2025-06-28T21:06:22.488Z",
      variant: {
        variation: "TAB-SAM-OG-2909",
        sku: "TAB-SAM-OG-5111",
        color: "Oxford Gray",
        inventory: 18,
        globalPrice: 22260,
        salePrice: 22260,
        discountPercent: 0,
        saleStartDate: "2025-06-27T00:04:50.039Z",
        salePriceDecimal: "222.6",
        globalPriceDecimal: "222.6",
        isInStock: true,
      },
      score: 5.32534122467041,
      highlights: [
        {
          score: 2.03107976913452,
          path: "name",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
            {
              value:
                " GALAXY TAB S6 LITE 10.4' 64GB WIFI ANDROID TABLET, S PEN INCLUDED, GAMING READY, LONG BATTERY LIFE, SLIM METAL DESIGN, EXPANDABLE STORAGE, US VERSION, OXFORD GRAY, AMAZON EXCLUSIVE (2024)",
              type: "text",
            },
          ],
        },
        {
          score: 5.6798620223999,
          path: "description",
          texts: [
            {
              value: "Requires ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value: " account and Wi-Fi and Bluetooth connection. ",
              type: "text",
            },
          ],
        },
        {
          score: 2.73998308181763,
          path: "description",
          texts: [
            {
              value:
                "Quick Share to iOS and Android devices available by sending shared link: individual files shared cannot exceed 3GB (for a total of 5GB per day) and link will expire after two days; requires a ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value:
                " account and internet connection. ⁴Book Cover sold separately.",
              type: "text",
            },
          ],
        },
        {
          score: 2.82370734214783,
          path: "brand",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
          ],
        },
      ],
    },
    {
      _id: "685de0187153e286d808c1c2",
      name: "SAMSUNG GALAXY S21 FE 5G CELL PHONE, FACTORY UNLOCKED ANDROID SMARTPHONE, 128GB, 120HZ DISPLAY SCREEN, PRO GRADE CAMERA, ALL DAY INTELLIGENT BATTERY, US VERSION, 2022, WHITE",
      isFeatured: true,
      image: {
        publicId: "amazon",
        tiny: "https://m.media-amazon.com/images/I/31L671ji7XL._AC_US40_.jpg",
        medium:
          "https://m.media-amazon.com/images/I/61S8-z34EFL._AC_SY450_.jpg",
        large:
          "https://m.media-amazon.com/images/I/61S8-z34EFL._AC_SL1500_.jpg",
      },
      reviews: {
        avgRate: 0,
        roundAvgRate: 0,
        count: 0,
      },
      createdAt: "2025-06-27T00:04:40.773Z",
      updatedAt: "2025-06-28T21:06:19.449Z",
      variant: {
        variation: "SMA-SAM-WHI-3484",
        sku: "SMA-SAM-WHI-6830",
        color: "White",
        inventory: 13,
        globalPrice: 36444,
        salePrice: 36444,
        discountPercent: 0,
        saleStartDate: "2025-06-27T00:04:40.773Z",
        salePriceDecimal: "364.44",
        globalPriceDecimal: "364.44",
        isInStock: true,
      },
      score: 5.37574481964111,
      highlights: [
        {
          score: 2.09450268745422,
          path: "name",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
            {
              value:
                " GALAXY S21 FE 5G CELL PHONE, FACTORY UNLOCKED ANDROID SMARTPHONE, 128GB, 120HZ DISPLAY SCREEN, PRO GRADE CAMERA, ALL DAY INTELLIGENT BATTERY, US VERSION, 2022, WHITE",
              type: "text",
            },
          ],
        },
        {
          score: 2.52081203460693,
          path: "description",
          texts: [
            {
              value:
                "Whether you're a gaming guru, social star or fashionista, ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value:
                " Galaxy S21 FE 5G is jam-packed with features that help you get more out of whatever you're into, including an All-Day Intelligent Battery,¹ a powerful processor, a smooth and strong display, a triple-lens camera and more. ",
              type: "text",
            },
          ],
        },
        {
          score: 2.82370734214783,
          path: "brand",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
          ],
        },
      ],
    },
    {
      _id: "685de0297153e286d808c2df",
      name: "SAMSUNG GALAXY TAB A 10.1 32 GB WIFI TABLET BLACK (2019)",
      isFeatured: true,
      image: {
        publicId: "amazon",
        tiny: "https://m.media-amazon.com/images/I/41CP-enRfhL._AC_US40_.jpg",
        medium:
          "https://m.media-amazon.com/images/I/51-J54qgkyL._AC_SY450_.jpg",
        large:
          "https://m.media-amazon.com/images/I/51-J54qgkyL._AC_SL1500_.jpg",
      },
      reviews: {
        avgRate: 0,
        roundAvgRate: 0,
        count: 0,
      },
      createdAt: "2025-06-27T00:04:57.599Z",
      updatedAt: "2025-06-28T21:06:24.837Z",
      variant: {
        variation: "TAB-SAM-BLA-5946",
        sku: "TAB-SAM-BLA-5480",
        color: "Black",
        inventory: 23,
        globalPrice: 17900,
        salePrice: 17900,
        discountPercent: 0,
        saleStartDate: "2025-06-27T00:04:57.598Z",
        salePriceDecimal: "179",
        globalPriceDecimal: "179",
        isInStock: true,
      },
      score: 3.90039300918579,
      highlights: [
        {
          score: 2.54325008392334,
          path: "name",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
            {
              value: " GALAXY TAB A 10.1 32 GB WIFI TABLET BLACK (2019)",
              type: "text",
            },
          ],
        },
        {
          score: 2.82370734214783,
          path: "brand",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
          ],
        },
      ],
    },
    {
      _id: "685de0067153e286d808c093",
      name: "SAMSUNG GALAXY A16 5G A SERIES CELL PHONE, UNLOCKED ANDROID SMARTPHONE, LARGE AMOLED DISPLAY, DURABLE DESIGN, SUPER FAST CHARGING, EXPANDABLE STORAGE, US VERSION, 2025, BLUE BLACK",
      isFeatured: true,
      image: {
        publicId: "amazon",
        tiny: "https://m.media-amazon.com/images/I/412sfpVYjBL._AC_US40_.jpg",
        medium:
          "https://m.media-amazon.com/images/I/71KGkQ+KOKL._AC_SY450_.jpg",
        large:
          "https://m.media-amazon.com/images/I/71KGkQ+KOKL._AC_SL1500_.jpg",
      },
      reviews: {
        avgRate: 0,
        roundAvgRate: 0,
        count: 0,
      },
      createdAt: "2025-06-27T00:04:22.878Z",
      updatedAt: "2025-06-28T21:06:12.577Z",
      variant: {
        variation: "SMA-SAM-BB-5695",
        sku: "SMA-SAM-BB-3736",
        color: "Blue Black",
        inventory: 13,
        globalPrice: 19999,
        salePrice: 19999,
        discountPercent: 0,
        saleStartDate: "2025-06-27T00:04:22.877Z",
        salePriceDecimal: "199.99",
        globalPriceDecimal: "199.99",
        isInStock: true,
      },
      score: 5.46795177459717,
      highlights: [
        {
          score: 2.07671451568604,
          path: "name",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
            {
              value:
                " GALAXY A16 5G A SERIES CELL PHONE, UNLOCKED ANDROID SMARTPHONE, LARGE AMOLED DISPLAY, DURABLE DESIGN, SUPER FAST CHARGING, EXPANDABLE STORAGE, US VERSION, 2025, BLUE BLACK",
              type: "text",
            },
          ],
        },
        {
          score: 4.23068523406982,
          path: "description",
          texts: [
            {
              value: "See ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value:
                " Wallet FAQ for more information.\n⁵Digital ID only for select corporate, government and educational institution partners. ",
              type: "text",
            },
          ],
        },
        {
          score: 2.66676545143127,
          path: "description",
          texts: [
            {
              value:
                "Super Fast Charging speed depends on battery level and other factors; use only ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value:
                "-approved chargers and cables; do not use any worn or damaged chargers or cables; incompatible charger or cable can cause serious injuries or damage to your device. ⁷MicroSD card sold separately. ",
              type: "text",
            },
          ],
        },
        {
          score: 2.82370734214783,
          path: "brand",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
          ],
        },
      ],
    },
    {
      _id: "685de01c7153e286d808c204",
      name: "SAMSUNG GALAXY A15 (SM-155M/DSN), 128GB 6GB RAM, DUAL SIM, FACTORY UNLOCKED GSM, INTERNATIONAL VERSION (WALL CHARGER BUNDLE) (LIGHT BLUE)",
      isFeatured: false,
      image: {
        publicId: "amazon",
        tiny: "https://m.media-amazon.com/images/I/31nwB9xXBlL._AC_US40_.jpg",
        medium:
          "https://m.media-amazon.com/images/I/51rp0nqaPoL._AC_SY450_.jpg",
        large:
          "https://m.media-amazon.com/images/I/51rp0nqaPoL._AC_SL1500_.jpg",
      },
      reviews: {
        avgRate: 0,
        roundAvgRate: 0,
        count: 0,
      },
      createdAt: "2025-06-27T00:04:44.839Z",
      updatedAt: "2025-06-28T21:06:20.859Z",
      variant: {
        variation: "SMA-SAM-LB-1084",
        sku: "SMA-SAM-LB-3764",
        color: "Light Blue",
        inventory: 13,
        globalPrice: 29999,
        salePrice: 16270,
        discountPercent: 46,
        saleStartDate: "2025-06-27T00:04:44.838Z",
        salePriceDecimal: "162.7",
        globalPriceDecimal: "299.99",
        isInStock: true,
      },
      score: 5.49251413345337,
      highlights: [
        {
          score: 2.20995092391968,
          path: "name",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
            {
              value:
                " GALAXY A15 (SM-155M/DSN), 128GB 6GB RAM, DUAL SIM, FACTORY UNLOCKED GSM, INTERNATIONAL VERSION (WALL CHARGER BUNDLE) (LIGHT BLUE)",
              type: "text",
            },
          ],
        },
        {
          score: 4.20924043655396,
          path: "description",
          texts: [
            {
              value: "Trust in ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value: " Knox Vault Certified EAL5+, ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value:
                " Knox Vault is designed to safeguard your sensitive data, such as PINs, passwords and patterns, in a separate tamper-resistant storage for protection against software and hardware threats involving voltage, glitches, high temperature and laser. ",
              type: "text",
            },
          ],
        },
        {
          score: 2.82370734214783,
          path: "brand",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
          ],
        },
      ],
    },
    {
      _id: "685de0147153e286d808c180",
      name: "SAMSUNG GALAXY A15 (SM-155M/DSN), 128GB 6GB RAM, DUAL SIM, FACTORY UNLOCKED GSM, INTERNATIONAL VERSION (WALL CHARGER BUNDLE) (LIGHT BLUE)",
      isFeatured: false,
      image: {
        publicId: "amazon",
        tiny: "https://m.media-amazon.com/images/I/31nwB9xXBlL._AC_US40_.jpg",
        medium:
          "https://m.media-amazon.com/images/I/51rp0nqaPoL._AC_SY450_.jpg",
        large:
          "https://m.media-amazon.com/images/I/51rp0nqaPoL._AC_SL1500_.jpg",
      },
      reviews: {
        avgRate: 0,
        roundAvgRate: 0,
        count: 0,
      },
      createdAt: "2025-06-27T00:04:36.955Z",
      updatedAt: "2025-06-28T21:06:18.234Z",
      variant: {
        variation: "SMA-SAM-LB-8663",
        sku: "SMA-SAM-LB-9682",
        color: "Light Blue",
        inventory: 13,
        globalPrice: 16270,
        salePrice: 16270,
        discountPercent: 0,
        saleStartDate: "2025-06-27T00:04:36.955Z",
        salePriceDecimal: "162.7",
        globalPriceDecimal: "162.7",
        isInStock: true,
      },
      score: 5.49251413345337,
      highlights: [
        {
          score: 2.20995092391968,
          path: "name",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
            {
              value:
                " GALAXY A15 (SM-155M/DSN), 128GB 6GB RAM, DUAL SIM, FACTORY UNLOCKED GSM, INTERNATIONAL VERSION (WALL CHARGER BUNDLE) (LIGHT BLUE)",
              type: "text",
            },
          ],
        },
        {
          score: 4.20924043655396,
          path: "description",
          texts: [
            {
              value: "Trust in ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value: " Knox Vault Certified EAL5+, ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value:
                " Knox Vault is designed to safeguard your sensitive data, such as PINs, passwords and patterns, in a separate tamper-resistant storage for protection against software and hardware threats involving voltage, glitches, high temperature and laser. ",
              type: "text",
            },
          ],
        },
        {
          score: 2.82370734214783,
          path: "brand",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
          ],
        },
      ],
    },
    {
      _id: "685de0267153e286d808c2a3",
      name: "SAMSUNG GALAXY TAB S9 FE 10.9” 128GB WIFI ANDROID TABLET, LARGE DISPLAY, LONG BATTERY LIFE, POWERFUL PROCESSOR, S PEN, 8MP CAMERA, LIGHTWEIGHT DURABLE DESIGN, EXPANDABLE STORAGE, US VERSION,2023, GRAY",
      isFeatured: true,
      image: {
        publicId: "amazon",
        tiny: "https://m.media-amazon.com/images/I/31ho+zHZDpL._AC_US40_.jpg",
        medium:
          "https://m.media-amazon.com/images/I/417bx91cc8L._AC_SY450_.jpg",
        large:
          "https://m.media-amazon.com/images/I/417bx91cc8L._AC_SL1500_.jpg",
      },
      reviews: {
        avgRate: 0,
        roundAvgRate: 0,
        count: 0,
      },
      createdAt: "2025-06-27T00:04:54.216Z",
      updatedAt: "2025-06-28T21:06:23.763Z",
      variant: {
        variation: "TAB-SAM-GRA-6579",
        sku: "TAB-SAM-GRA-8372",
        color: "Gray",
        inventory: 18,
        globalPrice: 44999,
        salePrice: 41891,
        discountPercent: 7,
        saleStartDate: "2025-06-27T00:04:54.215Z",
        salePriceDecimal: "418.91",
        globalPriceDecimal: "449.99",
        isInStock: true,
      },
      score: 5.54544687271118,
      highlights: [
        {
          score: 2.0173282623291,
          path: "name",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
            {
              value:
                " GALAXY TAB S9 FE 10.9” 128GB WIFI ANDROID TABLET, LARGE DISPLAY, LONG BATTERY LIFE, POWERFUL PROCESSOR, S PEN, 8MP CAMERA, LIGHTWEIGHT DURABLE DESIGN, EXPANDABLE STORAGE, US VERSION,2023, GRAY",
              type: "text",
            },
          ],
        },
        {
          score: 5.70706558227539,
          path: "description",
          texts: [
            {
              value: "Use only ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value: "-approved charger and USB-C cable. ",
              type: "text",
            },
          ],
        },
        {
          score: 5.37043857574463,
          path: "description",
          texts: [
            {
              value: "Requires ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value: " account and Wi-Fi and Bluetooth connection. ",
              type: "text",
            },
          ],
        },
        {
          score: 2.79344749450684,
          path: "description",
          texts: [
            {
              value:
                "Quick Share to iOS and Android devices available by sending shared link: individual files shared cannot exceed 3GB (for a total of 5GB per day) and link will expire after two days; requires a ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value: " account and internet connection. ",
              type: "text",
            },
          ],
        },
        {
          score: 2.82370734214783,
          path: "brand",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
          ],
        },
      ],
    },
    {
      _id: "685de0237153e286d808c270",
      name: "SAMSUNG GALAXY TAB ACTIVE5 WI-FI 8” 128GB ANDROID TABLET FOR INDUSTRIAL, FIELD WORK, ADVANCED SECURITY, RUGGED DESIGN, US VERSION, 2024, SM-X300NZGAN20, BLACK GREEN",
      isFeatured: true,
      image: {
        publicId: "amazon",
        tiny: "https://m.media-amazon.com/images/I/31ZV3rtpR9L._AC_US40_.jpg",
        medium:
          "https://m.media-amazon.com/images/I/61gThB8gJ3L._AC_SY450_.jpg",
        large:
          "https://m.media-amazon.com/images/I/61gThB8gJ3L._AC_SL1500_.jpg",
      },
      reviews: {
        avgRate: 0,
        roundAvgRate: 0,
        count: 0,
      },
      createdAt: "2025-06-27T00:04:51.079Z",
      updatedAt: "2025-06-28T21:06:22.808Z",
      variant: {
        variation: "TAB-SAM-BLA-8353",
        sku: "TAB-SAM-BLA-5625",
        color: "Black",
        inventory: 16,
        globalPrice: 49999,
        salePrice: 47524,
        discountPercent: 5,
        saleStartDate: "2025-06-27T00:04:51.079Z",
        salePriceDecimal: "475.24",
        globalPriceDecimal: "499.99",
        isInStock: true,
      },
      score: 5.56705141067505,
      highlights: [
        {
          score: 2.12191939353943,
          path: "name",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
            {
              value:
                " GALAXY TAB ACTIVE5 WI-FI 8” 128GB ANDROID TABLET FOR INDUSTRIAL, FIELD WORK, ADVANCED SECURITY, RUGGED DESIGN, US VERSION, 2024, SM-X300NZGAN20, BLACK GREEN",
              type: "text",
            },
          ],
        },
        {
          score: 2.64303159713745,
          path: "description",
          texts: [
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value:
                " does not guarantee device performance in all extreme conditions. ²Requires included travel adapter. ³No Battery Mode is an optional battery safety feature developed to enable Galaxy Tab Active5 to operate without battery with fixed and continuous power supplied. ",
              type: "text",
            },
          ],
        },
        {
          score: 1.65674662590027,
          path: "description",
          texts: [
            {
              value:
                "Notall use cases are recommended or advised. ⁴Glove Mode is compatible with most gloves and in wet conditions but does not work as intended with extremely heavy-duty gloves or mittens. ⁵External form factor has remained nearly the same but buttons and port positions have shifted since older models —please refer to diagrams online prior to purchase to confirm they will be compatible with previous cases. ⁶DeX can be activated via ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value:
                " Galaxy Tab Active5 without a cable only on supported monitors. ",
              type: "text",
            },
          ],
        },
        {
          score: 2.82370734214783,
          path: "brand",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
          ],
        },
      ],
    },
    {
      _id: "685de0417153e286d808c469",
      name: "SAMSUNG GALAXY S5, WHITE 16GB (AT&T)",
      isFeatured: true,
      image: {
        publicId: "amazon",
        tiny: "https://m.media-amazon.com/images/I/51bjwq5okTL._AC_US40_.jpg",
        medium:
          "https://m.media-amazon.com/images/I/81jA777WnxL._AC_SY450_.jpg",
        large:
          "https://m.media-amazon.com/images/I/81jA777WnxL._AC_SL1500_.jpg",
      },
      reviews: {
        avgRate: 0,
        roundAvgRate: 0,
        count: 0,
      },
      createdAt: "2025-06-27T00:05:21.598Z",
      updatedAt: "2025-06-28T21:06:32.301Z",
      variant: {
        variation: "PC-SAM-UNK-6819",
        sku: "PC-SAM-UNK-7389",
        color: "unknown",
        inventory: 23,
        globalPrice: 4299,
        salePrice: 4299,
        discountPercent: 0,
        saleStartDate: "2025-06-27T00:05:21.597Z",
        salePriceDecimal: "42.99",
        globalPriceDecimal: "42.99",
        isInStock: true,
      },
      score: 5.63385486602783,
      highlights: [
        {
          score: 2.64803004264832,
          path: "name",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
            {
              value: " GALAXY S5, WHITE 16GB (AT&T)",
              type: "text",
            },
          ],
        },
        {
          score: 6.00559425354004,
          path: "description",
          texts: [
            {
              value: "The ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value: " Galaxy S5 is technology that truly impacts your life. ",
              type: "text",
            },
          ],
        },
        {
          score: 2.82370734214783,
          path: "brand",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
          ],
        },
      ],
    },
    {
      _id: "685de0217153e286d808c255",
      name: 'SAMSUNG GALAXY TAB S6 LITE 10.4" 64GB WIFI ANDROID TABLET W/ S PEN INCLUDED, SLIM METAL DESIGN, CRYSTAL CLEAR DISPLAY, DUAL SPEAKERS, LONG LASTING BATTERY, SM-P610NZAAXAR, OXFORD GRAY',
      isFeatured: true,
      image: {
        publicId: "amazon",
        tiny: "https://m.media-amazon.com/images/I/31R-mSGmURL._AC_US40_.jpg",
        medium:
          "https://m.media-amazon.com/images/I/61Daz-UDCsL._AC_SY450_.jpg",
        large:
          "https://m.media-amazon.com/images/I/61Daz-UDCsL._AC_SL1500_.jpg",
      },
      reviews: {
        avgRate: 0,
        roundAvgRate: 0,
        count: 0,
      },
      createdAt: "2025-06-27T00:04:49.538Z",
      updatedAt: "2025-06-28T21:06:22.326Z",
      variant: {
        variation: "TAB-SAM-GRA-8846",
        sku: "TAB-SAM-GRA-9558",
        color: "Gray",
        inventory: 11,
        globalPrice: 34999,
        salePrice: 22994,
        discountPercent: 34,
        saleStartDate: "2025-06-27T00:04:49.538Z",
        salePriceDecimal: "229.94",
        globalPriceDecimal: "349.99",
        isInStock: true,
      },
      score: 5.65509653091431,
      highlights: [
        {
          score: 2.06506514549255,
          path: "name",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
            {
              value:
                ' GALAXY TAB S6 LITE 10.4" 64GB WIFI ANDROID TABLET W/ S PEN INCLUDED, SLIM METAL DESIGN, CRYSTAL CLEAR DISPLAY, DUAL SPEAKERS, LONG LASTING BATTERY, SM-P610NZAAXAR, OXFORD GRAY',
              type: "text",
            },
          ],
        },
        {
          score: 4.06640386581421,
          path: "description",
          texts: [
            {
              value: "With the ",
              type: "text",
            },
            {
              value: "Samsung",
              type: "hit",
            },
            {
              value:
                " Galaxy Tab S6 Lite, you can leave your mark on whatever comes your way. ",
              type: "text",
            },
          ],
        },
        {
          score: 2.82370734214783,
          path: "brand",
          texts: [
            {
              value: "SAMSUNG",
              type: "hit",
            },
          ],
        },
      ],
    },
  ],
  metadata: {
    page: 1,
    limit: 20,
    totalDocs: 95,
    totalPages: 5,
    hasPrevPage: false,
    hasNextPage: true,
    prevPage: null,
    nextPage: 2,
    filters: {
      query: "samsung",
    },
  },
  links: {
    self: "/api/v1/products/?limit=20&filter.query=samsung&page=1",
    next: "/api/v1/products/?limit=20&filter.query=samsung&page=2",
  },
};

export default shopData;
