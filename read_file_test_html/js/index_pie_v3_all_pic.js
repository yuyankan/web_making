var pie_button = document.querySelector("#pie-search") ;// 这里写


pie_button.addEventListener("click",mypie);

function mypie() {
      

        var pie_platform = document.querySelector(".pie #platform");
        var pie_software = document.querySelector(".pie #software");
        var pie_time = document.querySelector(".pie #time");
   
        mypie_data_draw("data_test.csv", pie_platform.value, pie_software.value, pie_time.value);

        };


function mypie_data_draw(file, platform, soft_version, date_week){
            d3.csv(file)
                .then(function(csvdata){
                   return csvdata.filter(function(d){
                        if ((d.platform==platform) && (d.soft_version==soft_version) && (d.date_week==date_week)){
                        return d;}
                   });
                    
                    })
                .then(function(csv_filtered){
                    draw_pie(csv_filtered);
                    
                        })
                 
            };

function draw_pie(data_object){

    a_num = data_object.map(function(d,i){return turnNum((Object.values(d)).slice(4));});//function in map have to use return 

    array_sum = arraysum(a_num);
    a_columns = Object.keys(data_object[0]).slice(4)
    pie_data = array_sum.map(function(d,i){return {value:d, name:a_columns[i]};});


    //draw
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".pie  .chart"));

    option = {
        title:{
            text:'Item_ratio',
            top:'bottom',
            left:'center',
            textStyle:{
                fontSize: 14,
                fontWeight: '',
                color: '#333'
            },
        },//标题
        tooltip: {
            trigger: 'item',
            formatter: '{a}<br/>{b}: ({d}%)'//"{a} <br/>{b}: {c} ({d}%)"，
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
             
        },//图例属性，以饼状图为例，用来说明饼状图每个扇区，data与下边series中data相匹配
        graphic:{
            type:'text',
            left:'center',
            top:'center',
            style:{
                text:'Item\n'+'ratio', //使用“+”可以使每行文字居中
                textAlign:'center',
                //fontSize: 14,
                //fontWeight: '50',
                font:'italic bolder 16px cursive',
                fill:'#000',
                width:30,
                height:30
            }
        },//此例饼状图为圆环中心文字显示属性，这是一个原生图形元素组件，功能很多
        series: [
            {
                name:'Item counting',//tooltip提示框中显示内容
                type: 'pie',//图形类型，如饼状图，柱状图等
                radius: ['20%', '65%'],//饼图的半径，数组的第一项是内半径，第二项是外半径。支持百分比，本例设置成环形图。具体可以看文档或改变其值试一试
                roseType:'area',//是否显示成南丁格尔图，默认false
                itemStyle: {
                    normal:{
                        label:{
                            show:true,
                            textStyle:{color:'#3c4858',fontSize:"10"},
                            formatter: '{b}({d}%)',
                            /*formatter:function(val){   //让series 中的文字进行换行
                                return val.name;}*/
                            padding:[10,0]//调整文字和横线横向的距离远近，一个padding一个空行n就能使得文字在横线上方，如果块比较小，可以避免文字里的太近

                        },//饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。可以与itemStyle属性同级，具体看文档
                        labelLine:{
                            show:true,
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
                data: pie_data,//数据，数据中其他属性，查阅文档
                //color: ['#51CEC6','#FFB703','#5FA0FA'],//各个区域颜色
            },//数组中一个{}元素，一个图，以此可以做出环形图
        ],//系列列表
    };

        
          
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
