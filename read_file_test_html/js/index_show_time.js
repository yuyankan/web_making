
setInterval(show_time, 1000);
    /* setInterval(function, milliseconds);
    function - 包含代码块的函数
    milliseconds - 函数执行之间的时间间隔

    */
function show_time() {
    var dt = new Date();
    document.querySelector(".showTime span").innerHTML = dt.toJSON().slice(0,19).replace('T',' ');
};
