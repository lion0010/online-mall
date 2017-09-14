(function() {
  var oCat = document.querySelector('#cat');
  myajax.get('http://h6.duchengjiu.top/shop/api_cat.php', {}, function(error, responseText) {
    var json = JSON.parse(responseText); //返回的整个json对象
    var data = json.data; //json对象当中的data是一个数组
    for (var i = 0; i < data.length; i++) {
      var obj = data[i]; //数组里面的每一项是一个商品分类的对象
      oCat.innerHTML += `<li><a href="list.html?cat_id=${obj.cat_id}">${obj.cat_name}</a></li>`;
    }
  });
  var topNav = document.querySelector('.nav-list');
  var topDis = getAllTop(topNav);
  window.addEventListener('scroll', function(e) {
    var nowTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (nowTop >= topDis) {
      topNav.style.position = 'fixed';
      topNav.style.top = 0;
    } else {
      topNav.style.position = 'relative';
    }
  });

  function getAllTop(obj) {
    var allTop = obj.offsetTop;
    while (obj = obj.offsetParent) {
      allTop += obj.offsetTop;
    }
    return allTop;
  }
})();