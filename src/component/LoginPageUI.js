import React from 'react';
import { Layout,Row,Col,Divider } from "antd";
import LoginBox from './LoginBox';
require('./style/LoginPageUI.css');
const { Header,Content,Footer } = Layout;
const LoginPageUI = () =>{
	return(
		<div className='login-page'>
			<Header className='header'>
				<div className='left'>
					<p className='logo'>天天管家</p>
				</div>
				<div className='right'>
					menu
				</div>
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