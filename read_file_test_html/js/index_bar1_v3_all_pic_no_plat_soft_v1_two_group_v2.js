var bar1_button = document.querySelector("#bar1-search") ;// 这里写


bar1_button.addEventListener("click",mybar1);

function mybar1() {
      

        var bar_platform = document.querySelector(".bar1 #platform");
        var bar_software = document.querySelector(".bar1 #software");
        var bar_time = document.querySelector(".bar1 #time");
        var weeks_selected = previous_weeks(bar_time.value)
   
        mybar1_data_draw("summary_result_code_clipped.csv", bar_platform.value, bar_software.value, weeks_selected);

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

                    var cols_tech = ['1003','1004','1005','1006', '1007', '1008','1009', '1010', '1011', '1012','1013'];
                    var cols_buz = ['2002', '2003','2004','2005','2007', '2008','2009', '2010', '2011', '2012','2013','2014','2015'];
                    var cols_stastic = ['3001', '3002', '3003','3005'];
                    var cols_total= ['Time_steps_volumn','result'];

                    var filtered_list_all = [];
                    
                    for (let i = 0; i < 5; i++){
                        var filtered_week = csv_filtered.filter(function(d){
                            return d.date_week == date_week[i];
                            });
                       
                    // Filter out unwanted columns
                        var week_ob = filtered_week.map(function(d) {
                            var all_t = [];

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

                            all_t.push(filteredObject_tech);
                            all_t.push(filteredObject_buz);
                            all_t.push(filteredObject_stastic);
                            all_t.push(filteredObject_total);
                            return all_t;
                            });

                        filtered_list_all.push(week_ob)

                        };
                        //console.log(filtered_list_all);
                        draw_bar1(filtered_list_all, date_week)
                        //console.log(filtered_list_all[0].map(function(d,i){return turnNum((Object.values(d[0])));}));
                    });
            };


                    //

  

function draw_bar1(data_object, date_week){

    //draw 4 chart
    let tech_col;
    let buz_col;
    let st_col;
    var col_names = [];

    //columnsname:
    for (let i=0;i<5;i++){
        if (data_object[i].length!=0){
            tech_col = Object.keys(data_object[i][0][0]);
            buz_col = Object.keys(data_object[i][0][1]);
            st_col = Object.keys(data_object[i][0][2]);

            break;}
        }
    col_names.push(tech_col);
    col_names.push(buz_col);
    col_names.push(st_col);

    var cars_num = [];
    var cars_ok_ratio = [];


    var tech_data = [];
    var buz_data = [];
    var st_data = [];
    var data_all = [];
  

    for (let i = 0; i < 5; i++){
        var car_num = data_object[i].length;
        cars_num.push(car_num);

        var num_tech = data_object[i].map(function(d,i){return turnNum((Object.values(d[0])));});//function in map have to use return 
    
        var num_buz = data_object[i].map(function(d,i){return turnNum((Object.values(d[1])));});
        var num_st = data_object[i].map(function(d,i){return turnNum((Object.values(d[2])));});
        var num_to = data_object[i].map(function(d,i){return turnNum((Object.values(d[3])));});
        

        var to_sum = arraysum(num_to);
        var tech_sum = arraysum(num_tech).map(d=>Number((d*100/car_num).toFixed(2)));
        var buz_sum = arraysum(num_buz).map(d=>Number((d*100/car_num).toFixed(2)));
        var st_sum = arraysum(num_st).map(d=>Number((d*100/car_num).toFixed(2)));
      
        

        tech_data.push(tech_sum);
        buz_data.push(buz_sum);
        st_data.push(st_sum);
      
        cars_ok_ratio.push(Number(((car_num-to_sum[1])*100/car_num).toFixed(2)));

    };
  

    data_all.push(tech_data);
    data_all.push(buz_data);
    data_all.push(st_data);
    console.log('4',data_all)
  


    //draw
    // 1. 实例化对象
    var bar1_chars = document.querySelectorAll('.bar1 .allcharts .sub_row .chart');
    

   
    var text_all = ['Tech. Index','Business Index','Stastic Index']

    

    // draw three chars
    for (let i = 0; i < 3; i++){

        //tech, buz, st charts seperately
        var mychart_t = echarts.init(bar1_chars[i]);
        var col_name_t = col_names[i]; //tech, buz, st

        var char_data = [];
        let comment_text;


        for (var k = 0; k < col_name_t.length; k++){
            //set for only one col of all weeks
            var col_name_1 = col_name_t[k]
            var col_value_1 = [];
            //
            for (let j = 0; j < 5; j++){
                comment_text = 'Week: '+ date_week[0]+'       Cars checked: ' + cars_num[0] + 'ps, OK ratio(%): '+ cars_ok_ratio[0]
                console.log('0',data_all[i])
                console.log('1',data_all[i][j],k, data_all[i][j][k])
            
                col_value_1.push(data_all[i][j][k]);
                console.log('2',col_value_1)
            }

            var columnDataValue = {
                barWidth: 8,//柱状条宽度
                name:col_name_1,
                type:'bar',
                itemStyle: {
                    normal: {
                        show: true,//鼠标悬停时显示label数据
                        barBorderRadius: [10, 10, 10, 10],//柱形图圆角，初始化效果
                  
                    }
                },
                label: {
                    normal: {
                        show: false, //显示数据
                        position: 'top'//显示数据位置 'top/right/left/insideLeft/insideRight/insideTop/insideBottom'
                    }
                },
                data:col_value_1
            };

            char_data.push(columnDataValue);

        }

        build_char(mychart_t,text_all[i], col_name_t, char_data, date_week, comment_text);
    }
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
    for (let i = 0; i < 4; i++) {
        if (weekNum === 1) {
            weekNum = 52;
            year--;
            } 

        else {
            weekNum--;
            }

        weeks.push(year.toString() + "-W" + (weekNum < 10 ? "0" + weekNum.toString() : weekNum.toString()));
    }
    return weeks;
};

