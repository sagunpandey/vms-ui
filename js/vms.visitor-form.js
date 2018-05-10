var currentEmployee;

$(document).ready(function() {
    currentEmployee = JSON.parse($.cookie.read('currentEmployee'));
    populateForm();
});

function getSearchParameters() {
    var prmstr = window.location.search.substr(1);
    return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}

function populateForm() {
    var image = document.getElementById("selected-employee-image");
    var name = document.getElementById('selected-employee-name');
    var position = document.getElementById('selected-employee-position');

    image.src = "images/employee-" + currentEmployee.id + ".jpg";
    name.innerHTML = currentEmployee.name;
    position.innerHTML = currentEmployee.position;

    setDefaultImage();
}

function changeEmployee() {
    window.location = "employee-select.html";
}

function setDefaultImage() {
    $('#selected-employee-image').error(function(){
        $(this).attr('src', 'images/employee-0.jpg');
    });
}

function submitForm() {
    var txt_visitor_name = document.getElementById("visitor_name").value;
    var txt_visitor_contact = document.getElementById("visitor_contact").value;
    var txt_visitor_address = document.getElementById("visitor_address").value;
    var txt_purpose_detail = document.getElementById("purpose_detail").value;
    var txt_employee_id = currentEmployee.id;

    var dataObj = {};
    dataObj.visitor_name = txt_visitor_name;
    dataObj.visitor_contact = txt_visitor_contact;
    dataObj.visitor_address = txt_visitor_address;
    dataObj.purpose_detail = txt_purpose_detail;
    dataObj.employee_id = txt_employee_id;
    var jsonObj = JSON.stringify(dataObj);
}

function cancelForm() {
    bootbox.confirm("Are You Sure?", function(result) {
        if(result == true) {
            window.location = 'index.html';
        }
    });
}