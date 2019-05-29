import React from 'react';
import { Card, Icon, Row, Col} from 'antd';
import store from "../store";
import {Query} from "leancloud-storage";
import {getLoansResult} from "../store/actionCreator";
require('./style/ColumnLoans.css');
class ColumnLoans extends React.Component{
	constructor(props){
		super(props);
		this.state = store.getState();
		this.unsubscribe = store.subscribe(()=>{this.setState(store.getState())});
	}

	componentDidMount() {
		this.getLoansData();
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.loans_result !== nextState.loans_result;
	}

	getLoansData = () =>{
		let query = new Query('Loans');
		query.equalTo('username','895470730@qq.com');
		query.find().then((result)=>{
			result = result.map((index)=>{
				return index._serverData
			});
			const action = getLoansResult(result);
			store.dispatch(action);
		},(error)=>{console.log(error)});
	};

	render() {
		return (
			<div className='loans'>
				<Row className='loansList'>
						{
							this.state.loans_result.map((index,key)=>{
								return <Col xs={24} sm={24} md={12} lg={8} xl={6} key = {key}>
									<Card
										actions={[<Icon type="check"/>, <Icon type="edit"/>]}
										className='loansOption'
									>
										<p>借款方：{index.borrower}</p>
										<p>被借款方：{index.lender}</p>
										<p>借款金额：{index.borrowingBalance}元</p>
										<p>预计还款日期：{index.repaymentDate}</p>
									</Card>
								</Col>;
							})
						}
				</Row>
			</div>
		);
	}
}
export default ColumnLoans;