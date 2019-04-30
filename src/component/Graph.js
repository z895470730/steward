import React from 'react';
import {Tabs} from "antd";

class Graph extends React.Component{
	constructor(props){
		super(props);
	}

	render() {
		const TabPane = Tabs.TabPane;
		return(
			<div>
					<Tabs tabPosition={'top'}>
						<TabPane tab="本周统计" key="1">本周统计</TabPane>
						<TabPane tab="本月统计" key="2">本月统计</TabPane>
						<TabPane tab="年度统计" key="3">Content of Tab 3</TabPane>
					</Tabs>
			</div>)
	}
}
export default Graph;