var w = 900;
var h = 800;
var active;
var jsonOutside;

//Define map projection NB change to mercator and changed zoom etc
var projection = d3.geo.mercator()
    .center([121, 24])
    .scale(8000)
    .translate([w / 2, h / 2]);

//Define path generator
var path = d3.geo.path()
    .projection(projection);

//Create SVG element
var svg = d3.select("#map_container")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

var g = svg.append("g");

function init(){
var xhr = new XMLHttpRequest();
xhr.open('get', "https://api-proxy.noob.tw/http://opendata2.epa.gov.tw/AQI.json", true);
xhr.send();
xhr.onload = function(){

    var data = JSON.parse(xhr.responseText);
    console.log(data); //77

d3.json("./data/taiwan.json", function (json) {
    $('.loadimg').hide();
    $('.loading').hide();
    console.log(json.features);  //375

    // from colorbrewer (http://colorbrewer2.org/)
    var colours = ["#BFBEC1", "#74C476", "#F7F436", "#F3161A", "#AE5FF3"];

    // setup colours for choropleth
    var colScale = d3.scale
            .linear()
            .domain([-10,0,35,53,70])
            .range(colours);

    d3.select("svg")
        .selectAll("path")
        .data(json.features)
        .attr({
            d: path,
            fill: function(d) {
                // console.log(d.properties.value);
                return colScale(d.properties.value);
            }
        });

    json.features.forEach(function (d, i) {
        data.forEach(function (e, j) {
            if(e.SiteName === '古亭' && d.properties.TOWN === '中正區' && d.properties.COUNTY === '臺北市'){
                d.properties.value = +e["PM2.5"];
            }
            else if(e.SiteName === '桃園' && d.properties.TOWN === '楊梅市' && d.properties.COUNTY === '桃園縣'){
                d.properties.value = +e["PM2.5"];
            }
            else if(e.SiteName === '新竹' && d.properties.TOWN === '香山區' && d.properties.COUNTY === '新竹市'){
                d.properties.value = +e["PM2.5"];
            }
            else if(e.SiteName === '基隆' && d.properties.TOWN === '七堵區' && d.properties.COUNTY === '基隆市'){
                d.properties.value = +e["PM2.5"];
            }
            else if(e.SiteName === '苗栗' && d.properties.TOWN === '西湖鄉' && d.properties.COUNTY === '苗栗縣'){
                d.properties.value = +e["PM2.5"];
            }
            else if(e.SiteName === '彰化' && d.properties.TOWN === '田中鎮' && d.properties.COUNTY === '彰化縣'){
                d.properties.value = +e["PM2.5"];
            }
            else if(e.SiteName === '南投' && d.properties.TOWN === '仁愛鄉' && d.properties.COUNTY === '南投縣'){
                d.properties.value = +e["PM2.5"];
            }
            else if(e.SiteName === '嘉義' && d.properties.TOWN === '東區' && d.properties.COUNTY === '嘉義市'){
                d.properties.value = +e["PM2.5"];
            }
            else if(e.SiteName === '臺南' && d.properties.TOWN === '白河區' && d.properties.COUNTY === '臺南市'){
                d.properties.value = +e["PM2.5"];
            }
            else if(e.SiteName === '宜蘭' && d.properties.TOWN === '蘇澳鎮' && d.properties.COUNTY === '宜蘭縣'){
                d.properties.value = +e["PM2.5"];
            }
            else if(e.SiteName === '花蓮' && d.properties.TOWN === '鳳林鎮' && d.properties.COUNTY === '花蓮縣'){
                d.properties.value = +e["PM2.5"];
            }
            else if(e.SiteName === '臺東' && d.properties.TOWN === '卑南鄉' && d.properties.COUNTY === '臺東縣'){
                d.properties.value = +e["PM2.5"];
            }
            else if(e.SiteName === '屏東' && d.properties.TOWN === '泰武鄉' && d.properties.COUNTY === '屏東縣'){
                d.properties.value = +e["PM2.5"];
            }
            else if(e.SiteName === '忠明' && d.properties.TOWN === '西區' && d.properties.COUNTY === '臺中市'){
                d.properties.value = +e["PM2.5"];
            }
            else if(e.SiteName === '陽明' && d.properties.TOWN === '士林區' && d.properties.COUNTY === '臺北市'){
                d.properties.value = +e["PM2.5"];
            }
            else if(e.SiteName === '富貴角' && d.properties.TOWN === '石門區' && d.properties.COUNTY === '新北市'){
                d.properties.value = +e["PM2.5"];
            }
            else if(e.SiteName === '復興' && d.properties.TOWN === '復興鄉'){
                d.properties.value = -10;
            }
            else if(e.SiteName === '復興' && d.properties.TOWN === '前鎮區' && d.properties.COUNTY === '高雄市'){
                d.properties.value = +e["PM2.5"];
            }
            else if(e.SiteName === '馬祖' && d.properties.COUNTY === '連江縣'){
                d.properties.value = +e["PM2.5"];
            }
            else if(e.SiteName === '金門' && d.properties.COUNTY === '金門縣'){
                d.properties.value = +e["PM2.5"];
            }
            else if (e.SiteName+'區' === d.properties.TOWN || e.SiteName+'鄉' === d.properties.TOWN || e.SiteName+'鎮' === d.properties.TOWN || e.SiteName+'市' === d.properties.TOWN) {
                d.properties.value = +e["PM2.5"];
                // console.log(d.properties.TOWN+d.properties.value);
            }
            else if(d.properties.value <=0 || d.properties.value == null){
                d.properties.value = -10;
                // console.log(d.properties.TOWN+d.properties.value);
            }
        })
    })

    jsonOutside = json;
    dataOutside = data;

    var KeelongStr="",
        NewTaipeiStr="",
        TaipeiStr="",
        TaoyuanStr="",
        HsinchuCiStr="";
        HsinchuCouStr="";
        MiaoleeStr="";
        TaichungStr="";
        ChanghwaStr="";
        NantouStr="";
        YunlinStr="";
        ChiayiCouStr="";
        ChiayiCiStr="";
        TainanStr="";
        KaohsiungStr="";
        PingtongStr="";
        YilanStr="";
        HualienStr="";
        TaitongStr="";
        PonghuStr="";
        JinmanStr="";
        LienjongStr="";


        for(var i = 0;data.length>i;i++){
            switch(data[i].County){
               case "基隆市":
                   if(data[i]["PM2.5"]==="")
                       KeelongStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       KeelongStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "新北市":
                   if(data[i]["PM2.5"]==="")
                       NewTaipeiStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       NewTaipeiStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "臺北市":
                   if(data[i]["PM2.5"]==="")
                       TaipeiStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       TaipeiStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "桃園市":
                   if(data[i]["PM2.5"]==="")
                       TaoyuanStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       TaoyuanStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "桃園縣":
                   if(data[i]["PM2.5"]==="")
                       TaoyuanStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       TaoyuanStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "新竹市":
                   if(data[i]["PM2.5"]==="")
                       HsinchuCiStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       HsinchuCiStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "新竹縣":
                   if(data[i]["PM2.5"]==="")
                       HsinchuCouStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       HsinchuCouStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "苗栗縣":
                   if(data[i]["PM2.5"]==="")
                       MiaoleeStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       MiaoleeStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "臺中市":
                   if(data[i]["PM2.5"]==="")
                       TaichungStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       TaichungStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "彰化縣":
                   if(data[i]["PM2.5"]==="")
                       ChanghwaStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       ChanghwaStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "南投縣":
                   if(data[i]["PM2.5"]==="")
                       NantouStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       NantouStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "雲林縣":
                   if(data[i]["PM2.5"]==="")
                       YunlinStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       YunlinStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "嘉義縣":
                   if(data[i]["PM2.5"]==="")
                       ChiayiCouStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       ChiayiCouStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "嘉義市":
                   if(data[i]["PM2.5"]==="")
                       ChiayiCiStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       ChiayiCiStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "臺南市":
                   if(data[i]["PM2.5"]==="")
                       TainanStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       TainanStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "高雄市":
                   if(data[i]["PM2.5"]==="")
                       KaohsiungStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else if(data[i].SiteName ==='前鎮'){}
                   else
                       KaohsiungStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "屏東縣":
                   if(data[i]["PM2.5"]==="")
                       PingtongStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       PingtongStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "宜蘭縣":
                   if(data[i]["PM2.5"]==="")
                       YilanStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       YilanStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "花蓮縣":
                   if(data[i]["PM2.5"]==="")
                       HualienStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       HualienStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "臺東縣":
                   if(data[i]["PM2.5"]==="")
                       TaitongStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       TaitongStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "澎湖縣":
                   if(data[i]["PM2.5"]==="")
                       PonghuStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       PonghuStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "金門縣":
                   if(data[i]["PM2.5"]==="")
                       JinmanStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       JinmanStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               case "連江縣":
                   if(data[i]["PM2.5"]==="")
                       LienjongStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i].Status+'</td></tr>';
                   else
                       LienjongStr += '<tr><td>'+ data[i].SiteName +'</td>'+'<td>'+ data[i]["PM2.5"]+'</td></tr>';
                   break;
               }
           }
               document.querySelector('.KeelongTable').innerHTML = KeelongStr;
               document.querySelector('.NewTaipeiTable').innerHTML = NewTaipeiStr;
               document.querySelector('.TaipeiTable').innerHTML = TaipeiStr;
               document.querySelector('.TaoyuanTable').innerHTML = TaoyuanStr;
               document.querySelector('.HsinchuCiTable').innerHTML = HsinchuCiStr;
               document.querySelector('.HsinchuCouTable').innerHTML = HsinchuCouStr;
               document.querySelector('.MiaoleeTable').innerHTML = MiaoleeStr;
               document.querySelector('.TaichungTable').innerHTML = TaichungStr;
               document.querySelector('.ChanghwaTable').innerHTML = ChanghwaStr;
               document.querySelector('.NantouTable').innerHTML = NantouStr;
               document.querySelector('.YunlinTable').innerHTML = YunlinStr;
               document.querySelector('.ChiayiCouTable').innerHTML = ChiayiCouStr;
               document.querySelector('.ChiayiCiTable').innerHTML = ChiayiCiStr;
               document.querySelector('.TainanTable').innerHTML = TainanStr;
               document.querySelector('.KaohsiungTable').innerHTML = KaohsiungStr;
               document.querySelector('.PingtongTable').innerHTML = PingtongStr;
               document.querySelector('.YilanTable').innerHTML = YilanStr;
               document.querySelector('.HualienTable').innerHTML = HualienStr;
               document.querySelector('.TaitongTable').innerHTML = TaitongStr;
               document.querySelector('.PonghuTable').innerHTML = PonghuStr;
               document.querySelector('.JinmanTable').innerHTML = JinmanStr;
               document.querySelector('.LienjongTable').innerHTML = LienjongStr;

               $('td').click(function(d){
                   var a=0;
                   if(a==0){
                        console.log($(this).text());
                        tableRowClicked($(this).text());
                        a=1;
                   }
                 })



    //Bind data and create one path per GeoJSON feature
    g.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "feature")
        .attr("id", function (d) { return d.properties.TOWN; }) // added id so click could work on id which is common between the json and csv data
        .on("click", function (d, data) {
            click(d);
            console.log(data)
        })
        .style("stroke", "white")
        .style("fill", function (d, i) { return colScale(d.properties.value); }) // fill based on colour scale



    g.append("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("class", "mesh")
        .attr("d", path);
});
}
}

