// login-logout User 
let currentUser=JSON.parse(localStorage.getItem("currentUser"));
if(currentUser){
    document.getElementById("customer-cart").innerHTML=
    `
    
    <div id="cardLogout">
        <div class="logoutUser">
            <span>Hello, "${currentUser.username}" </span>
         </div>
        <a class="login" onclick="logout()">Đăng xuất</a>
        <a class="iconShop" href="/product/Giohang/giohang.html"> <i class="fa-solid fa-bag-shopping"></i> <span id="item-cart"></span> </a>

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

function logout(){
    localStorage.removeItem("currentUser")
    window.location.href="/main.html"
}

function login() {
    window.location.href="/signup-login/login.html"
}

// render sản phẩm
let productRender = JSON.parse(localStorage.getItem("listProduct")) || []
let start = 0, end = 0, currentPage = 1, totalPage = 1

function highlightPageChoose() {
    const itemPages = document.getElementsByClassName("item_page")
    for(let i = 0; i < totalPage; i++) {
        if (i == (currentPage - 1)) {
            itemPages[i].classList.add("item_page_choose")
        } else {
            itemPages[i].classList.remove("item_page_choose")
        }
    }
}

function setCurrentPage(page) {
    currentPage = page
    highlightPageChoose()
    renderProduct()
}

function upDownPage(status) {
    switch (status) {
        case 0:
            if (currentPage > 1) {
                currentPage -= 1
            } else {
                currentPage = totalPage
            }
            break
        case 1:
            if (currentPage < totalPage) {
                currentPage += 1
            } else {
                currentPage = 1
            }
            break
    }
    setCurrentPage(currentPage)
    renderProduct()
}

function renderPage() {
    totalPage = Math.ceil(productRender.length / 8)
    stringHTML = 
    `
        <button onclick="upDownPage(0)" id=""> <i class="fa-solid fa-chevron-left"></i> </button>
    `
    for (let i = 0; i < totalPage; i++) {
        stringHTML +=
        `
            <button class="item_page" onclick="setCurrentPage(${i+1})">${i+1}</button>
        `
    }
    stringHTML +=
    `
        <button onclick="upDownPage(1)"> <i class="fa-solid fa-chevron-right"></i> </button>
    `
    document.getElementById("pagination").innerHTML = stringHTML
    highlightPageChoose()
}

function renderCategory() {
    const category = JSON.parse(localStorage.getItem("category")) || []
    let stringHTML = 
    `
        <h3 style="font-size: 20px;">Danh mục sản phẩm</h3>
        <button class="nameProduct" onclick="renderProductByCategory()">Tất cả</button>
    `
    for (let i = 0; i < category.length; i++) {
        stringHTML +=
        `
            <button class="nameProduct" onclick="renderProductByCategory('${category[i].name}')">${category[i].name}</button>
        `
    }
    document.getElementById("categoryProduct").innerHTML = stringHTML
    renderPage()
}
renderCategory()

function renderProductByCategory(category_name) {
    let listProduct = JSON.parse(localStorage.getItem("listProduct")) || []
    if (!category_name) {   
        productRender = listProduct
    } else {
        productRender = listProduct.filter(product => product.category ==  category_name)
    }
    renderPage()
    renderProduct()
}

function renderProduct() {
    start = (currentPage - 1) * 8
    end = start + 8

    let result = "";
    for (let i = start; i < end; i++) {
        if (!productRender[i]) {
            continue
        }
        result +=
        `
            <div class="cardProduct" >
                <img onclick="goToDetail(${productRender[i].ID})" src="${productRender[i].img}" alt="">
                <div class="infoProduct">
                    <h2>${productRender[i].category}</h2>
                    <p>${productRender[i].ten}</p>
                    <p>${productRender[i].gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                </div>
            
                <div class="addNow" onclick="addtoCart('${productRender[i].ID}')">Thêm vào giỏ hàng</div>
            </div>
        `
    }
    document.getElementById("listProduct").innerHTML = result;

    if (currentUser?.id) {
        document.getElementById("item-cart").innerHTML = JSON.parse(localStorage.getItem("currentUser")).cart.length
    }
 }
renderProduct();

 
function addtoCart(idProduct) {
    const userLogin = JSON.parse(localStorage.getItem("currentUser")) || null

    if(!userLogin){
        alert("Bạn Cần Đăng Nhập Trước");
        return;
    }

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
 
function goToDetail(id){
    if(!currentUser){
        alert("Bạn Cần Đăng Nhập Trước")
        return;
    }
    localStorage.setItem("idProduct",id)
    window.location.href="/product/inforDetailProduct/inforDetail.html"
}

function search() {
    let products = JSON.parse(localStorage.getItem("listProduct"));
    let searchValue = document.getElementById("search1").value;
    let searchProduct = products.filter((item) => {
        return item.ten.toLowerCase().includes(searchValue.toLowerCase());
    });
    productRender = searchProduct
    currentPage = 1
    renderPage()
    renderProduct();
}


