import React from 'react';
import RecordBox from './RecordBox'
import {
	Row, Col, Table, Divider, Button,Icon
} from 'antd';
import store from '../store/index';
import { getChangeRecordBoxShow,changeColumnIdexTableData } from '../store/actionCreator';
import { Query } from "leancloud-storage";
import Graph from './Graph';
require('./style/ColumnIndex.css');
let getTable = null
class ColumnIndex extends React.Component{
	constructor(props){
		super(props);
		this.state = store.getState();
		store.subscribe(()=>{this.setState(store.getState())});
	}

	componentWillMount() {
		 getTable = this.getTableData;
		 getTable();
	};

	componentWillUnmount(){
		getTable = null;
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
			render: (text, record) => (
				<span>
					<span>修改</span>
					<Divider type="vertical" />
					<span>删除</span>
    		</span>),
		},];

		let data = this.state.column_index_table_data;
		return(
			<div className='index'>
				<RecordBox/>
				<Row className='top'>
					<Col className='index-left' xs={11} sm={11} md={11} lg={11} xl={11}>
						<Row className='chart'>
							<Graph className='graph'/>
						</Row>
						<Row className='toDay'>
							<Button
								type="primary"
								icon="plus"
								onClick={this.handleRouseRecordBox}
							>记一笔帐</Button>
						</Row>
					</Col>
					<Col className='index-right' xs={12} sm={12} md={12} lg={12} xl={12}>
						<Table
							className='index-table'
							columns={columns}
							dataSource={data}
							pagination={{pageSize:8,position:'bottom'}}
							scroll={{x:620}}
						/>
					</Col>
				</Row>

			</div>
		)
	}
}
export default ColumnIndex;