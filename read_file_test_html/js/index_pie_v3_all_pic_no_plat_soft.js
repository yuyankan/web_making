var pie_button = document.querySelector("#pie-search") ;// 这里写


pie_button.addEventListener("click",mypie);

function mypie() {
      

        var pie_platform = document.querySelector(".pie #platform");
        var pie_software = document.querySelector(".pie #software");
        var pie_time = document.querySelector(".pie #time");
        var weeks_selected = previous_weeks(pie_time.value)
   
        mypie_data_draw("summary_error_20230413_08_05_54.csv", pie_platform.value, pie_software.value, weeks_selected);

        };


function mypie_data_draw(file, platform, soft_version, date_week){
            d3.csv(file)
                .then(function(data) {
              // filter the rows where the 'h' column value is 1, 2, 3 or 4
                    return data.filter(function(d){
                                        return date_week.includes(d.date_week);
                                    })
                    })
                .then(function(csv_filtered){
                    let weeks_selected = []
                    for (let i = 0; i < 5; i++){
                        var re = csv_filtered.filter(function(d){
                            return d.date_week == date_week[i];

                        })
                        weeks_selected.push(re)

                        }
                    draw_pie(weeks_selected, date_week)

    })
                 
            };

function draw_pie(data_object, date_week){


    //draw 4 chart
 
    let pie_datas = [];
    a_columns = Object.keys(data_object[0][0]).slice(7)

    for (let i = 0; i < 5; i++){

        a_num = data_object[i].map(function(d,i){return turnNum((Object.values(d)).slice(7));});//function in map have to use return 
        array_sum = arraysum(a_num);
        pie_data = array_sum.map(function(d,i){return {value:d, name:a_columns[i]};});
        pie_datas.push(pie_data);
    }

  


    //draw
    // 1. 实例化对象
    var pie_chars = document.querySelectorAll('.pie .allcharts .sub_row .chart');
    var myChart_cur_week = echarts.init(pie_chars[0]);

    var myChart_pre_1= echarts.init(pie_chars[1]);
    var myChart_pre_2 = echarts.init(pie_chars[2]);
    var myChart_pre_3 = echarts.init(pie_chars[3]);
    var myChart_pre_4 = echarts.init(pie_chars[4]);


    option_cur = {
        title:{
            text:'Week: '+ date_week[0],
            top:'5%',
            left:'center',
            textStyle:{
                fontSize: 15,
                fontWeight: 'bold', // Set the desired font weight
                fontFamily: 'Arial' // Set the desired font family; use family incase override by body font setup
            },
            show: true,
            //padding:[0,0,0,0],             //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
        },
        //标题
        tooltip: {
            trigger: 'item',
            formatter: '{b}: ({d}%)'//"{a} <br/>{b}: {c} ({d}%)"，
            /*formatter:function(val){   //让series 中的文字进行换行
                 console.log(val);//查看val属性，可根据里边属性自定义内容
                 var content = val['name'];
                 return content;//返回可以含有html中标签
             },*/ //自定义鼠标悬浮交互信息提示，鼠标放在饼状图上时触发事件
        },//提示框，鼠标悬浮交互时的信息提示*/
        legend: {
            show: false,
            orient: 'vertical',
            x: 'left',
            data: a_columns
            /*
            icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，               diamond，pin，arrow，none
            itemWidth: 10,  // 设置宽度
            itemHeight: 10, // 设置高度
            itemGap: 40 // 设置间距*/
             
        },
       grid:{
            show:true,                 //---是否显示直角坐标系网格
            top:'10%',    // 一下数值可为百分比也可为具体像素值,                     //---相对位置，top\bottom\left\right  
            right:'0%',
            left:'0%',
            bottom:'2%',
            containLabel:true,          //---grid 区域是否包含坐标轴的刻度标签
            tooltip:{                   //---鼠标焦点放在图形上，产生的提示框
                show:true,  
                trigger:'item',         //---触发类型
                textStyle:{
                    //color:'#666',
                },
            }
        },

        graphic:{
            type:'image',
            left:'50%',// position the image at the center of the grid horizontally
            top:'50%',//position the image at the center of the grid vertically

        },
      




        //图例属性，以饼状图为例，用来说明饼状图每个扇区，data与下边series中data相匹配
        /*graphic:{
            //type:'img',
            left:'50%',// position the image at the center of the grid horizontally
            top:'50%',//position the image at the center of the grid vertically
      
            //bottom:'0%',
            /*style:{
                //text:'Item\n'+'ratio', //使用“+”可以使每行文字居中
                textAlign:'center',
                //fontSize: 14,
                //fontWeight: '50',
                font:'italic bolder 16px cursive',
                fill:'#000',
                width:30,
                height:30
            }
        },*///此例饼状图为圆环中心文字显示属性，这是一个原生图形元素组件，功能很多
        series: [
            {
                //name:'Item counting',//tooltip提示框中显示内容
                type: 'pie',//图形类型，如饼状图，柱状图等
                radius: ['0%', '65%'],//饼图的半径，数组的第一项是内半径，第二项是外半径。支持百分比，本例设置成环形图。具体可以看文档或改变其值试一试
                //roseType:'area',//是否显示成南丁格尔图，默认false
                itemStyle: {
                    normal:{
                        label:{
                            show:true,
                            textStyle:{color:'#3c4858',fontSize:10},
                            formatter: '{b}({d}%)',
                            /*formatter:function(val){   //让series 中的文字进行换行
                                return val.name;}*/
                            padding:[5,0]//调整文字和横线横向的距离远近，一个padding一个空行n就能使得文字在横线上方，如果块比较小，可以避免文字里的太近

                        },//饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。可以与itemStyle属性同级，具体看文档
                        labelLine:{
                            show:false,
                            lineStyle:{color:'#3c4858'}
                        }//线条颜色
                    },//基本样式
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',//鼠标放在区域边框颜色
                        textColor:'#000'
                    }//鼠标放在各个区域的样式
                },
                center: ['50%', '70%'],//control pie postion in dom/div; chart is centered horizontally in the middle of the div element and vertically positioned 60% from the top of the div element.
                data: pie_datas[0],//数据，数据中其他属性，查阅文档
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
                //color: ['#51CEC6','#FFB703','#5FA0FA'],//各个区域颜色
            },//数组中一个{}元素，一个图，以此可以做出环形图
        ],//系列列表
        animation: false,
        animationDurationUpdate: 3000 // 3 seconds,

    };

    // create other option 
    option_pre_1 = JSON.parse(JSON.stringify(option_cur));
    option_pre_2 = JSON.parse(JSON.stringify(option_cur));
    option_pre_3 = JSON.parse(JSON.stringify(option_cur));
    option_pre_4 = JSON.parse(JSON.stringify(option_cur));

    //set data
    option_pre_1.series[0].data = pie_datas[1];
    option_pre_1.title.text = 'Week: '+ date_week[1];

    option_pre_2.series[0].data = pie_datas[2];
    option_pre_2.title.text = 'Week: '+ date_week[2];

    option_pre_3.series[0].data = pie_datas[3];
    option_pre_3.title.text = 'Week: '+ date_week[3];

    option_pre_4.series[0].data = pie_datas[4];
    option_pre_4.title.text = 'Week: '+ date_week[4];
   

   
        
          
    // 使用刚指定的配置项和数据显示图表。
    myChart_cur_week.setOption(option_cur);
    myChart_pre_1.setOption(option_pre_1);
    myChart_pre_2.setOption(option_pre_2);
    myChart_pre_3.setOption(option_pre_3);
    myChart_pre_4.setOption(option_pre_4);

    window.addEventListener("resize", function(){
        myChart_cur_week.resize();
        myChart_pre_1.resize();
        myChart_pre_2.resize();
        myChart_pre_3.resize();
        myChart_pre_4.resize();

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



function previous_weeks(week_select){

    let weekNum = parseInt(week_select.split("-W")[1]);
    let year = parseInt(week_select.split("-W")[0]);

    let weeks = [week_select];
    for (let i = 0; i < 5; i++) {
        if (weekNum === 1) {
            weekNum = 52;
            year--;
            } 

        else {
            weekNum--;
            }

        weeks.push(year.toString() + "-W" + (weekNum < 10 ? "0" + weekNum.toString() : weekNum.toString()));
    }
    return weeks
};