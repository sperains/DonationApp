
import React , {Component} from 'react';
import { Table } from 'antd';
import { browserHistory } from 'react-router';
import './detail.scss';

const columns = [
	{
		title: '姓名',
		dataIndex: 'name',
		// render: text => <a href="#">{text}</a>,
		fixed: 'left',
		width : 120
	}, 
	{ title: '电话', dataIndex: 'phone' ,width : 120 , className : 'detail-column'}, 
	{ title: '年龄', dataIndex: 'age' , width : 120},
	{ title:'微信昵称', dataIndex:'wechatNickname' , width : 120 },
	{ title : '签到状态', dataIndex:'checkInStatus' ,width : 120 , render : value => <div className={value == 1 ? 'check' : 'uncheck'}></div> },
	{ title : '性别', dataIndex : 'sex' , width : 120 , render : value => value==0 ? '男' : '女' },
	{ title : '微信号', 	dataIndex : 'wechatId' ,width : 120 , render : value => <a title={value}>{value}</a>},
	{ title : '所在省市', dataIndex : 'province' , width : 120},
	{ title : '所在区县' , dataIndex : 'distict' ,width : 120},
	{ title : '工作单位' , dataIndex : 'company' ,width : 120},
	{ title : '职位' , dataIndex : 'job' ,width:120},
	{ title : '学历' , dataIndex : 'educational' ,width : 120},
	{ title : '疾病记录' , dataIndex : 'diseaseRecord' ,width : 120},
	{ title : '茶道课程' , dataIndex : 'teaCeremony' ,width : 120},
	{ title : '喜悦活动' , dataIndex : 'xiyueActive' ,width : 120 }
];

const data = [];
for (let i = 0; i < 460; i++) {
	data.push({
		key: i,
		name: `Edward King ${i}`,
		phone : 15623551300,
		age: Math.ceil(Math.random()*50),
		address: `London. ndon.ndon.${i}`,
		wechatNickname : 'wechat' + i ,
		checkInStatus : Math.round(Math.random()),
		sex : Math.round(Math.random()),
		wechatId : 'fjfkasjdlfjlksdasdadsdasdasdasdasd' + i,
		province : '',


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
		this.onExportToExcel = this.onExportToExcel.bind(this);
	}


	onBackClick(){
		browserHistory.push('/active');
	}

	onExportToExcel(){

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
					<div className="export" onClick={this.onExportToExcel}></div>
				</div>

				<div className="detail-content">
					 <Table columns={columns} dataSource={data} pagination={pagination} scroll={{ x:columns.length * columns[0].width  }} />
				</div>
			</div>
		)
	}	
}