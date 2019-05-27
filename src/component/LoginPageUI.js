import React from 'react';
import { Layout,Row,Col,Divider } from "antd";
import LoginBox from './LoginBox';
require('./style/LoginPageUI.css');
const { Header,Content,Footer } = Layout;
const LoginPageUI = () =>{
	return(
		<div className='login-page'>
			<Header className='login-page-header'>
				<Row>
					<Col className='login-page-left' xs={24} sm={24} md={14} lg={18} xl={17}>
						<img alt='login-page-logo' src ={ require('../image/logo.png')} className='login-page-logo'/>
						<p className='login-page-steward'>天天管家</p>
					</Col>
					<Col className='login-page-right' xs={0} sm={0} md={10} lg={6} xl={7}>
						<ul className='login-page-nav-list'>
							<li><div className='login-page-item-content'>首页</div></li>
							<li><div className='login-page-item-content'>问题反馈</div></li>
							<li><div className='login-page-item-content'>联系我们</div></li>
						</ul>
					</Col>
				</Row>
			</Header>
			<Content className='login-page-content'>
				<Row className='login-page-content-row'>
					<Col xl={12} lg={12} md={12} sm={0} xs={0} className='login-page-slogan-row'>
						<div className='login-page-slogan'>
							<p>“专业的手动记账功能”</p>
							<p className='login-page-second'>&nbsp;&nbsp;&nbsp;&nbsp;“清晰的账单报表统计”</p>
						</div>
					</Col>
					<Col xl={12} lg={12} md={12} sm={24} xs={24} className='login-page-login-box'>
						<LoginBox/>
					</Col>
				</Row>
			</Content>
			<Footer className='login-page-footer'>
				©2019 Created by zhang
				<Divider type="vertical" />
				<span>服务协议</span>
				<Divider type="vertical" />
				<span>版本更新</span>
			</Footer>
		</div>
	)
};
export default LoginPageUI;