import React , {Component} from 'react';
import './number.scss';
import DataStore from '../../utils/DataStore.js' ;
import { Tabs , Modal, Button , message } from 'antd';
const TabPane = Tabs.TabPane;
const uuid = require('uuid');
const confirm = Modal.confirm;


//this.state.numDetail[0] 表示命运数数组.this.state.numDetail[1]表示天赋数数组 
//infoList 中包含命运数信息 
// 命运数 从 1-9 ; 天赋数1-9 ,另外加一个0
//this.state.tabs[0].currentNum 表示当前的命运数/天赋数 数字. 


//数组一般是从0开始的. 所以this.state.tabs[0].currentNum-1 表示数组中的第一个天赋数 1 
//details中是每一个天赋数或者命运数中的详解. 

//下面这行代码的意义是:
//如果当前详解是命运数的最后一个并且当前详解不是第9个详解(详解最大数量) 则添加<span>标签. 否则不添加
// index == this.state.numDetail[0].infoList[this.state.tabs[0].currentNum-1].details.length-1  && index!=this.state.tabs[0].pageNum.length-1 ? <span className="label new">添加详解</span> : ''



export default class Number extends Component{

	constructor(props) {
		super(props);
		this.state = {
			currentNum : [1 , 1] ,
			bodyHeight : $(document).height() - 210,
			tabs : [
				{ name : '命运数'  , active : true , pageNum : [ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9] , currentNum : 1  },
				{ name : '天赋数'  , active : false , pageNum : [ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 0] , currentNum : 1 }
			],
			numDetail : [],
			fateNumList : [],			//命运数 数组
			talentNumList : [] , 			//天赋数 数组
			text : 'haha',
			dataDidLoad : false,
			confirmDisplay : false,
			detailMaxLength : 10 
		}
		this.onNumberClick = this.onNumberClick.bind(this);
		this.onTabChange = this.onTabChange.bind(this);
		this.handleResize = this.handleResize.bind(this);
		this.onNewDetail = this.onNewDetail.bind(this);
		this.onSaveClick = this.onSaveClick.bind(this);
		this.onModalClick = this.onModalClick.bind(this);
		this.onDescChange = this.onDescChange.bind(this);
		this.onKeywordChange = this.onKeywordChange.bind(this);
		this.onNatureAdvChange = this.onNatureAdvChange.bind(this);
		this.onNatureWeakChange = this.onNatureWeakChange.bind(this);
	}

	componentWillMount() {
	// 为窗口添加resize事件
		window.addEventListener('resize', this.handleResize);  
	}

	componentDidMount() {
		DataStore.getNumDetail().then(  (data) => {
			console.log(data);
			this.setState({
				numDetail : data,
				dataDidLoad : true,
				fateNumList : data[0].infoList,
				talentNumList : data[1].infoList
			})
		} )
	}

	// 组件卸载时移除事件
	componentWillUnmount() {
		window.removeEventListener('resize' , this.handleResize);
	}

	// 处理resize事件,当页面尺寸发生变化时,重新设置页面的高度
	handleResize(){
		this.setState({
		bodyHeight : $(document).height() - 210
		})
	}


	// 添加详解
	onNewDetail(){
		//获取当前是命运数还是天赋数
		let tabs = this.state.tabs;
		let numDetail = this.state.numDetail;
		let fateNumList = this.state.fateNumList;
		let talentNumList = this.state.talentNumList;
		tabs.map(  (tab , index) =>{
			if(tab.active){
				// numDetail[index].infoList[ tab.currentNum == 0 ? 9 : tab.currentNum - 1 ].details.push({
				// 	id : 'detail' + numDetail[index].infoList[ tab.currentNum == 0 ? 9 : tab.currentNum - 1 ].details.length
				// })
				if(index == 0){
					fateNumList[tab.currentNum - 1 ].details.push({
						id : uuid() 
					})
				}else{
					if(tab.currentNum == 0){
						talentNumList[9].details.push({
							id : uuid()
						})
					}else{
						talentNumList[tab.currentNum-1].details.push({
							id : uuid()
						})
					}
				}

			}
		});
		this.setState({
			numDetail : numDetail
		})
	}


