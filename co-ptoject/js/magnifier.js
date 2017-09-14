function magnifier(smallPicSelector, bigPicSelector, zoomSelector, bigImgPath) {
    this.oSmallPic = document.querySelector(smallPicSelector);
    this.oBigPic = document.querySelector(bigPicSelector);
    this.oZoom = document.querySelector(zoomSelector);
    this.oBigPic.style.backgroundImage = 'url(' + localStorage.imgurl + ')';
    console.log(localStorage.bigImgPath);
    this.oBigPic.style.backgroundSize = '800px 800px';
    this.oBigPic.style.backgroundRepeat = "no-repeat";

    //大图600*600 盒子400*400
    //小图盒子400*400 放大镜200*200
    //放大镜总行程200 ，大图总行程400
    //rate = 600/200
    this.rate = 2;
    this.bindMouseEvent();
}

magnifier.prototype.bindMouseEvent = function() {
    var self = this;
    this.oSmallPic.onmouseover = function() {
        self.oZoom.style.display = 'block';
        self.oBigPic.style.display = 'block';
    }
    this.oSmallPic.onmouseout = function() {
        self.oZoom.style.display = 'none';
        self.oBigPic.style.display = 'none';
    }


    this.oSmallPic.onmousemove = function(event) {
        eventy = event || window.event;

        var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        var x = event.clientX - (getAllLeft(self.oSmallPic) - scrollLeft) - self.oZoom.clientWidth / 2;
        var y = event.clientY - (getAllTop(self.oSmallPic) - scrollTop) - self.oZoom.clientHeight / 2;
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x > self.oSmallPic.clientWidth - self.oZoom.clientWidth) {
            x = self.oSmallPic - self.oZoom.clientHeight;
        }
        if (y > self.oSmallPic.clientHeight - self.oZoom.clientHeight) {
            y = self.oSmallPic.clientHeight - self.oZoom.clientHeight;
        }

        self.oZoom.style.top = y + 'px';
        self.oZoom.style.left = x + 'px';

        self.oBigPic.style.backgroundPosition = -x * self.rate + 'px ' + -y * self.rate + 'px';

    }
}

function fetchComputedStyle(obj, property) {
    if (window.getComputedStyle) {
        property = property.replace(/[A-Z]/g, function(match) {
            return '-' + match.toLowerCase();
        });
        return window.getComputedStyle(obj)[property]; //中括号里面可以是变量
    } else {
        property = property.replace(/-([a-z])/g, function(match, $1) {
            return $1.toUpperCase();
        });
        return obj.currentStyle[property];
    }
}

function getAllTop(obj) {
    var allTop = obj.offsetTop;
    var currentObj = obj;
    while (currentObj = currentObj.offsetParent) {
        allTop += currentObj.offsetTop;
    }
    return allTop;
}

function getAllLeft(obj) {
    var allLeft = obj.offsetLeft;
    var currentObj = obj;
    while (currentObj = currentObj.offsetParent) {
        allLeft += currentObj.offsetLeft;
    }
    return allLeft;
}