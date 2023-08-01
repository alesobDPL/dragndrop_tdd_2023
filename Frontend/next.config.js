/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}

module.exports = {
  env: {
    SERVIDOR: process.env.SERVIDOR,
    PESO_EQUIPO_1: process.env.PESO_EQUIPO_1,
    PESO_EQUIPO_2: process.env.PESO_EQUIPO_2,
    PESO_EQUIPO_3: process.env.PESO_EQUIPO_3,
    PESO_EQUIPO_4: process.env.PESO_EQUIPO_4,
    PESO_EQUIPO_5: process.env.PESO_EQUIPO_5,

  },
  nextConfig
};

