

var bar_button = document.querySelector("#bar-search") // 这里写


bar_button.addEventListener("click",mybar);


function mybar() {
      

        var bar_vin = document.querySelector(".bar #vinsearch");
   
        mybar_data_draw("detail_error_ratio.csv", bar_vin.value);

        };


function mybar_data_draw(file, vin_search){
            d3.csv(file)
                .then(function(csvdata){
                    return csvdata.filter(function(d){
                        return d.VIN==vin_search;
                                    })
                    })
                .then(function(csv_filtered){
                    draw_bar(csv_filtered);
                    
                        })
                 
            };

function draw_bar(data_object){


    a_num = data_object.map(function(d,i){return turnNum((Object.values(d)).slice(6));});//function in map have to use return 

    data_sum_all = arraysum(a_num);
    data_sum = data_sum_all.slice(1).map(d=>Number((d*100/data_sum_all[0]).toFixed(2)))

    item_columns = Object.keys(data_object[0]).slice(7)
    //pie_data = array_sum.map(function(d,i){return {value:d, name:a_columns[i]};});
    


    //draw
    
    var pie_charts = document.querySelectorAll('.bar .allcharts .sub_row .chart');

    var myChart_common = echarts.init(pie_charts[0]);
    
    var myChart_mileage = echarts.init(pie_charts[3]);
    var myChart_voltage_temperature = echarts.init(pie_charts[1]);
    var myChart_time_diff = echarts.init(pie_charts[2]);
    var myChart_speed = echarts.init(pie_charts[4]);
    var myChart_gps = echarts.init(pie_charts[5]);
    var myChart_soc = echarts.init(pie_charts[6]);

     // 指定图表的配置项和数据
        var option_common = {
                            title:{
                                text:'Common items',
                                
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
            formatter: '{b}<br/>{a}: ({c}%)'//"{a} <br/>{b}: {c} ({d}%)"，
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
                        
                data: item_columns.slice(0,6).map(d=>d.split("_error").slice(0,1)),//内容

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

            graphic:{
            type:'image',
            left:'50%',// position the image at the center of the grid horizontally
            top:'50%',//position the image at the center of the grid vertically

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
            data: data_sum.slice(0,6),//数据，数据中其他属性，查阅文档
            barWidth: '15',

     
            },

        ],
       

    };
        

        // 使用刚指定的配置项和数据显示图表。
    

    option_mileage = JSON.parse(JSON.stringify(option_common));
    option_vt = JSON.parse(JSON.stringify(option_common));
    option_time_diff = JSON.parse(JSON.stringify(option_common));
    option_speed = JSON.parse(JSON.stringify(option_common));
    option_gps = JSON.parse(JSON.stringify(option_common));
    option_soc = JSON.parse(JSON.stringify(option_common));
    

    
  

    option_mileage.series[0].data = data_sum.slice(6,12)
    option_mileage.xAxis.data = item_columns.slice(6,12).map(d=>d.split(",")[1].split('_err')[0].split('(')[0])
    option_mileage.title.text = 'mileage/vin'

    //option_vt .series[0].data = data_sum.slice(8,14)
    //option_vt .xAxis.data = item_columns.slice(8,14)
    option_vt.series[0].data = 0
    option_vt.series.push({name:"Null_error", type:"bar",  data:[data_sum[13], data_sum[18]]});
    option_vt.series.push({name:"Invalid", type:"bar",  data:[data_sum[14], data_sum[19]]});
    option_vt.series.push({name:"Abnormal", type:"bar",  data:[data_sum[15], data_sum[20]]})
    option_vt.series.push({name:"Unmatched_max", type:"bar",  data:[data_sum[16], data_sum[21]]})
    option_vt.series.push({name:"Unmatched_min", type:"bar",  data:[data_sum[17], data_sum[22]]})

  
  
 
 
    option_vt.xAxis.data = ['voltage', 'temperature']
    option_vt.title.text = 'voltage_temperature/vin'
    option_vt.xAxis.axisLabel.rotate = 0;
    option_vt.legend = {data:["Null_error","Invalid","Abnormal","Unmatched_max","Unmatched_min"],
                        top:40,
                        icon: 'rect',
                        left:50,
                        itemWidth: 10,
                        itemHeight: 5,
                        itemGap: 3,
                        textStyle: {
                            fontSize: 12,
                            //fontWeight: 'bold',
                            color:'white',
                            },
                  
                        orient: 'vertical',//distributed in row
                  

                        }


    

    
    option_time_diff.series[0].data = 0
    option_time_diff.series.push({name:"Time-diff_30s-2min", type:"bar", data:[data_sum[23], data_sum[26]]})
    option_time_diff.series.push({name:"Time-diff_>10min", type:"bar", data:[data_sum[24], data_sum[27]]})
    option_time_diff.series.push({name:"Time_duplicated", type:"bar", data:[data_sum[25], data_sum[28]]})
    option_time_diff.xAxis.data = ['Sending Time', 'Recive Time']
    option_time_diff.xAxis.axisLabel.rotate = 0;
    option_time_diff.title.text = 'time_differance/vin'

    option_time_diff.legend = {data:["Time-diff_30s-2min","Time-diff_>10min","Time_duplicated"],
                        top:40,
                        icon: 'rect',
                        left:50,
                        itemWidth: 10,
                        itemHeight: 5,
                        itemGap: 3,
                        textStyle: {
                        fontSize: 12,
                
                        color:'white',
                            },
                  
                        orient: 'vertical',//distributed in row
                        }










    option_speed.series[0].data = data_sum.slice(29,34)
    option_speed.xAxis.data = item_columns.slice(29,34).map(d=>d.split(",")[1].split('_err')[0].split('(')[0])
    option_speed.title.text = 'Speed/vin'

    option_gps.series[0].data = data_sum.slice(34,37)
    option_gps.xAxis.data = item_columns.slice(34,37).map(d=>d.split(",")[1].split('_err')[0].split('(')[0])
    option_gps.title.text = 'GPS/vin'

    option_soc.series[0].data = data_sum.slice(-3)
    option_soc.xAxis.data = item_columns.slice(-3).map(d=>d.split(",")[1].split('_err')[0].split('(')[0])
    option_soc.title.text = 'SOC/vin'



          
    // 使用刚指定的配置项和数据显示图表。
    myChart_common.setOption(option_common);
    myChart_voltage_temperature.setOption(option_vt);

    myChart_mileage.setOption(option_mileage);
    myChart_time_diff.setOption(option_time_diff);
    myChart_speed.setOption(option_speed);
    myChart_soc.setOption(option_soc);
    myChart_gps.setOption(option_gps);


    window.addEventListener("resize", function(){
        myChart_common.resize();
        myChart_voltage_temperature.resize();
        myChart_mileage.resize();
        myChart_soc.resize();
        myChart_gps.resize();
        myChart_time_diff.resize();
        myChart_speed.resize();
    });

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
    return nums.map(Number)
};

