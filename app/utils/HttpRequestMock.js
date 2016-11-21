/**
 * Created by itachi on 16/11/3.
 */

var Mock = require("mockjs");
var MockRandom = Mock.Random;
var AppConfig = require("./AppConfig.js");

// 配置请求的相应时间
Mock.setup({timeout:'500-1500'});

// 模拟首页请求数据
Mock.mock(AppConfig.ApiConfig.getBarginInfo,{
    'status':1,
    'data':{
        'openId': '@string',
        'isMine|0-1': 1,
        'isFirst|0-1': 1,
        'money':MockRandom.integer(30000,40000),
        'price':MockRandom.integer(100000,500000),
        'originalPrice':MockRandom.integer(500000,600000),
        'name|1':['奥迪A7','奔驰','雪铁龙'],
        'deadline|1':['2016/11/08 00:00:00','2016/11/09 00:00:00','2016/11/10 00:00:00']
    }
});

Mock.mock(AppConfig.ApiConfig.getActiveList,{
    'status' : 1 ,
    'data|1-10' : [
        {
            'key' : '@string',
            'createTime' : MockRandom.date('yyyy年MM月dd日'),
            'activeTime' : MockRandom.date('yyyy年MM月dd日'),
            'release|1' : true,
            'mainTitle' : MockRandom.csentence(2),
            'subTitle' : MockRandom.csentence(20),
            'address' : MockRandom.province() + MockRandom.city() + MockRandom.county() + 'XX大酒店2楼',
            'isOpenLimit|1' : true,
            'applyPersonCount' : MockRandom.natural(0, 1000),
            'logo' : MockRandom.dataImage()
        }
    ]
});