
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
					<span >个人中心</span>
				</Menu.Item>
				<Menu.Item key="logout">
					<span >注销</span>
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
							<span>消息</span>
							<a href="#">
								<Badge count={this.state.messageCount} overflowCount={9} dot={true}>
									<span className="badge-icon" />
								</Badge>
							</a>
						</div>
						<div className="info">
							<span className="user">Rains</span>
							<div className="logout">
								<span>注销</span>
								<div className="logout-img"></div>
							</div>
							
						</div>
					</div>
				</div>
			)
	}
}