/*
 * GET home page.
 */

var sysconf = require('../configure/sysconfig')
  , url = require('url')
  , querystring = require('querystring');

function translater(lang, obj) {
  switch(lang) {
    default:
    case "/":
      return obj[sysconf.sysconf.defaultLang];
    case "/zh_TW":
      return obj["zh_TW"];
    case "/en":
      return obj["en"];
  }
}

function getCountyList(lang) {
  var countyList = [
    { 'name': translater(lang, {'en':'Taipei', "zh_TW":'台北市'}), 'value':'01' }
    , { 'name': translater(lang, {'en':'New Taipei', "zh_TW":'新北市'}), 'value':'31' }
    , { 'name': translater(lang, {'en':'Tainan', "zh_TW":'台南市'}), 'value':'05' }
    , { 'name': translater(lang, {'en':'Kaohsiung', "zh_TW":'高雄市'}), 'value':'07' }
    , { 'name': translater(lang, {'en':'Taoyuan', "zh_TW":'桃園市'}), 'value':'32' }    
    , { 'name': translater(lang, {'en':'Keelung', "zh_TW":'基隆市'}), 'value':'11' }
    , { 'name': translater(lang, {'en':'Yilan', "zh_TW":'宜蘭縣'}), 'value':'34' }
    , { 'name': translater(lang, {'en':'Hsinchu City', "zh_TW":'新竹市'}), 'value':'12' }
    , { 'name': translater(lang, {'en':'Hsinchu County', "zh_TW":'新竹縣'}), 'value':'33' }
    , { 'name': translater(lang, {'en':'Miaoli', "zh_TW":'苗栗縣'}), 'value':'35' }
    , { 'name': translater(lang, {'en':'Taichung', "zh_TW":'台中市'}), 'value':'03' }
    , { 'name': translater(lang, {'en':'Changhua', "zh_TW":'彰化縣'}), 'value':'37' }
    , { 'name': translater(lang, {'en':'Nantou', "zh_TW":'南投縣'}), 'value':'38' }
    , { 'name': translater(lang, {'en':'Yunlin', "zh_TW":'雲林縣'}), 'value':'39' }
    , { 'name': translater(lang, {'en':'Chiayi City', "zh_TW":'嘉義市'}), 'value':'22' }
    , { 'name': translater(lang, {'en':'Chiayi County', "zh_TW":'嘉義縣'}), 'value':'40' }
    , { 'name': translater(lang, {'en':'Pingtung', "zh_TW":'屏東縣'}), 'value':'43' }
    , { 'name': translater(lang, {'en':'Hualien', "zh_TW":'花蓮縣'}), 'value':'45' }
    , { 'name': translater(lang, {'en':'Taitung', "zh_TW":'台東縣'}), 'value':'46' }
    , { 'name': translater(lang, {'en':'Penghu', "zh_TW":'澎湖縣'}), 'value':'44' }
    , { 'name': translater(lang, {'en':'Jinmen', "zh_TW":'金門縣'}), 'value':'90' }  
    , { 'name': translater(lang, {'en':'Lianjiang', "zh_TW":'連江縣'}), 'value':'91' }  
  ];

  return countyList;
}

exports.index = function(req, res){
  var query = url.parse(req.url).query;
  var allQueries = querystring.parse(query);
  var lang = url.parse(req.url).pathname;

  res.render('index', { 
    title: translater(lang, {'en':'CDC Dengue Map', "zh_TW":'疾管署登革熱病例地圖'}),
    searchingtext: translater(lang, {'en':'Searching Text', "zh_TW":'輸入搜尋字串'}),
    login: translater(lang, {'en':'Login Dropbox or Google Drive', "zh_TW":'登入 Dropbox 或 Google Drive'}),
    syncsetting: translater(lang, {'en':'Sync Settings', "zh_TW":'資料同步設定'}),
    clusteringzone: translater(lang, {'en':'Clustering', "zh_TW":'聚集警示'}),
    spreading: translater(lang, {'en':'Spreading', "zh_TW":'動態地圖'}),
    trend: translater(lang, {'en':'Trend', "zh_TW":'病例趨勢'}),
    overseas: translater(lang, {'en':'Overseas', "zh_TW":'境外移入'}),
    prevention: translater(lang, {'en':'Overseas', "zh_TW":'防治資訊'}),
    enableLegend: translater(lang, {'en':'Show Legend', "zh_TW":'顯示圖例'}),
    mapstyle: translater(lang, {'en':'Map Style', "zh_TW":'地圖樣式'}),
    outdoorlayer: translater(lang, {'en':'Outdoor', "zh_TW":'戶外'}),
    graylayer: translater(lang, {'en':'Grey', "zh_TW":'灰階'}),
    example: translater(lang, {'en':'Example', "zh_TW":'範例'}),
    point: translater(lang, {'en':'Points', "zh_TW":'點資料'}),
    line: translater(lang, {'en':'Lines', "zh_TW":'線資料'}),
    polygon: translater(lang, {'en':'Polygon', "zh_TW":'多邊形資料'}),
    custom: translater(lang, {'en':'Custom', "zh_TW":'自訂圖層'}),
    addmarker: translater(lang, {'en':'Add Marker', "zh_TW":'增加標示'}),
    addline: translater(lang, {'en':'Add Line', "zh_TW":'增加線條'}),
    addpolygon: translater(lang, {'en':'Add Polygon', "zh_TW":'增加多邊形'}),
    sourcecode: translater(lang, {'en':'Source Code', "zh_TW":'開放原始碼'}),
    changelang: translater(lang, {'en':'中文', "zh_TW":'English'}),
    datainfo: translater(lang, {'en':'Data Info', "zh_TW":'資料說明'}),
    syncdatabase: translater(lang, {'en':'Database Sync Status', "zh_TW":'資料庫更新狀況'}),
    datastatus: translater(lang, {'en':'Data Status', "zh_TW":'資料狀態'}),
    changelangurl: translater(lang, {'en':'/zh_TW', "zh_TW":'/en'}),
    opinion: translater(lang, {'en':'Opinion', "zh_TW":'提供意見'}),
    loginTitle: translater(lang, {'en':'Select a service to login.', "zh_TW":'選擇一個服務登入'}),
    cbswarning: translater(lang, {'en':'CBS Warning', "zh_TW":'細胞廣播訊息'}),
    additionalInfoTitle: translater(lang, {'en':'(Additional Info)', "zh_TW":'(更多的資訊)'}),
    closeLogin: translater(lang, {'en':'Close', "zh_TW":'關閉'}),
    countryList: getCountyList(lang)
  });
};