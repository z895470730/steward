import {AVC} from "../../connection";
import {getTableData} from "./getColumnIndex";

export const deleteBillTableData = (id) =>{
	let current = AVC.User.current();
	console.log(current);
	let del = AVC.Object.createWithoutData('UserBills', id);
	del.destroy().then(function (success) {
		//删除数据成功后改变store中的表格数据，达到同时渲染
		getTableData()
	}, function (error) {
		console.log(error)
	});
};