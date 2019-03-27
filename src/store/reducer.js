const defaultState = {
	page_key:'1'
};
export default (state = defaultState, action) =>{
	//reducer可以接收state，但绝不能修改state
	if( action.type === 'change_column_page'){
		const newState = JSON.parse(JSON.stringify(state));
		newState.page_key = action.value;
		return newState;
	}
	console.log(state, action);
	return state;
}