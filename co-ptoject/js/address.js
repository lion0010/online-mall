function showAddress() {
  myajax.get('http://h6.duchengjiu.top/shop/api_useraddress.php', {
      token: localStorage.token
    },
    function(error, responseText) {
      var json = JSON.parse(responseText);
      console.log(json);
      var data = json.data;
      var oAddressUl = document.querySelector('.address-ul');
      if (data.length === 0) {
        oAddressUl.innerHTML = '<h2>您还没有收货地址，请点击添加收货地址</h2>';
        return;
      }
      // oAddressUl.innerHTML = '';
      for (var i = data.length - 1; i >= 0; i--) {
        var obj = data[i];
        oAddressUl.innerHTML += `
                            <li data-id="${obj.address_id}">
                              <span>${obj.consignee}</span>
                              <span>${obj.mobile}</span>
                              <span>${obj.address}</span>
                              <span name="delete" class="delete" data-id="${obj.address_id}">删除</span>
                            </li>`;
      }
    })
}
showAddress();
(function() {
  var oAdd = document.querySelector('.add');
  console.log(oAdd);
  oAdd.onclick = function() {
    var postobj = serializeForm(document.querySelector('form'));
    myajax.post('http://h6.duchengjiu.top/shop/api_useraddress.php?status=add&token=' + localStorage.token, postobj, function(err, responseText) {
      var json = JSON.parse(responseText);
      console.log(json);
      if (json.code === 0) {
        location.reload();
      } else if (json.code === 1002) {
        toast("未登录，3秒后将跳转到登陆页面")
        // var oSecond = oGoods.querySelector('#second');
        var timer = setInterval(() => {
          // var second = parseInt(oSecond.innerText);
          // oSecond.innerText = --second;
          location.href = "../html/login.html"
        }, 3000);

      }
    });
  }
  var selected_address_id = 0; //如果这个值为0，无法下订单，当点击一个收货地址时，给这个变量赋值
  //给收货地址添加一个事件代理
  var oAddressUl = document.querySelector('.address-ul');
  oAddressUl.onclick = function(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    console.log(target.nodeName);
    if (target.className === 'delete') {
      if (!confirm('您确定删除这条记录吗？')) {
        return;
      }
      var address_id = target.dataset.id;
      console.log(address_id);
      myajax.get('http://h6.duchengjiu.top/shop/api_useraddress.php', {
        status: 'delete',
        address_id,
        token: localStorage.token
      }, function(error, responseText) {
        var json = JSON.parse(responseText);
        if (json.code === 0) {
          target.parentNode.parentNode.removeChild(target.parentNode);
          location.reload();
        }
      })
    } else {
      //先让所有li元素的样式清空
      var oAddressLis = oAddressUl.querySelectorAll('li');
      for (var i = 0; i < oAddressLis.length; i++) {
        oAddressLis[i].classList.remove('selected');
      }
      if (target.nodeName === 'LI') {
        //点击LI元素选择一个收货地址
        selected_address_id = parseInt(target.dataset.id);
        target.classList.add('selected');
      } else if (target.nodeName === 'SPAN') {
        selected_address_id = parseInt(target.parentNode.dataset.id);
        target.parentNode.classList.add('selected');
      }
    }
  }
  var oOrder = document.querySelector('#order');
  oOrder.onclick = function() {
    var address_id = selected_address_id;
    if (address_id === 0) {
      toast('请选择一个收货地址');
      return;
    }
    location.href = 'order.html';
    var total_prices = localStorage.sum;
    myajax.post('http://h6.duchengjiu.top/shop/api_order.php?token=' + localStorage.token + '&status=add', {
      address_id,
      total_prices
    }, function(err, responseText) {
      var json = JSON.parse(responseText);
      console.log(json);
      if (json.code === 0) {
        toast('下订单成功');
      }
    });
  }
})();