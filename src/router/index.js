import { createRouter,createWebHashHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import LayOut from '../pages/LayOut.vue'
import store from '../store/index.js'

const routes = [
	{
		path:"/",
		name:"Login",
		component:Login
	},
	{
		path:"/register",
		name:"Register",
		component:Register
	},		
	{
		path:"/layout",
		name:"LayOut",
		component:LayOut,
		children:[
			{
				path:"/user",
				name:"User",
				component:()=>import("../pages/User.vue")
			},
			{
				path:"/index",
				name:"Index",
				component:()=>import("../pages/Index.vue")
			},
		]
	}
]
// 生成hash路由对象
const router = createRouter({
	history:createWebHashHistory(),
	routes
})

router.beforeEach((to,from,next)=>{
	// to:从哪个页面 
	// from:到那个页面
	// next:只有执行next()页面才会跳转
	
	// 判断用户是否登录
	console.log("store",store.state.uInfo)
	const uInfo = store.state.uInfo.userInfo
	if(!uInfo.username){
		if(to.path==="/"){
			next()
			return
		}
		next("/")
	}else{
		next()
	}
})

export default router