import React from 'react';
import { Card, Icon, Row, Col, Button } from 'antd';
import store from "../store";
import {Query} from "leancloud-storage";
import {getLoansResult} from "../store/actionCreator";
require('./style/ColumnLoans.css');
let getLoan = null;
class ColumnLoans extends React.Component{
	constructor(props){
		super(props);
		this.state = store.getState();
		store.subscribe(()=>{this.setState(store.getState())});
	}

	componentWillMount() {
		this.getLoansData()
	}

	getLoansData = () =>{
		let query = new Query('Loans');
		query.equalTo('username','895470730@qq.com');
		query.find().then((result)=>{
			const action = getLoansResult(result);
			store.dispatch(action);
		},(error)=>{console.log(error)});
	};

	render() {
		return (
			<div className='loans'>
				<Row className='loansList'>
						{
							this.state.loans_result.map((index)=>{
								console.log(index._serverData);
								return <Col xs={24} sm={24} md={12} lg={8} xl={6}>
									<Card
										actions={[<Icon type="check"j/>, <Icon type="edit"/>]}
										className='loansOption'
										key = {index}
									>
										<p>借款方：{index._serverData.borrower}</p>
										<p>被借款方：{index._serverData.lender}</p>
										<p>借款金额：{index._serverData.borrowingBalance}元</p>
										<p>预计还款日期：{index._serverData.repaymentDate}</p>
									</Card>
								</Col>;
							})
						}
				</Row>
				<Button onClick={this.getLoansData}>here</Button>
			</div>
		);
	}
}
export default ColumnLoans;