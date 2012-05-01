// ==UserScript==
// @name eBay Addon
// @namespace http://www.facebook.com/mlintz
// @description scrapes the "awaiting shipment" page	
// @include http://k2b-bulk.ebay.com/ws/*
// ==/UserScript==


var copy_info = function() {
	if (5 != document.getElementsByName("ShippingMethod1")[0].options[document.getElementsByName("ShippingMethod1")[0].selectedIndex].value) {
		alert("Requested shipping is not UPS 2nd Day Air");
	}
	
	var name_str = document.getElementsByName("buyercontactname")[0].value;
	var address_str_1 = document.getElementsByName("buyeraddress1")[0].value;
	var address_str_2 = document.getElementsByName("buyeraddress2")[0].value;
	var city_str = document.getElementsByName("buyercity")[0].value;
	var state_str = document.getElementsByName("buyerstateprovince")[0].value;
	var zip_str = document.getElementsByName("buyerzip")[0].value;
	//var country_str = document.getElementsByName("buyercountry")[0].value;
	var text_area = document.getElementById('QuickAddress');
	var phone_str = document.getElementsByName("dayphone1")[0].value + 
		document.getElementsByName("dayphone2")[0].value + 
		document.getElementsByName("dayphone3")[0].value + "." + 
		document.getElementsByName("dayphone4")[0].value;
	var total_str = document.getElementById("testing1").innerHTML;
	var total_int = parseInt(total_str) - 50;
	total_str = total_int.toString();
	total_str = total_str.slice(0, total_str.length - 2) + "00.00";
	if (phone_str.length <= 6) {
		phone_str = "0000000000.";
	}
	text_area.value = name_str + "\n" + address_str_1 + ":::" + address_str_2 + "\n" + city_str + ", " + 
		state_str + " " + zip_str + "\n" + phone_str + "\n" + total_str;
	text_area.select();
	text_area.removeEventListener('click', copy_info, false);
	
	// get email
	var elements = document.getElementsByTagName("td");
	var element;
	for (var i = 0; i < elements.length; ++i) {
		element = elements[i];
		if (element.textContent.indexOf("@") != -1 && element.textContent.indexOf("\n") == -1) {
			text_area.value += "\n" + element.textContent; 
		}
	}
	// end get email
	
	text_area.select();
	text_area.removeEventListener('click', copy_info, false);
}

var text_area = document.getElementById('QuickAddress');
text_area.addEventListener('click', copy_info, false);