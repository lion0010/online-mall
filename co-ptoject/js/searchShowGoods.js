var search_text = getQueryString('search_text');
//name abc
//123
var oGoods = document.querySelector('#hot-goods');

myajax.get('http://h6.duchengjiu.top/shop/api_goods.php', { search_text: search_text },
  function(err, responseText) {
    var json = JSON.parse(responseText);
    console.log(json);
    var data = json.data;
    //如果没数据要给出提示
    if (data.length === 0) {
      oGoods.innerHTML = "未搜索到商品, <span id='second'>5</span>秒后跳回首页";
      var oSecond = oGoods.querySelector('#second');
      var timer = setInterval(() => {
        var second = parseInt(oSecond.innerText);
        oSecond.innerText = --second;
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        location.href = '../index.html';
      }, 5000);
      return;
    }
    for (var i = 0; i < data.length; i++) {
      var obj = data[i];
      oGoods.innerHTML += `<div id="hot"><li><a href="goods.html?goods_id=${obj.goods_id}"><img src="${obj.goods_thumb}"/> <p>${obj.goods_name} </p><span>¥ ${obj.price}</span></a></li></div>`;
    }
  });