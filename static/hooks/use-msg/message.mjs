import { ElMessage, ElMessageBox } from 'ElementPlus';

export function useMessage() {
	// 普通提示
	const info = (title) => {
		ElMessage.info(title);
	}

	// 警告提示
	const warning = (title) => {
		ElMessage.warning(title);
	}

	// 成功提示
	const success = (title) => {
		ElMessage.success(title);
	}

	// 错误提示
	const error = (title) => {
		ElMessage.error(title);
	}

	return {
		info,
		warning,
		success,
		error
	};
}

export function useMessageBox() {
	// 普通提示
	const info = (msg) => {
		ElMessageBox.alert(msg, '系统提示');
	}

	// 警告提示
	const warning = (msg) => {
		ElMessageBox.alert(msg, '系统提示', { type: 'warning' });
	}

	// 成功提示
	const success = (msg) => {
		ElMessageBox.alert(msg, '系统提示', { type: 'success' });
	}

	// 错误提示
	const error = (msg) => {
		ElMessageBox.alert(msg, '系统提示', { type: 'error' });
	}

	// 确认窗体
	const confirm = (msg) => {
		return ElMessageBox.confirm(msg, '系统提示', {
			confirmButtonText: '确认',
			cancelButtonText: '取消',
			type: 'warning',
		});
	}
	// 提交内容
	const prompt = (msg) => {
		return ElMessageBox.prompt(msg, '系统提示', {
			confirmButtonText: '确认',
			cancelButtonText: '取消',
			type: 'warning',
		});
	}

	return {
		info,
		warning,
		success,
		error,
		confirm,
		prompt
	};
}

