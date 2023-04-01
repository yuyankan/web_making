

var pie_button = document.querySelector(".bar #search") // 这里写


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


    //draw
    var myChart = echarts.init(document.querySelector('.bar .chart'));

     // 指定图表的配置项和数据
        var option = {
            //--------------    标题 title  ----------------   
            title: {                                
                text: 'Iterm_char/vin',  
                //left: center             
                textStyle:{                 //---主标题内容样式    
                    //color:'#bbb'
                },

                subtext:'',           //---副标题内容样式
                subtextStyle:{
                    //color:'#bbb'                
                },

                padding:[0,0,0,100]             //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
               
            },

            //----------------   图例 legend  -----------------
            legend: {

                type:'plain',               //----图例类型，默认为'plain'，当图例很多时可使用'scroll'
                top:'1%',                   //----图例相对容器位置,top\bottom\left\right            
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
                top:80,                     //---相对位置，top\bottom\left\right  
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
                    symbolOffset:[0,7],         //---箭头位置
                    
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
                data: a_columns,//内容
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
                    padding:[5,0,0,5],  //---坐标轴名称相对位置
                },
                nameGap:15,                 //---坐标轴名称与轴线之间的距离
                //nameRotate:270,           //---坐标轴名字旋转
                
                axisLine:{                  //---坐标轴 轴线
                    show:true,                  //---是否显示
                    
                    //------------------- 箭头 -------------------------
                    symbol:['none', 'arrow'],   //---是否显示轴线箭头
                    symbolSize:[8, 8] ,         //---箭头大小
                    symbolOffset:[0,7],         //---箭头位置
                    
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
                    name: 'items',             //---系列名称
                    type: 'bar',                //---类型
                    legendHoverLink:true,       //---是否启用图例 hover 时的联动高亮
                    label:{                     //---图形上的文本标签
                        show:true,
                        position:'insideTop',   //---相对位置
                        rotate:0,               //---旋转角度
                        //color:'#eee',
                        },

                    itemStyle: {
                            barBorderRadius:[5,5,0,0],       // 柱状图头部圆弧
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

                    
                        barWidth:'20',              //---柱形宽度
                        barCategoryGap:'20%'        //---柱形间距
                        },
                    data: array_sum
            }
            ],
        };
        

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    

        
          
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function(){
        myChart.resize();
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





