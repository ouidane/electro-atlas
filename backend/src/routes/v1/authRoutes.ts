import express from "express";
import { authController } from "../../controllers/authController";
import {
  validateLogin,
  validateVerifyEmail,
  validateForgotPassword,
  validateResetPassword,
  validateRegister,
} from "../../middlewares";
import { requireAuth } from "../../middlewares/premissions";

export const router = express.Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     operationId: registerUser
 *     tags:
 *       - auth
 *     requestBody:
 *       $ref: '#/components/requestBodies/RegisterUser'
 *     responses:
 *       '204':
 *         description: User registered successfully
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '409':
 *         $ref: '#/components/responses/ConflictError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/register", validateRegister, authController.register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     operationId: loginUser
 *     tags:
 *       - auth
 *     requestBody:
 *       $ref: '#/components/requestBodies/UserLogin'
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLoginResponse'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/login", validateLogin, authController.login);

/**
 * @openapi
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     operationId: refreshToken
 *     tags:
 *       - auth
 *     security:
 *       - RefreshTokenCookie: []
 *     responses:
 *       '200':
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshTokenResponse'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/refresh-token", authController.refreshToken);

/**
 * @openapi
 * /auth/verify-email/confirm:
 *   post:
 *     summary: Confirm email verification
 *     operationId: verifyEmail
 *     tags:
 *       - auth
 *     requestBody:
 *       $ref: '#/components/requestBodies/VerifyEmail'
 *     responses:
 *       '204':
 *         description: Email verified successfully
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post(
  "/verify-email/confirm",
  validateVerifyEmail,
  authController.verifyEmail,
);

/**
 * @openapi
 * /auth/verify-email/request:
 *   post:
 *     summary: Request email verification code
 *     operationId: resendVerificationCode
 *     tags:
 *       - auth
 *     requestBody:
 *       $ref: '#/components/requestBodies/ResendVerificationCode'
 *     responses:
 *       '204':
 *         description: Verification code resent successfully
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/verify-email/request", authController.resendVerificationCode);

/**
 * @openapi
 * /auth/password-reset/request:
 *   post:
 *     summary: Request password reset
 *     operationId: forgotPassword
 *     tags:
 *       - auth
 *     requestBody:
 *       $ref: '#/components/requestBodies/ForgotPassword'
 *     responses:
 *       '200':
 *         description: Password reset link sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForgotPasswordResponse'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post(
  "/password-reset/request",
  validateForgotPassword,
  authController.forgotPassword,
);

/**
 * @openapi
 * /auth/password-reset/confirm:
 *   post:
 *     summary: Confirm reset password
 *     operationId: resetPassword
 *     tags:
 *       - auth
 *     requestBody:
 *       $ref: '#/components/requestBodies/ResetPassword'
 *     responses:
 *       '204':
 *         description: Password reset successfully
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post(
  "/password-reset/confirm",
  validateResetPassword,
  authController.resetPassword,
);

/**
 * @openapi
 * /auth/oauth/google:
 *   get:
 *     summary: Initiate Google Authentication
 *     operationId: initiateGoogleAuth
 *     tags:
 *       - auth
 *     parameters:
 *       - name: callbackUrl
 *         in: query
 *         schema:
 *           type: string
 *         description: URL to redirect after successful authentication
 *     responses:
 *       '302':
 *         description: URL of Google's authorization endpoint
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/oauth/google", authController.initiateGoogleAuth);

router.get("/oauth/google/callback", authController.googleAuthCallback);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     operationId: logout
 *     tags:
 *       - auth
 *     security:
 *       - AccessTokenAuth: []
 *     responses:
 *       '204':
 *         description: Logout successful
 */
router.post("/logout", authController.logout);

/**
 * @openapi
 * /auth/status:
 *   get:
 *     summary: Get authentication status
 *     operationId: getAuthStatus
 *     tags:
 *       - auth
 *     security:
 *       - AccessTokenAuth: []
 *     responses:
 *       '200':
 *         description: Authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authenticated:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     role:
 *                       type: string
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/status", requireAuth, authController.status);
