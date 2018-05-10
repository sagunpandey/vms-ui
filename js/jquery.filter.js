var searchText = "";

var matchedEmployees = [];

var firstFilteredThumbIndex;
var lastFilteredThumbIndex;

jQuery.fn.fastLiveFilter = function(list, options) {
	options = options || {};
	list = jQuery(list);
	var input = this;
	var lastFilter = '';
	var timeout = options.timeout || 0;
	var callback = options.callback || function() {};
	
	var keyTimeout;
	
	//NOTE: because we cache lis & len here, users would need to re-init the plugin
	//if they modify the list in the DOM later.  This doesn't give us that much speed
	//boost, so perhaps it's not worth putting it here.
	var lis = list.children();
	var len = lis.length;
	callback(len); //do a one-time callback on initialization to make sure everything is in sync

	input.change(function() {
		var startTime = new Date().getTime();
		var filter = input.val().toLowerCase();
        if(filter.length == 0) {
            filterEmployeeThumbs(firstThumbIndex);
            return;
        }
        searchText = filter;
		var li, innerText;
		var numShown = 0;
        var count = 0;
        matchedEmployees.length = 0;
		for (var i = 0; i < len; i++) {
			li = lis[i];
			innerText = !options.selector ?
				(li.textContent || li.innerText || "") :
				$(li).find(options.selector).text();

			if (innerText.toLowerCase().indexOf(filter) >= 0) {
                matchedEmployees[count] = li;
                count++;
				numShown++;
			} else {
                //do nothing
			}
		}
        searchFilter(0);
		callback(numShown);
		var endTime = new Date().getTime();
		console.log('Search for ' + filter + ' took: ' + (endTime - startTime) + ' (' + numShown + ' results)');
		return false;
	}).keydown(function() {
		clearTimeout(keyTimeout);
		keyTimeout = setTimeout(function() {
			if( input.val() === lastFilter ) return;
			lastFilter = input.val();
			input.change();
		}, timeout);
	});
	return this;
};

function searchFilter(position) {
    var firstPosition = position;
    var lastPosition;
    var list = matchedEmployees;

    if(firstPosition<0 || firstPosition>(list.length-1)) {
        return;
    }

    var ul = document.getElementById("employee-thumbs");
    var items = ul.getElementsByTagName("li");
    var count = 0;
    for(var i = 0; i<items.length; i++) {
        for(var j = firstPosition; j<list.length; j++) {
            if(items[i].id == list[j].id && count<6) {
                lastPosition = j;
                if (items[i].style.display == "none") {
                    items[i].style.display = "";
                }
                count++;
                break;
            } else {
                if (items[i].style.display != "none") {
                    items[i].style.display = "none";
                }
            }
        }
    }
    if(firstPosition == 0) {
        $('#previous-employee-thumbs').addClass('disabled');
    } else {
        $('#previous-employee-thumbs').removeClass('disabled');
    }
    if(lastPosition == (list.length-1)) {
        $('#next-employee-thumbs').addClass('disabled');
    } else {
        $('#next-employee-thumbs').removeClass('disabled');
    }

    firstFilteredThumbIndex = firstPosition;
    lastFilteredThumbIndex = lastPosition;
}

function searchFilterPrevious() {
    searchFilter(firstFilteredThumbIndex-6);
}

function searchFilterNext() {
    searchFilter(lastFilteredThumbIndex+1);
}