// 存储服务
const AV = require('leancloud-storage');
export const { User,Query } = AV;
// 初始化
const APP_ID = 'aU6gYshR8fbTby3UzW2wRTdH-gzGzoHsz';
const APP_KEY = 'NnRnAxoPhK21p8bfyWJMGgEp';
AV.init({
	appId: APP_ID,
	appKey: APP_KEY
});

// import Promise
export const Promise = require('bluebird');
export const UserBills = AV.Object.extend('UserBills');


