// function saveLocal() {
//     let category = [
//       {
//         id: 1,
//         name: "Giày Nike",
//       },
//       {
//         id: 2,
//         name: "Giày Vans",
//       },
//       {
//         id: 3,
//         name: "Giày Adidas",
//       },
//       {
//         id: 4,
//         name: "Giày Convert",
//       },
//     ];
//     localStorage.setItem("category", JSON.stringify(category));
//   }
//   saveLocal();
//Lấy mảng Product trên local
let listProduct = JSON.parse(localStorage.getItem("listProduct"));
let category = JSON.parse(localStorage.getItem("category"));

// Lấy thẻ select từ DOM
const categorySelect = document.getElementById("categorySelect");

// Lặp qua danh sách category và thêm từng loại là một option
category.forEach((categoryItem) => {
const option = document.createElement("option");
option.value = categoryItem.name;
option.text = categoryItem.name;
categorySelect.appendChild(option);
});
// Đọc ảnh
const myImage = document.getElementById("image");
const imageInput = document.getElementById("imgProduct");
imageInput.onchange = function (event) {
const file = event.target.files[0];
// Đọc tệp ảnh và chuyển đổi nó thành dữ liệu URL
const reader = new FileReader();
reader.onload = function (event) {
  const dataUrl = event.target.result;
  myImage.src = dataUrl;
  localStorage.setItem("myImage", dataUrl);
};
reader.readAsDataURL(file);
};
// Tạo ID
function makeCode() {
var today = new Date();
var day = today.getDay();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = String(today.getFullYear());
var h = today.getHours();
var m = today.getMinutes();
var s = today.getSeconds();
m = checkTime(m);
s = checkTime(s);
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
return (result = yyyy + mm + dd + h + m + s);
}

// Render list product
function renderProduct() {
let total = `
  <tr class="tr1">
    <td class="td1">ID</td>
    <td class="td1">Ảnh</td>
    <td class="td1">Tên</td>
    <td class="td1">Loại </td>
    <td class="td1">Giá</td>
    <td class="td1">Số lượng</td>
    <td class="td1" colspan="2">Tính năng</td>
  </tr>
`;
for (let i = 0; i < listProduct.length; i++) {
  total += `
  <tr class="tr1">
    <td class="td1">${listProduct[i].ID}</td>
    <td class="td1"><img src="${listProduct[i].img}" alt="${listProduct[i].ten}" width="100px" height="100px" /></td>
    <td class="td1">${listProduct[i].ten}</td>
    <td class="td1">${listProduct[i].category}</td>
    <td class="td1">${listProduct[i].gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
    <td class="td1">${listProduct[i].soluong}</td>
    <td class="td1"><button class="buttonNe" onclick="editButton(${i})">Edit</button></td>
    <td class="td1"><button class="buttonNe" onclick="deleteButton(${i})">Delete</button>
      </td>
  </tr>
`;
}
document.getElementById("tableAdded").innerHTML = total;
}
// Thêm sản phẩm
function saveButton() {
makeCode();
let id = result;
let nameProductInput = document.getElementById("nameProduct").value;
let imgInput = localStorage.getItem("myImage");
let priceProductInput = document.getElementById("priceProduct").value;
let numberProduct = document.getElementById("quantity").value;
let category = document.getElementById("categorySelect").value;

let product = {
  ID: id,
  img: imgInput,
  ten: nameProductInput,
  gia: +priceProductInput,
  soluong: numberProduct,
  category: category,
};
if (listProduct == null) {
  listProduct = [];
  listProduct.unshift(product);
  localStorage.setItem("listProduct", JSON.stringify(listProduct));
} else {
  listProduct.unshift(product);
  localStorage.setItem("listProduct", JSON.stringify(listProduct));
}
nameProductInput = document.getElementById("nameProduct").value = "";
priceProductInput = document.getElementById("priceProduct").value = "";
numberProduct = document.getElementById("quantity").value = "";
localStorage.removeItem("myImage");
renderProduct();
}
renderProduct();
// Xóa sản phẩm
function deleteButton(id) {

listProduct.splice(id, 1);
localStorage.setItem("listProduct", JSON.stringify(listProduct));
renderProduct();
}
// Bắn thông tin sản phẩm cần sửa
function editButton(id) {
  window.scrollTo(0,0)
document.getElementById("nameProduct").value =
  listProduct[id].ten;
document.getElementById("priceProduct").value =
  listProduct[id].gia;
document.getElementById("quantity").value =
  listProduct[id].soluong;
myImage.src = listProduct[id].img;
localStorage.setItem("flag", id);
}
// Chỉnh sửa thông tin của sản phẩm
function editAll() {
let id = localStorage.getItem("flag");
listProduct[id].ten = document.getElementById("nameProduct").value;
listProduct[id].gia = +document.getElementById("priceProduct").value;
listProduct[id].soluong = document.getElementById("quantity").value;
listProduct[id].category =
  document.getElementById("categorySelect").value;
const newImage = localStorage.getItem("myImage");
if (newImage !== null) {
  listProduct[id].img = newImage;
  localStorage.removeItem("myImage");
}
localStorage.setItem("listProduct", JSON.stringify(listProduct));
document.getElementById("nameProduct").value = "";
document.getElementById("priceProduct").value = "";
document.getElementById("quantity").value = "";
localStorage.removeItem("myImage");
renderProduct();
}
