import React from 'react';
import {Row, Upload, Icon, message, Input, Col} from 'antd';
import {AVC} from "../connection";

require('./style/ColumnCardBag.css');
const Dragger = Upload.Dragger;
const props = {
	name: 'file',
	beforeUpload: () => {
		return false
	},
	onChange(info) {
		var file = new AVC.File(info.file.name, info.file);
		file.save().then(function (file) {
			// 文件保存成功
			console.log(file.url());
			message.success(file.name() + '上传成功')
		}, function (error) {
			// 异常处理
			console.error(error);
		});
	}
}
class ColumnCardBag extends React.Component{
	render() {
		return (
			<div className='cardBag'>
				<Row>
					<Dragger {...props}>
						<p className="ant-upload-drag-icon">
							<Icon type="inbox" />
						</p>
						<p className="ant-upload-text">点击或拖动文件到此处上传证件</p>
						<p className="ant-upload-hint">只接受.jpg,.png格式的图片</p>
					</Dragger>
				</Row>
				<Row>
					<Col xs={4} sm={4} md={4} lg={4} xl={4}>
						<img
							alt="example"
							src="http://lc-au6gyshr.cn-n1.lcfile.com/93f3283f5d9f388a0a2e.jpg"
							width={150}
							style={{margin:10}}
						/>
					</Col>
				</Row>
			</div>
		);
	}
}
export default ColumnCardBag;