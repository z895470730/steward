import React from 'react';
import {Tabs} from "antd";
import GraphPane from './GraphPane';
import store from '../store';
import {transformMonth,transformYear} from '../services/LeanCloud/getColumnIndex';
require('./style/Graph.css');
class Graph extends React.Component{
	state = {graph_data:{}};

	componentWillReceiveProps(nextProps, nextContext) {
		let data = {
			clothes: 0,
			food: 0,
			trip: 0,
			other: 0,
			livingPayment: 0,
			stationeryAndSporting: 0,
			sum: 0
		};
		nextProps.data.map(function(index){
			switch (index.category) {
				case 'clothes':
					data.clothes = data.clothes + parseInt(index.money);
					break;
				case 'food':
					data.food = data.food + parseInt(index.money);
					break;
				case 'trip':
					data.trip = data.trip + parseInt(index.money);
					break;
				case 'other':
					data.other = data.other + parseInt(index.money);
					break;
				case 'livingPayment':
					data.livingPayment = data.livingPayment + parseInt(index.money);
					break;
				case 'stationeryAndSporting':
					data.stationeryAndSporting = data.stationeryAndSporting + parseInt(index.money);
					break;
				default:
					return [];
			}
			return data;
		});
		data.sum = data.clothes + data.food + data.trip + data.other + data.livingPayment + data.stationeryAndSporting;
		this.setState({graph_data:data});
	};

	render() {
		const TabPane = Tabs.TabPane;
		return(
			<div className='graph'>
					<Tabs tabPosition={'top'} className='graphList'>
						<TabPane tab="本周统计" key="1" className='graphWeek'>
							<GraphPane
								content = {this.state.graph_data}
								gross = {this.state.gross}
							/>
						</TabPane>
						<TabPane tab="本月统计" key="2">
							<GraphPane
								content = {transformMonth(store.getState().column_index_table_data)}
							/>
						</TabPane>
						<TabPane tab="年度统计" key="3">
							<GraphPane
								content = {transformYear(store.getState().column_index_table_data)}
							/>
						</TabPane>
					</Tabs>
			</div>)
	}
}
export default Graph;