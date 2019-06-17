import {Loans, AVC} from "../../connection";
import store from '../../store'
export const setLoansDate = (values,close) =>{
	let loans = new Loans();
	//用于识别借贷信息所属账号
	loans.set('username',store.getState().active_user);
	//出借方
	loans.set('lender',values.lender);
	//借款人
	loans.set('borrower',values.borrower);
	//借款金额
	loans.set('borrowingBalance',values.borrowingBalance);
	//还款日期
	loans.set('repaymentDate',values.repaymentDate);
	loans.save().then(function (todo) {
		close();
	}, function (error) {
		console.error(error);
	})
};

export const editLoansDate = (id,values) =>{
	let change = AVC.Object.createWithoutData('Loans', id);
	//出借方
	change.set('lender',values.lender);
	//借款人
	change.set('borrower',values.borrower);
	//借款金额
	change.set('borrowingBalance',values.borrowingBalance);
	//还款日期
	change.set('repaymentDate',values.repaymentDate);
	change.save().then(function (todo) {
		return
	}, function (error) {
		console.error(error);
	})
}