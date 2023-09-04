import { useFetch } from '../hooks/use-fetch/index.mjs'


export const fetchList = async (query) => {
	return await useFetch(
		'/admin/post/page',
		{
			method: 'get',
			params: query,
		});
};

export async function addObj(obj) {
	return await useFetch(
		'/admin/post',
		{
			method: 'post',
			data: obj,
		});
}

export async function getObj(id) {
	return await useFetch(
		'/admin/post/details/' + id,
		{
			method: 'get',
		});
}

export async function getObjDetails(object) {
	return await useFetch(
		'/admin/post/details',
		{
			method: 'get',
			params: obj,
		});
}

export const delObj = async (ids) => {
	return await useFetch(
		'/admin/post',
		{
			method: 'delete',
			data: ids,
		});
}

export async function putObj(obj) {
	return await useFetch(
		'/admin/post',
		{
			method: 'put',
			data: obj,
		});
}

export function validatePostName(rule, value, callback, isEdit) {
	if (isEdit) {
		return callback();
	}

	getObjDetails({ postName: value }).then((response) => {
		const result = response.data;
		if (result !== null) {
			callback(new Error('岗位名称已经存在'));
		} else {
			callback();
		}
	});
}

export function validatePostCode(rule, value, callback, isEdit) {
	if (isEdit) {
		return callback();
	}

	getObjDetails({ postCode: value }).then((response) => {
		const result = response.data;
		if (result !== null) {
			callback(new Error('岗位编码已经存在'));
		} else {
			callback();
		}
	});
}
