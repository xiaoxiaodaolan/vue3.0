<template>
	<div class="common-layout">
	    <el-container>
	      <el-header class="common-header flex-float">
			  <div class="flex">
				  <img class="logo" src="../assets/logo.png" />
				  <h1 class="title">店铺后台管理系统</h1>
			  </div>
			  <el-button @click="loginOut" type="danger" round>退出</el-button>
		  </el-header>
	      <el-container>
	        <el-aside class="common-aside" width="200px">
				<el-menu
					background-color="blanchedalmond"
					text-color="black"
					:router="true"
				>
					<el-sub-menu index="1">
					    <template #title>
					        <el-icon><location /></el-icon>
					        <span>账号管理</span>
					    </template>
						<el-menu-item-group>
							<el-menu-item index="/user">账号列表</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
					
					<el-sub-menu index="2">
					    <template #title>
					        <el-icon><location /></el-icon>
					        <span>角色管理</span>
					    </template>
						<el-menu-item-group>
							<el-menu-item>角色列表</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
				</el-menu>
			</el-aside>
	        <el-main class="el-main">
				<router-view />
			</el-main>
	      </el-container>
	    </el-container>
	  </div>
</template>

<script>
	import { useStore } from "vuex"
	import { useRouter } from "vue-router"
	export default{
		name:"Layout",
		setup() {
			const store = useStore()
			const router = useRouter()
			const loginOut=()=>{
				localStorage.removeItem("loginData")
				store.commit("setUserInfo",{})
				router.push({
					path:"/"
				})
			}
			return{
				loginOut
			}
		}
	}
</script>

<style>
	*{
		padding: 0;
		margin: 0;
	}
	.el-container{
		height: 100vh;
		overflow: hidden;/* 溢出隐藏 */
	}
	.common-header{
		background: blanchedalmond;
		display: flex;
	}
	.common-aside{
		background: blanchedalmond;
	}
	.logo{
		width: 60px;
	}
	.title{
		color: black;
	}
	.el-main{
		background: #efefef;
	}
</style>