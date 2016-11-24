
import React , {Component} from 'react';
import './newactive.scss';
import { hashHistory } from 'react-router';
import { Input , DatePicker , TimePicker , Upload, Icon } from 'antd';
import moment from 'moment';
import Map from '../../common/map/Map';


const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'HH:mm';



export default class NewActive extends Component{

	constructor(props) {
		super(props);
		this.state={
			displaySubTitle : false,
			imgPreview : false,
			descTextSize : 0,
			mainTitleSize : 0 ,
			activeInfo : {
				isOpenLimit : false,
				address: '',
				activeTime:'',
				address : '',
				applyPersonCount :'',
				createTime:'',
				key:'',
				logo:'',
				mainTitle:'',
				release : '',
				subTitle: ''
			},
			operating : ''
		}
		this.onBackClick = this.onBackClick.bind(this);
		this.onDisplaySubTitle = this.onDisplaySubTitle.bind(this);
		this.onDelSubTitle = this.onDelSubTitle.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onTextAreaChange = this.onTextAreaChange.bind(this);
		this.onSaveClick = this.onSaveClick.bind(this);
		this.onMainTitleChange = this.onMainTitleChange.bind(this);
		this.onActiveDateChange = this.onActiveDateChange.bind(this);
		this.onActiveTimeChange = this.onActiveTimeChange.bind(this);
		this.onAddressChange = this.onAddressChange.bind(this);
		this.onCheckBoxClick = this.onCheckBoxClick.bind(this);
		this.onApplyCountChange = this.onApplyCountChange.bind(this);
		this.setActiveInfo = this.setActiveInfo.bind(this);
	}

	componentDidMount() {
		const location = hashHistory.getCurrentLocation();
		let activeInfo = location.state.record;
		console.log(activeInfo)
		this.setState({
			operating : location.state.operating
		})
		if(location.state.operating == 1){
			this.setState({
				activeInfo : activeInfo,
				mainTitleSize : activeInfo.title.length
			})
		}
		
	}

	onBackClick(){
		hashHistory.push('/active');
	}

	onDisplaySubTitle(){
		this.setState({
			displaySubTitle : true 
		})
	}

	onDelSubTitle(){
		this.setState({
			displaySubTitle : false ,
			address : ''
		})
	}

	onSaveClick(){
		console.log(this.state.activeInfo)
	}

	//图片上传 
	handleChange(info) {
		console.log(123);
		if (info.file.status === 'done') {
			this.setState({
			// Get this url from response in real world.
				imageUrl: 'https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg',
			});
		}
		this.setState({
			// Get this url from response in real world.
			imageUrl: 'https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg',
			imgPreview : true
		});
	}

	onTextAreaChange(){
		let text = this.refs.desc.value.trim();
		this.setState({
			descTextSize : text.length
		})
		this.setActiveInfo('desc' , text);
	}

	onMainTitleChange(){
		let text = this.refs.mainTitle.value.trim();
		this.setActiveInfo('mainTitle', text);
		this.setState({
			mainTitleSize : text.length,
			title : text
		})
	}

	onSubTitleChange(){
		let text = this.refs.subTitle.value.trim();
		this.setActiveInfo('subTitle', text);
	}

	onActiveDateChange(monent , date){
		this.setActiveInfo('date', date);
	}

	onActiveTimeChange(monent , time){
		this.setActiveInfo('time', time);
	}

	onAddressChange(event){
		let text = this.refs.address.value.trim();
		this.setActiveInfo('address', event.target.value);
	}

	onCheckBoxClick(){
		let activeInfo = this.state.activeInfo;
		activeInfo.isOpenLimit = !activeInfo.isOpenLimit;
		this.setState({
			activeInfo : activeInfo
		});
	}

	onApplyCountChange(e){
		let text = e.target.value.trim();
		this.setActiveInfo('applyPersonCount' , text);
	}

