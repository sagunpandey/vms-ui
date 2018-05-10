var employeeJSON;
var selectedEmployeeListItem;

var firstThumbIndex;
var lastThumbIndex;

$(document).ready(function() {
    $.cookie.destroy('currentEmployee');

    employeeJSON = sessvars.employeeJSON;
    populateEmployeeThumbs();
    searchInit();
});

function populateEmployeeThumbs() {
    var listItems = "";
    for(var i = 0; i<employeeJSON.length; i++) {
        var imageSource = "images/employee-" + employeeJSON[i].id + ".jpg";
        listItems += '<li onclick="selectItem(this)" ' +
            'class="col-md-2 employee-thumbs-item list-group-item" id="' + employeeJSON[i].id + '" ' +
            'style="display : none;">' +
            '<div class="thumbnail"><img class="img-responsive employee-avatar" src="' + imageSource + '" alt="Avatar"></div>' +
            '<div class="caption"><p>' + employeeJSON[i].name + '</p><p>' + employeeJSON[i].position + '</p></div></li>';
    }
    var ul = document.getElementById("employee-thumbs");
    ul.innerHTML = listItems;

    var items = ul.getElementsByTagName("li");
    for(i = 0; i<6; i++) {
        items[i].style.display = "";
    }

    var thumbnailClass = $(".thumbnail");
    var width = thumbnailClass.outerWidth();
    thumbnailClass.css("height", width+"px");
    equalHeight($(".employee-thumbs-item"));
    setDefaultImages();

    firstThumbIndex = 0;
    lastThumbIndex = 5;
}

function equalHeight(group) {
    var tallest = 0;
    group.each(function() {
        var thisHeight = $(this).height();
        if(thisHeight > tallest) {
            tallest = thisHeight;
        }
    });
    group.each(function() { $(this).height(tallest); });
}

function setDefaultImages() {
    $('.employee-avatar').error(function(){
        $(this).attr('src', 'images/employee-0.jpg');
    });
}

function searchInit() {
    $('#employee-search').fastLiveFilter('#employee-thumbs');
}

function filterEmployeeThumbs(position) {
    var firstPosition = position;
    var lastPosition;

    if(firstPosition<0 || firstPosition>(employeeJSON.length-1)) {
        return;
    }
    firstThumbIndex = firstPosition;

    var ul = document.getElementById("employee-thumbs");
    var items = ul.getElementsByTagName("li");
    for(var i = 0; i<items.length; i++) {
        if(i>=firstPosition && i<=(firstPosition+5)) {
            items[i].style.display = "";
            lastPosition = i;
        } else {
            items[i].style.display = "none";
        }
    }

    if(firstPosition == 0) {
        $('#previous-employee-thumbs').addClass('disabled');
    } else {
        $('#previous-employee-thumbs').removeClass('disabled');
    }
    if(lastPosition == (employeeJSON.length-1)) {
        $('#next-employee-thumbs').addClass('disabled');
    } else {
        $('#next-employee-thumbs').removeClass('disabled');
    }

    lastThumbIndex = lastPosition;
}

function previousEmployeeThumbs() {
    if(searchText.length == 0) {
        filterEmployeeThumbs(firstThumbIndex-6);
    } else {
        searchFilterPrevious()
    }
}

function nextEmployeeThumbs() {
    if(searchText.length == 0) {
        filterEmployeeThumbs(lastThumbIndex+1);
    } else {
        searchFilterNext();
    }
}

function selectItem(element) {
    if (selectedEmployeeListItem != null) {
        selectedEmployeeListItem.removeClass("active");
    }
    selectedEmployeeListItem = $(element);
    selectedEmployeeListItem.addClass("active");

    var selectedEmployeeID = selectedEmployeeListItem.attr('id');
    for(var i=0; i<employeeJSON.length; i++) {
        if(employeeJSON[i].id == selectedEmployeeID) {
            $.cookie.write('currentEmployee', JSON.stringify(employeeJSON[i]));
            confirmEmployee();
        }
    }
}

function confirmEmployee() {
    window.location = "visitor-form.html";
}

function cancelForm() {
    bootbox.confirm("Are You Sure?", function(result) {
        if(result == true) {
            window.location = 'index.html';
        }
    });
}