let idUpdate = null;
function render() {
    const category = JSON.parse(localStorage.getItem("category")) || [];
    let stringHTML = 
    `
        <tr>
              <th>ID</th>
              <th>Loại Sản Phẩm</th>
              <th colspan="2">Chức Năng</th>
        </tr>
    `;
    for (let i = 0; i < category.length; i++) {
        stringHTML +=
        `
         <tr>
            <td>${category[i].id}</td>
            <td>${category[i].name}</td>
            <td>
                 <button onclick="clickUpdate(${category[i].id})">Update</button>
            </td>
            <td>
                <button onclick="clickDelete(${i})">Delete</button>
            </td>
        </tr>
        ` 
    }
    document.getElementById("myTable").innerHTML=stringHTML
}
render();

function add() {
    const category = JSON.parse(localStorage.getItem("category")) || [];
    const inputCategory = document.getElementById("nameCategory").value;
    if (!inputCategory) {
        alert("Nhập thông tin !!")
        return
    }
    let id=1;
    if (category.length != 0) {
        id = category[category.length - 1].id + 1
    }
    category.push({
        id,
        name: inputCategory
    })
    localStorage.setItem("category", JSON.stringify(category))
    document.getElementById("nameCategory").value = ""
    render();
}


function clickDelete(index) {
    const category = JSON.parse(localStorage.getItem("category")) || []
    category.splice(index, 1)
    localStorage.setItem("category", JSON.stringify(category))
    render()
}

function clickUpdate(id) {
    const category = JSON.parse(localStorage.getItem("category")) || []
    const index = category.findIndex(item => item.id == id)
    document.getElementById("nameCategory").value = category[index].name
    idUpdate = id
}

function update() {
    const category = JSON.parse(localStorage.getItem("category")) || []
    const index = category.findIndex(item => item.id == idUpdate)
    const inputCategory = document.getElementById("nameCategory").value
    if (!inputCategory) {
        alert("Nhập thông tin !!")
        return
    }
    category[index].name = inputCategory
    localStorage.setItem("category", JSON.stringify(category))
    document.getElementById("nameCategory").value = ""
    render()
    idUpdate = null
}