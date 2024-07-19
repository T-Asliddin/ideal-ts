import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src/*" },
      { find: "@pages", replacement: "/src/page/index.tsx" },
      { find: "@service", replacement: "/src/service/index.ts" },
      {find: "@routes" , replacement:"/src/router/routes.tsx" },
      {find: "@notification" , replacement:"/src/utils/notification.ts" },
      {find: "@validation" , replacement:"/src/utils/validation.ts" }

    ],
  },
})
