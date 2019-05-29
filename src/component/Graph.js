import React from 'react';
import {Tabs} from "antd";
import {
	Chart,
	Geom,
	Axis,
	Tooltip,
	Coord,
	Label,
	Legend,
	Guide,
} from "bizcharts";
import DataSet from "@antv/data-set";
require('./style/Graph.css');
class Graph extends React.Component{

	render() {
		const TabPane = Tabs.TabPane;
		const { DataView } = DataSet;
		const { Html } = Guide;
		const data = [
			{
				item: "事例一",
				count: 40
			},
			{
				item: "事例二",
				count: 21
			},
			{
				item: "事例三",
				count: 17
			},
			{
				item: "事例四",
				count: 13
			},
			{
				item: "事例五",
				count: 9
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
					val = val * 100 + "%";
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
										html="<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>
														花销
														<br>
														<span style=&quot;color:#262626;font-size:1.0em&quot;>
															200
														</span>
														元
													</div>"
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
											percent = percent * 100 + "%";
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