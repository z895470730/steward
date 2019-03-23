import React from 'react';
import {
	Form, Icon, Input, Button, Checkbox, Divider
} from 'antd';
require('./style/LoginBox.css');

class LoginBox extends React.Component{
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	}

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
						<Button type="primary" htmlType="submit" className="login-form-button register-button">
							注册
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}
export default Form.create()(LoginBox);