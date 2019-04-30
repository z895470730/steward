import React from 'react';
import RecordBox from './RecordBox'
import {
	Row, Col, Table, Divider, Button,Icon,
	Tabs
} from 'antd';
import store from '../store/index';
import { getChangeRecordBoxShow,changeColumnIdexTableData } from '../store/actionCreator';
import { Query } from "leancloud-storage";
import Graph from './Graph';
require('./style/ColumnIndex.css');
class ColumnIndex extends React.Component{
	constructor(props){
		super(props);
		this.state = store.getState();
		store.subscribe(()=>{this.setState(store.getState())});
	}

	componentWillMount() {
		this.getTableData();
	};

	getTableData = () =>{
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
			console.log(newData)
			const action = changeColumnIdexTableData(newData);
			store.dispatch(action);
		}, function (error) {
			console.log('请求首页表格数据时出错了',error)
		});
	};

	handleRouseRecordBox = () =>{
		const action = getChangeRecordBoxShow();
		store.dispatch(action);
	};

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
		return(
			<div className='index'>
				<RecordBox/>
				<Row className='top'>
					<Col className='chart' xs={24} sm={24} md={13} lg={13} xl={13}>
						<Graph/>
					</Col>
					<Col xs={1} sm={1} md={1} lg={1} xl={1}/>
					<Col className='toDay'xs={24} sm={24} md={10} lg={10} xl={10}>
						<Button
							type="primary"
							icon="plus"
							onClick={this.handleRouseRecordBox}
						>记一笔帐</Button>
					</Col>
				</Row>
				<p className='table-title'>近日消费</p>
				<Row className='bottom'>
					<Table
						columns={columns}
						dataSource={data}
						pagination={{pageSize:3,position:'bottom'}}
						scroll={{x:1000}}
					/>
				</Row>
			</div>
		)
	}
}
export default ColumnIndex;