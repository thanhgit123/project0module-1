// login-logout User 
let currentUser=JSON.parse(localStorage.getItem("currentUser"));
console.log(currentUser);
if(currentUser){
    document.getElementById("customer-cart").innerHTML=
    `
    <div id="cardLogout">
         <div class="logoutUser">
            <span>Hello, "${currentUser.username}" </span>
        </div>
        <a class="login" onclick="logout()">Đăng xuất</a>
        <a href="/product/Giohang/giohang.html"><i class="fa-solid fa-bag-shopping"></i></a>  

    </div>

    `
}else{
    document.getElementById("customer-cart").innerHTML=
    `
        <div id="cardLogin">
                <div class="loginUser">
                        <a href="signup-login/login.html" ><i class="fa-solid fa-user" style="color: rgb(122, 122, 47);"></i></a>
                        <a class="login" onclick="login()">Đăng nhập</a>
                </div>
                <a href="/signup-login/sign up.html"><i class="fa-solid fa-bag-shopping"></i></a>   
         </div>
    `
}
function logout(){
    localStorage.removeItem("currentUser")
    window.location.href="main.html"
}
function login() {
    window.location.href="signup-login/login.html"
}