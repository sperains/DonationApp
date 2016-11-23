/**
 * Created by itachi on 16/11/3.
 */

const domain = "http://www-bj-evetime.com/";
const serverUrl = "meishiwechat/services/KanjiaServer/";

function _getFullUrlFromRelative(relativeUrl){
    return domain + serverUrl + relativeUrl;
}

var Config =  {
    /*
    * 接口配置
    * */
    ApiConfig:{
        getBarginInfo:_getFullUrlFromRelative("getGoodsInfo"),
        getActiveList : _getFullUrlFromRelative("getActiveList"),
        getActiveDetail : _getFullUrlFromRelative("getActiveDetail"),
        getMemberList : _getFullUrlFromRelative("getMemberList"),
        getMemberListById : _getFullUrlFromRelative("getMemberListById")
    },
};

module.exports = Config;