function build_char(mychart,text_t, col_name, col_val, date_week, comment_text){

    option = {
        title:{
            text:text_t,//'Week: '+ date_week[0]+'       Cars checked: ' + cars_num[0] + 'ps, OK ratio(%): '+cars_ok_ratio[0],
            //subtext: 'Cars check: ' +cars_num[0] + 'ps',
            top:'2%',
            left:'center',
           
        
            textStyle:{
                color:'white',
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
            formatter: '{b}<br/>{a}: ({c}%)'//"{a} <br/>{b}: {c} ({d}%)"，
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
            },
        splitLine: {show: false,},
        splitArea: {show: false,},
        },

       graphic: [
                  {
                    type: 'image',
                    left: '50%',
                    top: '50%',
                  },
                  {
                    type: 'text',
                    right: 10,
                    top: 20,
                    style: {
                      text: comment_text,
                      fill: 'white',
                      fontSize: 12,
                     
                    },
                  },
                ],
       //-------------   x轴   -------------------
        xAxis: {
            //barGap:'10%',
            barCategoryGap:'3%',//---柱形间距
            barWidth: '5%',
            barGap: '10%',//distance of different group data set
            color:'white',
            axisLine: {show: false},//hide axis line
            axisTick: {show: false},//hide tick on axis line

            show:true,                  //---是否显示
            position:'bottom',          //---x轴位置
            offset:0,                   //---x轴相对于默认位置的偏移
            type:'category',            //---轴类型，默认'category'
            //name:'items',              //---轴名称
            nameLocation:'end',         //---轴名称相对位置
                    
            data: date_week,//内容
            axisLabel:{                 //---坐标轴 标签
                fontSize:10,
                fontFamily: 'Arial',


                show:true,                  //---是否显示
                inside:false,               //---是否朝内
                rotate:45,                   //---旋转角度   
                margin: 8,                  //---刻度标签与轴线之间的距离
                color:'white',              //---默认取轴线的颜色
            },
                
        },

        //----------------------  y轴  ------------------------
        yAxis: {
            show:true,  
            
            color:'white',                //---是否显示
            position:'left',            //---y轴位置
            offset:0,                   //---y轴相对于默认位置的偏移
            type:'value',           //---轴类型，默认'category'
            name:'ratio(%)',              //---轴名称
            nameLocation:'end',         //---轴名称相对位置value
            nameTextStyle:{             //---坐标轴名称样式
                color:"white",
                padding:[0,0,0,5],  //---坐标轴名称相对位置
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
                color:'white',              //---默认取轴线的颜色
            },

            splitLine: {show: false},//hide split line of y axis

            axisLine: {show: false},//hide axis line
            axisTick: {show: false},//hide tick on axis line

            min: 0, // set the minimum value of y-axis
            max: 100, // set the maximum value of y-axis
                                  
        },

      


        series: col_val,
        legend: {data:col_name,
                            top:40,
                            icon: 'rect',
                            left: 'center',
                            itemWidth: 8,
                            itemHeight: 5,
                            itemGap: 3,
                            textStyle: {
                                fontSize: 10,
                                //fontWeight: 'bold',
                                color:'white',
                                },
                      
                            orient: 'horizontal',//distributed in row
                      

                            },

    };


    // 使用刚指定的配置项和数据显示图表。
    mychart.setOption(option);

    window.addEventListener("resize", function(){
        mychart.resize();

    });
};
