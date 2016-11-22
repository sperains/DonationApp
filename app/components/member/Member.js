
import React , {Component} from 'react';
import { Table  , Dropdown , Menu , Icon , message } from 'antd';
import './member.scss';

const onClick = function ({ key  , item }  ) {
	console.log(item)
  message.info(`${item}`);
};



const columns = [
	{
		title: '姓名',
		dataIndex: 'name',
		// render: text => <a href="#">{text}</a>,
		// fixed: 'left',
		width : 120
	}, 
	{ title: '电话', dataIndex: 'phone' ,width : 100 }, 
	{ title: '出生日期', dataIndex: 'birthday' , width : 120},
	{ title: '微信昵称', dataIndex:'wechatNickname' , width : 100 },
	{ title : '积分总额(分)', dataIndex:'totalScore' ,width : 120  },
	{ title : '捐款总额', dataIndex : 'donatedMoney' , width : 120 , render : value => value==0 ? '男' : '女' },
	{ title : '邀请人', 	dataIndex : 'inviter' ,width : 100 },
	{ title : '身份', dataIndex : 'identity' , width : 100 , render : (value , record , index) => 
		{	
			const menu = (
				<Menu onClick={onClick}>
					<Menu.Item key="0" item={record}>堂主</Menu.Item>
					<Menu.Item key="1" item={record}>高级会员</Menu.Item>
					<Menu.Item key="3" item={record}>普通会员</Menu.Item>
				</Menu>
			);
			return (
				<Dropdown overlay={menu} trigger={['click']}>
				    <div className="ant-dropdown-link" >
				      <span>{value == 0 ? '堂主' : value==1 ? '高级会员' :'普通会员'} </span><Icon type="down" />
				    </div>
				</Dropdown>
			)
		}
		// value == 0 ? '堂主' : value==1 ? '高级会员' :'普通会员' 
	},
	{ title : '详情' , dataIndex : 'detail' ,width : 80 }
];

const data = [];
for (let i = 0; i < 460; i++) {
	data.push({
		key: i,
		name: `Edward King ${i}`,
		phone : '15623551300',
		birthday : '1991-01-22',
		wechatNickname: `Sperains ${i}`,
		totalScore: Math.round(Math.random()*1000),
		donatedMoney : 'wechat' + i ,
		inviter : '万德武',
		identity : Math.round(Math.random()*2),
		detail : '详情',
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

export default class Member extends Component{

	constructor(props) {
		super(props);
		this.getWidth = this.getWidth.bind(this);
	}

	componentDidMount() {
		let sum = this.getWidth(columns)
		console.log(sum);
	}

	getWidth(arr){
		let sum = 0 ;
		arr.forEach( a => sum+= a.width );
		return sum;
	}

	render() {
		return (
			<div className="member-wrap">
				<div className="member-top">
					<span>会员管理</span>
					<div className="export"></div>
				</div>


				<div className="member-content">
					<Table columns={columns} dataSource={data} pagination={pagination} scroll={{ x:this.getWidth(columns)  }} />
				</div>

			</div>
		)
	}
}