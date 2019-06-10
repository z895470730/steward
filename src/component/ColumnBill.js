import React from 'react';
import store from "../store";
import moment from 'moment';
import {
	Divider, Icon, Table, Select, Row, Col, Input, DatePicker,
	Popconfirm, Button, Drawer, Radio,Form
} from "antd";
import {
	categorySelection, payWaySelection, costSelection, dateSelection
} from '../services/screeningBills';
import locale from "antd/lib/date-picker/locale/zh_CN";
import {changeBillData} from "../services/LeanCloud/changeBillData";
import {deleteBillTableData} from "../services/LeanCloud/deleteBillTableData";
require('./style/ColumnBill.css');
class ColumnBill extends React.Component{
	state = {
		bill: store.getState().column_index_table_data,
		categoryChoose: '',
		payWayChoose: '',
		minMoney:null,
		maxMoney:null,
		dateChoose:null,
		drawerStatus: false,
		drawerData:{}
	};

	filter = () =>{
		let billDate = store.getState().column_index_table_data;
		billDate = categorySelection(this.state.categoryChoose,billDate);
		billDate = payWaySelection(this.state.payWayChoose,billDate);
		billDate = costSelection(this.state.minMoney,this.state.maxMoney,billDate);
		billDate = dateSelection(this.state.dateChoose,billDate);
		this.setState({bill:billDate});
	};
	//删除账单数据
	deleteTableItem = (value) =>{
		deleteBillTableData(value.id);
	};
	//唤出修改账单数据的抽屉
	showDrawer = (value) =>{
		this.setState({drawerStatus:!this.state.drawerStatus,drawerData:value});
	};
	//修改数据库中账单数据
	editBillData = (e) =>{
		e.preventDefault();
		this.props.form.validateFields((err, values)=>{
			changeBillData(this.state.drawerData.id,values,this);
		})
	};
	render(){
		const InputGroup = Input.Group;
		const Option = Select.Option;
		const RadioButton = Radio.Button;
		const RadioGroup = Radio.Group;
		const { getFieldDecorator } = this.props.form;
		const columns = [
		{
			title: '时间',
			dataIndex: 'date',
			width:'120px',
			fixed:'left',
			key: 'date',
		},{
			title: '类别',
			dataIndex: 'category',
			align:'center',
			key: 'category',
			width:'150px',
			render: (index) => {
				switch (index) {
					case 'clothes':
						return '服饰';
					case 'food':
						return '饮食';
					case 'trip':
						return '交通出行';
					case 'other':
						return '其他';
					case 'livingPayment':
						return '生活缴费';
					case 'stationeryAndSporting':
						return '文体教育';
					default:
						return '暂无类别';
				}
			}
		},{
			title:'名称',
			dataIndex:'name',
			align:'center',
			key:'name',
			width:'150px'
		},{
			title: '金额',
			dataIndex: 'money',
			align:'center',
			key: 'money',
			width:'150px'
		},{
			title: '支付方式',
			key: 'payWay',
			dataIndex: 'payWay',
			align:'center',
			width:'150px',
			render: payWay =>(
				<span>
					<Icon type={payWay}/>
				</span>
			)
		}, {
			title: '备注 ',
			dataIndex: 'note',
			key: 'note',
			width:'300px'
		}, 	{
			title: '操作',
			key: 'action',
			width:'180px',
			align:'center',
			render: (value) => (
				<span>
						<span
							className='table-action-option'
							onClick={this.showDrawer.bind(this,value)}
						>
							修改
						</span>
					<Divider type="vertical" />
					<Popconfirm
						title="是否删除"
						icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
						okText='是'
						cancelText='否'
						onConfirm={this.deleteTableItem.bind(this,value)}
					>
						<span className='table-action-option'>
							删除
						</span>
					</Popconfirm>
    		</span>),
		},];
		const data = this.state.bill;
		const { RangePicker } = DatePicker;
		return (
			<div className='bill'>
				<Row className='filtrate-gather'>
					<Col className='filter' xs={24} sm={12} md={12} lg={6} xl={6}>
						类别：
						<Select
							defaultValue="请选择"
							onChange={(value)=>{
								if(value === 'null'){return}
								this.setState({categoryChoose:value},this.filter)}
							}
							id='categoryChoose'
						>
							<Option value="clothes">服饰</Option>
							<Option value="food">饮食</Option>
							<Option value="trip">交通出行</Option>
							<Option value="livingPayment">生活缴费</Option>
							<Option value="stationeryAndSporting">文教体育</Option>
							<Option value="other">其他</Option>
						</Select>
					</Col>
					<Col className='filter' xs={24} sm={12} md={12} lg={6} xl={6}>
						支付方式：
						<Select
							defaultValue="请选择"
							onChange={(value)=>{
								if(value === 'null'){return}
								this.setState({payWayChoose:value},this.filter);
							}}
							id='payWayChoose'
						>
							<Option value="alipay">支付宝</Option>
							<Option value="qq">QQ</Option>
							<Option value="wechat">微信</Option>
							<Option value="credit-card">现金</Option>
							<Option value="other">其他</Option>
						</Select>
					</Col>
					<Col className='filter' xs={24} sm={24} md={24} lg={12} xl={12}>
						金额范围：
						<Input
							style={{ width: 100, textAlign: 'center' }}
							id='minMoney'
							onChange={()=>{
								let value = document.getElementById('minMoney').value
								if(typeof Number(value) === "number"){
									this.setState({minMoney:value},this.filter);
								}
							}}
							placeholder="最小金额"
						/>
						<Input
							style={{
								width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff',
								borderTop:0, borderBottom:0
							}}
							placeholder="~	"
							disabled
						/>
						<Input
							id='maxMoney'
							style={{ width: 100, textAlign: 'center', borderLeft: 0 }}
							onChange={()=>{
								let value = document.getElementById('maxMoney').value;
								if(typeof Number(value) === "number"){
									this.setState({maxMoney:value},this.filter);
								}
							}}
							placeholder="最大金额"
						/>
					</Col>
				</Row>
				<Row className='filtrate-gather'>
					<Col className='filter' xs={24} sm={24} md={19} lg={16} xl={12}>
						时间：
						<RangePicker
							onChange={(value,dateStrings)=>{
							this.setState({dateChoose:dateStrings},this.filter)
						}}/>
					</Col>
				</Row>
				<Table
					columns={columns}
					dataSource={data}
					pagination={{pageSize:6,position:'bottom'}}
					scroll={{x:1000}}
				/>
				<Drawer
					title="修改花销记录"
					placement="right"
					width={500}
					closable={false}
					onClose={this.showDrawer}
					visible={this.state.drawerStatus}
				>
					<Form onSubmit={this.editBillData}>
						<Form.Item>
							<strong>花销名称：</strong>
							<InputGroup compact style={{width:'80%'}}>
								{
									getFieldDecorator('category', {
										initialValue: this.state.drawerData.category,
									})(
										<Select
											style={{ width: '35%' }}
										>
											<Option value="clothes">服饰</Option>
											<Option value="food">饮食</Option>
											<Option value="trip">交通出行</Option>
											<Option value="livingPayment">生活缴费</Option>
											<Option value="stationeryAndSporting">文教体育</Option>
											<Option value="other">其他</Option>
										</Select>
									)
								}
								{ getFieldDecorator('name',{
									initialValue: this.state.drawerData.name
								})(<Input style={{ width: '65%' }} placeholder="请输入花销名" />) }
							</InputGroup>
						</Form.Item>
						<Form.Item>
							<strong>花费金额：</strong>
							{
								getFieldDecorator('money',{
									initialValue: this.state.drawerData.money
								})(
									<Input placeholder="请输入花费金额" style={{width:'80%'}}/>
								)
							}
						</Form.Item>
						<Form.Item>
							<strong>日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期：</strong>
							<DatePicker locale={locale} value={moment(this.state.drawerData.date, 'YYYY-MM-DD')}/>
						</Form.Item>
						<Form.Item>
							<strong>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</strong>
							{
								getFieldDecorator('note',{
									initialValue: this.state.drawerData.note
								})(
									<Input style={{width:'80%'}} placeholder="请输入备注信息"/>
								)
							}
						</Form.Item>
						<Form.Item>
							<strong>支付方式：</strong>
							{
								getFieldDecorator('payWay',{
									initialValue: this.state.drawerData.payWay
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
								修改
							</Button>
						</Form.Item>
					</Form>
				</Drawer>
			</div>
		);
	}
}
export default Form.create()(ColumnBill);