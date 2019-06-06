import React from 'react';
import RecordBox from './RecordBox'
import {
	Row, Col, Table, Divider, Button, Popconfirm, Icon
} from 'antd';
import store from '../store/index';
import { getChangeRecordBoxShow } from '../store/actionCreator';
import { getTableData } from "../services/LeanCloud/getColumnIndex";
import Graph from './Graph';
require('./style/ColumnIndex.css');
class ColumnIndex extends React.Component{
	state={week:{}};
	//服务器表格数据请求
	componentDidMount() {
		getTableData();
	};

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return store.getState().column_index_table_data !== nextState.column_index_table_data;
	}

	handleRouseRecordBox = () =>{
		const action = getChangeRecordBoxShow();
		store.dispatch(action);
	};

	render() {
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
			render: () => (
				<span>
						<span className='table-action-option'>
							修改
						</span>
					<Divider type="vertical" />
					<Popconfirm
						title="是否删除"
						icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
						okText='是'
						cancelText='否'
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
							>记一笔帐</Button>
						</Row>
					</Col>
					<Col className='index-right' xs={24} sm={24} md={24} lg={12} xl={12}>
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