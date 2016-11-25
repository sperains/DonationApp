import React, { Component } from 'react' ;
import {message} from 'antd';
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
			me.setState({
				activeList : data
			})
		});
	}

	//切换发布状态 
	onReleaseStateChange(record , index){

		if(record.release){
			return ;
		}

		let activeList = this.state.activeList;

		activeList.map( (active , i) =>{
			if(index === i) {
				active.release = !active.release
			}
			return active;
		})
		DataStore.releaseActive({ id : record.id }).then( (data) => {
			message.success("发布成功");
			this.setState({
				activeList : activeList
			});
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
	onActiveDetailClick(active , index){

		let title = this.state.activeList[index].title;
		hashHistory.push({
			pathname : '/active-detail',
			state : {
				title : title,
				record : active
			}
		});
	}

	//编辑喜悦活动
	onActiveEditClick(active , index){
		// 活动已结束不能进入编辑页面
		if(active.release == 2){
			return ;
		}

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

	onActiveDeleteClick(active , index){
		DataStore.deleteActive({
			id : active.id
		}).then( (data) =>message.success('删除活动成功'))
		.catch( (error) => message.error(error))
	}

	render(){
		return (
			<div className="active-wrap">
				<div className="active-topbar">
					<span>喜悦活动</span>
					<div className="new" onClick={ this.onNewActiveClick}></div>
				</div>
				<div className="active-content">

					{
						this.state.activeList.map( (active , index) => (
							<div key={active.id} className="active-item">
								<div className="desc">
									<span className="create-time">{active.activeTime} 创建</span>
									<div className={active.release == 2 ? 'hidden' : 'release'}>
										<span>发布</span>
										<div className={active.release ? 'release-img release' : 'release-img unrelease'} onClick={()=>this.onReleaseStateChange(active , index)}></div>
									</div>
								</div>
								<div className="content">
									<div className="info">
										<img src={active.logo} className="logo" />
										<div className="detail">
											<span>[ {active.title} ] {active.subTitle}</span>
											<span>活动地点:{active.address}</span>
											<span>活动时间:{active.activeTime}</span>
										</div>
									</div>
									<div className="options">
										<span className={active.isOpenLimit ? 'apply' : 'apply hidden'}>({active.personCount} / {active.activeLimit})</span>
										<div>
											<span onClick={ () => this.onActiveDetailClick(active , index)}>报名详情</span>
											<span className={active.release == 2 ? 'edit over' : 'edit'} onClick={ () => this.onActiveEditClick(active , index)}>{active.release == 2 ? '活动已结束' : '编辑'}</span>
											<span className={active.release == 2 ? 'hidden' : 'del'} onClick={ () => this.onActiveDeleteClick(active , index)}>删除</span>
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