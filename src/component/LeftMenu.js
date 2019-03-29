import React from 'react';
import {Icon, Menu, Layout} from "antd";
import store from '../store/index';
import {getHandleColumnChange} from '../store/actionCreator';
import { Promise, Parse } from '../connection';
require('./style/LeftMenu.css');
const { Sider } = Layout;
class LeftMenu extends React.Component{
	constructor(props){
		super(props);
		this.handleColumnChange = this.handleColumnChange.bind(this);
	}
	handleColumnChange = (key) =>{
		const action = getHandleColumnChange(key);
		store.dispatch(action);
	};
	render() {
		return (
			<Sider
				theme='light'
				collapsible
				className='menu'
			>
				<Menu theme="light"
							defaultSelectedKeys={['1']}
							mode="inline"
							onClick={(item)=>{this.handleColumnChange(item.key)}}
				>
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
					<Menu.Item key="5">
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