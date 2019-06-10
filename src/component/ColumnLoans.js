import React from 'react';
import {Card, Icon, Row, Col, Drawer, Form, Input, DatePicker, Button} from 'antd';
import store from "../store";
import {Query} from "leancloud-storage";
import {getLoansResult} from "../store/actionCreator";
import locale from "antd/lib/date-picker/locale/zh_CN";
import moment from 'moment';
require('./style/ColumnLoans.css');
class ColumnLoans extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			drawerStatus: false,
			current: {}
		};
		this.unsubscribe = store.subscribe(()=>{this.setState(store.getState())});
	}

	componentDidMount() {
		this.getLoansData();
	}

	//唤出修改账单数据的抽屉
	showDrawer = (value) =>{
		console.log(value,this.state);
		this.setState({drawerStatus:!this.state.drawerStatus});
	};

	getLoansData = () =>{
		let query = new Query('Loans');
		query.equalTo('username',store.getState().active_user);
		query.find().then((result)=>{
			result = result.map((index)=>{
				return index._serverData
			});
			const action = getLoansResult(result);
			store.dispatch(action);
		},(error)=>{console.log(error)});
	};

	render() {
		const {getFieldDecorator} = this.props.form;
		return (
			<div className='loans'>
				<Row className='loansList'>
						{
							store.getState().loans_result.map((index,key)=>{
								return <Col xs={24} sm={24} md={12} lg={8} xl={6} key = {key}>
									<Card
										actions={[
											<Icon type="check"/>,
											<Icon type="edit" onClick={this.showDrawer.bind(this,index)}/>
										]}
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
				<Drawer
					title="修改借贷管理"
					placement="right"
					width={500}
					closable={true}
					maskClosable={true}
					onClose={this.showDrawer}
					visible={this.state.drawerStatus}
				>
					<Form onSubmit={this.handleSubmit}>
						<Form.Item>
							<strong>出借方：</strong>
							{
								getFieldDecorator('lender', {
									defaultValue:this.state.current.lender
								})(
									<Input placeholder="请输入出借方" style={{width: '80%'}}/>
								)
							}
						</Form.Item>
						<Form.Item>
							<strong>借款人：</strong>
							{
								getFieldDecorator('borrower', {
									defaultValue: this.state.current.borrower
								})(
									<Input placeholder="请输入借款人" style={{width: '80%'}}/>
								)
							}
						</Form.Item>
						<Form.Item>
							<strong>借款金额：</strong>
							{
								getFieldDecorator('borrowingBalance',{
									defaultValue:this.state.current.borrowingBalance
								})(
									<Input placeholder="请输入花费金额" style={{width:'80%'}}/>
								)
							}
						</Form.Item>
						<Form.Item>
							<strong>还款日期：</strong>
							<DatePicker
								locale={locale}
								onChange={this.getRepaymentDate}
								value={moment(this.state.current.date,'YYYY-MM-DD')}
							/>
						</Form.Item>
						<Form.Item>
							<strong>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</strong>
							{
								getFieldDecorator('note', {
									defaultValue:this.state.current.note
								})(
									<Input style={{width: '80%'}} placeholder="请输入备注信息"/>
								)
							}
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="login-form-button"
							>
								修改
							</Button>
						</Form.Item>
						{}
					</Form>
				</Drawer>
			</div>
		);
	}
}
export default Form.create()(ColumnLoans);