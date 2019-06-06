import React from 'react';
import {
	Axis, Chart, Coord, Geom, Guide, Label, Legend, Tooltip
} from "bizcharts";
import DataSet from "@antv/data-set";
require('./style/Graph.css');
class GraphPane extends React.Component{
	state ={};

	render(){
		const { DataView } = DataSet;
		const { Html } = Guide;
		const data = [
			{
				item: "服饰",
				count: this.props.content.clothes
			},
			{
				item: "饮食",
				count: this.props.content.food
			},
			{
				item: "交通出行",
				count: this.props.content.trip
			},
			{
				item: "生活缴费",
				count: this.props.content.livingPayment
			},
			{
				item: "文教体育",
				count: this.props.content.stationeryAndSporting
			},
			{
				item: "其他",
				count: this.props.content.other
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
		return (
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
														${this.props.content.sum}
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
		)}
}
export default GraphPane;