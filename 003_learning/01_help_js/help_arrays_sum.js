a = [{"platform":"cma","soft_version":"1","vin":"h1","date_week":"2023-W10","error1":"1","error2":"2","error3":"3","error4":"4","error5":"5","error6":"6","error7":"7","error8":"8","error9":"9","error10":"10"},{"platform":"cma","soft_version":"1","vin":"h2","date_week":"2023-W10","error1":"2","error2":"3","error3":"4","error4":"5","error5":"6","error6":"7","error7":"8","error8":"9","error9":"10","error10":"11"}]



//change array to numbers: nums: array['','']
function turnNum(nums){
	return nums.map(Number)
};



a_num = a.map(function(d,i){return turnNum((Object.values(d)).slice(4));});//function in map have to use return 
console.log(a_num);

array_sum = arraysum(a_num)
console.log(array_sum);

a_columns = Object.keys(a[0]).slice(4)
console.log(a_columns)
//transfer to pie data
data_pie = array_sum.map(function(d,i){return {value:d, name:a_columns[i]};})
console.log(data_pie);

//arrays sum
function arraysum(arrays){
	let array_sum = Array(arrays[0].length).fill(0);
	arrays.map((d)=>d.map(function(e,i){array_sum[i] += e}));
	return array_sum;
};