	onSaveClick(){
		let tabs = this.state.tabs;
		let fateNumList = this.state.fateNumList;
		let talentNumList = this.state.talentNumList;
		tabs.map( (tab , index) => {
			let currentIndex = tab.currentNum == 0 ? 9 : tab.currentNum-1;
			if(tab.active){
				let numInfo = {};
				if(index == 0){
					numInfo = fateNumList[currentIndex];
				}else{
					numInfo = talentNumList[currentIndex];
				}
				console.log(numInfo);
				message.info(JSON.stringify(numInfo) , 5);
				// DataStore.updateNumInfo(numInfo).then().catch( (error) =>message.error("未接入修改接口"));
			}

		});

		// this.setState({
		// 	confirmDisplay : true
		// })
	}

	onModalClick(){
		this.setState({
			confirmDisplay : false
		})
	}

	onUpdate(){
		console.log("update");
	}


	// 切换命运数,天赋数  index==0 命运数 ,index==1 天赋数
	onNumberClick(num , index){
		console.log(num , index);
		let tabs = this.state.tabs;
		tabs.map( ( tab , i) => {
			if(i == index){
				tab.currentNum = num;
			}
		})
		this.setState({
			tabs : tabs
		})
	}

	//tab切换事件
	onTabChange(index){
		let tabs = this.state.tabs;
		tabs.map( 
			(tab, i) => {
				if(index == i){
					tab.active = true ;
				}else{
					tab.active = false;
				}
				return tab;
			} 
		)

		this.setState({
			tabs : tabs
		})
	}

	// 设置命运数概述信息
	onDescChange(e){
		this.setFateNumInfo('desc' , e.target.value);
	}

	onNatureAdvChange(e){
		this.setFateNumInfo('natureAdv' , e.target.value);
	}

	onNatureWeakChange(e){
		this.setFateNumInfo("natureWeak" , e.target.value);
	}

	//设置天赋数关键词
	onKeywordChange(e){
		this.setTalentNumInfo('keyword' , e.target.value);
	}


	// i : 0 / 1    命运数/天赋数
	// currentIndex 命运数/天赋数 当前数字下标 0- 8 / 0 -9
	//  detailIndex  命运数/天赋数 详解下标 0-8 / 0-9
	onDetailChange( i , currentIndex , detailIndex , e ){
		let details = [] ;

		//i == 0 标识命运数详解  i==1 标识天赋数详解
		details = i == 0 ? this.state.fateNumList[currentIndex].details : this.state.talentNumList[currentIndex].details ;

		if(i == 0) {
			details[detailIndex].content = e.target.value;

			this.setFateNumInfo('details' , details);
		}else{
			details[detailIndex].content = e.target.value;

			this.setTalentNumInfo('details' , details);
		}

	}

	setFateNumInfo(prop , value){
		let fateNumList = this.state.fateNumList;
		let currentIndex = this.state.tabs[0].currentNum - 1 ;
		fateNumList[currentIndex][prop] = value;
		this.setState({
			fateNumList : fateNumList
		});
	}

	setTalentNumInfo(prop , value){
		let talentNumList = this.state.talentNumList;
		let currentIndex = this.state.tabs[1].currentNum == 0 ? 9 :  this.state.tabs[1].currentNum - 1 ;
		talentNumList[currentIndex][prop] = value;
		this.setState({
			talentNumList : talentNumList
		});
	}

