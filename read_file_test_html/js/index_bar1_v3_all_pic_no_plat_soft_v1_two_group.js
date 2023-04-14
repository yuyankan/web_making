var bar1_button = document.querySelector("#bar1-search") ;// 这里写


bar1_button.addEventListener("click",mybar1);

function mybar1() {
      

        var bar_platform = document.querySelector(".bar1 #platform");
        var bar_software = document.querySelector(".bar1 #software");
        var bar_time = document.querySelector(".bar1 #time");
        var weeks_selected = previous_weeks(bar_time.value)
   
        mybar1_data_draw("summary_error_20230414_08_41_04.csv", bar_platform.value, bar_software.value, weeks_selected);

        };


function mybar1_data_draw(file, platform, soft_version, date_week){
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
                    draw_bar1(weeks_selected, date_week)

    })
                 
            };

function draw_bar1(data_object, date_week){


    //draw 4 chart
 
    let bar1_datas = [];
    a_columns = []

    //columnsname:
    for (let i=0;i<5;i++){
        if (data_object[i].length!=0){
            a_columns = Object.keys(data_object[i][0]).slice(8);
            break;}
        }

    cars_num = []
    cars_ok_ratio = []

    for (let i = 0; i < 5; i++){

        a_num = data_object[i].map(function(d,i){return turnNum((Object.values(d)).slice(7));});//function in map have to use return 
        array_sum = arraysum(a_num);
        console.log(a_num);
        console.log(array_sum)
        bar1_data = array_sum.slice(1).map(d=>Number((d*100/a_num.length).toFixed(2)))
        bar1_datas.push(bar1_data);
        cars_num.push(a_num.length)
        cars_ok_ratio.push(Number(((a_num.length-array_sum[0])*100/a_num.length).toFixed(2)))
        console.log(cars_ok_ratio);
    }

  


    //draw
    // 1. 实例化对象
    var bar1_chars = document.querySelectorAll('.bar1 .allcharts .sub_row .chart');
    var myChart_cur_week = echarts.init(bar1_chars[0]);

    var myChart_pre_1= echarts.init(bar1_chars[1]);
    var myChart_pre_2 = echarts.init(bar1_chars[2]);
    var myChart_pre_3 = echarts.init(bar1_chars[3]);
    var myChart_pre_4 = echarts.init(bar1_chars[4]);


    d0_1 = bar1_datas[0].slice(0,3)
    d0_2 = Array(3).fill(0)
    d0_1.push(...Array(bar1_datas[0].length-3).fill(0))
    d0_2.push(...bar1_datas[0].slice(3))

    d1_1 = bar1_datas[1].slice(0,3)
    d1_2 = Array(3).fill(0)
    d1_1.push(...Array(bar1_datas[1].length-3).fill(0))
    d1_2.push(...bar1_datas[1].slice(3))

    d2_1 = bar1_datas[2].slice(0,3)
    d2_2 = Array(3).fill(0)
    d2_1.push(...Array(bar1_datas[2].length-3).fill(0))
    d2_2.push(...bar1_datas[2].slice(3))

    d3_1 = bar1_datas[3].slice(0,3)
    d3_2 = Array(3).fill(0)
    d3_1.push(...Array(bar1_datas[3].length-3).fill(0))
    d3_2.push(...bar1_datas[3].slice(3))

    d4_1 = bar1_datas[4].slice(0,3)
    d4_2 = Array(3).fill(0)
    d4_1.push(...Array(bar1_datas[4].length-3).fill(0))
    d4_2.push(...bar1_datas[4].slice(3))



    option_cur = {
        title:{
            text:'Week: '+ date_week[0]+'       Cars checked: ' + cars_num[0] + 'ps, OK ratio(%): '+cars_ok_ratio[0],
            //subtext: 'Cars check: ' +cars_num[0] + 'ps',
            top:'2%',
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
            formatter: '{b}: ({c}%)'//"{a} <br/>{b}: {c} ({d}%)"，
            /*formatter:function(val){   //让series 中的文字进行换行
                 console.log(val);//查看val属性，可根据里边属性自定义内容
                 var content = val['name'];
                 return content;//返回可以含有html中标签
             },*/ //自定义鼠标悬浮交互信息提示，鼠标放在饼状图上时触发事件
        },//提示框，鼠标悬浮交互时的信息提示*/
        
       grid:{
            show:true,                 //---是否显示直角坐标系网格
            top:'25%',    // 一下数值可为百分比也可为具体像素值,                     //---相对位置，top\bottom\left\right  
            right:'5%',
            left:'3%',
            bottom:'5%',
            containLabel:true,          //---grid 区域是否包含坐标轴的刻度标签
            tooltip:{                   //---鼠标焦点放在图形上，产生的提示框
                show:true,  
                trigger:'item',         //---触发类型
                textStyle:{
                    //color:'#666',
                },
            }
        },

        graphic:[{
            type:'image',
            left:'50%',// position the image at the center of the grid horizontally
            top:'50%',//position the image at the center of the grid vertically

        },

        {
        type: 'text',
        right: 0,
        top: 0,
        style: {
            text: 'This is a comment',
            font: 100,
        }}


        ],
       //-------------   x轴   -------------------
            xAxis: {
                //barGap:'10%',
                barCategoryGap:'10%',//---柱形间距
                barWidth: '30%',
                barGap: '50%',//distance of different group data set

                show:true,                  //---是否显示
                position:'bottom',          //---x轴位置
                offset:0,                   //---x轴相对于默认位置的偏移
                type:'category',            //---轴类型，默认'category'
                //name:'items',              //---轴名称
                nameLocation:'end',         //---轴名称相对位置
                        
                data: a_columns,//内容
                axisLabel:{                 //---坐标轴 标签
                    fontSize:10,
                    fontFamily: 'Arial',

                    show:true,                  //---是否显示
                    inside:false,               //---是否朝内
                    rotate:45,                   //---旋转角度   
                    margin: 8,                  //---刻度标签与轴线之间的距离
                //color:'red',              //---默认取轴线的颜色
                },
                    
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
                    padding:[2,0,0,5],  //---坐标轴名称相对位置
                },
                nameGap:5,                 //---坐标轴名称与轴线之间的距离
                //nameRotate:270,           //---坐标轴名字旋转
                
               
               
                axisLabel:{                 //---坐标轴 标签
                    fontSize:10,
                    fontFamily: 'Arial',

                    show:true,                  //---是否显示
                    inside:false,               //---是否朝内
                    rotate:0,                   //---旋转角度   
                    margin: 8,                  //---刻度标签与轴线之间的距离
                    //color:'red',              //---默认取轴线的颜色
                },
                                      
            },

            graphic:{
            type:'image',
            left:'50%',// position the image at the center of the grid horizontally
            top:'50%',//position the image at the center of the grid vertically

        },


   
        series: [{
            name: 'General Item',
            type: 'bar',
            data: d0_1,
            barWidth: 20,
            barCategoryGap: '20%',
            barGap:'100%',
            
            itemStyle: {
                color: '#61a0a8'
                    },},

            {
            name: 'General Item',
            type: 'bar',
            data: d0_2,
            barWidth: 10,
            barCategoryGap: '10%',
            barGap:'100%',
            itemStyle: {
                color: '#62C467',
                    },}
          
        ],
       

    };

    // create other option 
    option_pre_1 = JSON.parse(JSON.stringify(option_cur));
    option_pre_2 = JSON.parse(JSON.stringify(option_cur));
    option_pre_3 = JSON.parse(JSON.stringify(option_cur));
    option_pre_4 = JSON.parse(JSON.stringify(option_cur));

    //set data
    
    option_pre_1.series[0].data = d1_1;
    option_pre_1.series[1].data = d1_2;
     
    option_pre_1.title.text = 'Week: '+ date_week[1]+'       Cars checked: ' + cars_num[1] + 'ps, OK ratio(%): '+cars_ok_ratio[1];

    option_pre_2.series[0].data = d2_1;
    option_pre_2.series[1].data = d2_2;
    option_pre_2.title.text = 'Week: '+ date_week[2]+'       Cars checked: ' + cars_num[2] + 'ps, OK ratio(%): '+cars_ok_ratio[2];

    option_pre_3.series[0].data = d3_1;
    option_pre_3.series[1].data = d3_2;
    option_pre_3.title.text = 'Week: '+ date_week[3]+'       Cars checked: ' + cars_num[3] + 'ps, OK ratio(%): '+cars_ok_ratio[3];

    option_pre_4.series[0].data = d4_1;
    option_pre_4.series[1].data = d4_2;
    option_pre_4.title.text = 'Week: '+ date_week[4]+'       Cars checked: ' + cars_num[4] + 'ps, OK ratio(%): '+cars_ok_ratio[4];
   

   
        
          
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