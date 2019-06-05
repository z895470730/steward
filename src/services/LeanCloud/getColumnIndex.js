import {Query} from "leancloud-storage";
import {changeColumnIdexTableData} from "../../store/actionCreator";
import store from "../../store";

export const getTableData = (chooseDate) =>{
	console.log('222')
	let query = new Query('UserBills');
	query.equalTo('activeUser','895470730@qq.com');
	query.find().then(function (result) {
		switch (chooseDate) {
			case 'week':
				transformWeek(result);
				break;
			case 'month':
				transformMonth(result);
				break;
			case 'year':
				transformYear(result);
				break;
			default:
				transformWeek(result);
		}
	}, function (error) {
		console.log('请求首页表格数据时出错了',error)
	});

	//转化周数据
	const transformWeek = (result) =>{
		let n = 0;
		let newData = [];
		for(let i = result.length - 1; i > 0; i --){
			console.log(result[i]._serverData.date);
			newData[n] = {};
			newData[n] = result[i]._serverData;
			newData[n].key = n;
			n++;
		}
		const action = changeColumnIdexTableData(newData);
		store.dispatch(action);	
	};

	//转化月数据
	const transformMonth = (result) =>{
		let n = 0;
		let newData = [];
		let currentMonth = new Date().getMonth();
		for(let i = result.length - 1; i > 0; i --){
			if(Number(result[i]._serverData.date.slice(5,7)) === currentMonth){
				newData[n] = {};
				newData[n] = result[i]._serverData;
				newData[n].key = n;
				n++;
			}
		}
		const action = changeColumnIdexTableData(newData);
		store.dispatch(action);
	};
	//转化年数据
	const transformYear = (result) =>{
		let n = 0;
		let newData = [];
		let currentYear = new Date().getFullYear();
		for(let i = result.length - 1; i > 0; i --){
			if(Number(result[i]._serverData.date.slice(0,4)) === currentYear){
				newData[n] = {};
				newData[n] = result[i]._serverData;
				newData[n].key = n;
				n++;
			}
		}
		const action = changeColumnIdexTableData(newData);
		store.dispatch(action);
	}
};

