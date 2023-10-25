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
        <a href="/product/Giohang/giohang.html"><i class="fa-solid fa-bag-shopping"> <span id="item-cart"></span> </i></a>  
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
                <a href="/signup-login/login.html"><i class="fa-solid fa-bag-shopping"></i></a>  

         </div>
    `
}
document.getElementById("item-cart").innerHTML =  JSON.parse(localStorage.getItem("currentUser")).cart.length
function logout(){
    localStorage.removeItem("currentUser")
    window.location.href="/main.html"
}
function login() {
    window.location.href="/signup-login/login.html"
}


// render detail sản phẩm
function renderDetailProduct() {
    let lisProducts = JSON.parse(localStorage.getItem("listProduct"));
    let idProduct = localStorage.getItem("idProduct")
    let product = lisProducts.find((product)=>product.ID==idProduct)
    document.getElementById("imgDetailProduct").src= product.img;
    document.getElementById("nameDetail").innerHTML=product.ten;
    document.getElementById("priceDetail").innerHTML=product.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}
renderDetailProduct()

function addProduct() {
    const idProduct = localStorage.getItem("idProduct")
    const userLogin = JSON.parse(localStorage.getItem("currentUser")) || {}
    const cart = userLogin.cart

    const index = cart.findIndex(item => item.idSP == idProduct)
    if (index == -1) {
        cart.push({
            idSP: idProduct,
            quantity: 1
        })
    } else {
        alert("Bạn đã thêm sản phẩm này vào giỏ hàng !")
    }
    localStorage.setItem("currentUser", JSON.stringify(userLogin))
    document.getElementById("item-cart").innerHTML =  JSON.parse(localStorage.getItem("currentUser")).cart.length
}