import path from 'path'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'tests/*'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov', 'html'],
      exclude: ['tests/*', 'src/adapter/http/*', 'cucumber.js', 'swagger.ts', 'src/app.ts', 'src/index.ts']
    },
  },
  resolve: {
    alias: {
      '@ports': path.resolve(__dirname, './src/ports/')
    },
  },
})