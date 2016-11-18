
import React , {Component} from 'react';
import './newactive.scss';
import { browserHistory } from 'react-router';
import { Input , DatePicker , TimePicker  } from 'antd';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'HH:mm';

export default class NewActive extends Component{

	constructor(props) {
		super(props);
		this.state={
			displaySubTitle : false
		}
		this.onBackClick = this.onBackClick.bind(this);
		this.onDisplaySubTitle = this.onDisplaySubTitle.bind(this);
		this.onDelSubTitle = this.onDelSubTitle.bind(this);
	}

	onBackClick(){
		browserHistory.push('/active');
	}

	onDisplaySubTitle(){
		this.setState({
			displaySubTitle : true 
		})
	}

	onDelSubTitle(){
		this.setState({
			displaySubTitle : false 
		})
	}

	render() {
		return (
			<div className="newactive-wrap">
				<div className="newactive-topbar">
					<div className="nav">
						<div className="back" onClick={this.onBackClick}></div>
						<span className="parent" onClick={this.onBackClick}>喜悦活动</span>
						<span> / </span>
						<span className="current">新建喜悦活动</span>
					</div>
					<div className="save"></div>
				</div>

				<div className="newactive-content">
					<div className="active-img"></div>
					<div className="active-form">
						<div className="form-item">
							<span className="label">主题:</span>
							<input placeholder="0/8" />
							<span className="new-subtitle" onClick={this.onDisplaySubTitle}>创建副标题</span>
						</div>

						<div className={this.state.displaySubTitle ? 'form-item' :  'subtitle-hidden'}>
							<span className="label">副标题:</span>
							<input placeholder="请输入副标题" />
							<span className="new-subtitle" onClick={this.onDelSubTitle}>删除</span>
						</div>

						<div className="form-item active-date">
							<span className="label">时间:</span>
							<DatePicker format={dateFormat} />
							<TimePicker format={timeFormat} />
						</div>

						<div className="form-item active-desc">
							<span className="label">简介:</span>
							<Input type="textarea" placeholder="0/100" autosize={{ minRows: 2, maxRows: 6 }} />
						</div>

						<div className="form-item active-address">
							<span className="label">地点:</span>
							<input />
						</div>

					</div>
				</div>
			</div>
		)
	}	
}