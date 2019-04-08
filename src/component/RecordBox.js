import React from 'react';
import {Modal, Form, Input, Cascader} from "antd";
import store from '../store/index';
import {getChangeRecordBoxShow} from '../store/actionCreator';
const options = [{
	value: 'zhejiang',
	label: 'Zhejiang',
	children: [{
		value: 'hangzhou',
		label: 'Hangzhou',
		children: [{
			value: 'xihu',
			label: 'West Lake',
		}],
	}],
}]
function handleAreaClick(e, label, option) {
	e.stopPropagation();
	console.log('clicked', label, option);
}

const displayRender = (labels, selectedOptions) => labels.map((label, i) => {
	const option = selectedOptions[i];
	if (i === labels.length - 1) {
		return (
			<span key={option.value}>
        {label} (<a onClick={e => handleAreaClick(e, label, option)}>{option.code}</a>)
      </span>
		);
	}
	return <span key={option.value}>{label} / </span>;
});
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
	handleOk = () =>{

	};
	render() {
		return(
			<Modal
				visible={this.state.record_box_show}
				title="Create a new collection"
				okText="Create"
				onCancel={this.handleCancel}
				onOk={this.handleOk}
			>
					<Form layout="vertical">
						<Form.Item>
							花销类别：
							<InputGroup compact>
								<Select defaultValue="Zhejiang">
									<Option value="Zhejiang">Zhejiang</Option>
									<Option value="Jiangsu">Jiangsu</Option>
								</Select>
								<Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />
							</InputGroup>
						</Form.Item>
					</Form>
				</Modal>
		)
	}
}
export default RecordBox;