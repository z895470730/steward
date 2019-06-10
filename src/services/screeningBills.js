//账单页面

//按类别筛选数据
export const categorySelection = (chooseValue,billData) =>{
	if(chooseValue !== '') {
		return billData.filter((index) => {
			return index.category === chooseValue;
		})
	}
	return billData;
};

//按支付方式筛选数据
export const payWaySelection = (chooseValue,billData) =>{
	if(chooseValue !== ''){
		return billData.filter((index) => {
			return index.payWay === chooseValue;
		})
	}
	return billData;
};

//按单笔花销金额筛选数据
export const costSelection = (min,max,billData) =>{
	if(min !== null && max !== null){
		return billData.filter((index) => {
			return index.money <= max && index.money >= min
		})
	}
	return billData
};

//按日期区间筛选数据
export const dateSelection = (chooseValue,billData)=>{
	if(chooseValue !== null){
		return billData.filter((index) => {
			let indexDate = index.date.replace(/-/g,'');
			return indexDate >= chooseValue[0].replace(/-/g,'') && indexDate <= chooseValue[1].replace(/-/g,'')
		})
	}
	return billData
};