/*
* 雪花效果感谢LTxuxu的分享
* http://www.jq22.com/jquery-info12135
* */
function CreateSnow(snowBox, src, style) {
  //定义雪花
  this.snowBox = document.getElementById(snowBox);//找到容器
  this.snowStyle = Math.ceil(Math.random() * style);//雪花类型[1,2]
  // this.maxLeft = this.snowBox.offsetWidth - Math.random() * 5 + 3;//运动范围
  // this.maxTop = this.snowBox.offsetHeight - Math.random() * 5 + 3;
  this.left = this.snowBox.offsetWidth * Math.random();//起始位置
  this.top = this.snowBox.offsetHeight * Math.random();
  this.angle = 1.1 + 0.8 * Math.random();//飘落角度
  this.minAngle = 1.1;
  this.maxAngle = 1.9;
  this.angleDelta = 0.01 * Math.random();
  this.speed = 1.4 + Math.random();//下落速度
  this.createEle(src);//制作雪花dom   凹=放在最后，使得原型里能取到值
}

CreateSnow.prototype = {
  //雪片生成+下落
  createEle: function (baseSrc) {//生成雪花元素
    var srcIndex = baseSrc.lastIndexOf('.'),//获取最后一个'.'
      src = baseSrc.substring(0, srcIndex) + this.snowStyle + baseSrc.substring(srcIndex, baseSrc.length);
    var image = new Image();
    image.src = src;
    this.ele = document.createElement("img");
    this.ele.setAttribute('src', src);
    this.ele.style.position = "absolute";
    this.ele.style.zIndex = "99";
    this.ele.style.userSelect = "none";
    this.ele.style.webkitUserSelect = "none";
    this.ele.style.mozUserSelect = "none";
    this.ele.style.msUserSelect = "none";

    this.ele.style.webkitAnimationIterationCount = "infinite";
    this.ele.style.webkitAnimationDirection = "alternate";
    this.ele.style.webkitAnimationTimingFunction = "ease-in-out";
    this.ele.style.webkitTransformOrigin = "50% -100%";
    this.ele.style.webkitAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
    this.ele.style.webkitAnimationDuration = '5s';

    this.snowBox.appendChild(this.ele);
  },
  move: function () {//雪花运动
    if (this.angle < this.minAngle || this.angle > this.maxAngle) {
      this.angleDelta = -this.angleDelta;
    }
    this.angle += this.angleDelta;
    this.left += this.speed * Math.cos(this.angle * Math.PI);
    this.top -= this.speed * Math.sin(this.angle * Math.PI);
    if (this.left < 0) {
      this.left = this.snowBox.offsetWidth - Math.random() * 5 + 3;
    } else if (this.left > this.snowBox.offsetWidth - Math.random() * 5 + 3) {
      this.left = 0
    }
    if (this.top > this.snowBox.offsetHeight - Math.random() * 5 + 3) {//雪花掉出来后回到顶部
      this.top = 0;
    }
    this.ele.style.left = this.left + 'px';//凹=加‘px’
    this.ele.style.top = this.top + 'px';
  }
};

/*
*下雪启动
* snowBox:雪花容器
* src:雪花图基本命名<图片名就是snow+1/2/3/4...>
* num:雪花数量
* style:图片种类数
* */
function goSnow(snowBox, src, num, style) {
  var snowArr = [];
  for (var j = 0; j < num; j++) {
    snowArr.push(new CreateSnow(snowBox, src, style));
  }
  var makeSnowtime = setInterval(function () {
    for (var i = snowArr.length - 1; i >= 0; i--) {//找到数组中的最新的一个
      if (snowArr[i]) {
        snowArr[i].move();
      }
    }
  }, 40);
}

/*
* 判断运行客户端
* */
function isPhone() {
  var flag = false;
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  for (var i = 0; i < Agents.length; i++) {
    if (userAgentInfo.indexOf(Agents[i]) > 0) {
      flag = true;
      break;
    }
  }
  return flag;
}


export {goSnow, isPhone}









