import { Router } from "express";
import { router as cartRouter } from "./cartRoutes";
import { router as authRouter } from "./authRoutes";
import { router as userRouter } from "./userRoutes";
import { router as productRouter } from "./productRoutes";
import { router as reviewRoute } from "./reviewRoute";
import { router as categoryRouter } from "./categoryRoutes";
import { router as departmentsRoute } from "./departmentsRoutes";
import { router as wishlistRouter } from "./wishlistRoutes";
import { router as orderRouter } from "./orderRoutes";
import { router as saleRouter } from "./saleRoutes";
import { router as discoverRoute } from "./discoverRoutes";
import { router as filterRoute } from "./filterRoutes";
import { router as paymentRouter } from "./paymentRouters";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/products/:productId/reviews", reviewRoute);
router.use("/carts", cartRouter);
router.use("/wishlists", wishlistRouter);
router.use("/categories", categoryRouter);
router.use("/departments", departmentsRoute);
router.use("/discover", discoverRoute);
router.use("/products-filter", filterRoute);
router.use("/payments", paymentRouter);
router.use("/orders", orderRouter);
router.use("/sales", saleRouter);

export default router;
