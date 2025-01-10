const $ = document;

let addBtn = $.querySelector("#add");
let dataContainer = $.querySelector("#list");
let searchBox = $.querySelector(".search-box");

function validateData() {
    let nameValue = document.querySelector("#name").value;
    let phoneValue = document.querySelector("#phone").value;
    let addressValue = document.querySelector("#address").value;
    if (nameValue === '') {
        swal.fire({
            title: 'Name is Require...!',
            icon: 'error'
        });
        return false;
    };
    if (phoneValue === '') {
        swal.fire({
            title: 'Phone is Require...!',
            icon: 'error'
        });
        return false;
    } else if (phoneValue.length < 11 || phoneValue.length > 11) {
        swal.fire({
            title: 'Phone Number must 11 Character...!',
            icon: 'error'
        });
        return false;
    };
    if (addressValue === '') {
        swal.fire({
            title: 'Address is Require...!',
            icon: 'error'
        });
        return false;
    };
    return true;
};

function selectData() {
    let usersList;
    if (localStorage.getItem('usersList') == null) {
        usersList = [];
    } else {
        usersList = JSON.parse(localStorage.getItem('usersList'));
    };
    let html = '';
    usersList.forEach(function (element , index) {
        html += "<tr>";
        html += "<td>"+ element.name +"</td>";
        html += "<td>"+ element.phone +"</td>";
        html += "<td>"+ element.address +"</td>";
        html += '<td><button onclick="deleteData('+index+')"  class="delete-btn" id="delete"><i class="fa fa-trash"></i></button><button onclick="updateData('+index+')" class="edit-btn" id="edit"><i class="fa fa-edit"></i></button></td>';
        html += "</tr>";
    });
    dataContainer.innerHTML = html;
};

function addData(e) {
    e.preventDefault();
    if (validateData() === true) {
        let nameValue = document.querySelector("#name").value;
        let phoneValue = document.querySelector("#phone").value;
        let addressValue = document.querySelector("#address").value;
        let usersList;
        if (localStorage.getItem('usersList') == null) {
            usersList = [];
        } else {
            usersList = JSON.parse(localStorage.getItem('usersList'));
        };
        usersList.push({
            name: nameValue,
            phone: phoneValue,
            address: addressValue,
        });
        localStorage.setItem('usersList', JSON.stringify(usersList));
        selectData();
        document.querySelector("#name").value = '';
        document.querySelector("#phone").value = '';
        document.querySelector("#address").value = '';
        swal.fire({
            title: 'User Added Successfully...!',
            icon: 'success'
        });
    } else {
        console.log('form not validate...!');
    };
};

function updateData(index) {
    let usersList;
    if (localStorage.getItem('usersList') == null) {
        usersList = [];
    } else {
        usersList = JSON.parse(localStorage.getItem('usersList'));
    };
    $.querySelector("#name").value = usersList[index].name;
    $.querySelector("#phone").value = usersList[index].phone;
    $.querySelector("#address").value = usersList[index].address;
    $.querySelector('#update').onclick = function(e) {
        e.preventDefault();
        if (validateData() === true) {
            usersList[index].name = $.querySelector("#name").value;
            usersList[index].phone = $.querySelector("#phone").value;
            usersList[index].address = $.querySelector("#address").value;
            localStorage.setItem('usersList', JSON.stringify(usersList));
            selectData();
            $.querySelector("#name").value = '';
            $.querySelector("#phone").value = '';
            $.querySelector("#address").value = '';
            swal.fire({
                title: 'User Info Updated Successfully...!',
                icon: 'success'
            });
        } else {
            swal.fire({
                title: 'Please select at least one user.',
                text: 'Using the user edit button.',
                icon: 'error'
            });
        };
    };
};

function deleteData(index) {
    let usersList;
    if (localStorage.getItem('usersList') == null) {
        usersList = [];
    } else {
        usersList = JSON.parse(localStorage.getItem('usersList'));
    };
    usersList.splice(index, 1);
    localStorage.setItem('usersList', JSON.stringify(usersList));
    selectData();
    swal.fire({
        title: 'User Deleted Successfully...!',
        icon: 'success'
    });
};

function searchData(e) {
    let searchBoxValue = e.target.value;
    let usersList;
    if (localStorage.getItem('usersList') == null) {
        usersList = [];
    } else {
        usersList = JSON.parse(localStorage.getItem('usersList'));
    };
    let html = '';
    let filteredUser = usersList.filter((users) => users.name.includes(searchBoxValue));
    dataContainer.innerHTML = '';
    filteredUser.map((user , index) => {
        html += "<tr>";
        html += "<td>"+ user.name +"</td>";
        html += "<td>"+ user.phone +"</td>";
        html += "<td>"+ user.address +"</td>";
        html += '<td><button onclick="deleteData('+index+')"  class="delete-btn" id="delete"><i class="fa fa-trash"></i></button><button onclick="updateData('+index+')" class="edit-btn" id="edit"><i class="fa fa-edit"></i></button></td>';
        html += "</tr>";
    });
    dataContainer.innerHTML = html;
};

addBtn.addEventListener('click', addData);
searchBox.addEventListener('keyup', searchData);
$.onload = selectData();
