<template>
	<div class="login_wrap">
		<div class="form_wrap">
			<el-form
			    ref="formRef"
			    :model="loginData"
			    label-width="100px"
			    class="demo-dynamic"
			  >
			    <el-form-item
			      prop="username"
			      label="账号"
			      :rules="[
			        {
			          required: true,
			          message: '请输入账号',
			          trigger: 'blur',
			        }
			      ]"
			    >
			      <el-input v-model="loginData.username" />
			    </el-form-item>
				<el-form-item
				  prop="password"
				  label="密码"
				  :rules="[
				    {
				      required: true,
				      message: '请输入密码',
				      trigger: 'blur',
				    }
				  ]"
				>
				  <el-input v-model="loginData.password" />
				</el-form-item>
			</el-form>
			<el-button @click="handlelogin" class="login_btn" type="primary">登录</el-button>
			<router-link to="/register"><el-button class="login_btn" type="primary" >注册</el-button></router-link>

		</div>
	</div>
</template>

<script>
	import { reactive,toRefs } from "vue"
	import { useStore } from "vuex"
	import { useRouter } from "vue-router"
	import {loginApi} from "../util/request.js"
	// import {allApi} from "../util/request.js"
	export default{
		name:"login",
		setup() {
			const store = useStore()
			const router = useRouter()
			
			const data = reactive({
				loginData:{
					username:"",
					password:""
				}
				
			})
			
			const handlelogin=()=>{
				// 请求后台接口
				loginApi(data.loginData).then(res => {
					console.log("返回值",res.data.res)
					if(res.data.res!=0){
						store.commit("setUserInfo",data.loginData);
						localStorage.setItem("loginData",JSON.stringify(data.loginData))
						router.push({
							path:"/index"
						})
					}else{
						alert("请输入正确的账号或者密码")
					}
				})
				
				// allApi(data.loginData).then(res => {
				// 	console.log("注册",res)
				// })
			}
			return{
				...toRefs(data),
				handlelogin
			}
		}
	}
</script>

<style>
	.login_wrap{
		width: 100%;
		height: 100vh;
		background: darkblue;
		position: relative;
	}
	.form_wrap{
		background: white;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		padding: 30px 50px;
		border-radius: 30px;
		text-align: center;
	}
	.login_btn{
		margin: 0 10px 0 10px;
	}
</style>