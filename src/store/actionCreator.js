import {
	CHANGE_COLUMN_PAGE, SUBMIT_REGISTER, CHANGE_REGISTER_SHOW, CONFIRM_BLUR
} from '../store/actionTypes';
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