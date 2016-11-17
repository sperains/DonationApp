
import React , {Component} from 'react';
import { Badge ,Icon ,Menu, Dropdown ,message } from 'antd';
import './topbar.scss';
import userImg from  '../resources/images/user.png';

const MenuItem = Menu.Item

const onMenuItemClick = function ({ key }) {
  message.info(`Click on item ${key}`);
};

const menu = (
			<Menu onClick={onMenuItemClick}>
				<Menu.Item key="setting" >
					<span >设置</span>
				</Menu.Item>
				<Menu.Item key="usercenter">
				个人中心
				</Menu.Item>
				<Menu.Item key="logout">
				注销
				</Menu.Item>
			</Menu>
		);




export default class TopBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			messageCount : 5 
		}
		this.onMessageClick = this.onMessageClick.bind(this);
		// this.onMenuItemClick = this.onMenuItemClick.bind(this);
	}

	onMessageClick(){
		this.setState({
			messageCount : ++this.state.messageCount
		});
	}

	

	render(){

		return (
				<div className="topbar"> 
					<div className="logo"></div>
					<div className="nav">
						<div className="message" onClick={this.onMessageClick}>
							<a href="#">
								<Badge count={this.state.messageCount} overflowCount={9} dot={false}>
									<span className="badge-icon" />
								</Badge>
							</a>
						</div>
						<div className="info">
							<Dropdown overlay={menu} trigger={['click']}>
								<div className="ant-dropdown-link" href="#">
							      		<Icon type="down" />
								</div>
							</Dropdown>
						</div>
					</div>
				</div>
			)
	}
}