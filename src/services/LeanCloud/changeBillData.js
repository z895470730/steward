import {AVC} from "../../connection";
import {getTableData} from './getColumnIndex';
export const changeBillData = (id,values,that) =>{
	let change = AVC.Object.createWithoutData('UserBills', id);
	change.set('category',values.category);
	change.set('name',values.name);
	change.set('money',values.money);
	change.set('note',values.note);
	change.set('payWay',values.payWay);
	change.save().then(
		getTableData()
	).then(
		that.setState({drawerStatus:false})
	)
};
