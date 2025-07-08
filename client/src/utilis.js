// utils.js



/**
 * Check if a URL is safe:
 * - Must be HTTPS
 * - Must not contain < or >
 * - Must not be localhost or local IP
 * - If it ends with .png or .jpg (no query, no fragment), allow from anywhere
 * - Otherwise, allow any HTTPS site
 * - Must not be suspiciously long
 */
export function isSafeUrl(url) {
  try {
    if (!url || typeof url !== "string" || url.length > 2048) {
      return false;
    }

    // Block obvious XSS payloads
    if (url.includes("<") || url.includes(">")) {
      return false;
    }

    const u = new URL(url);

    // Only HTTPS allowed
    if (u.protocol !== "https:") {
      return false;
    }

    const hostname = u.hostname;

    // Block localhost and private IPs
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "::1" ||
      /^192\.168\./.test(hostname) ||
      /^10\./.test(hostname) ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)
    ) {
      return false;
    }

    // If path ends with .png or .jpg with no query or hash, allow from anywhere
    const pathOk =
      (u.pathname.endsWith(".png") || u.pathname.endsWith(".jpg")) &&
      u.search === "" &&
      u.hash === "";
    if (pathOk) {
      return true;
    }

    // For all other URLs, allow any HTTPS site
    return true;
  } catch (e) {
    return false;
  }
}
