require('dotenv').config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || access_token;
const REFRESH_TOKEN_SECRET = process.env.REFERSH_TOKEN_SECRET || refresh_token;


const AUTH_TYPES = {
	BASIC: "Basic",
	BEARER: "Bearer",
	DIGEST: "Digest", 
	CUSTOM: "Custom",
	NONE: "None"
};

const SAME_SITE_TYPES = {
	STRICT: "Strict",
	LAX: "Lax",
	NONE: "None"
};

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const SECURE = process.env.NODE_ENV === 'production';
const HTTP_ONLY = process.env.HTTP_ONLY || false;

const AUTH = AUTH_TYPES[(process.env.AUTH || 'NONE').toUpperCase()] || AUTH_TYPES.NONE;
const SAME_SITE = SAME_SITE_TYPES[(process.env.SAME_SITE || 'NONE').toUpperCase()] || SAME_STYLE_TYPES.NONE;

module.exports = {HOST, PORT, SECURE, HTTP_ONLY, AUTH, AUTH_TYPES, SAME_SITE, SAME_SITE_TYPES, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET};
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
./config.js[+] [unix] (00:59 01/01/1970)               4,64 All
-- INSERT --

