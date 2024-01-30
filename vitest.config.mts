import path from 'path'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'tests/*'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov', 'html']
    },
  }
})