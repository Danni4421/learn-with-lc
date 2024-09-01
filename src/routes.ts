const uuidRegexPattern =
  "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$";
const randomCharacters = ".*$";

/**
 * Array contain bounce of url that is accessible to public or guest
 * There route do not require authentication
 * @type {string}
 */
export const publicRoutes = [
  "^/$",
  "^/testimonials$",
  `^/testimonials/${uuidRegexPattern}`,
  `^/user/${randomCharacters}`,
];

/**
 * Array contain bouse of url that is used for authentication
 * These route will redirecting user to the path suitable with their role
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * Before accessing this route, Client must be authenticated
 */
export const authenticatedRoutes = ["/dashboard"];

/**
 * Prefix that currently used for authentication
 * Route that have this prefix should be used for authentication purposed
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Path that going to be DEFAULT url used for redirecting user after successfully logged in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
