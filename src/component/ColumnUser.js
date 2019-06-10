import React from 'react';
import {Col, Row, Card, Input} from "antd";
require('./style/ColumnUser.css');
class ColumnUser extends React.Component{
	render() {
		const {Meta} = Card;
		return (
			<div className='user'>
				<Row className='user-top'>
					<Col xs={24} sm={24} md={18} lg={18} xl={18}>
						<Row>
							<Col xs={24} sm={24} md={18} lg={4} xl={2}/>
							<Col xs={24} sm={24} md={18} lg={16} xl={16}>
								账号：<Input title='账号'/>
							</Col>
							<Col xs={24} sm={24} md={18} lg={4} xl={6}/>
						</Row>
					</Col>
					<Col xs={24} sm={24} md={6} lg={6} xl={6}>
						<Card
							hoverable
							style={{ width: 240 }}
							cover={<img alt="example" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
						>
							<Meta title="点击更换头像" />
						</Card>,
					</Col>
				</Row>
			</div>
		);
	}
}
export default ColumnUser;