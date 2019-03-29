const defaultState = {
	page_key:'1',
	register_show:false,
	login_state:false,
	confirm_dirty: false,
	auto_complete_result: [],
};
export default (state = defaultState, action) =>{
	//reducer可以接收state，但绝不能修改state
	if( action.type === 'change_column_page'){
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
	return state;
}