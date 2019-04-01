import React from 'react';
import store from '../store/index';
import Register from './Register';
import {user_info_query,Parse} from '../connection';
import {
	Form, Icon, Input, Button, Checkbox, Divider
} from 'antd';
import {
	getHandleRegisterSubmit, getChangeRegisterShow
} from '../store/actionCreator';
require('./style/LoginBox.css');

class LoginBox extends React.Component{
	constructor(props){
		super(props);
		this.state = store.getState();
		store.subscribe(()=>{this.setState(store.getState())})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			console.log(user_info_query.equalTo('UserName',values.userName));
		});
	};

	handleRegisterSubmit = (e) => {
		const action = getHandleRegisterSubmit(e);
		store.dispatch(action);
	};

	showRegister = () => {
		const action = getChangeRegisterShow();
		store.dispatch(action);
	};

	render(){
		const { getFieldDecorator } = this.props.form;
		return (
			<div className='loginBox'>
				<div className='title'>欢迎使用天天管家</div>
				<Divider/>
				<Form onSubmit={this.handleRegisterSubmit} className="login-form">
					<Form.Item>
						{getFieldDecorator('userName', {
							rules: [{ required: true, message: '请输入您的账户名！' }],
						})(
							<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入邮箱或用户名" />
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: '请输入您的密码！' }],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
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
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
							onClick={this.handleSubmit}
						>
							登录
						</Button>
						<Button
							className="login-form-button register-button"
							onClick={this.showRegister}
						>
							注册
						</Button>
					</Form.Item>
				</Form>
				{/*注册模块*/}
				<Register/>
			</div>
		);
	}
}
export default Form.create()(LoginBox);