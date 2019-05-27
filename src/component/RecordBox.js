import React from 'react';
import {
	Modal, Input, Select, Form, Radio, Icon, DatePicker, Button, message
} from "antd";
import store from '../store/index';
import {changeColumnIdexTableData, getChangeRecordBoxShow} from '../store/actionCreator';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {UserBills} from "../connection";
import {Query} from "leancloud-storage";
moment.locale('zh-cn');
require('./style/RecordBox.css');
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

let billDate;
function onChange(date, dateString) {
	billDate = dateString;
}

class RecordBox extends React.Component{
	constructor(props){
		super(props);
		this.state = store.getState();
		store.subscribe(()=>{this.setState(store.getState())})
	}

	handleCancel = () =>{
		const action = getChangeRecordBoxShow();
		store.dispatch(action);
	};



	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			let userBills = new UserBills();
			//当前用户
			userBills.set('activeUser',this.state.active_user);
			//存储花销类别
			userBills.set('category',values.category);
			//存储花销名
			userBills.set('name',values.name);
			//存储花销金额
			userBills.set('money',values.money);
			//存储备注
			userBills.set('note',values.note);
			//存储支付方式
			userBills.set('payWay',values.payWay);
			//存储时间
			userBills.set('date',billDate);
			userBills.save().then(function (todo) {
				message.success('添加成功');
				const action = getChangeRecordBoxShow();
				store.dispatch(action);
				getTableData()
			}, function (error) {
				console.error(error);
			});

			function getTableData(){
				let query = new Query('UserBills');
				query.equalTo('activeUser','895470730@qq.com');
				query.find().then(function (result) {
					let n = 0;
					let newData = [];
					for(let i = result.length - 1; i > 0; i --){
						newData[n] = {};
						newData[n] = result[i]._serverData;
						newData[n].key = n;
						n++;
					}
					const action = changeColumnIdexTableData(newData);
					store.dispatch(action);
				}, function (error) {
					console.log('请求首页表格数据时出错了',error)
				});
			};
		})
		//清空注册表单内信息
		this.props.form.resetFields();
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return(
			<Modal
				visible={this.state.record_box_show}
				title="记一笔帐"
				okText="创建"
				cancelText="取消"
				onCancel={this.handleCancel}
				style={{width:200}}
				footer={null}
			>
				<Form onSubmit={this.handleSubmit}>
					<Form.Item>
						<strong>花销名称：</strong>
						<InputGroup compact style={{width:'80%'}}>
							{
								getFieldDecorator('category', {
									initialValue: 'clothes'
								})(
									<Select style={{ width: '35%' }}>
										<Option value="clothes">服饰</Option>
										<Option value="food">饮食</Option>
										<Option value="trip">交通出行</Option>
										<Option value="livingPayment">生活缴费</Option>
										<Option value="stationeryAndSporting">文教体育</Option>
										<Option value="other">其他</Option>
									</Select>
								)
							}
							{ getFieldDecorator('name',{})(<Input style={{ width: '65%' }} placeholder="请输入花销名" />) }
						</InputGroup>
				  </Form.Item>
					<Form.Item>
						<strong>花费金额：</strong>
						{
							getFieldDecorator('money',{})(
								<Input placeholder="请输入花费金额" style={{width:'80%'}}/>
							)
						}
					</Form.Item>
					<Form.Item>
						<strong>日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期：</strong>
								<DatePicker locale={locale} onChange={onChange} />
					</Form.Item>
					<Form.Item>
						<strong>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</strong>
						{
							getFieldDecorator('note',{})(
								<Input style={{width:'80%'}} placeholder="请输入备注信息"/>
							)
						}
					</Form.Item>
					<Form.Item>
						<strong>支付方式：</strong>
						{
							getFieldDecorator('payWay',{
								initialValue: 'other'
							})(
								<RadioGroup>
									<RadioButton value="qq"><Icon type="qq" />QQ</RadioButton>
									<RadioButton value="alipay"><Icon type="alipay" />支付宝</RadioButton>
									<RadioButton value="wechat"><Icon type="wechat" />微信</RadioButton>
									<RadioButton value="credit-card"><Icon type="credit-card" />现金</RadioButton>
									<RadioButton value="other"><Icon type="plus" />其他</RadioButton>
								</RadioGroup>
							)
						}
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
						>
							创建
						</Button>
					</Form.Item>
				</Form>
				</Modal>
		)
	}
}
export default Form.create()(RecordBox);