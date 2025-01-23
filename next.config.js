/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    distDir: '.next',
    typescript: {
        ignoreBuildErrors: true,  // TypeScript 빌드 에러 무시
    },
    eslint: {
        ignoreDuringBuilds: true,  // ESLint 빌드 에러 무시
    }
}

module.exports = nextConfig