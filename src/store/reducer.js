const defaultState = {
	page_key:'1',
	register_show:false,
	login_state:false,
	confirm_dirty: false,
	auto_complete_result: [],
	active_user:null,
	record_box_show:false,
};
export default (state = defaultState, action) =>{
	//reducer可以接收state，但绝不能修改state
	//首页中不同栏目之间的切换
	if( action.type === 'change_column_page') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.page_key = action.value;
		return newState;
	}
	if( action.type === 'submit_register'){
		//e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	}
	//对注册窗口的控制，决定是否打开注册窗口
	if( action.type === 'change_register_show'){
		const newState = JSON.parse(JSON.stringify(state));
		newState.register_show = ! state.register_show;
		return newState;
	}
	if( action.type === 'confirm_blur'){
		const newState = JSON.parse(JSON.stringify(state));
		newState.confirm_dirty = state.confirm_dirty || !!action.value;
		return newState;
	}
	//改变登陆状态，当登陆完成后保存登陆者的用户名，并进入用户界面
	if( action.type === 'change_login_state'){
		const newState = JSON.parse(JSON.stringify(state));
		newState.login_state = !state.login_state;
		newState.active_user = action.value;
		return newState;
	}
	//退出登陆状态，置空当前用户
	if( action.type === 'logged_out_state'){
		const newState = JSON.parse(JSON.stringify(state));
		newState.login_state = !state.login_state;
		newState.active_user = null;
		return newState;
	}
	//改变记账弹窗状态，唤醒或关闭记账弹窗
	if( action.type === 'change_record_box_show'){
		const newState = JSON.parse(JSON.stringify(state));
		newState.record_box_show = !state.record_box_show;
		return newState
	}
	return state;
}