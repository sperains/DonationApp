import React , {Component} from 'react';
import './singleMenu.scss';
import { browserHistory } from 'react-router';

export default class SingleMenu extends Component{

	constructor(props) {
		super(props);
		this.state = {
			collapse : false,
			menuList : [
				{ key : '1' , text : '喜悦捐赠', active : false , imgCls : 'donate'},
				{ key : '2' , text : '喜悦积分', active : false , imgCls : 'score'},
				{ key : '3' , text : '会员管理', active : false , imgCls : 'member' , router : 'member'},
				{ key : '4' , text : '喜悦活动', active : true , imgCls : 'activity' , router:'active'},
				{ key : '5' , text : '生命数字', active : false , imgCls : 'number'},
				{ key : '6' , text : '正念生活', active : false , imgCls : 'life'},
				{ key : '7' , text : '职级管理', active : false , imgCls : 'account'}
			]
		}
		this.onMenuCollapse = this.onMenuCollapse.bind(this);
		this.onMenuClick = this.onMenuClick.bind(this);
	}

	onMenuCollapse(){
		this.setState({
			collapse : !this.state.collapse
		})
	}

	onMenuClick(index){
		let menuList = this.state.menuList;
		menuList.map( (menu , i) => {
			if( index === i ){
				menu.active = true
				browserHistory.push('/' + menu.router)
			}else{
				menu.active = false
			}
			return menu;
		})

		this.setState({
			menuList : menuList
		})


	}

	render(){
		return (
				<div className={this.state.collapse ? 'sider-wrap sider-wrap-collapse' : 'sider-wrap'}>
					<div className="collapse-menu-wrap">
						<div onClick={this.onMenuCollapse} className={this.state.collapse ? 'collapse' : ''}></div>
					</div>
					<div className="menu-list">
						{
							this.state.menuList.map( (menu , index) => (
								<div key={index} className={menu.active ? 'menu-item active' :'menu-item'} onClick={ ()=>this.onMenuClick(index)}>
									<div className={this.state.collapse ? 'img collapse ' + menu.imgCls : 'img ' + menu.imgCls}></div>
									<span className="text">{menu.text}</span>	
								</div>
								)
							)
						}
					</div>
				</div>
			)
	}
}