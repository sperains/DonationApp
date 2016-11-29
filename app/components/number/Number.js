import React , {Component} from 'react';
import './number.scss';
import DataStore from '../../utils/DataStore.js' ;
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}
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
			text : 'haha',
			dataDidLoad : false
		}
		this.onNumberClick = this.onNumberClick.bind(this);
		this.onTabChange = this.onTabChange.bind(this);
		this.handleResize = this.handleResize.bind(this);
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
				dataDidLoad : true
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
					<div className="save"></div>
				</div>
				<div className="number-content" style={{ height : this.state.bodyHeight + 'px' }}>
					<div className={this.state.tabs[0].active ? 'content-tab' : 'content-tab hidden'} >
						<div className="num">{this.state.tabs[0].currentNum}</div>
						<div className="number-form">
							<div className="form-item">
								<span className="label">概述:</span>
								<input  value={this.state.dataDidLoad ? this.state.numDetail[0].infoList[this.state.tabs[0].currentNum-1].desc : ''}/>
							</div>
							<div className="form-item">
								<span className="label">性格优势:</span>
								<input  value={this.state.dataDidLoad ? this.state.numDetail[0].infoList[this.state.tabs[0].currentNum-1].natureAdv : ''}/>
							</div>
							<div className="form-item">
								<span className="label">性格弱点:</span>
								<input value={this.state.dataDidLoad ? this.state.numDetail[0].infoList[this.state.tabs[0].currentNum-1].natureWeak : ''}/>
							</div>
							{
								this.state.dataDidLoad ? this.state.numDetail[0].infoList[this.state.tabs[0].currentNum-1].details.map( (detail , index) =>
									<div key={detail.id} className="form-item top-align">
										<span className="label">详解{index+1}:</span>
										<textarea value={detail.content} />
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
								<input value={this.state.dataDidLoad ? this.state.numDetail[1].infoList[this.state.tabs[1].currentNum == 0 ? 9 : this.state.tabs[1].currentNum-1].keyword : ''} />
							</div>
							{
								this.state.dataDidLoad ? this.state.numDetail[1].infoList[this.state.tabs[1].currentNum == 0 ? 9 : this.state.tabs[1].currentNum-1].details.map( (detail , index) =>
									<div key={detail.id} className="form-item top-align">
										<span className="label">详解{index}:</span>
										<textarea value={detail.content} />
										<span className="new">添加详解</span>
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
			</div>
		)	
	}


}