import { defineConfig } from 'orval'

export default defineConfig({
  clientAdminApi: {
    input: {
      target: './schema/schema.json',
    },
    output: {
      target: './generated-types.ts',
      client: 'react-query',
      prettier: true,
      override: {
        useNamedParameters: true,
        useTypeOverInterfaces: true,
      },
    },

    hooks: {
      afterAllFilesWrite: ['prettier --write ./generated-types.ts'],
    },
  },
})
