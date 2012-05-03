// ==UserScript==
// @name eBay to G4SI
// @namespace http://www.facebook.com/mlintz
// @description tranfers information from eBay to G4SI
// @include https://ec2.g4si.com/shipping/*
// ==/UserScript==

//TODO check size of string b4 running fxn 
var alert_function = function() {
	var shipping_info_string = document.getElementById('ctl00_cphContent_dropShipEmail2').value;
	var states = { "AL":1, "AK":2, "AZ":3, "AR":4, "CA":5, "CO":6, "CT":7, "DE":8, "DC":9, "FL":10, "GA":11, "HI":12, "ID":13, "IL":14, "IN":15, "IA":16, "KS":17, "KY":18, "LA":19, "ME":20, "MD":21, "MA":22, "MI":23, "MN":24, "MS":25, "MO":26, "MT":27, "NE":28, "NV":29, "NH":30, "NJ":31, "NM":32, "NY":33, "NC":34, "ND":35, "OH":36, "OK":37, "OR":38, "PA":39, "RI":40, "SC":41, "SD":42, "TN":43, "TX":44, "UT":45, "VT":46, "VA":47, "WA":48, "WV":49, "WI":50, "WY":51 };
	var shipping_info_array = shipping_info_string.split("  "); //changed split delimiter from line break to double space
	var length = shipping_info_array.length;
	if (length >= 1) {
		//document.getElementById("chkboxResidential").checked = true; //dont need to check residential
		document.getElementById('ctl00_cphContent_txtName').value = shipping_info_array[0]; // this should be fine
		document.getElementById('ctl00_cphContent_txtCompany').value = shipping_info_array[0]; // this should be fine
	}
	if (length >= 2) { 
		var address_arr = shipping_info_array[1].split(":::");
		document.getElementById('ctl00_cphContent_txtAddress').value = address_arr[0];
		document.getElementById('ctl00_cphContent_txtAddress2').value = address_arr[1];
	}
	if (length >= 3) {
		document.getElementById('ctl00_cphContent_txtCity').value = shipping_info_array[2].split(",")[0];
		var city_state_zip_array = shipping_info_array[2].split(" ");
		document.getElementById('ctl00_cphContent_txtZip').value = city_state_zip_array[city_state_zip_array.length - 1].split('-')[0];//TODO make the zip shorter (unit test this fix)
		var state = city_state_zip_array[city_state_zip_array.length - 2];
		document.getElementById('ctl00_cphContent_ddState').options[states[state]].selected = true;
	}
	if (length >= 4) {
		var phone_arr = shipping_info_array[3].split(".");	
		document.getElementById("ctl00_cphContent_txtPhoneNumber").value = phone_arr[0];
		document.getElementById("ctl00_cphContent_txtExtension").value = phone_arr[1];
	}
	if (length >= 5) {
		document.getElementById("ctl00_cphContent_txtInsuredValue_text").value = shipping_info_array[4];
	if (length >= 6) {
	}
		document.getElementById("ctl00_cphContent_txtEmail").value = shipping_info_array[5];
	}
	document.getElementById("ctl00_cphContent_dropShipment").checked = false;
};


var clickEvt=document.createEvent("MouseEvents");
clickEvt.initEvent("click",false,false);
document.getElementById("ctl00_cphContent_dropShipment").dispatchEvent(clickEvt);

var text_area = document.getElementById("ctl00_cphContent_dropShipEmail2");
text_area.addEventListener("click", alert_function, false);
