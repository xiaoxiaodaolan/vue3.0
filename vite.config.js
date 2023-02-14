import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // server:{
	 //  port:3000,
	 //  open:true,
	 //  proxy:{
		//   'login':{
		// 	  target:'http://127.0.0.1:10000',
		// 	  changeOrigin:true,
		// 	  ws:true,
		// 	  secure:true,
		// 	  pathRewrite:{
		// 		  "^/login": ''
		// 	  }
		//   }
	 //  }
  // }
})
