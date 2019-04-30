import React from 'react';
import {Divider, Icon, Table, Select,Row,Col} from "antd";
import store from "../store";
require('./style/ColumnBill.css');
class ColumnBill extends React.Component{
	constructor(props){
		super(props);
		this.state = store.getState();
		store.subscribe(()=>{this.setState(store.getState())});
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
					<a>修改</a>
					<Divider type="vertical" />
					<a>删除</a>
    		</span>),
		},];

		let data = this.state.column_index_table_data;
		const Option = Select.Option;
		return (
			<div className='bill'>
				<Row className='filtrate-gather'>
					<Col xs={6} sm={6} md={6} lg={6} xl={6}>
						类别：
						<Select defaultValue="Zhejiang">
							<Option value="Zhejiang">Zhejiang</Option>
							<Option value="Jiangsu">Jiangsu</Option>
						</Select>
					</Col>
					<Col xs={6} sm={6} md={6} lg={6} xl={6}>
						类别：
						<Select defaultValue="Zhejiang">
							<Option value="Zhejiang">Zhejiang</Option>
							<Option value="Jiangsu">Jiangsu</Option>
						</Select>
					</Col>
					<Col xs={6} sm={6} md={6} lg={6} xl={6}>
						类别：
						<Select defaultValue="Zhejiang">
							<Option value="Zhejiang">Zhejiang</Option>
							<Option value="Jiangsu">Jiangsu</Option>
						</Select>
					</Col>
					<Col xs={6} sm={6} md={6} lg={6} xl={6}>
						类别：
						<Select defaultValue="Zhejiang">
							<Option value="Zhejiang">Zhejiang</Option>
							<Option value="Jiangsu">Jiangsu</Option>
						</Select>
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