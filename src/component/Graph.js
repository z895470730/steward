import React from 'react';
import {Tabs} from "antd";
import {
	Chart, Geom, Axis, Tooltip, Coord, Label, Legend, Guide,
} from "bizcharts";
import DataSet from "@antv/data-set";
require('./style/Graph.css');
class Graph extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			graph_data:{},
			gross:0
		}
	}

	componentWillReceiveProps(nextProps, nextContext) {
		let data = {
			clothes: 0,
			food: 0,
			trip: 0,
			other: 0,
			livingPayment: 0,
			stationeryAndSporting: 0
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
		this.setState({graph_data:data,gross:data.clothes + data.food + data.trip + data.other + data.livingPayment + data.stationeryAndSporting});
	}

	render() {
		const TabPane = Tabs.TabPane;
		const { DataView } = DataSet;
		const { Html } = Guide;
		const data = [
			{
				item: "服饰",
				count: this.state.graph_data.clothes
			},
			{
				item: "饮食",
				count: this.state.graph_data.food
			},
			{
				item: "交通出行",
				count: this.state.graph_data.trip
			},
			{
				item: "生活缴费",
				count: this.state.graph_data.livingPayment
			},
			{
				item: "文教体育",
				count: this.state.graph_data.stationeryAndSporting
			},
			{
				item: "其他",
				count: this.state.graph_data.other
			}
		];
		const dv = new DataView();
		dv.source(data).transform({
			type: "percent",
			field: "count",
			dimension: "item",
			as: "percent"
		});
		const cols = {
			percent: {
				formatter: val => {
					val = (val * 100).toFixed(2) + "%";
					return val;
				}
			}
		};
		return(
			<div className='graph'>
					<Tabs tabPosition={'top'} className='graphList'>
						<TabPane tab="本周统计" key="1" className='graphWeek'>
							<Chart
								height={window.innerHeight*0.6}
								data={dv}
								scale={cols}
								padding={[80, 100, 80, 80]}
								forceFit
							>
								<Coord type={"theta"} radius={0.75} innerRadius={0.6} />
								<Axis name="percent" />
								<Legend
									position="right"
									offsetY={-window.innerHeight / 2 + 120}
									offsetX={-100}
								/>
								<Tooltip
									showTitle={false}
									itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
								/>
								<Guide>
									<Html
										position={["50%", "50%"]}
										html={`<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">
														花销
														<br>
														<span style="color:#262626;font-size:1.0em">
															${this.state.gross}
														</span>
														元
													</div>`}
										alignX="middle"
										alignY="middle"
									/>
								</Guide>
								<Geom
									type="intervalStack"
									position="percent"
									color="item"
									tooltip={[
										"item*percent",
										(item, percent) => {
											percent = (percent * 100).toFixed(2) + "%";
											return {
												name: item,
												value: percent
											};
										}
									]}
									style={{
										lineWidth: 1,
										stroke: "#fff"
									}}
								>
									<Label
										content="percent"
										formatter={(val, item) => {
											return item.point.item + ": " + val;
										}}
									/>
								</Geom>
							</Chart>
						</TabPane>
						<TabPane tab="本月统计" key="2">本月统计</TabPane>
						<TabPane tab="年度统计" key="3">Content of Tab 3</TabPane>
					</Tabs>
			</div>)
	}
}
export default Graph;