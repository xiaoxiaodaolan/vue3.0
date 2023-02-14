import axios from 'axios'
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'

// 使用create创建axios实例
// const loadingObj = null
export const Service = axios.create({
	timeout:8000,
	baseURL:"http://127.0.0.1:10000",
	headers:{
		'Content-Type':'application/json;charset=UTF-8',
		'Content-Type': 'application/x-www-form-urlencoded',
		'Access-Control-Allow-Origin':'http://127.0.0.1:10000'
	}
})
// 请求拦截-增加loading，对请求做统一处理
// Service.interceptors.request.use(config=>{
	// loadingObj=ElLoading.service({
 //    lock: true,
 //    text: 'Loading',
 //    background: 'rgba(0, 0, 0, 0.7)',
 //  })
//   return config
// })
// 响应拦截-对返回值做统一处理
// Service.interceptors.response.use(response=>{
// 	loadingObj.close()
// 	return response.data
// },error=>{
// 	loadingObj.close()
// 	ElMessage({
// 	    message: '服务器错误',
// 	    type: 'error',
// 		duration:2000
// 	  })
// })	



// post请求
export const post=(config)=>{
	return Service({
		...config,
		method:"post",
		data:config.data
	})
}
// get请求
export const get=config=>{
	return Service({
		...config,
		method:"get",
		params:config.params
	})
}
