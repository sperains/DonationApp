
import React , {Component} from 'react';
import { Table  , Dropdown , Menu , Icon , message } from 'antd';
import DataStore from '../../utils/DataStore.js' ;
import { hashHistory } from 'react-router';
import './member.scss';


export default class Member extends Component{

	constructor(props) {
		super(props);
		this.state = {
			memberList : []
		}
		this.getWidth = this.getWidth.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onDetailClick = this.onDetailClick.bind(this);
	}

	componentDidMount() {

		let me = this ;
		DataStore.getMemberList().then( (data) => me.setState({
			memberList : data
		}))
	}

	getWidth(arr){
		let sum = 0 ;
		arr.forEach( a => sum+= a.width );
		console.log(sum)
		return sum;
	}

	onClick(item) {
		// 获取设置的身份
		let identity = item.key;
		//获取当前行的数据
		let record = item.item.props.item.record;
		//获取当前行数据的下标
		let index = item.item.props.item.index;
		let memberList = this.state.memberList;
		memberList[index].identity = identity;
		this.setState({
			memberList : memberList
		})
	};

	onDetailClick(value , record , index){
		console.log(value);
		console.log(record);

		hashHistory.push({
			pathname : '/member-detail',
			state : {
				record : record
			}
		})
	}

	render() {
		

		const columns = [
			{
				title: '姓名',
				dataIndex: 'name',
				// render: text => <a href="#">{text}</a>,
				// fixed: 'left',
				width : 120,
				render : value => <a title={value}>{value}</a>
			}, 
			{ title: '电话', dataIndex: 'phone' ,width : 100 ,render : value => <a title={value}>{value}</a>}, 
			{ title: '出生日期', dataIndex: 'birthday' , width : 120},
			{ title: '微信昵称', dataIndex:'wechatNickname' , width : 100 ,render : value => <a title={value}>{value}</a> },
			{ title : '积分总额(分)', dataIndex:'totalScore' ,width : 120  },
			{ title : '捐款总额', dataIndex : 'donatedMoney' , width : 120},
			{ title : '邀请人', 	dataIndex : 'inviter' ,width : 100 },
			{ title : '身份', dataIndex : 'identity' , width : 100 , render : (value , record , index) => 
				{	
					const menu = (
						<Menu onClick={this.onClick}>
							<Menu.Item key="0" item={{ record : record , index : index}}>堂主</Menu.Item>
							<Menu.Item key="1" item={{ record : record , index : index}}>高级会员</Menu.Item>
							<Menu.Item key="3" item={{ record : record , index : index}}>普通会员</Menu.Item>
						</Menu>
					);
					return (
						<Dropdown overlay={menu} trigger={['click']}>
						    <div className="ant-dropdown-link" >
						      <span>{value == 0 ? '堂主' : value==1 ? '高级会员' :'普通会员'} </span><div className="dropdown-icon"></div>
						    </div>
						</Dropdown>
					)
				}
				// value == 0 ? '堂主' : value==1 ? '高级会员' :'普通会员' 
			},
			{ title : '详情' , dataIndex : 'detail' ,width : 80 , render : (value , record , index) => (<a className="row-detail" onClick={ () =>this.onDetailClick(value , record , index)}>详情</a>) }
		];

		const pagination = {
			total: this.state.memberList.length,
			showSizeChanger: false,
			defaultPageSize : 15,
			onShowSizeChange: (current, pageSize) => {
				console.log('Current: ', current, '; PageSize: ', pageSize);
			},
			onChange: (current) => {
				console.log('Current: ', current);
			}
		};


		return (
			<div className="member-wrap">
				<div className="member-top">
					<span>会员管理</span>
					<div className="export"></div>
				</div>


				<div className="member-content">
					<Table columns={columns} dataSource={this.state.memberList} pagination={pagination} scroll={{ x: 1080 }} />
				</div>

			</div>
		)
	}
}