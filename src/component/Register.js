import React from 'react';
import {
	Modal, Form, Button, Input, Select, message
} from "antd";
import store from "../store";
import {
	getChangeRegisterShow, getHandleConfirmBlur
} from "../store/actionCreator";
import {User} from "../connection";
const { Option } = Select;
class Register extends React.Component{
	constructor(props){
		super(props);
		this.state = store.getState();
		store.subscribe(()=>{this.setState(store.getState())})
	}
	// 关闭注册对话框
	handleCancel = () => {
		const action = getChangeRegisterShow();
		store.dispatch(action);
	};

	handleConfirmBlur = (e) => {
		const action = getHandleConfirmBlur(e.target.value);
		store.dispatch(action);
	};
	//接收注册输入的表单值
	handleSubmitRegisterInfo = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				let user = new User();
				// 设置用户名
				user.setUsername(values.email);
				// 设置密码
				user.setPassword(values.password);
				// 设置邮箱
				user.setEmail(values.email);
				// 设置手机号
				user.setMobilePhoneNumber(values.phone);
				user.signUp().then(function () {
					message.success('注册成功');
					const action = getChangeRegisterShow();
					store.dispatch(action);
				}, function () {
					message.error('该邮箱或手机号已被注册，注册失败')
				});
			}
		});
		this.props.form.resetFields();
	};
	//重复密码功能校验
	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('两次密码输入不一致!');
		} else {
			callback();
		}
	};

	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirm_dirty) {
			form.validateFields(['confirm'], { force: true });
		}
		callback();
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 },
			},
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 16,
					offset: 8,
				},
			},
		};
		const prefixSelector = getFieldDecorator('prefix', {
			initialValue: '86',
		})(
			<Select style={{ width: 70 }}>
				<Option value="86">+86</Option>
				<Option value="87">+87</Option>
			</Select>
		);
		return<Modal
			maskClosable={false}
			title="新用户注册"
			onOk={this.handleOk}
			onCancel={this.handleCancel}
			onClick={this.showRegister}
			visible={this.state.register_show}
			footer={null}
		>
			<Form {...formItemLayout} onSubmit={this.handleSubmitRegisterInfo}>
				<Form.Item
					label="邮箱"
				>
					{getFieldDecorator('email', {
						rules: [{
							type: 'email', message: '邮箱格式不正确',
						}, {
							required: true, message: '请输入您的邮箱!',
						}],
					})(
						<Input/>
					)}
				</Form.Item>
				<Form.Item
					label="密码"
				>
					{getFieldDecorator('password', {
						rules: [
							{required: true, message: '请输入密码'},
							{min: 6, message:'密码长度过短'},
							{validator: this.validateToNextPassword,}
							],
					})(
						<Input type="password"/>
					)}
				</Form.Item>
				<Form.Item
					label="重复密码"
				>
					{getFieldDecorator('confirm', {
						rules: [
							{required: true, message: '请重复输入密码'},
							{validator: this.compareToFirstPassword,}
							],
					})(
						<Input type="password" onBlur={this.handleConfirmBlur}/>
					)}
				</Form.Item>
				<Form.Item
					label="手机号码"
				>
					{getFieldDecorator('phone', {
						rules: [
							{required: true, message: '请输入您的手机号!'},
							],
					})(
						<Input addonBefore={prefixSelector} style={{width: '100%'}}/>
					)}
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
					<Button type="primary" htmlType="submit">注册</Button>
				</Form.Item>
			</Form>
		</Modal>
	}
}

export default Form.create({})(Register);