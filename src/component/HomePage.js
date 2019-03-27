import React from 'react';
import HomePageHeader from './HomePageHeader';
import LeftMenu from './LeftMenu';
import ColumnIndex from './ColumnIndex';
import ColumnBill from './ColumnBill';
import ColumnLoans from './ColumnLoans';
import ColumnCardBag from './ColumnCardBag';
import ColumnTarget from './ColumnTarget';
import ColumnTool from './ColumnTool';
import ColumnUser from './ColumnUser';
import { Layout, Divider} from 'antd';
require('./style/HomePage.css');
const { Content, Footer } = Layout;
class HomePage extends React.Component{
	state={
		page_key:'1'
	};

	onChangeColumn = (key) =>{
		this.setState({page_key: key})
	}

	render() {
		return (
			<Layout className='homePage'>
				<HomePageHeader/>
				<Layout>
					<LeftMenu
						onChangeColumn={this.onChangeColumn}
					/>
					<Content style={{ margin: '20px 20px' }} className='content'>
						{
							(() => {
								console.log(this.state.page_key)
								switch (this.state.page_key) {
									case '1':
										return <ColumnIndex/>;
									case '2':
										return <ColumnBill/>;
									case '3':
									 	return <ColumnLoans/>;
									case '4':
										return <ColumnCardBag/>;
									case '5':
										return <ColumnTarget/>;
									case '6':
										return <ColumnTool/>;
									case '7':
										return <ColumnUser/>;
									default:
										return <ColumnIndex/>
								}
							})()
						}
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