init();

//Notification
var xhr1 = new XMLHttpRequest();
xhr1.open("get","https://api-proxy.noob.tw/http://opendata2.epa.gov.tw/AQI.json",false)
var data1 = {};

xhr1.onload = function(){
    data1 = JSON.parse(xhr1.responseText);
}
xhr1.send();

LocalArea=new Array();
LocalArea[0]=["請由左方選取縣市"];
LocalArea[1]=["基隆"];	// 基隆市
LocalArea[2]=["汐止", "萬里", "新店", "土城", "板橋", "新莊", "菜寮", "林口", "淡水", "三重", "永和", "富貴角"];	// 新北市
LocalArea[3]=["士林", "中山", "萬華", "古亭", "松山", "大同", "陽明"];	// 台北市
LocalArea[4]=["桃園", "大園", "觀音", "平鎮", "龍潭", "中壢"];	// 桃園市
LocalArea[5]=["新竹"];	// 新竹市
LocalArea[6]=["湖口", "竹東"];	// 新竹縣
LocalArea[7]=["頭份", "苗栗", "三義"];	// 苗栗縣
LocalArea[8]=["豐原", "沙鹿", "大里", "忠明", "西屯"];	// 台中市
LocalArea[9]=["彰化", "線西", "二林"];	// 彰化縣
LocalArea[10]=["南投", "竹山", "埔里"];	// 南投縣
LocalArea[11]=["崙背", "斗六", "臺西", "麥寮"];	// 雲林縣
LocalArea[12]=["新港", "朴子"];	// 嘉義縣
LocalArea[13]=["嘉義"];	// 嘉義市
LocalArea[14]=["新營", "善化", "安南", "臺南"];	// 台南市
LocalArea[15]=["美濃", "橋頭", "仁武", "鳳山", "大寮", "林園", "楠梓", "左營", "前金", "前鎮", "小港", "復興"];	// 高雄市
LocalArea[16]=["屏東", "潮州", "恆春"];	// 屏東縣
LocalArea[17]=["宜蘭", "冬山"];	// 宜蘭縣
LocalArea[18]=["花蓮"];	// 花蓮縣
LocalArea[19]=["臺東", "關山"];	// 台東縣
LocalArea[20]=["馬公"];	// 澎湖縣
LocalArea[21]=["金門"];	// 金門縣
LocalArea[22]=["馬祖"];	// 連江縣

