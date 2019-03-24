import React from 'react';
import { Layout,Row,Col,Divider } from "antd";
import LoginBox from './LoginBox';
require('./style/LoginPageUI.css');
const { Header,Content,Footer } = Layout;
const LoginPageUI = () =>{
	return(
		<div className='login-page'>
			<Header className='header'>
				<Row>
					<Col className='left' xs={24} sm={24} md={14} lg={18} xl={17}>
						<img alt='logo' src ={ require('../image/logo.png')} className='logo'/>
						<p className='steward'>天天管家</p>
					</Col>
					<Col className='right' xs={0} sm={0} md={10} lg={6} xl={7}>
						<ul className='nav-list'>
							<li className='nav-item'><div className='item-content'>首页</div></li>
							<li className='nav-item'><div className='item-content'>问题反馈</div></li>
							<li className='nav-item'><div className='item-content'>联系我们</div></li>
						</ul>
					</Col>
				</Row>
			</Header>
			<Content className='content'>
				<Row className='content-row'>
					<Col xl={12} lg={12} md={12} sm={0} xs={0} className='slogan-row'>
						<div className='slogan'>
							<p>“专业的手动记账功能”</p>
							<p className='second'>&nbsp;&nbsp;&nbsp;&nbsp;“清晰的账单报表统计”</p>
						</div>
					</Col>
					<Col xl={12} lg={12} md={12} sm={24} xs={24} className='login-box'>
						<LoginBox/>
					</Col>
				</Row>
			</Content>
			<Footer className='footer'>
				©2019 Created by zhang
				<Divider type="vertical" />
				<a href="#">服务协议</a>
				<Divider type="vertical" />
				<a href="#">版本更新</a></Footer>
		</div>
	)
};
export default LoginPageUI;