const user = JSON.parse(localStorage.getItem("currentUser"))
const users = JSON.parse(localStorage.getItem("users"))
const products = JSON.parse(localStorage.getItem("listProduct"))
function renderBills() {
    const bills = JSON.parse(localStorage.getItem("bills")) || []
    let stringHTML = ""
    let stringCart = ""
    
    for(let i = 0; i < bills.length; i++) {
        stringCart = ""
        const cart = bills[i].cart
        for(let j = 0; j < cart.length; j++) {
            let product = products.find(e => e.ID == cart[j].idSP)
            stringCart +=
            `
                <div>
                    <img width="50px" src="${product.img}" />
                    <br>
                    <p>${product.ten}</p>
                    <p>Số lượng: ${cart[j].quantity}</p>
                </div>
            `
        }

        let findUser= users.find((user)=>user.id === bills[i].userID);
        stringHTML +=
        `
        <tr style="border-bottom: 1px solid #333;">
            <td>${bills[i].id}</td>
            <td>${findUser.username}</td>
            <td>${stringCart}</td>
            <td>${Number(bills[i].totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            <td>
                <p></p>
                <p>Địa chỉ : ${bills[i].address}</p>
                <p>SĐT : ${bills[i].phoneNumber}</p>
            </td>
            <td>${bills[i].status == 0 ? "Đang chờ" : bills[i].status == 1 ? "Chấp nhận" : "Từ chối"}</td>
            <td>
                ${bills[i].status == 0 ? (
                    `<button class="btnBill" onclick="changeStatus('${i}', 1)"> Chấp Nhận </button>
                     <button class="btnBill" onclick="changeStatus('${i}', 2)"> Từ Chối </button>`
                ) : `<span></span>`}
            </td>
        </tr>
        `
    }
    document.getElementById("billTable").innerHTML = stringHTML
}
renderBills()

function changeStatus(index, status) {
    let result = confirm("Xác nhận ?")
    if(result){
        const bills = JSON.parse(localStorage.getItem("bills")) || []
    bills[index].status = status
    localStorage.setItem("bills", JSON.stringify(bills))
    renderBills()
    }
    
}
