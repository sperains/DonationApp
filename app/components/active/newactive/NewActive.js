
import React , {Component} from 'react';
import './newactive.scss';
import { hashHistory } from 'react-router';
import { Input , DatePicker , TimePicker , Upload, Icon , message , Alert } from 'antd';
import DataStore from '../../../utils/DataStore.js' ;
import moment from 'moment';
import Map from '../../common/map/Map';

moment.locale('zh-cn');
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
			dateStatus : {},
			timeStatus : {},
			activeInfo : {
				isOpenLimit : false,				//是否开启限额
				activeLimit : '',					//限制报名人数
				address: '',						//地址
				activeTime:'',					//活动时间
				address : '',						//活动地址
				personCount :'',				//报名人数
				createTime:'',					//活动创建时间
				id:'',							//唯一id
				lat : '0.1',
				lng : '0.1',						
				imageUrl:'',						//活动logo
				title:'',							//主标题
				release : '',						//是否发布
				subTitle: '',						//副标题,
				desc : ''
			},
			operating : ''						//操作标识   0  新建 1编辑
		}
		this.onBackClick = this.onBackClick.bind(this);
		this.onDisplaySubTitle = this.onDisplaySubTitle.bind(this);
		this.onDelSubTitle = this.onDelSubTitle.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onTextAreaChange = this.onTextAreaChange.bind(this);
		this.onSaveClick = this.onSaveClick.bind(this);
		this.onMainTitleChange = this.onMainTitleChange.bind(this);
		this.onSubTitleChange = this.onSubTitleChange.bind(this);
		this.onActiveDateChange = this.onActiveDateChange.bind(this);
		this.onActiveTimeChange = this.onActiveTimeChange.bind(this);
		this.onAddressChange = this.onAddressChange.bind(this);
		this.onCheckBoxClick = this.onCheckBoxClick.bind(this);
		this.onLimitChange = this.onLimitChange.bind(this);
		this.setActiveInfo = this.setActiveInfo.bind(this);
	}

	componentWillMount() {
		//获取路由传递过来的参数
		const location = hashHistory.getCurrentLocation();
		let activeInfo = location.state.record;
		// console.log(activeInfo)

		//设置标题
		this.setState({
			operating : location.state.operating
		})

		//如果是编辑页面获取参数
		if(location.state.operating == 1){
			this.setState({
				activeInfo : activeInfo,
				mainTitleSize : activeInfo.title.length,
				imageUrl:  activeInfo.imageUrl,
				imgPreview : true,
				timeStatus : {
					defaultValue : moment(activeInfo.activeTime.substr(11), timeFormat)
				},
				dateStatus :  {
					defaultValue : moment(activeInfo.activeTime.substr(0,10), dateFormat)
				}
			})
		}
	}

	componentDidMount() {

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

	// 添加活动
	onSaveClick(){
		
		let activeInfo = this.state.activeInfo;

		if(activeInfo.title == ""){
			message.error("请填写活动主题");
			return ;
		}

		if(activeInfo.activeTime.substr(0,10) == ""){
			message.error("请选择活动日期");
			return ;
		}

		if(activeInfo.activeTime.substr(10).trim() == ""){
			message.error("请选择活动时间");
			return ;
		}

		if(activeInfo.address == ""){
			message.error("请选择活动地点")
			return ;
		}

		if(activeInfo.desc == ""){
			activeInfo.desc = "活动简介";
		}

		console.log(activeInfo)

		if(this.state.operating == 0 ){
			activeInfo.imageUrl = 'https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg';
			DataStore.addActive(activeInfo).then( data => message.success('添加活动成功') , error => message.error("添加失败,请稍后再试.."));
		}else{
			activeInfo.imageUrl = this.state.imageUrl;
			message.error("编辑失败!未接入编辑接口!")
		}
		
		
	}

	//图片上传 
	handleChange(info) {
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


	// 
	onTextAreaChange(){
		let text = this.refs.desc.value.trim();
		this.setState({
			descTextSize : text.length
		})
		this.setActiveInfo('desc' , text);
	}

	onMainTitleChange(){
		let text = this.refs.mainTitle.value.trim();
		this.setActiveInfo('title', text);
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
		let activeTime = this.state.activeInfo.activeTime;
		let time = activeTime.substr(10);

		this.setActiveInfo('activeTime', date +" " +  time);
	}

	onActiveTimeChange(monent , time){
		let activeTime = this.state.activeInfo.activeTime;
		let date = activeTime.substr(0,10) ;
		this.setActiveInfo('activeTime', date + " " + time);
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

	onLimitChange(){
		let text = this.refs.activeLimit.value.trim();
		if(isNaN(text)){
			return ;
		}
		this.setActiveInfo('activeLimit' , text);
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
								<input placeholder="请输入主题" ref="mainTitle" type="text" onChange={this.onMainTitleChange} maxLength="7" value={this.state.activeInfo.title}/>
								<span>{this.state.mainTitleSize}/7</span>
							</div>
							
							<span className="new-subtitle" onClick={this.onDisplaySubTitle} >创建副标题</span>
						</div>

						<div className={this.state.displaySubTitle ? 'form-item' :  'form-item subtitle-hidden'}>
							<span className="label">副标题:</span>
							<input placeholder="请输入副标题" ref="subTitle" onChange={this.onSubTitleChange} />
							<span className="new-subtitle" onClick={this.onDelSubTitle}>删除</span>
						</div>

						<div className="form-item active-date">
							<span className="label">时间:</span>
							<DatePicker format={dateFormat} onChange={this.onActiveDateChange} {...this.state.dateStatus}  />
							<TimePicker format={timeFormat} onChange={this.onActiveTimeChange} {...this.state.timeStatus}/>
						</div>

						<div className="form-item active-desc">
							<span className="label">简介:</span>
							<div>
								<textarea placeholder="请输入活动简介" maxLength='100' onChange={this.onTextAreaChange} ref="desc" value={this.state.activeInfo.desc}></textarea>
								<span>{this.state.descTextSize}/100</span>
							</div>
						</div>

						<div className="form-item active-address">
							<span  className="label">地点:</span>
							<input placeholder="请选择活动地点" type="text" ref="address" onChange={this.onAddressChange} value={this.state.activeInfo.address}/>
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
									<input className="count error" type="text" max="9999"  min="1" ref="activeLimit"  onChange={this.onLimitChange} value={this.state.activeInfo.activeLimit} />
									: <input className="count error" type="text" max="9999" min="1" ref="activeLimit" disabled="disabled" onChange={this.onLimitChange}  value={this.state.activeInfo.activeLimit}/>
								}			
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}	
}