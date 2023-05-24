

var bar_button = document.querySelector("#bar-search") // 这里写


bar_button.addEventListener("click",mybar);


function mybar() {
      

        var bar_vin = document.querySelector(".bar #vinsearch");
   
        mybar_data_draw("detail_error_volumn_code_clipped.csv", bar_vin.value);

        };


function mybar_data_draw(file, vin_search){
            d3.csv(file)
                .then(function(csvdata){
                    return csvdata.filter(function(d){
                        return d.VIN==vin_search;
                                    })
                    })
                .then(function(csv_filtered){
                    var cols_tech = ['1003','1004','1005','1006', '1007', '1008','1009', '1010', '1011', '1012','1013'];
                    var cols_buz = ['2002', '2003','2004','2005','2007', '2008','2009', '2010', '2011', '2012','2013','2014','2015'];
                    var cols_stastic = ['3001', '3002', '3003','3005'];
                    var cols_total= ['Time_steps_volumn'];

                    // Filter out unwanted columns
                    var filtered_ob = csv_filtered.map(function(d) {
                        var filtered_list = [];
                        var filteredObject_tech = {};
                        var filteredObject_buz = {};
                        var filteredObject_stastic = {};
                        var filteredObject_total = {};

                        cols_tech.forEach(function(column) {
                          filteredObject_tech[column] = d[column];
                        });

                        cols_buz.forEach(function(column) {
                          filteredObject_buz[column] = d[column];
                        });
                        cols_stastic.forEach(function(column) {
                          filteredObject_stastic[column] = d[column];
                        });
                        cols_total.forEach(function(column) {
                          filteredObject_total[column] = d[column];
                        });

                        filtered_list.push(filteredObject_tech);
                        filtered_list.push(filteredObject_buz);
                        filtered_list.push(filteredObject_stastic);
                        filtered_list.push(filteredObject_total);

                        return filtered_list//, filteredObject_buz, filteredObject_stastic, filteredObject_total
                    
                });
                   draw_bar(filtered_ob);

                });



                    
           
function draw_bar(data_object){


    num_tech = data_object.map(function(d,i){return turnNum((Object.values(d[0])));});//function in map have to use return 
    num_buz = data_object.map(function(d,i){return turnNum((Object.values(d[1])));});//function in map have to use return 
    num_st = data_object.map(function(d,i){return turnNum((Object.values(d[2])));});//function in map have to use return 
    num_total = data_object.map(function(d,i){return turnNum((Object.values(d[3])));});//function in map have to use return 

    num_total_sum = arraysum(num_total);
    num_tech_sum = arraysum(num_tech).map(d=>Number((d*100/num_total_sum[0]).toFixed(2)));
    num_buz_sum = arraysum(num_buz).map(d=>Number((d*100/num_total_sum[0]).toFixed(2)));
    num_st_sum = arraysum(num_st).map(d=>Number((d*100/num_total_sum[0]).toFixed(2)));
    
    
    col_tech = Object.keys(data_object[0][0]);
    col_buz = Object.keys(data_object[0][1]);
    col_st = Object.keys(data_object[0][2]);
    

    //draw
    
    var pie_charts = document.querySelectorAll('.bar .allcharts .sub_row .chart');

    var myChart_tech = echarts.init(pie_charts[0]);
   
    var myChart_buz = echarts.init(pie_charts[1]);
    var myChart_stastic = echarts.init(pie_charts[2]);
 

     // 指定图表的配置项和数据
        var option_tech = {

            title:{
                text:'Tech. Index',
                
                top:'3%',
                left:'center',
                textStyle:{
                    fontSize: 18,
                    fontWeight: 'bold', // Set the desired font weight
                    fontFamily: 'Arial', // Set the desired font family; use family incase override by body font setup
                    color:'white',
                },
                show: true,
                //padding:[0,0,0,0],             //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
            },
//标题
            tooltip: {
                trigger: 'item',
                textStyle:{fontSize:15,fontFamily: 'Arial',},
                formatter: '{b}: ({c}%)'//"{a} <br/>{b}: {c} ({d}%)"，
                /*formatter:function(val){   //让series 中的文字进行换行
                     console.log(val);//查看val属性，可根据里边属性自定义内容
                     var content = val['name'];
                     return content;//返回可以含有html中标签
                 },*/ //自定义鼠标悬浮交互信息提示，鼠标放在饼状图上时触发事件
            },//提示框，鼠标悬浮交互时的信息提示*/
        
           grid:{
                show:true,                 //---是否显示直角坐标系网格
                top:'15%',    // 一下数值可为百分比也可为具体像素值,                     //---相对位置，top\bottom\left\right  
                right:'5%',
                left:'5%',
                bottom:'5%',
                containLabel:true,          //---grid 区域是否包含坐标轴的刻度标签
                tooltip:{                   //---鼠标焦点放在图形上，产生的提示框
                    show:true,  
                    trigger:'item',         //---触发类型
                    textStyle:{
                        color:'white',
                    },
                },

            splitLine: {show: true,},
            splitArea: {show: true,},

            },

            graphic:{
                type:'image',
                left:'50%',// position the image at the center of the grid horizontally
                top:'50%',//position the image at the center of the grid vertically

            },
       //-------------   x轴   -------------------
            xAxis: {
                //barGap:'10%',
                barCategoryGap:'10%',//---柱形间距
                axisLine: {show: false},
                axisTick: {show: false},//hide tick on axis line

                show:true,
                color:'white',                  //---是否显示
                position:'bottom',          //---x轴位置
                offset:0,                   //---x轴相对于默认位置的偏移
                type:'category',            //---轴类型，默认'category'
                //name:'items',              //---轴名称
                nameLocation:'end',         //---轴名称相对位置
                        
                data: col_tech,

                axisLabel:{                 //---坐标轴 标签
                    fontSize:12,
                    fontFamily: 'Arial',
                    color:'white',  

                    show:true,                  //---是否显示
                    inside:false,               //---是否朝内
                    rotate:45,                   //---旋转角度   
                    margin: 8,                  //---刻度标签与轴线之间的距离
                    left:2,
                //color:'red',              //---默认取轴线的颜色
                },
                    
            },

            //----------------------  y轴  ------------------------
            yAxis: {
                show:true,  
                color:'white',             //---是否显示
                position:'left',            //---y轴位置
                offset:-5,                   //---y轴相对于默认位置的偏移
                type:'value',           //---轴类型，默认'category'
                name:'ratio(%)',              //---轴名称
                nameLocation:'end',         //---轴名称相对位置value
                nameTextStyle:{             //---坐标轴名称样式
                    color:"white",
                    padding:[5,0,0,5],  //---坐标轴名称相对位置
                },
                nameGap:15,                 //---坐标轴名称与轴线之间的距离
                //nameRotate:270,           //---坐标轴名字旋转
                axisLine: {show: false},
                axisTick: {show: false},//hide tick on axis line
                splitLine: {show: false},//hide split line of y axis
               
               
                axisLabel:{                 //---坐标轴 标签
                    fontSize:12,
                    fontFamily: 'Arial',

                    show:true,                  //---是否显示
                    inside:false,               //---是否朝内
                    rotate:0,                   //---旋转角度   
                    margin: 8,                  //---刻度标签与轴线之间的距离
                    color:'white',              //---默认取轴线的颜色
                },

                min: 0, // set the minimum value of y-axis
                max: 100 // set the maximum value of y-axis
                                      
            },



        /*color: ['#62C467','#278D65','#FF5B7A','#BC3535',
                              '#FFF600','#D69105',
                              '#FFB400','#F66800',
                              '#00CCFF','#2A54B4',
                              '#F75271','#754ABF'],*/
        color: 'white',
                           
        series: [
            {
                //name:'Item counting',//tooltip提示框中显示内容
            type: 'bar',//图形类型，如饼状图，柱状图等
 
            center: ['50%', '70%'],//control pie postion in dom/div; chart is centered horizontally in the middle of the div element and vertically positioned 60% from the top of the div element.
            data: num_tech_sum,//数据，数据中其他属性，查阅文档
            barWidth: '15',

     
            },
        ],
    };
            

        // 使用刚指定的配置项和数据显示图表。
    

    option_buz = JSON.parse(JSON.stringify(option_tech));
    option_stastic = JSON.parse(JSON.stringify(option_tech));
    
    

    
  

    option_buz.series[0].data = num_buz_sum;
    option_buz.xAxis.data = col_buz;
    option_buz.title.text = 'Business Index';

    option_stastic.series[0].data = num_st_sum;
    option_stastic.xAxis.data = col_st;
    option_stastic.title.text = 'Stastic Index';


    // 使用刚指定的配置项和数据显示图表。
    myChart_tech.setOption(option_tech);
    myChart_buz.setOption(option_buz);
    myChart_stastic.setOption(option_stastic);


    window.addEventListener("resize", function(){
        myChart_tech.resize();
        myChart_buz.resize();
        myChart_stastic.resize();
    });

};
};

//arrays sum
function arraysum(arrays){

    if(arrays.length === 0){
        return []
    };

    let array_sum = Array(arrays[0].length).fill(0);
    arrays.map((d)=>d.map(function(e,i){array_sum[i] += e}));
    return array_sum;
};

//change array to numbers: nums: array['','']
function turnNum(nums){
    return nums.map(Number);
};
