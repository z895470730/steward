import React from 'react';
import HomePageHeader from './HomePageHeader';
import LeftMenu from './LeftMenu'
import {
	Layout, Menu, Icon, Divider
} from 'antd';
require('./style/HomePage.css');
const { Content, Footer } = Layout;
class HomePage extends React.Component{

	render() {
		return (
			<Layout>
				<HomePageHeader/>
				<Layout>
					<LeftMenu/>
					<Content style={{ margin: '16px 16px' }}>
						
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