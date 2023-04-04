

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
    var myChart = echarts.init(document.querySelector('.bar .chart'));

     // 指定图表的配置项和数据
        var series = [
              {
                name: 'Group A',
                type: 'bar',
                data: [10, 0, 0]
              },
              {
                name: 'Group B',
                type: 'bar',
                data: [0, 25, 0]
              },
              {
                name: 'Group C',
                type: 'bar',
                data: [0, 0, 30]
              }
            ];

            // Define the different sub-groups (data) within each series
            var xAxisData = ['Sub-Group 1', 'Sub-Group 2', 'Sub-Group 3'];

            // Define the chart options
            var options = {
              legend: {
                data: ['Group A', 'Group B', 'Group C']
              },
              xAxis: {
                barWidth: 1,
                
                data: xAxisData
              },
              yAxis: {},
              series: series
            };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(options);
    

        
          
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





