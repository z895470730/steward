import React from 'react';
import {
	Layout, Menu, Breadcrumb, Icon, Row, Col, Divider
} from 'antd';
require('./style/HomePage.css');
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
class HomePage extends React.Component{
	state = {
		collapsed: false,
	};

	onCollapse = (collapsed) => {
		console.log(collapsed);
		this.setState({ collapsed });
	};
	render() {
		return (
			<Layout>
				<Header className="home-header">
					<Row>
						<Col className='home-left' xs={24} sm={24} md={14} lg={18} xl={17}>
							<img alt='home-logo' src ={ require('../image/logo2.png')} className='logo'/>
							<p className='home-steward'>天天管家</p>
						</Col>
					</Row>
				</Header>
				<Layout>
					<Sider
						theme='light'
						collapsible
						collapsed={this.state.collapsed}
						onCollapse={this.onCollapse}
						className='home-menu'
					>
						<Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
							<Menu.Item key="1">
								<Icon type="bars" />
								<span>我的首页</span>
							</Menu.Item>
							<Menu.Item key="2">
								<Icon type="book" />
								<span>账单管理</span>
							</Menu.Item>
							<Menu.Item key="3">
								<Icon type="pay-circle" />
								<span>借贷管理</span>
							</Menu.Item>
							<Menu.Item key="4">
								<Icon type="wallet" />
								<span>我的卡包</span>
							</Menu.Item>
							<Menu.Item key="5 ">
								<Icon type="heart" />
								<span>小目标</span>
							</Menu.Item>
							<Menu.Item key="6">
								<Icon type="tool" />
								<span>工具箱</span>
							</Menu.Item>
							<Menu.Item key="7">
								<Icon type="user" />
								<span>账户信息</span>
							</Menu.Item>
						</Menu>
					</Sider>
					<Content style={{ margin: '16px 16px' }}>
						<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
							Bill is a cat.
						</div>
					</Content>
				</Layout>
				<Footer className='footer'>
					©2019 Created by zhang
					<Divider type="vertical" />
					<a href="#">服务协议</a>
					<Divider type="vertical" />
					<a href="#">版本更新</a>
				</Footer>
			</Layout>
		)
	}
}
export default HomePage;