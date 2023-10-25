// login-logout User
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
console.log(currentUser);
if (currentUser) {
  document.getElementById("customer-cart").innerHTML = `
    <div id="cardLogout">
         <div class="logoutUser">
            <span>Hello, "${currentUser.username}" </span>
        </div>
        <a class="login" onclick="logout()">Đăng xuất</a>
        <a class="iconShop" href="/product/Giohang/giohang.html"> <i class="fa-solid fa-bag-shopping"></i> <span id="item-cart"></span> </a>

    </div>

    `;
} else {
  document.getElementById("customer-cart").innerHTML = `
        <div id="cardLogin">
                <div class="loginUser">
                        <a href="signup-login/login.html" ><i class="fa-solid fa-user" style="color: rgb(122, 122, 47);"></i></a>
                        <a class="login" onclick="login()">Đăng nhập</a>
                </div>
                <i class="fa-solid fa-bag-shopping"></i>
         </div>
    `;
}
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "/product/sanpham.html";
}
function login() {
  window.location.href = "/signup-login/login.html";
}

// render cart
let totalPrice = 0;
function renderCart() {
  const products = JSON.parse(localStorage.getItem("listProduct")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  const cart = currentUser.cart;

  let stringHTML = "";
  totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = products.find((item) => item.ID == cart[i].idSP);

    totalPrice += Number(product.gia) * Number(cart[i].quantity);

    stringHTML += `
        <tr>    
            <td>${i + 1}</td>
            <td class="imgProduct"><img src="${product.img}" alt=""></td>
            <td>${product.ten}</td>
            <td>${product.gia.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}</td>
            <td>
                <button class="decrease" onclick="changeQuantity(${i},0)">-</button>
                <span>${cart[i].quantity}</span>
                <button class="increase" onclick="changeQuantity(${i},1)">+</button>
            </td>
            <td>${Number(product.gia * cart[i].quantity).toLocaleString(
              "vi-VN",
              { style: "currency", currency: "VND" }
            )}</td>
            <td>
                <button class="delete" onclick="deleteProduct(${i})">Delete</button>
            </td>
        </tr>
        `;
  }
  document.getElementById("table_body").innerHTML = stringHTML;
  document.getElementById("totalBill").innerHTML = totalPrice.toLocaleString(
    "vi-VN",
    { style: "currency", currency: "VND" }
  );

  if (currentUser?.id) {
    document.getElementById("item-cart").innerHTML = JSON.parse(
      localStorage.getItem("currentUser")
    ).cart.length;
  }
  document.getElementById("item-cart").innerHTML = JSON.parse(
    localStorage.getItem("currentUser")
  ).cart.length;
}
renderCart();

function changeQuantity(index, status) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  const products = JSON.parse(localStorage.getItem("listProduct")) || [];
  const cart = currentUser.cart;
  const product = products.find((item) => item.ID == cart[index].idSP);
  switch (status) {
    case 0:
      if (cart[index].quantity - 1 > 0) {
        cart[index].quantity -= 1;
      }
      break;
    case 1:
      if (cart[index].quantity + 1 <= product.soluong) {
        cart[index].quantity += 1;
      }
      break;
  }
  currentUser.cart = cart;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  renderCart();
}

function deleteProduct(index) {
  let result = confirm("Xác nhận xóa ?");
  if (result) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    const cart = currentUser.cart;
    cart.splice(index, 1);
    currentUser.cart = cart;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    renderCart();
    document.getElementById("item-cart").innerHTML = cart.length;
  }
}

document.getElementById("item-cart").innerHTML = JSON.parse(localStorage.getItem("currentUser")).cart.length;

// thanh toán
function payBill() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser.cart.length == 0) {
    alert("Ban chua mua hang");
    return;
  }

  let address = document.getElementById("address").value;
  let phoneNumber = document.getElementById("phoneNumber").value;
  let addressError = document.getElementById("address-error");
  let phoneNumberError = document.getElementById("phoneNumber-error");
  let regexPhone = /^0\d{9,10}$/;
  let check = true;

  if(address == ""){
    addressError.innerHTML="Cần nhập địa chỉ"
        check = false;   
  }else{
    addressError.innerHTML=""
  };

  if (!regexPhone.test(phoneNumber)){
    phoneNumberError.innerHTML="Số điện thoại không hợp lệ"
    check = false;
  } else {
    phoneNumberError.innerHTML="";
  }
  if (!check) {
    return; 
  }

  let bills = JSON.parse(localStorage.getItem("bills"));
  let cart = currentUser.cart;
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = String(today.getFullYear());
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();

  let newBill = {
    id: bills.length + 1,
    userID: currentUser.id,
    cart: cart,
    createdAt: `${h}:${m}:${s}, ${dd}/${mm}/${yyyy}`,
    address,
    phoneNumber,
    totalPrice,
    status: 0,
  };
  bills.unshift(newBill);
  localStorage.setItem("bills", JSON.stringify(bills));

  currentUser.cart = [];
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  renderCart();
  window.location.href = "/product/payBill/pay.html";
}
