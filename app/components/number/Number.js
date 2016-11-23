import React , {Component} from 'react';
import './number.scss';

export default class Number extends Component{

	constructor(props) {
		super(props);
		this.state = {
			currentNum : 1 
		}
		this.onNumberClick = this.onNumberClick.bind(this);
	}

	onNumberClick(index){
		console.log(index);
		this.setState({
			currentNum : index
		})
	}

	render() {
		return (
			<div className="number-wrap">
				<div className="number-top">
					<div className="nav">
						<span className="active">命运数</span>
						<span>天赋数</span>
					</div>
					<div className="save"></div>
				</div>
				<div className="number-content">
					<div className="num">1</div>
					<div className="number-form">
						<div className="form-item">
							<span className="label">概述:</span>
							<input />
						</div>
						<div className="form-item">
							<span className="label">性格优势:</span>
							<input />
						</div>
						<div className="form-item">
							<span className="label">性格弱点:</span>
							<input />
						</div>
						<div className="form-item">
							<span className="label">详解1:</span>
							<textarea />
						</div>
						<div className="form-item">
							<span className="label">详解2:</span>
							<textarea />
						</div>
					</div>
				</div>
				<div className="number-bottom">
					{
						[1,2,3,4,5,6,7,8,9].map( i => 
							<span key={i} className={i == this.state.currentNum ? 'active' : ''} onClick={ () =>this.onNumberClick(i)}>{i}</span>
						)
					}
				</div>
			</div>
		)	
	}


}