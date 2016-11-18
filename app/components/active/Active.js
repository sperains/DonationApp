import React, { Component } from 'react' ;
import './active.scss';
import DataStore from '../../utils/DataStore.js' ;
export default class Active extends Component{

	constructor(props) {
		super(props);
		this.state = {
			activeList : []
		}
		this.onReleaseStateChange = this.onReleaseStateChange.bind(this);
	}

	componentDidMount() {
		
		var me = this ;
		DataStore.getActiveList().then( (response) => {
			console.log(response)
			me.setState({
				activeList : response
			})
		});
	}

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

	render(){
		return (
			<div className="active-wrap">
				<div className="active-topbar">
					<span>喜悦活动</span>
					<div className="new"></div>
				</div>
				<div className="active-content">

					{
						this.state.activeList.map( (active , index) => (
							<div key={active.key} className="active-item">
								<div className="desc">
									<span className="create-time">{active.createTime} 创建</span>
									<div className="release">
										<span>发布</span>
										<div className={active.release ? 'release-img release' : 'release-img unrelease'} onClick={()=>this.onReleaseStateChange(index)}></div>
									</div>
								</div>
								<div className="content">
									<div className="info">
										<img src={active.logo} className="logo" />
										<div className="detail">
											<span>[ {active.mainTitle} ] {active.subTitle}</span>
											<span>活动地点:{active.address}</span>
											<span>活动时间:{active.activeTime}</span>
										</div>
									</div>
									<div className="options">
										<span className={active.isOpenLimit ? 'apply' : 'apply hidden'}>({active.applyPersonCount} / 1000)</span>
										<div>
											<span>报名详情</span>
											<span className="edit">编辑</span>
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