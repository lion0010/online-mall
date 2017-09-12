var oUsername = document.querySelector('input[name=username]');
var oPassword = document.querySelector('input[name=password]');
var oBtn = document.querySelector('input[type=button]');
oBtn.onclick = function() {
  //js校验
  //直接调用登录的接口
  myajax.post('http://h6.duchengjiu.top/shop/api_user.php', {
    status: 'login',
    username: oUsername.value,
    password: oPassword.value
  }, function(error, responseText) {
    var json = JSON.parse(responseText);
    console.log(json);
    localStorage.token = json.data.token;
    localStorage.username = json.data.username;
    console.log(localStorage.token);
    console.log(localStorage.username);
    // alert(json.message)
    if (json.message == "登录成功") {
      location.href = "../index.html";
    }
    
    if(json.message === "少传参数username"){
      alert("请输入用户名")
    }
    if(json.message === "密码最小长度为6位"){
      alert("请输入密码，且密码最小长度为6位")
    }
    if(json.message === "密码错误"){
      alert("登录失败，请检查用户名或密码")
    }
  });
}
