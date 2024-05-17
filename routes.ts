/**
 * An array of routes that are accessible to the public and does not need authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];
/**
 * This dynamic route is accessible to the public and does not need authentication
 * @type {string[]}
 */
export const publicPreviewRoute = "/preview";

/**
 * An array of routes that are used for authentication, these routes will redirect to the /settings page
 * @type {string[]}
 */
export const authRoutes = ["/login", "/register"];
/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string[]}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
