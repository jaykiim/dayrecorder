/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_GRAPHCMS_ENDPOINT: process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
    NNEXT_PUBLIC_GRAPHCMS_TOKEN: process.env.NNEXT_PUBLIC_GRAPHCMS_TOKEN,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_GOOGLE_OAUTH_ID: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID,
    NEXT_PUBLIC_GOOGLE_OAUTH_PWD: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_PWD,
  },
}
