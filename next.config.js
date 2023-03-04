/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    MONGO_URI:
      "mongodb+srv://seiflex:FmqAbhrYx5JfssSM@sei.u0ypjpz.mongodb.net/nextjsTutorial?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
