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
        <i class="fa-solid fa-bag-shopping"></i> 
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
                <i class="fa-solid fa-bag-shopping"></i>
         </div>
    `
}
function logout(){
    localStorage.removeItem("currentUser")
    window.location.href="/product/sanpham.html"
}
function login() {
    window.location.href="/signup-login/login.html"
}


// bill user
function renderBillUser() {
    let bills = JSON.parse(localStorage.getItem("bills"))
    const products = JSON.parse(localStorage.getItem("listProduct")) || []
    let stringHTML = ""
    let stringCart = ""

    const data = bills.filter(bill => bill.userID == currentUser.id)

    for (let i = 0; i < data.length; i++) {
        let cart = data[i].cart
        stringCart = ""

        for (let j = 0; j < cart.length; j++) {
            let product = products.find(item => item.ID == cart[j].idSP)
            stringCart +=
                `
                <div>
                    <img width="50px" src="${product.img}" />
                    <br>
                    <span>${product.ten}</span> <br>
                    <span>Giá:${product.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span> <br>
                    <span>Số Lượng: ${cart[j].quantity}</span>
                </div>
            `
        }

        stringHTML +=
            `
        <tr>
            <td>${i + 1}</td>
            <td>${data[i].id}</td>
            <td>${stringCart}</td>
            <td>
                <p></p>
                <p>Địa chỉ : ${data[i].address}</p>
                <p>SĐT : ${data[i].phoneNumber}</p>
            </td>
            <td>${data[i].totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            <td>${data[i].status == 0 ? "Đang chờ" : data[i].status == 1 ? "Đồng ý" : "Từ chối"}</td>
            <td>${data[i].status == 0 ?
                ` <button class="btnBill" onclick="changeStatus('${i}', 2)">Hủy</button> ` : ""}
            </td>
        </tr> 
        `
    }
    document.getElementById("billTable").innerHTML = stringHTML
}
renderBillUser()

function changeStatus(index, status) {
    let result = confirm("Xác nhận hủy")
    if(result){
        let bills = JSON.parse(localStorage.getItem("bills"))
        bills[index].status = status
        localStorage.setItem("bills", JSON.stringify(bills))
        renderBillUser()
    }
   
}