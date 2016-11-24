import React, { Component } from 'react' ;
import './active.scss';
import DataStore from '../../utils/DataStore.js' ;
import { hashHistory } from 'react-router';

export default class Active extends Component{

	constructor(props) {
		super(props);
		this.state = {
			activeList : []
		}
		this.onReleaseStateChange = this.onReleaseStateChange.bind(this);
		this.onNewActiveClick = this.onNewActiveClick.bind(this);
		this.onActiveDetailClick = this.onActiveDetailClick.bind(this);
		this.onActiveEditClick = this.onActiveEditClick.bind(this);
	}

	componentDidMount() {
		
		var me = this ;
		DataStore.getActiveList().then( (data) => {
			console.log(data)
			me.setState({
				activeList : data
			})
		});
	}

	//切换发布状态 
	onReleaseStateChange(index){
		let activeList = this.state.activeList;

		activeList.map( (active , i) =>{
			if(index === i) {
				active.release = !active.release
			}
			return active;
		})
		this.setState({
			activeList : activeList
		});
	}

	//新建喜悦活动
	onNewActiveClick(){
		hashHistory.push({
			pathname  : '/active-new',
			state : {
				operating : 0
			}
		});
	}

	//查看活动报名详情
	onActiveDetailClick(index){
		let title = this.state.activeList[index].title;
		hashHistory.push({
			pathname : '/active-detail',
			state : {
				title : title
			}
		});
	}

	//编辑喜悦活动
	onActiveEditClick(active , index){
		let title = this.state.activeList[index].mainTitle;
		hashHistory.push({
			pathname : '/active-new',
			state : {
				title : title,
				operating : 1,
				record : active
			}
		});
	}

	render(){
		return (
			<div className="active-wrap">
				<div className="active-topbar">
					<span>喜悦活动</span>
					<div className="new" onClick={this.onNewActiveClick}></div>
				</div>
				<div className="active-content">

					{
						this.state.activeList.map( (active , index) => (
							<div key={active.id} className="active-item">
								<div className="desc">
									<span className="create-time">{active.date} 创建</span>
									<div className="release">
										<span>发布</span>
										<div className={active.release ? 'release-img release' : 'release-img unrelease'} onClick={()=>this.onReleaseStateChange(index)}></div>
									</div>
								</div>
								<div className="content">
									<div className="info">
										<img src={active.logo} className="logo" />
										<div className="detail">
											<span>[ {active.title} ] {active.subTitle}</span>
											<span>活动地点:{active.address}</span>
											<span>活动时间:{active.date}</span>
										</div>
									</div>
									<div className="options">
										<span className={active.isOpenLimit ? 'apply' : 'apply hidden'}>({active.applyPersonCount} / 1000)</span>
										<div>
											<span onClick={ () => this.onActiveDetailClick(index)}>报名详情</span>
											<span className="edit" onClick={ () => this.onActiveEditClick(active , index)}>编辑</span>
											<span className="del">删除</span>
										</div>
										
									</div>
								</div>
							</div>
						) )
					}
				</div>
			</div>
		)
	}
}