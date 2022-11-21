/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
import eslintPlugin from '@nabla/vite-plugin-eslint'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const env = loadEnv(mode, process.cwd(), '')
	// console.log({ env })
	return {
		server: { port: 3000 },
		resolve: {
			dedupe: ['react', 'react-dom']
		},
		// base: '/client/',
		// resolve: {
		// 	alias: {
		// 		'@': fileURLToPath(new URL('./src', import.meta.url))
		// 	}
		// },
		optimizeDeps: {
			disabled: false
		},
		build: {
			commonjsOptions: {
				include: []
			}
		},
		test: {
			css: false,
			include: ['src/**/__tests__/*'],
			globals: true,
			environment: 'jsdom',
			setupFiles: 'src/setupTests.ts',
			clearMocks: true,
			coverage: {
				provider: 'istanbul',
				enabled: true,
				'100': true,
				reporter: ['text', 'lcov'],
				reportsDirectory: 'coverage'
			}
		},
		plugins: [
			tsconfigPaths(),
			react(),
			...(mode !== 'test'
				? [
						eslintPlugin(),
						VitePWA({
							registerType: 'autoUpdate',
							includeAssets: [
								'favicon.png',
								'robots.txt',
								'apple-touch-icon.png',
								'icons/*.svg',
								'fonts/*.woff2'
							],
							manifest: {
								theme_color: '#BD34FE',
								icons: [
									{
										src: '/android-chrome-192x192.png',
										sizes: '192x192',
										type: 'image/png',
										purpose: 'any maskable'
									},
									{
										src: '/android-chrome-512x512.png',
										sizes: '512x512',
										type: 'image/png'
									}
								]
							}
						})
				  ]
				: [])
		]
	}
})
