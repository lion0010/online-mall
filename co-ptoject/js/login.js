var oUsername = document.querySelector('input[name=username]');
var oPassword = document.querySelector('input[name=password]');
var oBtn = document.querySelector('input[type=button]');
oBtn.onclick = function() {
  //js校验
  //直接调用登录的接口
  myajax.post('http://h6.duchengjiu.top/shop/api_user.php',
  {
    status: 'login',
    username: oUsername.value,
    password: oPassword.value
  }, function(error, responseText){
    var json = JSON.parse(responseText);
    console.log(json);
    localStorage.token = json.data.token;
    localStorage.username = json.data.username;
    console.log(localStorage.token);
    console.log(localStorage.username);
<<<<<<< HEAD
    console.log(json.message)
    if(json.message == "登录成功"){
      location.href="../index.html";
    }else{
      alert("登陆失败，请重新登录")
=======
    if(json.code===0){
      location.href="../index.html";
    }else{
      alert("登录失败,请检测你的用户名和密码");
>>>>>>> a6348ced3d819e153bdc46c04becd5a0bccaea9f
    }
  });
}