function renew(index)
{
	for(var i=0;i<LocalArea[index].length;i++){
        document.Area.LocalArea.options[i]=new Option(LocalArea[index][i], LocalArea[index][i]);	// 設定新選項
    }
	document.Area.LocalArea.length=LocalArea[index].length;	// 刪除多餘的選項
}


function notify()
{
    var x=document.getElementById("LocalArea")
    output = x.options[x.selectedIndex].value
    console.log(output);

    var str1='';
    var str2='';

    for(var i = 0;data1.length>i;i++){
        if(data1[i].SiteName == output){
            str1 = data1[i]['PM2.5'];
            console.log(str1);
        }else{
            str2 = '無此縣市數值';
        }
    }

    if (window.Notification) {
    // 获得权限
	    Notification.requestPermission();
    // 点击按钮
        document.querySelector('#button').addEventListener('click', function () {
            new Notification("PM2.5空汙", {
            body: output +'的PM2.5空汙數值：' + str1,
            icon: 'https://cdn-images-1.medium.com/max/1376/1*sKEYC8jr5TTsM1oxATcUfQ.jpeg'
            });
        });
    } else {
	    document.getElementById('result').innerHTML = '瀏覽器不支持Web Notification';
    }

}

function click(d) {
    if (active === d) return reset();
    g.selectAll(".active").classed("active", false);
    d3.select("#" + d.properties.TOWN).classed("active", active = d); // changed selection to id

    var b = path.bounds(d);
    g.transition().duration(1200).attr("transform",
        "translate(" + projection.translate() + ")"
        + "scale(" + .95 / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / h) + ")"
        + "translate(" + -(b[1][0] + b[0][0]) / 2 + "," + -(b[1][1] + b[0][1]) / 2 + ")");


    dataOutside.forEach(function(e){
        if(e.SiteName === '古亭' && d.properties.TOWN === '中正區' && d.properties.COUNTY === '臺北市'){
            document.querySelector('.one').innerHTML = "<div>" +e.County +' '+ e.SiteName + "</div>" + "<p>" + e.PublishTime + "</p>" + "<p>污染物：" + e["Pollutant"] + "</p>" + "<p>空氣品質：" + e["Status"] + "</p>" + "<p>PM2.5：" + e["PM2.5"] + "</p>" + "<p>PM10：" + e["PM10"] + "</p>" + "<p>SO2：" + e["SO2"] + "</p>";
        }
        else if(e.SiteName === '桃園' && d.properties.TOWN === '楊梅市' && d.properties.COUNTY === '桃園縣'){
            document.querySelector('.one').innerHTML = "<div>" +e.County +' '+ e.SiteName + "</div>" + "<p>" + e.PublishTime + "</p>" + "<p>污染物：" + e["Pollutant"] + "</p>" + "<p>空氣品質：" + e["Status"] + "</p>" + "<p>PM2.5：" + e["PM2.5"] + "</p>" + "<p>PM10：" + e["PM10"] + "</p>" + "<p>SO2：" + e["SO2"] + "</p>";
        }
        else if(e.SiteName === '新竹' && d.properties.TOWN === '香山區' && d.properties.COUNTY === '新竹市'){
            document.querySelector('.one').innerHTML = "<div>" +e.County +' '+ e.SiteName + "</div>" + "<p>" + e.PublishTime + "</p>" + "<p>污染物：" + e["Pollutant"] + "</p>" + "<p>空氣品質：" + e["Status"] + "</p>" + "<p>PM2.5：" + e["PM2.5"] + "</p>" + "<p>PM10：" + e["PM10"] + "</p>" + "<p>SO2：" + e["SO2"] + "</p>";
        }
        else if(e.SiteName === '基隆' && d.properties.TOWN === '七堵區' && d.properties.COUNTY === '基隆市'){
            document.querySelector('.one').innerHTML = "<div>" +e.County +' '+ e.SiteName + "</div>" + "<p>" + e.PublishTime + "</p>" + "<p>污染物：" + e["Pollutant"] + "</p>" + "<p>空氣品質：" + e["Status"] + "</p>" + "<p>PM2.5：" + e["PM2.5"] + "</p>" + "<p>PM10：" + e["PM10"] + "</p>" + "<p>SO2：" + e["SO2"] + "</p>";
        }
        else if(e.SiteName === '苗栗' && d.properties.TOWN === '西湖鄉' && d.properties.COUNTY === '苗栗縣'){
            document.querySelector('.one').innerHTML = "<div>" +e.County +' '+ e.SiteName + "</div>" + "<p>" + e.PublishTime + "</p>" + "<p>污染物：" + e["Pollutant"] + "</p>" + "<p>空氣品質：" + e["Status"] + "</p>" + "<p>PM2.5：" + e["PM2.5"] + "</p>" + "<p>PM10：" + e["PM10"] + "</p>" + "<p>SO2：" + e["SO2"] + "</p>";
        }
        else if(e.SiteName === '彰化' && d.properties.TOWN === '田中鎮' && d.properties.COUNTY === '彰化縣'){
            document.querySelector('.one').innerHTML = "<div>" +e.County +' '+ e.SiteName + "</div>" + "<p>" + e.PublishTime + "</p>" + "<p>污染物：" + e["Pollutant"] + "</p>" + "<p>空氣品質：" + e["Status"] + "</p>" + "<p>PM2.5：" + e["PM2.5"] + "</p>" + "<p>PM10：" + e["PM10"] + "</p>" + "<p>SO2：" + e["SO2"] + "</p>";
        }
        else if(e.SiteName === '南投' && d.properties.TOWN === '仁愛鄉' && d.properties.COUNTY === '南投縣'){
            document.querySelector('.one').innerHTML = "<div>" +e.County +' '+ e.SiteName + "</div>" + "<p>" + e.PublishTime + "</p>" + "<p>污染物：" + e["Pollutant"] + "</p>" + "<p>空氣品質：" + e["Status"] + "</p>" + "<p>PM2.5：" + e["PM2.5"] + "</p>" + "<p>PM10：" + e["PM10"] + "</p>" + "<p>SO2：" + e["SO2"] + "</p>";
        }
        else if(e.SiteName === '嘉義' && d.properties.TOWN === '東區' && d.properties.COUNTY === '嘉義市'){
            document.querySelector('.one').innerHTML = "<div>" +e.County +' '+ e.SiteName + "</div>" + "<p>" + e.PublishTime + "</p>" + "<p>污染物：" + e["Pollutant"] + "</p>" + "<p>空氣品質：" + e["Status"] + "</p>" + "<p>PM2.5：" + e["PM2.5"] + "</p>" + "<p>PM10：" + e["PM10"] + "</p>" + "<p>SO2：" + e["SO2"] + "</p>";
        }
        else if(e.SiteName === '臺南' && d.properties.TOWN === '白河區' && d.properties.COUNTY === '臺南市'){
            document.querySelector('.one').innerHTML = "<div>" +e.County +' '+ e.SiteName + "</div>" + "<p>" + e.PublishTime + "</p>" + "<p>污染物：" + e["Pollutant"] + "</p>" + "<p>空氣品質：" + e["Status"] + "</p>" + "<p>PM2.5：" + e["PM2.5"] + "</p>" + "<p>PM10：" + e["PM10"] + "</p>" + "<p>SO2：" + e["SO2"] + "</p>";
        }
        else if(e.SiteName === '宜蘭' && d.properties.TOWN === '蘇澳鎮' && d.properties.COUNTY === '宜蘭縣'){
            document.querySelector('.one').innerHTML = "<div>" +e.County +' '+ e.SiteName + "</div>" + "<p>" + e.PublishTime + "</p>" + "<p>污染物：" + e["Pollutant"] + "</p>" + "<p>空氣品質：" + e["Status"] + "</p>" + "<p>PM2.5：" + e["PM2.5"] + "</p>" + "<p>PM10：" + e["PM10"] + "</p>" + "<p>SO2：" + e["SO2"] + "</p>";
        }
        else if(e.SiteName === '花蓮' && d.properties.TOWN === '鳳林鎮' && d.properties.COUNTY === '花蓮縣'){
            document.querySelector('.one').innerHTML = "<div>" +e.County +' '+ e.SiteName + "</div>" + "<p>" + e.PublishTime + "</p>" + "<p>污染物：" + e["Pollutant"] + "</p>" + "<p>空氣品質：" + e["Status"] + "</p>" + "<p>PM2.5：" + e["PM2.5"] + "</p>" + "<p>PM10：" + e["PM10"] + "</p>" + "<p>SO2：" + e["SO2"] + "</p>";
        }
        else if(e.SiteName === '臺東' && d.properties.TOWN === '卑南鄉' && d.properties.COUNTY === '臺東縣'){
            document.querySelector('.one').innerHTML = "<div>" +e.County +' '+ e.SiteName + "</div>" + "<p>" + e.PublishTime + "</p>" + "<p>污染物：" + e["Pollutant"] + "</p>" + "<p>空氣品質：" + e["Status"] + "</p>" + "<p>PM2.5：" + e["PM2.5"] + "</p>" + "<p>PM10：" + e["PM10"] + "</p>" + "<p>SO2：" + e["SO2"] + "</p>";
        }
        else if(e.SiteName === '屏東' && d.properties.TOWN === '泰武鄉' && d.properties.COUNTY === '屏東縣'){
            document.querySelector('.one').innerHTML = "<div>" +e.County +' '+ e.SiteName + "</div>" + "<p>" + e.PublishTime + "</p>" + "<p>污染物：" + e["Pollutant"] + "</p>" + "<p>空氣品質：" + e["Status"] + "</p>" + "<p>PM2.5：" + e["PM2.5"] + "</p>" + "<p>PM10：" + e["PM10"] + "</p>" + "<p>SO2：" + e["SO2"] + "</p>";
        }
        else if(e.SiteName === '忠明' && d.properties.TOWN === '西區' && d.properties.COUNTY === '臺中市'){
            document.querySelector('.one').innerHTML = "<div>" +e.County +' '+ e.SiteName + "</div>" + "<p>" + e.PublishTime + "</p>" + "<p>污染物：" + e["Pollutant"] + "</p>" + "<p>空氣品質：" + e["Status"] + "</p>" + "<p>PM2.5：" + e["PM2.5"] + "</p>" + "<p>PM10：" + e["PM10"] + "</p>" + "<p>SO2：" + e["SO2"] + "</p>";
        }
        else if(e.SiteName === '陽明' && d.properties.TOWN === '士林區' && d.properties.COUNTY === '臺北市'){
            document.querySelector('.one').innerHTML = "<div>" +e.County +' '+ e.SiteName + "</div>" + "<p>" + e.PublishTime + "</p>" + "<p>污染物：" + e["Pollutant"] + "</p>" + "<p>空氣品質：" + e["Status"] + "</p>" + "<p>PM2.5：" + e["PM2.5"] + "</p>" + "<p>PM10：" + e["PM10"] + "</p>" + "<p>SO2：" + e["SO2"] + "</p>";
        }
        else if(e.SiteName === '復興' && d.properties.TOWN === '前鎮區' && d.properties.COUNTY === '高雄市'){
            document.querySelector('.one').innerHTML = "<div>" +e.County +' '+ e.SiteName + "</div>" + "<p>" + e.PublishTime + "</p>" + "<p>污染物：" + e["Pollutant"] + "</p>" + "<p>空氣品質：" + e["Status"] + "</p>" + "<p>PM2.5：" + e["PM2.5"] + "</p>" + "<p>PM10：" + e["PM10"] + "</p>" + "<p>SO2：" + e["SO2"] + "</p>";
        }
        else if(e.SiteName === '富貴角' && d.properties.TOWN === '石門區' && d.properties.COUNTY === '新北市'){
            document.querySelector('.one').innerHTML = "<div>" +e.County +' '+ e.SiteName + "</div>" + "<p>" + e.PublishTime + "</p>" + "<p>污染物：" + e["Pollutant"] + "</p>" + "<p>空氣品質：" + e["Status"] + "</p>" + "<p>PM2.5：" + e["PM2.5"] + "</p>" + "<p>PM10：" + e["PM10"] + "</p>" + "<p>SO2：" + e["SO2"] + "</p>";
        }
        else if(e.SiteName === '馬祖' && d.properties.COUNTY === '連江縣'){
            document.querySelector('.one').innerHTML = "<div>" +e.County +' '+ e.SiteName + "</div>" + "<p>" + e.PublishTime + "</p>" + "<p>污染物：" + e["Pollutant"] + "</p>" + "<p>空氣品質：" + e["Status"] + "</p>" + "<p>PM2.5：" + e["PM2.5"] + "</p>" + "<p>PM10：" + e["PM10"] + "</p>" + "<p>SO2：" + e["SO2"] + "</p>";
        }
        else if(e.SiteName === '金門' && d.properties.COUNTY === '金門縣'){
            document.querySelector('.one').innerHTML = "<div>" +e.County +' '+ e.SiteName + "</div>" + "<p>" + e.PublishTime + "</p>" + "<p>污染物：" + e["Pollutant"] + "</p>" + "<p>空氣品質：" + e["Status"] + "</p>" + "<p>PM2.5：" + e["PM2.5"] + "</p>" + "<p>PM10：" + e["PM10"] + "</p>" + "<p>SO2：" + e["SO2"] + "</p>";
        }
        else if (e.SiteName + '區' ===  d.properties.TOWN || e.SiteName + '鄉' ===  d.properties.TOWN || e.SiteName + '鎮' ===  d.properties.TOWN || e.SiteName + '市' ===  d.properties.TOWN ){
            document.querySelector('.one').innerHTML = "<div>" +e.County +' '+e.SiteName + "</div>" + "<p>" + e.PublishTime + "</p>" + "<p>污染物：" + e["Pollutant"] + "</p>" + "<p>空氣品質：" + e["Status"] + "</p>" + "<p>PM2.5：" + e["PM2.5"] + "</p>" + "<p>PM10：" + e["PM10"] + "</p>" + "<p>SO2：" + e["SO2"] + "</p>";
        }
        else if (d.properties.value <=0 || d.properties.value == null){
            document.querySelector('.one').innerHTML = "<div>" +d.properties.COUNTY +' '+ d.properties.TOWN + "</div>" + "<p>無資料</p>";
        }
        $('.one').show();
    });
}

