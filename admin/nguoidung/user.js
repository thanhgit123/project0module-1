
function renderUser() {
    let listUser = JSON.parse(localStorage.getItem("users"));
    let result =
        `
            <tr class="tr1">
                <td class="myTd">Email</td>
                <td class="myTd">Tên người dùng</td>
                <td class="myTd" >Trạng thái</td>
                <td class="myTd" >Tính năng</td>
            </tr> 
        `;
    for (let i = 0; i < listUser.length; i++) {
        result +=
            `
                <tr class="tr1">
                    <td class="myTd">${listUser[i].email}</td>
                    <td class="myTd">${listUser[i].username}</td>
                    <td class="myTd" ><span id="trangthai_${i}">${listUser[i].status ? "Active" : "Ban"}</span></td>
                    <td class="myTd" >
                        <button id="button_${i}" class="button" onclick="changeStatus(${i})">
                        ${listUser[i].status ? "Ban" : "UnBan"}
                        </button>
                    </td>
                </tr> 
            `;
    }
    document.getElementById("tableUser").innerHTML = result;
}

renderUser();
function changeStatus(index) {
    let listUser = JSON.parse(localStorage.getItem("users"));
    listUser[index].status = !listUser[index].status
    localStorage.setItem("users", JSON.stringify(listUser))
    renderUser();
}
