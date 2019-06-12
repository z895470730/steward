import React from  'react';
import {setLoansDate} from "../services/LeanCloud/loansDataAction";
import {
	Button, Form, Input, DatePicker, message
} from 'antd';
import locale from "antd/lib/date-picker/locale/zh_CN";

class LoansBox extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			repaymentDate:null,
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			values.repaymentDate = this.state.repaymentDate;
			setLoansDate(values,this.props.onClose());
			message.success('添加成功');
		});

		//清空注册表单内信息
		this.props.form.resetFields();
	};
	//获取时间
	getRepaymentDate = (date,dateString) =>{
		this.setState({repaymentDate:dateString})
	};

	render() {
		const {getFieldDecorator} = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Item>
					<strong>出借方：</strong>
					{
						getFieldDecorator('lender', {})(
							<Input placeholder="请输入出借方" style={{width: '80%'}}/>
						)
					}
				</Form.Item>
				<Form.Item>
					<strong>借款人：</strong>
					{
						getFieldDecorator('borrower', {})(
							<Input placeholder="请输入借款人" style={{width: '80%'}}/>
						)
					}
				</Form.Item>
				<Form.Item>
					<strong>借款金额：</strong>
					{
						getFieldDecorator('borrowingBalance',{})(
							<Input placeholder="请输入花费金额" style={{width:'80%'}}/>
						)
					}
				</Form.Item>
				<Form.Item>
					<strong>还款日期：</strong>
					<DatePicker locale={locale} onChange={this.getRepaymentDate}/>
				</Form.Item>
				<Form.Item>
					<strong>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</strong>
					{
						getFieldDecorator('note', {})(
							<Input style={{width: '80%'}} placeholder="请输入备注信息"/>
						)
					}
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						创建
					</Button>
				</Form.Item>
				{}
			</Form>
		);
	}
}
export default Form.create()(LoansBox);