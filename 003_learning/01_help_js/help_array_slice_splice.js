a = [{"platform":"cma","soft_version":"1","vin":"h1","date_week":"2023-W10","error1":"1","error2":"2","error3":"3","error4":"4","error5":"5","error6":"6","error7":"7","error8":"8","error9":"9","error10":"10"},{"platform":"cma","soft_version":"1","vin":"h2","date_week":"2023-W10","error1":"2","error2":"3","error3":"4","error4":"5","error5":"6","error6":"7","error7":"8","error8":"9","error9":"10","error10":"11"}]
console.log(Object.values(a[0]).slice(4))
//https://blog.csdn.net/new__person/article/details/120925422
/*概括
这几个方法总是混淆,今天就把他好好学习一下

slice(start,end) 从哪到哪开始删
splice(strt,end,index1,index2) 从什么位置开始，删几个？删了后插入什么新元素？*/