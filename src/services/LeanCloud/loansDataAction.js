import {Loans} from "../../connection";

export const setLoansDate = (values,close) =>{
	let loans = new Loans();
	//用于识别借贷信息所属账号
	loans.set('username','895470730@qq.com');
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