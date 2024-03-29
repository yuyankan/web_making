

var pie_button = document.querySelector("#bar-search") // 这里写


pie_button.addEventListener("click",draw_bar);


function mybar() {
      

        var bar_vin = document.querySelector(".bar #vinsearch");
   
        mybar_data_draw("data_test.csv", bar_vin.value);

        };


function mybar_data_draw(file, vin_search){
            d3.csv(file)
                .then(function(csvdata){
                    return csvdata.filter(function(d){
                        return d.vin==vin_search;
                                    })
                    })
                .then(function(csv_filtered){
                    draw_bar(csv_filtered);
                    
                        })
                 
            };

function draw_bar(){
    data_object = [{"platform":"cma","soft_version":"1","vin":"h1","date_week":"2023-W10","error1":"1","error2":"2","error3":"3","error4":"4","error5":"5","error6":"6","error7":"7","error8":"8","error9":"9","error10":"10"},{"platform":"cma","soft_version":"1","vin":"h2","date_week":"2023-W10","error1":"2","error2":"3","error3":"4","error4":"5","error5":"6","error6":"7","error7":"8","error8":"9","error9":"10","error10":"11"}]


    a_num = data_object.map(function(d,i){return turnNum((Object.values(d)).slice(4));});//function in map have to use return 

    array_sum = arraysum(a_num);
    a_columns = Object.keys(data_object[0]).slice(4)
    //pie_data = array_sum.map(function(d,i){return {value:d, name:a_columns[i]};});
    a = {"('platform', 'Unnamed: 0_level_1')":{"0":"cma","1":"cma","2":"cma","3":"cma","4":"spa","5":"spa","6":"spa","7":"spa","8":"spa","9":"spa","10":"spa","11":"spa","12":"spa"},"('soft_version', 'Unnamed: 1_level_1')":{"0":1,"1":1,"2":1,"3":2,"4":1,"5":1,"6":1,"7":2,"8":2,"9":2,"10":2,"11":3,"12":3},"('vin', 'Unnamed: 2_level_1')":{"0":"h1","1":"h2","2":"h3","3":"h4","4":"h11","5":"h12","6":"h9","7":"h13","8":"h5","9":"h6","10":"h9","11":"h7","12":"h8"},"('date_week', 'Unnamed: 3_level_1')":{"0":"23-W10","1":"23-W10","2":"23-W12","3":"23-W13","4":"23-W19","5":"23-W19","6":"23-W19","7":"23-W18","8":"23-W13","9":"23-W15","10":"23-W18","11":"23-W16","12":"23-W16"},"('vin_error_all_0', 'Unnamed: 4_level_1')":{"0":1,"1":2,"2":3,"3":4,"4":11,"5":12,"6":10,"7":13,"8":5,"9":6,"10":9,"11":7,"12":8},"('no_data', 'Unnamed: 5_level_1')":{"0":2,"1":3,"2":4,"3":5,"4":12,"5":13,"6":11,"7":14,"8":6,"9":7,"10":10,"11":8,"12":9},"('unvalid', 'Unnamed: 6_level_1')":{"0":3,"1":4,"2":5,"3":6,"4":13,"5":14,"6":12,"7":15,"8":7,"9":8,"10":11,"11":9,"12":10},"('abnormal', 'Unnamed: 7_level_1')":{"0":4,"1":5,"2":6,"3":7,"4":14,"5":15,"6":13,"7":16,"8":8,"9":9,"10":12,"11":10,"12":11},"('empty_data', 'Unnamed: 8_level_1')":{"0":5,"1":6,"2":7,"3":8,"4":15,"5":16,"6":14,"7":17,"8":9,"9":10,"10":13,"11":11,"12":12},"('make_up_data', 'Unnamed: 9_level_1')":{"0":6,"1":7,"2":8,"3":9,"4":16,"5":17,"6":15,"7":18,"8":10,"9":11,"10":14,"11":12,"12":13},"('time_diff_error', 'Unnamed: 10_level_1')":{"0":7,"1":8,"2":9,"3":10,"4":17,"5":18,"6":16,"7":19,"8":11,"9":12,"10":15,"11":13,"12":14},"('voltage', 'unmath')":{"0":8,"1":9,"2":10,"3":11,"4":18,"5":19,"6":17,"7":20,"8":12,"9":13,"10":16,"11":14,"12":15},"('voltage', 'unvalid')":{"0":9,"1":10,"2":11,"3":12,"4":19,"5":20,"6":18,"7":21,"8":13,"9":14,"10":17,"11":15,"12":16},"('voltage', 'empty_data')":{"0":10,"1":11,"2":12,"3":13,"4":20,"5":21,"6":19,"7":22,"8":14,"9":15,"10":18,"11":16,"12":17},"('temperature', 'unmath')":{"0":4,"1":5,"2":6,"3":7,"4":14,"5":15,"6":13,"7":16,"8":8,"9":9,"10":12,"11":10,"12":11},"('temperature', 'unvalid')":{"0":5,"1":6,"2":7,"3":8,"4":15,"5":16,"6":14,"7":17,"8":9,"9":10,"10":13,"11":11,"12":12},"('temperature', 'empty_data')":{"0":6,"1":7,"2":8,"3":9,"4":16,"5":17,"6":15,"7":18,"8":10,"9":11,"10":14,"11":12,"12":13},"('time_diff', '30s_2min')":{"0":7,"1":8,"2":9,"3":10,"4":17,"5":18,"6":16,"7":19,"8":11,"9":12,"10":15,"11":13,"12":14},"('time_diff', '10mim')":{"0":8,"1":9,"2":10,"3":11,"4":18,"5":19,"6":17,"7":20,"8":12,"9":13,"10":16,"11":14,"12":15},"('time_diff', 'duplicated')":{"0":9,"1":10,"2":11,"3":12,"4":19,"5":20,"6":18,"7":21,"8":13,"9":14,"10":17,"11":15,"12":16},"('soc', 'empty_data')":{"0":10,"1":11,"2":12,"3":13,"4":20,"5":21,"6":19,"7":22,"8":14,"9":15,"10":18,"11":16,"12":17},"('soc', 'finished_no_100')":{"0":1,"1":2,"2":3,"3":4,"4":11,"5":12,"6":10,"7":13,"8":5,"9":6,"10":9,"11":7,"12":8},"('soc', 'no_0_100')":{"0":2,"1":3,"2":4,"3":5,"4":12,"5":13,"6":11,"7":14,"8":6,"9":7,"10":10,"11":8,"12":9},"('gps', 'empty_data')":{"0":3,"1":4,"2":5,"3":6,"4":13,"5":14,"6":12,"7":15,"8":7,"9":8,"10":11,"11":9,"12":10},"('gps', 'unvalid')":{"0":4,"1":5,"2":6,"3":7,"4":14,"5":15,"6":13,"7":16,"8":8,"9":9,"10":12,"11":10,"12":11},"('gps', 'west_south')":{"0":5,"1":6,"2":7,"3":8,"4":15,"5":16,"6":14,"7":17,"8":9,"9":10,"10":13,"11":11,"12":12},"('mileakage', 'empty_data')":{"0":6,"1":7,"2":8,"3":9,"4":16,"5":17,"6":15,"7":18,"8":10,"9":11,"10":14,"11":12,"12":13},"('mileakage', 'unvalid')":{"0":7,"1":8,"2":9,"3":10,"4":17,"5":18,"6":16,"7":19,"8":11,"9":12,"10":15,"11":13,"12":14},"('mileakage', 'abnormal')":{"0":8,"1":9,"2":10,"3":11,"4":18,"5":19,"6":17,"7":20,"8":12,"9":13,"10":16,"11":14,"12":15},"('mileakage', 'jump_30s_2km')":{"0":9,"1":10,"2":11,"3":12,"4":19,"5":20,"6":18,"7":21,"8":13,"9":14,"10":17,"11":15,"12":16},"('mileakage', 'no_increase')":{"0":10,"1":11,"2":12,"3":13,"4":20,"5":21,"6":19,"7":22,"8":14,"9":15,"10":18,"11":16,"12":17},"('mileakage', 'change_engine_die')":{"0":1,"1":2,"2":3,"3":4,"4":11,"5":12,"6":10,"7":13,"8":5,"9":6,"10":9,"11":7,"12":8},"('mileakage', 'change_engine_die_to_start')":{"0":2,"1":3,"2":4,"3":5,"4":12,"5":13,"6":11,"7":14,"8":6,"9":7,"10":10,"11":8,"12":9},"('mileakage', 'change_engine_start_to_die')":{"0":3,"1":4,"2":5,"3":6,"4":13,"5":14,"6":12,"7":15,"8":7,"9":8,"10":11,"11":9,"12":10}}
    item_columns = Object.keys(a)
    items_split = ['common_7', 'voltage_temperature', ]
    item_common7_column = item_columns.slice(4)
    item_column_voltage_temperature = item_columns.slice(11,17)
    item_common7_column_data = item_common7_column.map(key=> Object.values(a[key]))
    data_sum = item_common7_column_data.map(l=> l.reduce((acc, curr)=> acc+curr,0))


    //draw
    var myChart_common = echarts.init(document.querySelector('.bar .allcharts .sub_row .chart'));
    var myChart_voltage_temperature = echarts.init(document.querySelectorAll('.bar .allcharts .sub_row .chart')[1]);
    var myChart_mileage = echarts.init(document.querySelectorAll('.bar .allcharts .sub_row .chart')[2]);
    var myChart_soc = echarts.init(document.querySelectorAll('.bar .allcharts .sub_row .chart')[3]);
    var myChart_gps = echarts.init(document.querySelectorAll('.bar .allcharts .sub_row .chart')[4]);
    var myChart_time_diff = echarts.init(document.querySelectorAll('.bar .allcharts .sub_row .chart')[5]);

     // 指定图表的配置项和数据
        var option_common = {
            //--------------    标题 title  ----------------   
            title: {                                
                text: 'Iterm_char/vin',  
                top:'3%',

                //left: center             

                subtext:'',           //---副标题内容样式
                //subtextStyle:{
                    //color:'#bbb'                
                //},

                padding:[0,0,0,0]             //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
               
            },

            //----------------   图例 legend  -----------------
            legend: {

                type:'plain',               //----图例类型，默认为'plain'，当图例很多时可使用'scroll'
                top:'10%',                   //----图例相对容器位置,top\bottom\left\right            
                selected:{
                    'items':true,  
                        //----图例选择,图形加载出来会显示选择的图例，默认为true
                },
                textStyle:{                 //----图例内容样式
                    //color:'#fff',               //---所有图例的字体颜色
                    //backgroundColor:'black',  //---所有图例的字体背景色
                },              
                tooltip:{                   //图例提示框，默认不显示
                    show:true,
                    //color:'red',
                },
                data:[                      //----图例内容
                    {
                        name:'items',
                        icon:'circle',          //----图例的外框样式
                        textStyle:{
                            //color:'#bbb',       //----单独设置某一个图例的颜色
                            //backgroundColor:'black',//---单独设置某一个图例的字体背景色
                        }
                    }
                ],                      
            },

            //--------------   提示框 -----------------
            tooltip: {
                show:true,                  //---是否显示提示框,默认为true
                trigger:'item',             //---数据项图形触发
                formatter:"{b}({c})",
                padding:5,
                /*axisPointer:{               //---指示样式
                    type:'shadow',      
                    axis:'auto',    

                },
                
                textStyle:{                 //---提示框内容样式
                    color:"#fff",           
                },*/
            },

            //-------------  grid区域  ----------------
            grid:{
                show:false,                 //---是否显示直角坐标系网格
                //top:'10%',    // 一下数值可为百分比也可为具体像素值,                     //---相对位置，top\bottom\left\right  
                right:'5%',
                left:'0%',
                bottom:'0%',
                containLabel:true,          //---grid 区域是否包含坐标轴的刻度标签
                tooltip:{                   //---鼠标焦点放在图形上，产生的提示框
                    show:true,  
                    trigger:'item',         //---触发类型
                    textStyle:{
                        //color:'#666',
                    },
                }
            },

            //-------------   x轴   -------------------
            xAxis: {
                barGap:'10%',
                barCategoryGap:'20%',//---柱形间距

                show:true,                  //---是否显示
                position:'bottom',          //---x轴位置
                offset:0,                   //---x轴相对于默认位置的偏移
                type:'category',            //---轴类型，默认'category'
                name:'items',              //---轴名称
                nameLocation:'end',         //---轴名称相对位置
                nameTextStyle:{             //---坐标轴名称样式
                    //color:"#fff",
                    padding:[5,0,0,-5], //---坐标轴名称相对位置
                },
                nameGap:15,                 //---坐标轴名称与轴线之间的距离
                //nameRotate:270,           //---坐标轴名字旋转
                
                axisLine:{                  //---坐标轴 轴线
                    show:true,                  //---是否显示
                    
                    //------------------- 箭头 -------------------------
                    symbol:['none', 'arrow'],   //---是否显示轴线箭头
                    symbolSize:[8, 8] ,         //---箭头大小
                    symbolOffset:[0,1],         //---箭头位置
                    
                    //------------------- 线 -------------------------
                    lineStyle:{
                        //color:'#fff',
                        width:1,
                        type:'solid',
                    },
                },
                axisTick:{                  //---坐标轴 刻度
                    show:true,                  //---是否显示
                    inside:true,                //---是否朝内
                    lengt:3,                    //---长度
                    lineStyle:{
                        //color:'red',          //---默认取轴线的颜色
                        width:1,
                        type:'solid',
                    },
                },
                axisLabel:{                 //---坐标轴 标签
                    show:true,                  //---是否显示
                    inside:false,               //---是否朝内
                    rotate:0,                   //---旋转角度   
                    margin: 5,                  //---刻度标签与轴线之间的距离
                    //color:'red',              //---默认取轴线的颜色
                },
                splitLine:{                 //---grid 区域中的分隔线
                    show:false,                 //---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
                    lineStyle:{
                        //color:'red',
                        //width:1,
                        //type:'solid',
                    },
                },
                splitArea:{                 //--网格区域
                    show:false,                 //---是否显示，默认false
                },              
                data: item_common7_column.slice(0,7).map(d=> d.split("'")[1]),//内容
            },

            //----------------------  y轴  ------------------------
            yAxis: {
                show:true,                  //---是否显示
                position:'left',            //---y轴位置
                offset:0,                   //---y轴相对于默认位置的偏移
                type:'value',           //---轴类型，默认'category'
                name:'ratio(%)',              //---轴名称
                nameLocation:'end',         //---轴名称相对位置value
                nameTextStyle:{             //---坐标轴名称样式
                    //color:"#fff",
                    padding:[0,0,0,5],  //---坐标轴名称相对位置
                },
                nameGap:15,                 //---坐标轴名称与轴线之间的距离
                //nameRotate:270,           //---坐标轴名字旋转
                
                axisLine:{                  //---坐标轴 轴线
                    show:true,                  //---是否显示
                    
                    //------------------- 箭头 -------------------------
                    symbol:['none', 'arrow'],   //---是否显示轴线箭头
                    symbolSize:[4, 4] ,         //---箭头大小
                    symbolOffset:[0,3],         //---箭头位置
                    
                    //------------------- 线 -------------------------
                    lineStyle:{
                        //color:'#fff',
                        width:1,
                        type:'solid',
                    },
                },
                axisTick:{                  //---坐标轴 刻度
                    show:true,                  //---是否显示
                    inside:true,                //---是否朝内
                    lengt:3,                    //---长度
                    lineStyle:{
                        //color:'red',          //---默认取轴线的颜色
                        width:1,
                        type:'solid',
                    },
                },
                axisLabel:{                 //---坐标轴 标签
                    show:true,                  //---是否显示
                    inside:false,               //---是否朝内
                    rotate:0,                   //---旋转角度   
                    margin: 8,                  //---刻度标签与轴线之间的距离
                    //color:'red',              //---默认取轴线的颜色
                },
                splitLine:{                 //---grid 区域中的分隔线
                    show:true,                  //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
                    lineStyle:{
                        color:'#666',
                        width:1,
                        type:'dashed',          //---类型
                    },
                },
                splitArea:{                 //--网格区域
                    show:false,                 //---是否显示，默认false
                }                        
            },

            //------------ 内容数据  -----------------
            series: [
              
               
                {
                    type: 'bar'  ,            //---类型
                    legendHoverLink:true,       //---是否启用图例 hover 时的联动高亮
                    label:{                     //---图形上的文本标签
                        show:true,
                        position:'insideTop',   //---相对位置
                        rotate:0,               //---旋转角度
                        //color:'#eee',
                        },

                    itemStyle: {
                 
                        barBorderRadius:[1,1,0,0],       // 柱状图头部圆弧
                        // 柱状图颜色
                          color: params => {
                          //  colorList是每根柱子的颜色，一组是一个渐变
                            var colorList = ['#62C467','#278D65','#FF5B7A','#BC3535',
                              '#FFF600','#D69105',
                              '#FFB400','#F66800',
                              '#00CCFF','#2A54B4',
                              '#F75271','#754ABF']
                            var index = params.dataIndex % colorList.length;
                            // 柱子个数超过colorList设置的个数，循环使用
                            return colorList[index]
                          },

                         
                        },
                    
                    barWidth: '10',//---柱形宽度
                    data: data_sum.slice(0,7),
            }
                    

     
            ],
        };
        

        // 使用刚指定的配置项和数据显示图表。
    

    option_vt = JSON.parse(JSON.stringify(option_common));
    option_mileage = JSON.parse(JSON.stringify(option_common));
    option_soc = JSON.parse(JSON.stringify(option_common));
    option_gps = JSON.parse(JSON.stringify(option_common));
    option_time_diff = JSON.parse(JSON.stringify(option_common));
    //option_vt .series[0].data = data_sum.slice(8,14)
    //option_vt .xAxis.data = item_common7_column.slice(8,14)
    option_vt .series[0].data = 0
    option_vt .series.push({name:"unmath", type:"bar", data:[data_sum[7], data_sum[10]]});
    option_vt .series.push({name:"unvalid", type:"bar", data:[data_sum[8], data_sum[11]]});
    option_vt .series.push({name:"empty_data", type:"bar", data:[data_sum[9], data_sum[12]]})
    option_vt .xAxis.data = ['voltage', 'temperature']
    option_vt.title.text = 'voltage_temperature/vin'

    option_soc.series[0].data = data_sum.slice(16,19)
    option_soc.xAxis.data = item_common7_column.slice(16,19).map(d=>d.split("'").slice(-2)[0])
    option_soc.title.text = 'soc/vin'

    option_mileage.series[0].data = data_sum.slice(-8)
    option_mileage.xAxis.data = item_common7_column.slice(-8).map(d=>d.split("'").slice(-2)[0])
    option_mileage.title.text = 'mileage/vin'

    option_time_diff.series[0].data = data_sum.slice(13,16)
    option_time_diff.xAxis.data = item_common7_column.slice(13,16).map(d=>d.split("'").slice(-2)[0])
    option_time_diff.title.text = 'time_diff/vin'

    option_gps.series[0].data = data_sum.slice(-11,-8)
    option_gps.xAxis.data = item_common7_column.slice(-11,-8).map(d=>d.split("'").slice(-2)[0])
    option_gps.title.text = 'gps/vin'








    
    
        
          
    // 使用刚指定的配置项和数据显示图表。
    myChart_common.setOption(option_common);
    myChart_voltage_temperature.setOption(option_vt);

    myChart_mileage.setOption(option_mileage);
    myChart_time_diff.setOption(option_time_diff);
    myChart_soc.setOption(option_soc);
    myChart_gps.setOption(option_gps);


    window.addEventListener("resize", function(){
        myChart_common.resize();
        myChart_voltage_temperature.resize();
        myChart_mileage.resize();
        myChart_soc.resize();
        myChart_gps.resize();
        myChart_time_diff.resize();
    });

};


//arrays sum
function arraysum(arrays){
    let array_sum = Array(arrays[0].length).fill(0);
    arrays.map((d)=>d.map(function(e,i){array_sum[i] += e}));
    return array_sum;
};

//change array to numbers: nums: array['','']
function turnNum(nums){
    return nums.map(Number)
};





