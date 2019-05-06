import React from 'react';
import { Card, Icon, Row, Col, Upload } from 'antd';
import store from "../store";
import { Query } from "leancloud-storage";
import {getLoansResult} from '../store/actionCreator';
require('./style/ColumnLoans.css');
class ColumnLoans extends React.Component{
	constructor(props){
		super(props);
		this.state = store.getState();
		store.subscribe(()=>{this.setState(store.getState())});
	}

	componentDidMount() {
		let query = new Query('Loans');
		query.equalTo('username','895470730@qq.com');
		query.find().then((result)=>{
			const action = getLoansResult(result);
			store.dispatch(action);
		},(error)=>{console.log(error)})
	}

	builder = (loansResult) =>{
		this.state.loans_result.map((index)=>{
			console.log(index)
			// 我写到这了
		})
	};

	render() {
		const { Meta } = Card;
		return (
			<div className='loans'>
				<Row className='loansList'>
					<Col xs={24} sm={24} md={12} lg={8} xl={6}>
						<Card
							actions={[<Icon type="check" />, <Icon type="edit"/>]}
							className='loansOption'
						>
							<p>借款方：{}</p>
							<p>被借款方：{}</p>
							<p>借款金额：{}</p>
							<p>预计还款日期：{}</p>
						</Card>
					</Col>
					{this.builder()}
				</Row>
			</div>
		);
	}
}
export default ColumnLoans;