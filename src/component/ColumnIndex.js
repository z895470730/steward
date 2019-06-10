import React from 'react';
import store from '../store/index';
import RecordBox from './RecordBox';
import Graph from './Graph';
import moment from 'moment';
import LoansBox from './LoansBox';
import {
	Row, Col, Table, Divider, Button, Popconfirm, Icon, Drawer, Form,
	Select, Input, DatePicker, Radio, Modal
} from 'antd';
import { getChangeRecordBoxShow } from '../store/actionCreator';
import { getTableData } from "../services/LeanCloud/getColumnIndex";
import { deleteBillTableData } from '../services/LeanCloud/deleteBillTableData';
import {changeBillData} from "../services/LeanCloud/changeBillData";
import locale from "antd/lib/date-picker/locale/zh_CN";
require('./style/ColumnIndex.css');
class ColumnIndex extends React.Component{
	state={
		drawerStatus: false,
		drawerData:{},
		bill:{},
		loansVisible: false
	};
	//服务器表格数据请求
	componentDidMount() {
		getTableData();
	};
	//优化渲染
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return store.getState().column_index_table_data !== nextState.column_index_table_data;
	}
	//创建新花销记录
	handleRouseRecordBox = () =>{
		const action = getChangeRecordBoxShow();
		store.dispatch(action);
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
	//显示/关闭添加借贷信息管理
	showLoansModal = () => {
		this.setState({
			loansVisible: !this.state.loansVisible,
		});
	};
	//添加添加借贷窗口的确定按钮回调
	handleOk = e => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};

	render() {
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
			title:'名称',
			dataIndex:'name',
			align:'center',
			key:'name',
			width:'100px'
		},{
			title: '金额',
			dataIndex: 'money',
			align:'center',
			key: 'money',
			width:'100px'
		},{
			title: '备注 ',
			dataIndex: 'note',
			key: 'note',
			width:'150px'
		}, 	{
			title: '操作',
			key: 'action',
			width:'150px',
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
		const data = store.getState().column_index_table_data;
		return(
			<div className='index'>
				<RecordBox/>
				<Row className='top'>
					<Col className='index-left' xs={24} sm={24} md={24} lg={11} xl={11}>
						<Row className='chart'>
							<Graph
								className='graph'
								data = {data}
							/>
						</Row>
						<Row className='toDay'>
							<Button
								type="primary"
								icon="plus"
								onClick={this.handleRouseRecordBox}
								htmlType='button'
							>
								记一笔帐
							</Button>
							<Button
								htmlType='button'
								icon='plus'
								type='primary'
								onClick={this.showLoansModal}
							>
								添加借贷信息
							</Button>
						</Row>
					</Col>
					<Col className='index-right' xs={24} sm={24} md={24} lg={12} xl={12}>
						<Table
							className='index-table'
							columns={columns}
							dataSource={data}
							pagination={{pageSize:8,position:'bottom'}}
							scroll={{x:620}}
							onSelect={(record, selected, selectedRows, nativeEvent)=>{
								console.log(record, selected, selectedRows, nativeEvent 	)
							}}
						/>
					</Col>
				</Row>
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
				<Modal
					title="借贷信息添加"
					visible={this.state.loansVisible}
					footer={null}
					onCancel={this.showLoansModal}
				>
					<LoansBox
						onClose = {this.showLoansModal}
					/>
				</Modal>
			</div>
		)
	}
}
export default Form.create()(ColumnIndex);