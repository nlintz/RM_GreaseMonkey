// ==UserScript==
// @name eBay to G4SI
// @namespace http://www.facebook.com/mlintz
// @description tranfers information from eBay to G4SI
// @include https://ec.g4si.com/Shipping/*
// ==/UserScript==

var alert_function = function() {
	var shipping_info_string = document.getElementById('txtDescription').value;
	if (shipping_info_string.length < 3) {
		return;
	}
	if (shipping_info_string.slice(0,2) == "xx") {
		return;
	}
	
	var states = { "AL":1, "AK":2, "AZ":3, "AR":4, "CA":5, "CO":6, "CT":7, "DE":8, "DC":9, "FL":10, "GA":11, "HI":12, "ID":13, "IL":14, "IN":15, "IA":16, "KS":17, "KY":18, "LA":19, "ME":20, "MD":21, "MA":22, "MI":23, "MN":24, "MS":25, "MO":26, "MT":27, "NE":28, "NV":29, "NH":30, "NJ":31, "NM":32, "NY":33, "NC":34, "ND":35, "OH":36, "OK":37, "OR":38, "PA":39, "RI":40, "SC":41, "SD":42, "TN":43, "TX":44, "UT":45, "VT":46, "VA":47, "WA":48, "WV":49, "WI":50, "WY":51 };

	var shipping_info_array = shipping_info_string.split("\n");
	var length = shipping_info_array.length;
	if (length >= 1) {
		document.getElementById("chkboxResidential").checked = true;
		document.getElementById('txtName').value = shipping_info_array[0];
		document.getElementById('txtCompany').value = shipping_info_array[0];
	}
	if (length >= 2) { 
		var address_arr = shipping_info_array[1].split(":::");
		document.getElementById('txtAddress').value = address_arr[0];
		document.getElementById('txtAddress2').value = address_arr[1];
	}
	if (length >= 3) {
		document.getElementById('txtCity').value = shipping_info_array[2].split(",")[0];
		var city_state_zip_array = shipping_info_array[2].split(" ");
		document.getElementById('txtZip').value = city_state_zip_array[city_state_zip_array.length - 1];
		var state = city_state_zip_array[city_state_zip_array.length - 2];
		document.getElementById('ddState').options[states[state]].selected = true;
	}
	if (length >= 4) {
		var phone_arr = shipping_info_array[3].split(".");	
		document.getElementById("txtPhoneNumber").value = phone_arr[0];
		document.getElementById("txtExtension").value = phone_arr[1];
	}
	if (length >= 5) {
		document.getElementById("txtInsuredValue_text").value = shipping_info_array[4];
	}
	if (length >= 6) {
		document.getElementById("txtEmail").value = shipping_info_array[5];
	}
};

var text_area = document.getElementById('txtDescription');
text_area.addEventListener('click', alert_function, false);