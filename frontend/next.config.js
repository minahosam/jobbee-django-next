/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env : {
    API_URL: 'http://127.0.0.1:8000',
    MAPBOXACCESSKEY : "pk.eyJ1IjoiZGllZ29iYXJibyIsImEiOiJjbDJzeTdwYXcwM2RkM2tuMGJpempreWs2In0.E4qpuktdVxbvGrTaVgpE5g",
  }
}

module.exports = nextConfig
