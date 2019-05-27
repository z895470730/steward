import React from 'react';
import {
	Divider, Icon, Table, Select,Row,Col, Input, DatePicker
} from "antd";
import store from "../store";
require('./style/ColumnBill.css');
class ColumnBill extends React.Component{
	constructor(props){
		super(props);
		this.state = store.getState();
		store.subscribe(()=>{this.setState(store.getState())});
	}

	onChange = (date, dateString) =>{
		console.log(date, dateString);
	}

	render() {
		const columns = [{
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
			width:'150px'
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
			render: (text, record) => (
				<span>
					<span>修改</span>
					<Divider type="vertical" />
					<span>删除</span>
    		</span>),
		},];

		let data = this.state.column_index_table_data;
		const Option = Select.Option;
		const { RangePicker } = DatePicker;
		return (
			<div className='bill'>
				<Row className='filtrate-gather'>
					<Col className='filter' xs={24} sm={12} md={12} lg={6} xl={6}>
						类别：
						<Select defaultValue="请选择">
							<Option value="null">请选择</Option>
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
						<Select defaultValue="请选择">
							<Option value="null">请选择</Option>
							<Option value="alipay">支付宝</Option>
							<Option value="qq">QQ</Option>
							<Option value="wechat">微信</Option>
							<Option value="credit-card">现金</Option>
							<Option value="other">其他</Option>
						</Select>
					</Col>
					<Col className='filter' xs={24} sm={24} md={24} lg={12} xl={12}>
						金额范围：
						<Input style={{ width: 100, textAlign: 'center' }} placeholder="最小金额" />
						<Input
							style={{
								width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff',
								borderTop:0, borderBottom:0
							}}
							placeholder="~	"
							disabled
						/>
						<Input style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="最大金额" />
					</Col>
				</Row>
				<Row className='filtrate-gather'>
					<Col className='filter' xs={24} sm={24} md={19} lg={16} xl={12}>
						时间：
						<RangePicker onChange={onchange}/>
					</Col>
					<Col className='filter' xs={24} sm={24} md={5} lg={8} xl={12}>
						总金额:{}
					</Col>
				</Row>
				<Table
					columns={columns}
					dataSource={data}
					pagination={{pageSize:15,position:'bottom'}}
					scroll={{x:1000}}
				/>
			</div>
		);
	}
}
export default ColumnBill;