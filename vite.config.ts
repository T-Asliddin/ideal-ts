import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src/*" },
      { find: "@pages", replacement: "/src/page/index.tsx" },
      { find: "@service", replacement: "/src/service/index.ts" },
      { find: "@routes", replacement: "/src/router/routes.tsx" },
      { find: "@notification", replacement: "/src/utils/notification.ts" },
      { find: "@validation", replacement: "/src/utils/validation.ts" },
      { find: "@ui", replacement: "/src/components/index.tsx" },
      { find: "@auth-interfaces", replacement: "/src/interfaces/auth.ts" },
      { find: "@service-interfaces", replacement: "/src/interfaces/service.ts" },
      { find: "@order-interfaces", replacement: "/src/interfaces/order.ts" },
      { find: "@client-interfaces", replacement: "/src/interfaces/client.ts" },
      { find: "@global-interfaces", replacement: "/src/interfaces/global.ts" },
      { find: "@modal", replacement: "/src/components/ui/modal" },
      { find: "@data-service", replacement: "/src/utils/data-service.ts" },
    ],
  },
});
