import { configDefaults, defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    // Tells Vitest to leave its defaults intact, but skip scanning the cdk folder
    exclude: [...configDefaults.exclude, 'cdk/**'],
  },
});