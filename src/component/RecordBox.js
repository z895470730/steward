import React from 'react';
import {Modal} from "antd";
import store from '../store/index';
import {getChangeRecordBoxShow} from '../store/actionCreator';
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
	render() {
		return(
			<Modal
				visible={this.state.record_box_show}
				onCancel={this.handleCancel}
			>

			</Modal>
		)
	}
}
export default RecordBox;