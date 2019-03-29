import React from 'react';
import { Col, Layout, Avatar,  Dropdown, Menu, Icon} from "antd";
require('./style/HomePageHeader.css');
const { Header } = Layout;
const content = (
	<Menu>
		<Menu.Item>
			<Icon type="user" />
			<span>个人中心</span>
		</Menu.Item>
		<Menu.Item>
			<Icon type="swap" />
			<span>切换账号</span>
		</Menu.Item>
		<Menu.Item>
			<Icon type="poweroff" />
			<span>退出登录</span>
		</Menu.Item>
	</Menu>
);
class HomePageHeader extends React.Component{
	render() {
		return (
			<Header className="home-page-header">
					<Col xs={14} sm={12} md={12} lg={12} xl={12}>
						<p className='home-page-steward'>天天管家</p>
					</Col>
					<Col className='home-page-right' xs={10} sm={12} md={12} lg={12} xl={12}>
						<Dropdown overlay={content}>
							<div className='home-page-user-box'>
							<Avatar
								size={43}
								src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
								className='home-page-avatar'
							/>
							<p>请登录</p>
							</div>
						</Dropdown>
					</Col>
			</Header>
		)
	}
}
export default HomePageHeader;