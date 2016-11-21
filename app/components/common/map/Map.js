import React ,{ Component} from 'react';

export default class Map extends Component{

	constructor(props) {
		super(props);
	}

	componentDidMount() {

		var me = this ;
		var map, geolocation;
			//加载地图，调用浏览器定位服务
			map = new AMap.Map('map', {
			resizeEnable: true
		});
		map.plugin('AMap.Geolocation', function() {
			geolocation = new AMap.Geolocation({
			enableHighAccuracy: true,//是否使用高精度定位，默认:true
			timeout: 10000,          //超过10秒后停止定位，默认：无穷大
			buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
			zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
			buttonPosition:'RB'
		});
		map.addControl(geolocation);
		geolocation.getCurrentPosition();
		AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
		AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
		});
		//解析定位结果
		function onComplete(data) {
			var str=['定位成功'];
			str.push('经度：' + data.position.getLng());
			str.push('纬度：' + data.position.getLat());
			str.push('精度：' + data.accuracy + ' 米');
			str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
		}
		//解析定位错误信息
		function onError(data) {
			document.getElementById('tip').innerHTML = '定位失败';
		}

		let marker = new AMap.Marker({
			icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png"
		});
		marker.setMap(map);

		var clickEventListener = map.on('click', function(e) {

			marker.setPosition(e.lnglat);

			map.plugin(["AMap.Geocoder"], function () {
				var geocoder = new AMap.Geocoder({
					radius: 1000,
					extensions: "all"
				});  
				geocoder.getAddress(e.lnglat, function(status, result) {
					if (status === 'complete' && result.info === 'OK') {
						var address = result.regeocode.formattedAddress; //返回地址描述
						// console.log(address);
						me.props.getAddress(address , e.lnglat);
					}
				});           
			});

		
		});
	}

	render() {
		return (
			<div className="map" id="map"></div>
		)
	}
} 