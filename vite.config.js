import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Fazt--React_Aplicacion_para_administrar_gastos_e_ingresos/",
});
