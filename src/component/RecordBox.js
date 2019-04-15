import React from 'react';
import {Modal, Input, Select, Form, Radio, Icon, DatePicker, Button} from "antd";
import store from '../store/index';
import {getChangeLoginState, getChangeRecordBoxShow, getHandleRegisterSubmit} from '../store/actionCreator';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {AV} from "../connection";
moment.locale('zh-cn');
require('./style/RecordBox.css');
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function onChange(date, dateString) {
	console.log(dateString);
}

class RecordBox extends React.Component{
	constructor(props){
		super(props);
		this.state = store.getState();
		store.subscribe(()=>{this.setState(store.getState())})
	}

	componentDidMount() {
		// To disabled submit button at the beginning.
		this.props.form.validateFields();
	}

	handleCancel = () =>{
		const action = getChangeRecordBoxShow();
		store.dispatch(action);
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			console.log(values)
		})
	};

	handleRegisterSubmit = (e) => {
		console.log(e)
	};

	render() {
		const { getFieldDecorator, getFieldValue } = this.props.form;
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
							{
								getFieldDecorator('name',{})
								(<Input style={{ width: '65%' }} placeholder="请输入花销名" />)
							}
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
						{
							getFieldDecorator('date',{})(
								<DatePicker locale={locale} onChange={onChange} />
							)
						}
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