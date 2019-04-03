import React from 'react';
import RecordBox from './RecordBox'
import { Row, Col, Table, Divider, Button } from 'antd';
import store from '../store/index';
import { getChangeRecordBoxShow } from '../store/actionCreator';
require('./style/ColumnIndex.css');
const columns = [{
	title: '时间',
	dataIndex: 'name',
	key: 'name',
	render: text => <a href="javascript:;">{text}</a>,
}, {
	title: '消费金额',
	dataIndex: 'age',
	key: 'age',
}, {
	title: '备注 ',
	dataIndex: 'address',
	key: 'address',
}, {
	title: '支付方式',
	key: 'tags',
	dataIndex: 'tags',
}, {
	title: '操作',
	key: 'action',
	render: (text, record) => (
		<span>
      <a>修改</a>
      <Divider type="vertical" />
      <a>删除</a>
    </span>
	),
}];

const data = [{
	key: '1',
	name: 'John Brown',
	age: 32,
	address: 'New York No. 1 Lake Park',
	tags: 'nice',
}, {
	key: '2',
	name: 'Jim Green',
	age: 42,
	address: 'London No. 1 Lake Park',
	tags: 'loser',
}];
class ColumnIndex extends React.Component{
	constructor(props){
		super(props);
		this.state = store.getState();
		store.subscribe(()=>{this.setState(store.getState())});
	}

	handleRouseRecordBox = () =>{
		const action = getChangeRecordBoxShow();
		store.dispatch(action);
	};

	render() {
		return(
			<div className='index'>
				<RecordBox/>
				<Row className='top'>
					<Col className='chart' xs={24} sm={24} md={13} lg={13} xl={13}>
						1
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
					<Table columns={columns} dataSource={data} />
				</Row>
			</div>
		)
	}
}
export default ColumnIndex;