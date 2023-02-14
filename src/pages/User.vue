<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb :separator-icon="ArrowRight">
		    <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
		    <el-breadcrumb-item>账号列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 空白内容 -->
		<div class="pages_content">
			<div class="flex">
				<div>
					<el-input
						  v-model="keyword"
						  placeholder="请输入内容"
						  class="input"
						  @click="searchuser"
						>
						  <template #append>
							<el-button><el-icon><Search /></el-icon></el-button>
						  </template>
					</el-input>
				</div>
				<el-button @click="adduser" type="primary">新建用户</el-button>
				<el-dialog v-model="dialogFormVisible" title="新建用户">
				<el-form class="adduserform" :model="form"
					:rules="rules"
					ref="userform"
				>
				  <el-form-item label="姓名" prop="name">
					<el-input placeholder="请输入姓名" v-model="form.name"/>
				  </el-form-item>
				  <el-form-item label="性别" prop="gender">
					<el-select v-model="form.gender" placeholder="请选择">
					  <el-option value="男" />
					  <el-option value="女" />
					</el-select>
				  </el-form-item>
				  <el-form-item label="账号" prop="usernm">
				      <el-input placeholder="请输入账号" v-model="form.usernm"/>
				  </el-form-item>
				  <el-form-item label="密码" prop="passwd">
				      <el-input placeholder="请输入密码" v-model="form.passwd"/>
				  </el-form-item>
				  <el-form-item label="电话" prop="tel">
				      <el-input placeholder="请输入电话" v-model="form.tel"/>
				  </el-form-item>			  
				</el-form>
				<template #footer>
				  <span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取消</el-button>
					<el-button type="primary" @click="adduserlist(userform)">
					  确定
					</el-button>
				  </span>
				</template>
			  </el-dialog>
			</div>
			<el-table :data="userList" height="100%" style="width: 100%">
			    <el-table-column prop="name" label="姓名" width="180" />
			    <el-table-column prop="gender" label="性别" width="180" />
				<el-table-column prop="usernm" label="账号" width="180" />
				<el-table-column prop="passwd" label="密码" width="180" />
			    <el-table-column prop="tel" label="电话" />
				<el-table-column label="操作">
					<template #default="scope">
						<el-button type="primary" @click="updateuser(scope.row)">编辑</el-button>
						<el-button type="danger" @click="deluser(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			
			<el-dialog v-model="dialogFormEVisible" title="编辑用户">
				<el-form :model="form1">
				  <el-form-item label="姓名" prop="name">
					<el-input placeholder="请输入姓名" v-model="form1.name"/>
				  </el-form-item>
				  <el-form-item label="性别" prop="gender">
					<el-select v-model="form1.gender" placeholder="请选择">
					  <el-option value="男" />
					  <el-option value="女" />
					</el-select>
				  </el-form-item>
				  <el-form-item label="电话" prop="tel">
					  <el-input placeholder="请输入电话" v-model="form1.tel"/>
				  </el-form-item>			  
				</el-form>
				<template #footer>
				  <span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取消</el-button>
					<el-button type="primary" @click="updateuserlist">
					  确定
					</el-button>
				  </span>
				</template>
			</el-dialog>
			
		</div>
	</div>
</template>

<script>
import { reactive,toRefs,ref } from 'vue'
import { userlistApi,adduserlistApi,updateuserlistApi,deluserlistApi } from "../util/request.js"
	export default {
		name:"User",
		setup() {
			const data = reactive({
				keyword:"",
				userList:[],
				dialogFormVisible:false,
				dialogFormEVisible:false,
				form:{
					name:"",
					gender:"",
					usernm:"",
					passwd:"",
					tel:"",
				},
				form1:{
					name:"",
					gender:"",
					tel:"",
				},
				rules:{
					name:[
						{required:true,message:"请填写",trigger:"blur"}
					],
					gender:[
						{required:true,message:"请选择",trigger:"blur"}
					],
					usernm:[
						{required:true,message:"请填写",trigger:"blur"}
					],
					passwd:[
						{required:true,message:"请填写",trigger:"blur"}
					],
					tel:[
						{required:false,
						pattern:/^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/,
						message:"请输入正确的手机号",trigger:"blur"}
					],
				}
			})
			userlistApi().then(res=>{
				console.log("用户列表",res.data.res)
				data.userList = res.data.res
			})
			const userform = ref()
			const searchuser=()=>{
		
			}
			const adduser=()=>{
				data.dialogFormVisible = true
			}
			const adduserlist=(formEL)=>{
				formEL.validate(res=>{
					if(!res){
						return
					}else{
						adduserlistApi(data.form).then(res=>{
							console.log("数据",res)
							userlistApi().then(res=>{
								data.userList = res.data.res
							})
						})
						alert("添加成功")
					}
				})
			}
			
			const updateuser=(row)=>{
				data.dialogFormEVisible=true
				data.form1.id=row.id
				data.form1.name=row.name
				data.form1.gender=row.gender
				data.form1.tel=row.tel
				console.log("编辑数据",row)
			}
			const updateuserlist=()=>{
				updateuserlistApi(data.form1).then(res=>{
					userlistApi().then(res=>{
						data.userList = res.data.res
					})
				})
			}
			const deluser=(row)=>{
				data.form.id=row.id
				if(window.confirm('确认要删除？')){
					deluserlistApi(data.form).then(res=>{
						userlistApi().then(res=>{
							data.userList = res.data.res
						})
					})
				}
			}
			return{
				...toRefs(data),
				searchuser,
				adduser,
				adduserlist,
				userform,
				updateuser,
				updateuserlist,
				deluser
			}
		}
	}
</script>

<style>
	.input{
		width: 300px;
		margin: 10px;
	}
</style>