import React from 'react';
import {Icon, Menu, Layout} from "antd";
require('./style/LeftMenu.css')
const { Sider } = Layout;
class LeftMenu extends React.Component{
	state = {
		collapsed: false,
	};

	onCollapse = (collapsed) => {
		console.log(collapsed);
		this.setState({ collapsed });
	};
	render() {
		return (
			<Sider
				theme='light'
				collapsible
				collapsed={this.state.collapsed}
				onCollapse={this.onCollapse}
				className='menu'
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
		)
	}
}
export default LeftMenu;