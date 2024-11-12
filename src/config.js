require("dotenv").config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_token";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh_token";

if (process.env.NODE_ENV === "production") {
  if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error(
      "ACCESS_TOKEN_SECRET och REFRESH_TOKEN_SECRET krävs i produktionsmiljön för säkerhet."
    );
  }
}

// Säkra standardinställningar för GDPR-kompatibilitet (designad för att användas i produktion)
const DEFAULT_SECURE = true;
const DEFAULT_HTTP_ONLY = true;
const DEFAULT_SAME_SITE = "Strict";

const AUTH_TYPES = {
  BASIC: "Basic",
  BEARER: "Bearer",
  DIGEST: "Digest",
  CUSTOM: "Custom",
  NONE: "None",
};

const SAME_SITE_TYPES = {
  STRICT: "Strict",
  LAX: "Lax",
  NONE: "None",
};

const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || "localhost";
const SECURE = process.env.NODE_ENV === "production" ? DEFAULT_SECURE : false;
const HTTP_ONLY =
  process.env.NODE_ENV === "production"
    ? DEFAULT_HTTP_ONLY
    : process.env.HTTP_ONLY || false;

const AUTH =
  AUTH_TYPES[(process.env.AUTH || "NONE").toUpperCase()] || AUTH_TYPES.NONE;
const SAME_SITE =
  process.env.NODE_ENV === "production"
    ? DEFAULT_SAME_SITE
    : SAME_SITE_TYPES[(process.env.SAME_SITE || "NONE").toUpperCase()] ||
      SAME_SITE_TYPES.NONE;

const LOG_LEVEL = process.env.LOG_LEVEL || "info";

module.exports = {
  HOST,
  PORT,
  SECURE,
  HTTP_ONLY,
  AUTH,
  AUTH_TYPES,
  SAME_SITE,
  SAME_SITE_TYPES,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  LOG_LEVEL,
};
