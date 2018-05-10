var employeeJSON;

$(document).ready(function() {
    sessvars.$.clearMem();
    $.cookie.destroy('currentEmployee');
    loadJSON('employee.json', function(response) {
        employeeJSON = JSON.parse(response);
        populateEmployeeList();
    });
});

function loadJSON(path, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function populateEmployeeList() {
    var listItems = "";
    for (var i = 0; i < employeeJSON.length; i++) {
        var badge = null;
        if(employeeJSON[i].status){
            badge  = "in";
        } else {
            badge = "out";
        }
        listItems += "<div class=\"list-group-item\" id=\"" + employeeJSON[i].id + "\">" + employeeJSON[i].name +
            "<span class=\"badge\">" + badge + "</span></div>";
    }
    document.getElementById("employee-list").innerHTML = listItems;
}

function register() {
    sessvars.employeeJSON = employeeJSON;
    window.location = "employee-select.html";
}