import React , { Component }from 'react';
import DataStore from '../../../utils/DataStore.js' ;
import { browserHistory } from 'react-router';
import './detail.scss';

export default class Detail extends Component{

	constructor(props) {
		super(props);
		this.state = {
			memberList : [],
			record : ''
		}
		this.onBackClick = this.onBackClick.bind(this);
	}

	componentDidMount() {

		const location = browserHistory.getCurrentLocation();
		let record = location.state.record;

		DataStore.getMemberListById().then(  data => this.setState({
			memberList : data,
			record : record
		}))
	}

	onBackClick(){
		browserHistory.push("/member");
	}

	render() {
		return (
			<div className="memberdetail-wrap">
				<div className="memberdetail-top">
					<div className="nav">
						<div className="back" onClick={this.onBackClick}></div>
						<span className="parent" onClick={this.onBackClick}>会员管理</span>
						<span> / </span>
						<span className="current">详情</span>
					</div>
				</div>
				<div className="memberdetail-content">
					<div className="member-info">
						<div className="name">
							<span>{this.state.record.name}</span>
							<span>邀请人</span>
							<span>{this.state.record.inviter}</span>
						</div>
						<div className="money">
							<span className="outer">捐款金额:  <span>${this.state.record.donatedMoney}</span></span>
							<span className="outer">积分: <span>{this.state.record.totalScore}</span>分</span>
							<span className="outer">参加活动: <span>4</span>次</span>
						</div>
					</div>
					<div className="member-count">其下会员<span>26人</span></div>
					<div className="member-list">
						

						{
							this.state.memberList.map( member => 
								(
									<div key={member.id} className="member-item">
										<div className="img-wrap">
											<img src={member.imgUrl} />
										</div>
										<span>{member.name}</span>
									</div>
								)
							)
						}
						
					</div>
				</div>
			</div>
		)
	}
}