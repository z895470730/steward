import React from 'react';
import { Row, Upload, Icon, message } from 'antd';
require('./style/ColumnCardBag.css');
const Dragger = Upload.Dragger;
const props = {
	name: 'file',
	multiple: true,
	action: '//jsonplaceholder.typicode.com/posts/',
	onChange(info) {
		const status = info.file.status;
		if (status !== 'uploading') {
			console.log(info.file, info.fileList);
		}
		if (status === 'done') {
			message.success(`${info.file.name} file uploaded successfully.`);
		} else if (status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
};
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
			</div>
		);
	}
}
export default ColumnCardBag;