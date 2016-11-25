
import React , {Component} from 'react';
import { Table } from 'antd';
import DataStore from '../../../utils/DataStore.js' ;
import { hashHistory } from 'react-router';
import './detail.scss';

const columns = [
	{ title: '姓名',dataIndex: 'name',fixed: 'left',width : 120}, 
	{ title: '电话', dataIndex: 'phone' ,width : 120 }, 
	{ title: '年龄', dataIndex: 'ageGroup' , width : 120 , render : value => {
		let str = '';
		switch(value){
			case 1 : str = '20岁及以下'; break;
			case 2 : str = '21~30岁'; break;
			case 3 : str = '31~40岁'; break;
			case 4 : str = '41~50岁'; break;
			case 5 : str = '51~60岁'; break;
		}
		return str;
	}},
	{ title :'微信昵称', dataIndex:'wechatNickname' , width : 120 , render : value => <a title={value}>{value}</a> },
	{ title : '签到状态', dataIndex:'checkInStatus' ,width : 120 , render : value => <div className={value == 1 ? 'check' : value== 0 ? 'uncheck' : ''}></div> },
	{ title : '性别', dataIndex : 'sex' , width : 120 , render : value =>  value== 0 ? '男' : value==1 ? '女' : ''},
	{ title : '微信号', 	dataIndex : 'wechatId' ,width : 120 , render : value => <a title={value}>{value}</a>},
	{ title : '所在省市', dataIndex : 'province' , width : 120},
	{ title : '所在区县' , dataIndex : 'distict' ,width : 120},
	{ title : '工作单位' , dataIndex : 'company' ,width : 120 ,render : value => <a title={value}>{value}</a>},
	{ title : '职位' , dataIndex : 'job' ,width:120 ,render : value => <a title={value}>{value}</a>},
	{ title : '学历' , dataIndex : 'educational' ,width : 120},
	{ title : '疾病记录' , dataIndex : 'diseaseRecord' ,width : 120 , render : value => <a title={value}>{value}</a>},
	{ title : '茶道课程' , dataIndex : 'teaCeremony' ,width : 120 , render : value => <a title={value}>{value}</a>},
	{ title : '喜悦活动' , dataIndex : 'xiyueActive' ,width : 120 ,render : value => <a title={value}>{value}</a> }
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






export default class Detail extends Component{

	constructor(props) {
		super(props);
		this.state = {
			title : '',
			enrollList : []
		}
		this.onBackClick  = this.onBackClick.bind(this);
		this.onExportToExcel = this.onExportToExcel.bind(this);
	}


	onBackClick(){
		hashHistory.push('/active');
	}

	onExportToExcel(){

	}
	componentDidMount() {
		const location = hashHistory.getCurrentLocation()

		this.setState({
			title : location.state.title
		})
		DataStore.getEnrollList({
			id : location.state.record.id
		}).then(  data => {

			this.setState({
				enrollList : data
			})
		})
	}

	render() {
		const pagination = {
			total: this.state.enrollList.length,
			showSizeChanger: false,
			defaultPageSize : 15,
			onShowSizeChange: (current, pageSize) => {
				console.log('Current: ', current, '; PageSize: ', pageSize);
			},
			onChange: (current) => {
				console.log('Current: ', current);
			},
		};

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
					 <Table columns={columns} dataSource={this.state.enrollList} pagination={pagination} scroll={{ x:columns.length * columns[0].width  }} />
				</div>
			</div>
		)
	}	
}