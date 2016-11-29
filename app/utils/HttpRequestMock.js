/**
 * Created by itachi on 16/11/3.
 */

var Mock = require("mockjs");
var MockRandom = Mock.Random;
var AppConfig = require("./AppConfig.js");

// 配置请求的相应时间
Mock.setup({timeout:'500-800'});

// 模拟首页请求数据
Mock.mock(AppConfig.ApiConfig.getBarginInfo,{
    'status':0,
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
    'status' : 0 ,
    'data|1-10' : [
        {
            'id' : '@string',
            'createTime' : MockRandom.date('yyyy-MM-dd'),
            'release|0-3' : MockRandom.natural(0, 2),
            'title' : MockRandom.csentence(2),
            'subTitle' : MockRandom.csentence(20),
            'address' : MockRandom.province() + MockRandom.city() + MockRandom.county() + 'XX大酒店2楼',
            'isOpenLimit|1' : true,
            'activeLimit' : 0,
            'personCount' : MockRandom.natural(0, 1000),
            'imageUrl' : 'https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg',
            'lng' : '',
            'lat' : '',
            'activeTime' : MockRandom.date('yyyy-MM-dd HH:mm'),
            'desc':MockRandom.csentence(50)
        }
    ]
});

Mock.mock(AppConfig.ApiConfig.getEnrollList,{
    'status' : 0 , 
    'data' : [
        {"id":"1","name":"潘","phone":"15623240925", "ageGroup" : '1' ,"totalScore":0,"donatedMoney":0,"UpdateStatus":"0" , "checkInStatus" : 0 , 'sex' : '0' , 'diseaseRecord' : '病病病病病病病病病病病病病病病病病病病病病病'},
        {"id":"2","name":"潘","phone":"15623240925", "ageGroup" : '3' ,"totalScore":0,"donatedMoney":0,"UpdateStatus":"1" , "checkInStatus" : 1 , 'sex' : '3'}
    ]
});


Mock.mock(AppConfig.ApiConfig.getMemberList,{
    'status' : 0 ,
    'data|1-1000' : [
        {
            'id': '@string',
            'name': MockRandom.csentence(Math.random()*2+1),
            'phone' : '15623551300',
            'birthday' : MockRandom.date('yyyy-MM-dd'),
            'wechatNickname': `Sperains`,
            'totalScore': Math.round(Math.random()*1000),
            'donatedMoney|0-1000' : MockRandom.integer(100,1000),
            'inviter' : '万德武',
            'identity|0-3' : MockRandom.integer(0,3),
            'detail' : '详情',
        }
    ]
});

Mock.mock(AppConfig.ApiConfig.getMemberListById,{
    'status' : 0 ,
    'data|1-100' : [
        {
            'id' :'@string',
            'imgUrl' : MockRandom.dataImage('80x80'),
            'name' : MockRandom.csentence(Math.random()*2+1)
        }
    ]
});

Mock.mock(AppConfig.ApiConfig.getNumDetail ,{
    'status' : 0,
    'data' : [
        {   
            'name' : '命运数',
            'infoList' : [
                {
                    'id' : '@string',
                    'num' : 1 ,
                    'desc' : MockRandom.csentence(5),
                    'natureAdv' : MockRandom.csentence(5),
                    'natureWeak' : MockRandom.csentence(5),
                    'details' : [
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : '@string',
                    'num' : 2 ,
                    'desc' : MockRandom.csentence(5),
                    'natureAdv' : MockRandom.csentence(5),
                    'natureWeak' : MockRandom.csentence(5),
                    'details' : [
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)}
                    ]
                }
            ]
        },
        {   
            'name' : '天赋数',
            'infoList' : [
                {
                    'id' : '@string',
                    'num' : 1 ,
                    'keyword' : MockRandom.csentence(5),
                    'details' : [
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : '@string',
                    'num' : 2 ,
                    'keyword' : MockRandom.csentence(5),
                    'details' : [
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : '@string',
                    'num' : 2 ,
                    'keyword' : MockRandom.csentence(5),
                    'details' : [
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : '@string',
                    'num' : 2 ,
                    'keyword' : MockRandom.csentence(5),
                    'details' : [
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : '@string',
                    'num' : 2 ,
                    'keyword' : MockRandom.csentence(5),
                    'details' : [
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : '@string',
                    'num' : 2 ,
                    'keyword' : MockRandom.csentence(5),
                    'details' : [
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : '@string',
                    'num' : 2 ,
                    'keyword' : MockRandom.csentence(5),
                    'details' : [
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : '@string',
                    'num' : 2 ,
                    'keyword' : MockRandom.csentence(5),
                    'details' : [
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : '@string',
                    'num' : 2 ,
                    'keyword' : MockRandom.csentence(5),
                    'details' : [
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : '@string',
                    'num' : 2 ,
                    'keyword' : MockRandom.csentence(5),
                    'details' : [
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)},
                        { 'id' : '@string' , 'content' : MockRandom.csentence(20)}
                    ]
                }
            ]
        }
    ]
});