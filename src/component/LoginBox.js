import React from 'react';
import {
	Form, Icon, Input, Button, Checkbox, Divider,Modal
} from 'antd';
require('./style/LoginBox.css');

class LoginBox extends React.Component{
	state={
		register_show: false
	};

	showRegister = () => {
		this.setState({register_show:true})
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	};

	handleOk = (e) => {
		console.log(e);
		this.setState({
			register_show: false,
		});
	};

	handleCancel = (e) => {
		console.log(e);
		this.setState({
			register_show: false,
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className='loginBox'>
				<div className='title'>欢迎使用天天管家</div>
				<Divider/>
				<Form onSubmit={this.handleSubmit} className="login-form">
					<Form.Item>
						{getFieldDecorator('userName', {
							rules: [{ required: true, message: '请输入您的账户名！' }],
						})(
							<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: '请输入您的密码！' }],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true,
						})(
							<Checkbox>记住密码</Checkbox>
						)}
						<a className="login-form-forgot" href="">忘记密码？</a>
						<Button type="primary" htmlType="submit" className="login-form-button">
							登录
						</Button>
						<Button
							type="primary"
							className="login-form-button register-button"
							onClick={this.showRegister}
						>
							注册
						</Button>
					</Form.Item>
				</Form>
				{/*注册模块*/}
				<Modal
					title="Basic Modal"
					visible={this.state.register_show}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					onClick={this.showRegister}
				>

				</Modal>
			</div>
		);
	}
}
export default Form.create()(LoginBox);