import {
	CHANGE_COLUMN_PAGE, SUBMIT_REGISTER, CHANGE_REGISTER_SHOW, CONFIRM_BLUR,
	CHANGE_LOGIN_STATE, CHANGE_RECORD_BOX_SHOW, CHANGE_COLUMN_INDEX_TABLE_DATA,
	GET_LOANS_RESULT
} from '../store/actionTypes';
import { Query } from "leancloud-storage";
import store from "./index";
export const getHandleColumnChange = (value) =>({
	type:CHANGE_COLUMN_PAGE,
	value:value
});
export const getHandleRegisterSubmit = (value) =>({
	type:SUBMIT_REGISTER,
	value:value
});
export const getChangeRegisterShow = (value) =>({
	type:CHANGE_REGISTER_SHOW,
	value:value
});
export const getHandleConfirmBlur = (value) =>({
	type:CONFIRM_BLUR,
	value:value
});
export const getChangeLoginState = (value) =>({
	type:CHANGE_LOGIN_STATE,
	value:value
});
export const getChangeRecordBoxShow = (value) =>({
	type:CHANGE_RECORD_BOX_SHOW,
	value:value
});
export const changeColumnIdexTableData = (value) =>({
	type:CHANGE_COLUMN_INDEX_TABLE_DATA,
	value:value
});
export const getLoansResult = (value) =>({
	type:GET_LOANS_RESULT,
	value:value
});
//服务器请求借贷数据
export const getLoansFromServer = () =>{
	let query = new Query('Loans');
	query.equalTo('username','895470730@qq.com');
	query.find().then((result)=>{
		const action = getLoansResult(result);
		store.dispatch(action);
	},(error)=>{console.log(error)});
};