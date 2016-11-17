import React , {Component} from 'react';
import './singleMenu.scss';

export default class SingleMenu extends Component{

	constructor(props) {
		super(props);
		this.state = {
			collapse : false
		}
		this.onMenuCollapse = this.onMenuCollapse.bind(this);
	}

	onMenuCollapse(){
		this.setState({
			collapse : !this.state.collapse
		})

		console.log(this.state.collapse);
	}

	render(){
		return (
				<div className={this.state.collapse ? 'sider-wrap sider-wrap-collapse' : 'sider-wrap'}>
					<div className="collapse-menu-wrap">
						<div onClick={this.onMenuCollapse} className={this.state.collapse ? 'collapse' : ''}></div>
					</div>
					<div className="menu-list">
						<div className='menu-item'>
							<div className={this.state.collapse ? 'img donate collapse' : 'img donate'}></div>
							<span className="text">喜悦捐赠</span>	
						</div>
						<div className='menu-item'>
							<div className={this.state.collapse ? 'img donate collapse' : 'img donate'}></div>
							<span className="text">喜悦积分</span>	
						</div>
						<div className='menu-item'>
							<div className={this.state.collapse ? 'img donate collapse' : 'img donate'}></div>
							<span className="text">会员管理</span>	
						</div>
						<div className='menu-item'>
							<div className={this.state.collapse ? 'img donate collapse' : 'img donate'}></div>
							<span className="text">喜悦活动</span>	
						</div>
						<div className='menu-item'>
							<div className={this.state.collapse ? 'img donate collapse' : 'img donate'}></div>
							<span className="text">生命数字</span>	
						</div>
						<div className='menu-item'>
							<div className={this.state.collapse ? 'img donate collapse' : 'img donate'}></div>
							<span className="text">正念生活</span>	
						</div>
						<div className='menu-item'>
							<div className={this.state.collapse ? 'img donate collapse' : 'img donate'}></div>
							<span className="text">职级管理</span>	
						</div>
					</div>
				</div>
			)
	}
}