	render() {
		return (
			<div className="number-wrap">

				<div className="number-top">
					<div className="nav">
						{
							this.state.tabs.map( 
								(tab , index) => 
								<span key={index} onClick={ () => this.onTabChange(index) } className={tab.active ? 'active' : ''} >{tab.name}</span>  
							)
						}			
					</div>
					<div className="save" onClick={this.onSaveClick}></div>
				</div>


				<div className="number-content" style={{ height : this.state.bodyHeight + 'px' }}>
					<div className={this.state.tabs[0].active ? 'content-tab' : 'content-tab hidden'} >
						<div className="num">{this.state.tabs[0].currentNum}</div>
						<div className="number-form">
							<div className="form-item">
								<span className="label">概述:</span>
								<input onChange={this.onDescChange} value={this.state.dataDidLoad ? this.state.numDetail[0].infoList[this.state.tabs[0].currentNum-1].desc : ''}/>
							</div>
							<div className="form-item">
								<span className="label">性格优势:</span>
								<input onChange={this.onNatureAdvChange}  value={this.state.dataDidLoad ? this.state.numDetail[0].infoList[this.state.tabs[0].currentNum-1].natureAdv : ''}/>
							</div>
							<div className="form-item">
								<span className="label">性格弱点:</span>
								<input onChange={this.onNatureWeakChange} value={this.state.dataDidLoad ? this.state.numDetail[0].infoList[this.state.tabs[0].currentNum-1].natureWeak : ''}/>
								
								{ 
									this.state.dataDidLoad 
									? this.state.fateNumList[this.state.tabs[0].currentNum-1].details.length == 0 ?<span className="label new" onClick={this.onNewDetail}>添加详解</span> : ''  
									: ''
								}
							</div>
							{
								this.state.dataDidLoad ? this.state.numDetail[0].infoList[this.state.tabs[0].currentNum-1].details.map( (detail , index) =>
									<div key={detail.id} className="form-item top-align">
										<span className="label">详解{index+1}:</span>
										<textarea onChange={(e) => this.onDetailChange(0 , this.state.tabs[0].currentNum - 1 ,  index , e) } value={detail.content} />
										{
											index == this.state.fateNumList[this.state.tabs[0].currentNum-1].details.length-1  
											&& index!= this.state.detailMaxLength - 1 
											? <span className="label new" onClick={this.onNewDetail}>添加详解</span> : ''
										}
									</div>
								) : ''
							}

						</div>
					</div>
					<div className={this.state.tabs[1].active ? 'content-tab' : 'content-tab hidden'}>
						<div className="num">{this.state.tabs[1].currentNum}</div>
						<div className="number-form">
							<div className="form-item">
								<span className="label">关键词:</span>
								<input onChange={this.onKeywordChange} value={this.state.dataDidLoad ? this.state.numDetail[1].infoList[this.state.tabs[1].currentNum == 0 ? 9 : this.state.tabs[1].currentNum-1].keyword : ''} />
								{ 
									this.state.dataDidLoad 
									? this.state.talentNumList[this.state.tabs[1].currentNum == 0 ? 9 : this.state.tabs[1].currentNum - 1 ].details.length == 0 ?<span className="label new" onClick={this.onNewDetail}>添加详解</span> : ''  
									: ''
								}
							</div>
							{
								this.state.dataDidLoad ? this.state.numDetail[1].infoList[this.state.tabs[1].currentNum == 0 ? 9 : this.state.tabs[1].currentNum-1].details.map( (detail , index) =>
									<div key={detail.id} className="form-item top-align">
										<span className="label">详解{index+1}:</span>
										<textarea onChange={(e) => this.onDetailChange(1 , this.state.tabs[1].currentNum == 0 ? 9 :  this.state.tabs[1].currentNum - 1 ,  index , e) } value={detail.content} />
										{
											index == this.state.talentNumList[this.state.tabs[1].currentNum == 0 ? 9 : this.state.tabs[1].currentNum-1].details.length-1  
											&& index!= this.state.detailMaxLength - 1 
											? <span className="label new" onClick={this.onNewDetail}>添加详解</span> : ''
										}
									</div>
								) : ''
							}
						</div>
					</div>
				</div>


				<div className="number-bottom">
					{
						this.state.tabs.map( (tab,index) =>{
							if(tab.active){

								return tab.pageNum.map( i => 
									<span key={i} className={i == tab.currentNum ? 'active' : ''} onClick={ () =>this.onNumberClick(i , index)}>{i}</span>
									)
								}
							}
						)
					}
				</div>

				<div className={this.state.confirmDisplay ? "modal" : 'hidden'} ></div>

				<div className={this.state.confirmDisplay ? "confirm-wrap" : 'hidden'} >
					<div className="confirm">
						<span>是否保存已做修改?</span>
						<div className="confirm-btns">
							<div className="ok" onClick={this.onUpdate}></div>
							<div className="cancel" onClick={this.onModalClick}></div>
						</div>
					</div>
				</div>
			</div>
		)	
	}


}