	setActiveInfo(prop , value){
		let activeInfo = this.state.activeInfo;
		activeInfo[prop] = value;
		this.setState({
			activeInfo : activeInfo
		})
	}

	setAddress(address , lnglat){
		let activeInfo = this.state.activeInfo;
		activeInfo.address = address;
		activeInfo.lng = lnglat.lng;
		activeInfo.lat = lnglat.lat;
		this.setState({
			activeInfo : activeInfo
		})
	}

	render() {
		const imageUrl = this.state.imageUrl;

		return (
			<div className="newactive-wrap">
				<div className="newactive-topbar">
					<div className="nav">
						<div className="back" onClick={this.onBackClick}></div>
						<span className="parent" onClick={this.onBackClick}>喜悦活动</span>
						<span> / </span>
						<span className="current">{this.state.operating == 0 ? '新建喜悦活动' : '编辑喜悦活动'}</span>
					</div>
					<div className="save" onClick={this.onSaveClick}></div>
				</div>

				<div className="newactive-content">
					<div className={this.state.imgPreview ? 'active-img bghidden' :"active-img"}>
						<Upload
					        className="avatar-uploader"
					        name="activeImg"
					        showUploadList={false}
					        action="/upload.do"
					        onChange={this.handleChange}
					      >
					        {
					          imageUrl ?
					            <img src={imageUrl} role="presentation" className="avatar" /> :
					            <Icon type="plus" className="avatar-uploader-trigger" />
					        }
					      </Upload>
					</div>
					<div className="active-form">
						<div className="form-item active-maintitle">
							<span className="label">主题:</span>
							<div>
								<input ref="mainTitle" type="text" onChange={this.onMainTitleChange} maxLength="8" value={this.state.activeInfo.title}/>
								<span>{this.state.mainTitleSize}/8</span>
							</div>
							
							<span className="new-subtitle" onClick={this.onDisplaySubTitle} >创建副标题</span>
						</div>

						<div className={this.state.displaySubTitle ? 'form-item' :  'subtitle-hidden'}>
							<span className="label">副标题:</span>
							<input placeholder="请输入副标题" ref="subTitle" onChange={this.onSubTitleChange} />
							<span className="new-subtitle" onClick={this.onDelSubTitle}>删除</span>
						</div>

						<div className="form-item active-date">
							<span className="label">时间:</span>
							<DatePicker format={dateFormat} onChange={this.onActiveDateChange} defaultValue={moment('2016-05-02',dateFormat)}/>
							<TimePicker format={timeFormat} onChange={this.onActiveTimeChange}/>
						</div>

						<div className="form-item active-desc">
							<span className="label">简介:</span>
							<div>
								<textarea placeholder="" maxLength='100' onChange={this.onTextAreaChange} ref="desc" value={this.state.activeInfo.desc}></textarea>
								<span>{this.state.descTextSize}/100</span>
							</div>
						</div>

						<div className="form-item active-address">
							<span className="label">地点:</span>
							<input type="text" ref="address" onChange={this.onAddressChange} value={this.state.activeInfo.address}/>
						</div>
						<div  className="form-item">
							<span className="label"></span>
							<Map getAddress={ (address,lnglat) =>this.setAddress(address , lnglat)}/>
						</div>

						<div className="form-item active-applyoptions">
							<span className="label"></span>
							<div>
								<div className={this.state.activeInfo.isOpenLimit ? 'checkbox checked' :'checkbox'} onClick={this.onCheckBoxClick}></div>
								<span>限定报名人数</span>
								{
									this.state.activeInfo.isOpenLimit ? 
									<input className="count error" type="number" max="9999"  min="1" ref="applyCount"  onChange={this.onApplyCountChange} value={this.state.activeInfo.applyPersonCount} />
									: <input className="count error" type="number" max="9999" min="1" ref="applyCount" disabled="disabled" onChange={this.onApplyCountChange} />
								}			
							</div>
						</div>
						

						

					</div>
				</div>
			</div>
		)
	}	
}