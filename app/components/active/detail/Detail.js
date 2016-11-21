
import React , {Component} from 'react';
import { Table } from 'antd';
import { browserHistory } from 'react-router';
import './detail.scss';

const columns = [
	{
		title: '姓名',
		dataIndex: 'name',
		// render: text => <a href="#">{text}</a>,
		fixed: 'left'
	}, 
	{ title: '电话', dataIndex: 'age', }, 
	{ title: '年龄', dataIndex: 'address', },
	{ title:'微信昵称', dataIndex:'wechatNickname' },
	{ title : '签到状态', dataIndex:'checkInStatus' },
	{ title : '性别', dataIndex : 'sex'},
	{ title : '微信号', 	dataIndex : 'wechatId' },
	{ title : '所在省市', dataIndex : 'province'},
	{ title : '所在区县' , dataIndex : 'distict' },
	{ title : '工作单位' , dataIndex : 'company' },
	{ title : '职位' , dataIndex : 'job' },
	{ title : '学历' , dataIndex : 'educational' },
	{ title : '疾病记录' , dataIndex : 'diseaseRecord' },
	{ title : '茶道课程' , dataIndex : 'teaCeremony' },
	{ title : '喜悦活动' , dataIndex : 'xiyueActive' }
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const pagination = {
  total: data.length,
  showSizeChanger: true,
  onShowSizeChange: (current, pageSize) => {
    console.log('Current: ', current, '; PageSize: ', pageSize);
  },
  onChange: (current) => {
    console.log('Current: ', current);
  },
};




export default class Detail extends Component{

	constructor(props) {
		super(props);
		this.state = {
			title : ''
		}
		this.onBackClick  = this.onBackClick.bind(this);
	}


	onBackClick(){
		browserHistory.push('/active');
	}


	componentDidMount() {
		const location = browserHistory.getCurrentLocation()
		console.log(location);
		this.setState({
			title : location.state.title
		})
	}

	render() {
		return (
			<div className="detail-wrap">
				<div className="detail-top">
					<div className="nav">
						<div className="back" onClick={this.onBackClick}></div>
						<span className="parent" onClick={this.onBackClick}>喜悦活动</span>
						<span> / </span>
						<span className="title">{this.state.title}</span>
						<span> / </span>
						<span className="current">报名详情</span>
					</div>
					<div className="export"></div>
				</div>

				<div className="detail-content">
					 <Table columns={columns} dataSource={data} pagination={pagination} scroll={{ x: 1300 }} />
				</div>
			</div>
		)
	}	
}