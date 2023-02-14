import {post,get} from './service.js'

export const loginApi=data=>{
	return post({
		method:"post",
		url:"/login",
		data
	})
}

export const adduserlistApi=data=>{
	return post({
		url:"/adduserlist",
		data
	})
}

export const updateuserlistApi=data=>{
	return post({
		url:"/updateuserlist",
		data
	})
}
export const deluserlistApi=data=>{
	return post({
		url:"/deluserlist",
		data
	})
}

export const userlistApi=data=>{
	return get({
		url:"/userlist",
		data
	})
}