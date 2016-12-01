var num = 0;
//图片轮转
function changePic() {
    //图片自动转换
    num = (num+1)%5;
    document.getElementById("inner-img").src = "images/"+String(num)+".jpg";
    //页码自动转换
    var number_element=document.getElementById("number"+String(num));
    number_element.setAttribute("class","numbers-marked");
    var lastnumber_element=document.getElementById("number"+String((num+4)%5));
    lastnumber_element.setAttribute("class", "numbers");
}
window.setInterval('changePic()',3000);

function clickChangePic() {
    var n=num;
    for(var i = 0;i < 5;i++){
            var refreshNum = document.getElementById("number" + String(i));
            refreshNum.setAttribute("class","numbers");
        }
    //图片自动转换
    document.getElementById("inner-img").src = "images/pic"+String(n)+".jpg";
    //页码自动转换
    var number_element=document.getElementById("number"+String(n));
    number_element.setAttribute("class","numbers-marked");
    var lastnumber_element=document.getElementById("number"+String((n+4)%5));
    lastnumber_element.setAttribute("class", "numbers");
    window.setInterval('clickChangePic()',3000);
}

//页码点击响应
function pageNumber(obj) {
    var pageNum = parseInt(obj);
    //页码转换
    var number_element=document.getElementById("number"+String(pageNum - 1));
    number_element.setAttribute("class","numbers-marked");
    for(var i = 0;i < 5;i++){
        if(i != pageNum-1){
            var updateNum = document.getElementById("number" + String(i));
            updateNum.setAttribute("class","numbers");
        }
    }
    //修改图片
    var pic_element=document.getElementById("inner-img");
    pic_element.src="./images/"+String(pageNum-1)+".jpg";
    //重新进行图片轮转
    num = pageNum - 1;
}