function reset() {
    g.selectAll(".active").classed("active", active = false);
    g.transition().duration(750).attr("transform", "");
}

function tableRowClicked(x) {
    jsonOutside.features.forEach(function (d) { // loop through json data to match td entry
        // console.log(x);
        switch(x){
            case "菜寮":
                x= "三重";
                break;
            case "桃園":
                x= "楊梅";
                break;
            case "新竹":
                x= "香山";
                break;
            case "苗栗":
                x= "西湖";
                break;
            case "彰化":
                x= "田中";
                break;
            case "南投":
                x= "仁愛";
                break;
            case "嘉義":
                x= "東";
                break;
            case "臺南":
                x= "白河";
                break;
            case "宜蘭":
                x= "蘇澳";
                break;
            case "花蓮":
                x= "鳳林";
                break;
            case "古亭":
                x= "中正";
                break;
            case "臺東":
                x= "卑南";
                break;
            case "忠明":
                x= "西";
                break;
            case "陽明":
                x= "士林";
                break;
            case "富貴角":
                x= "石門";
                break;
            case "復興":
                x= "前鎮";
                break;
            case "屏東":
                x= "泰武";
                break;
            case "馬祖":
                x= "連江";
                break;
        }
        if(x === '東' && x + '區' === d.properties.TOWN && d.properties.COUNTY === '嘉義市'){
            var county = d;
            console.log(x,d);
            click(d); 
        }
        else if (x +'區' === d.properties.TOWN || x+'鄉' === d.properties.TOWN || x+'鎮' === d.properties.TOWN || x+'市' === d.properties.TOWN) {
            var county = d;
            console.log(x,d);
            click(d); // pass json element that matches td data to click
        }
        if (x +'市' === d.properties.COUNTY || x +'縣' === d.properties.COUNTY) {
            var county = d;
            console.log(x,d);
            click(d); // pass json element that matches td data to click
        };
    })
}

