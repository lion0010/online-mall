var oTable = document.querySelector('table');
var oSum = document.querySelector('#sum');
var oTr;
myajax.get('http://h6.duchengjiu.top/shop/api_cart.php', { token: localStorage.token }, function(err, responseText) {
    var json = JSON.parse(responseText);
    console.log(json);
    var data = json.data;
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        //一件商品的总价
        obj.goods_sum = obj.goods_price * obj.goods_number;
        oTable.innerHTML += `
                          <tr>
                            <td name="goods_id" class="goodsId">${obj.goods_id}<input type="checkbox" name="select" data-id="${obj.goods_id}"></td>
                            <td><img src="${obj.goods_thumb}" ></td>
                            <td class="goodsName" name="goods_name">${obj.goods_name}</td>
                            <td class="price">${obj.goods_price}</td>
                            <td><button class="less" name="minus">-</button><input data-id="${obj.goods_id}" class="inputnum" name="number" min="1" max="10"  value="${obj.goods_number}" /><button name="add" class="add">+</button></td>
                            <td name="sum" class="sum">${obj.goods_sum}</td>
                            <td class="deleteInput"><input data-id="${obj.goods_id}" name="delete" value="删除" class="delete"/></td>
                          </tr>
                          `;
        getSum();
    }
    oTable.addEventListener('click', function(event) {
        event = event || window.event;
        var target = event.target || event.srcElement;
        console.log(target);
        if (target.name === 'add') {
            target.previousElementSibling.value = parseInt(target.previousElementSibling.value) + 1;
            var goods_id = target.previousElementSibling.dataset.id;
            //得到商品的数量
            var number = parseInt(target.previousElementSibling.value);
            //请求api修改购买的商品数量
            myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token=' + localStorage.token, { goods_id, number },
                function(err, responseText) {
                    var json = JSON.parse(responseText);
                    console.log(json);
                    if (json.code === 0) {
                        // alert('更新购物车成功');
                        //修改总价和小计
                        //得到当前商品的价格
                        var goods_price = parseInt(target.parentNode.previousElementSibling.innerText);
                        //修改单个商品的总价：数量 * 价格
                        console.log(goods_price);
                        target.parentNode.nextElementSibling.innerText = parseInt(target.previousElementSibling.value) * goods_price;
                        //显示总价
                        getSum();
                    }
                })
        } else if (target.name === 'minus') {
            target.nextElementSibling.value = parseInt(target.nextElementSibling.value) - 1;
            var goods_id = target.nextElementSibling.dataset.id;
            //得到商品的数量
            var number = parseInt(target.nextElementSibling.value);
            //请求api修改购买的商品数量
            myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token=' + localStorage.token, { goods_id, number },
                function(err, responseText) {
                    var json = JSON.parse(responseText);
                    console.log(json);
                    if (json.code === 0) {
                        // alert('更新购物车成功');
                        //修改总价和小计
                        //得到当前商品的价格
                        var goods_price = parseInt(target.parentNode.previousElementSibling.innerText);
                        //修改单个商品的总价：数量 * 价格
                        console.log(goods_price);
                        target.parentNode.nextElementSibling.innerText = parseInt(target.nextElementSibling.value) * goods_price;
                        //显示总价
                        getSum();
                    }
                })
        }
        console.log(target.value, target.dataset.id);
        //得到商品的ID
    });
});
oTable.addEventListener('click', function(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if (target.name === 'delete') {
        confirm('确认要删除吗', function() {
            var goods_id = target.dataset.id;
            var number = 0;
            myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token=' + localStorage.token, { goods_id, number },
                (err, responseText) => {
                    var json = JSON.parse(responseText);
                    console.log(json);
                    location.reload();
                    if (json.code === 0) {
                        //删除整个TR
                        //toast("删除成功");
                        var tr = target.parentNode.parentNode;
                        tr.parentNode.removeChild(tr);

                        //显示总价
                        // getSum();
                    }
                })
        }, function() {
            return;
        })
    }
});
//显示总价
function getSum() {
    var oSums = document.querySelectorAll('td[name=sum]');
    var sum = 0;
    for (var i = 0; i < oSums.length; i++) {
        sum += parseInt(oSums[i].innerText);
    }
    localStorage.sum = sum;
    oSum.innerText = "￥" + sum;
}
//清空购物车
var oClearCart = document.querySelector('#clear-cart');
oClearCart.onclick = () => {
    // if (!confirm('确认要清空整个购物车吗？')) {
    //   return;
    // }
    //得到所有的商品ID
    confirm("真的要清空么？", function() {
        var oGoodsIds = document.querySelectorAll('td[name=goods_id]');
        for (var i = 0; i < oGoodsIds.length; i++) {
            var td = oGoodsIds[i];
            var goods_id = parseInt(td.innerText);
            var number = 0;
            (function(td) {
                myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token=' + localStorage.token, { goods_id, number },
                    (err, responseText) => {
                        var json = JSON.parse(responseText);
                        console.log(json);
                        if (json.code === 0) {
                            // alert('更新购物车成功');
                            //删除整个TR
                            var tr = td.parentNode;
                            tr.parentNode.removeChild(tr);
                            //显示总价
                            getSum();
                        }
                    });
            })(td);
        }
    }, function() {
        return;
    })

}