/**
 * Created by itachi on 16/11/3.
 */

const domain = "http://www.ldted.com/";
const serverUrl = "services/CheckInServer/";


function _getFullUrlFromRelative(relativeUrl){
    return domain + serverUrl + relativeUrl;
}

function _exportToExcel(){
    return domain + "services/ExcelServlet"
}

var Config =  {
    /*
    * 接口配置
    * */
    ApiConfig:{
        getBarginInfo:_getFullUrlFromRelative("getGoodsInfo"),
        getActiveList : _getFullUrlFromRelative("getActivityList"),
        getActiveDetail : _getFullUrlFromRelative("getActiveDetail"),
        getEnrollList : _getFullUrlFromRelative("getEnrollList"),
        getMemberList : _getFullUrlFromRelative("getMemberList"),
        getMemberListById : _getFullUrlFromRelative("getMemberListById"),
        addActive : _getFullUrlFromRelative("addActivity"),
        deleteActive : _getFullUrlFromRelative("deleteActivity"),
        releaseActive : _getFullUrlFromRelative("releaseActivity"),
        getNumDetail : _getFullUrlFromRelative("getNumDetail"),
        updateNumInfo : _getFullUrlFromRelative("updateNumInfo")
    },
};

module.exports = Config;