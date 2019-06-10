import {Query} from "leancloud-storage";
import {changeColumnIdexTableData} from "../../store/actionCreator";
import store from "../../store";

export const getTableData = () =>{
	let query = new Query('UserBills');
	query.equalTo('activeUser','895470730@qq.com');
	query.find().then(function (result) {
		transformWeek(result)
	}, function (error) {
		console.log('请求首页表格数据时出错了',error)
	});

	//转化周数据
	const transformWeek = (result) =>{
		let n = 0;
		let newData = [];
		for(let i = result.length - 1; i > 0; i --){
			newData[n] = {};
			newData[n] = result[i]._serverData;
			newData[n].id = result[i].id;
			newData[n].key = 'weekKey' + n;
			n++;
		}
		const action = changeColumnIdexTableData(newData);
		store.dispatch(action);
	};
};

//转化月数据
export const transformMonth = (result) =>{
	let n = 0;
	let newData = [];
	let currentMonth = new Date().getMonth() + 1;
	for(let i = result.length - 1; i > 0; i --){
		if(Number(result[i].date.slice(5,7)) === currentMonth){
			newData[n] = {};
			newData[n] = result[i];
			newData[n].key ='monthKey' + n;
			n++;
		}
	}
	return transformLeanCloud(newData);
};

//转化年数据
export const transformYear = (result) =>{
	let n = 0;
	let newData = [];
	let currentYear = new Date().getFullYear();
	for(let i = result.length - 1; i > 0; i --){
		if(Number(result[i].date.slice(0,4)) === currentYear){
			newData[n] = {};
			newData[n] = result[i];
			newData[n].key ='yearKey' + n;
			n++;
		}
	}
	return transformLeanCloud(newData);
};

//转化为leancloud需要的接口
const transformLeanCloud = (result) =>{
	let data = {
		clothes: 0,
		food: 0,
		trip: 0,
		other: 0,
		livingPayment: 0,
		stationeryAndSporting: 0,
		sum:0
	};
	result.forEach((index) =>{
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
	});
	data.sum = data.clothes + data.food + data.trip + data.other + data.livingPayment + data.stationeryAndSporting
	return data;
};