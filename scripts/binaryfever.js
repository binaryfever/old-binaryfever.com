(function() {
	$(document).ready(function() {
		

		$('#about_link').click(function(event) {


			loadAboutPage();
			event.preventDefault();
		});
		$('#projects_link').click(function(event) { 
			loadProjectsPage();
			event.preventDefault();
		});
		$('#contact_link').click(function(event) {

			loadContactPage();
			event.preventDefault();
		});

		$('#submit').click(function(){
			//Hide all errors 
			$(".error").hide();
			var hasError = false;
			var emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 

			var nameVal = $("#name").val();
			if(nameVal == '') {
				$("#name").after('<span class="error">You forgot to enter your name.</span>');
				hasError = true;
			}

			var emailFromVal = $("#email").val();
			if(emailFromVal == '') {
				$("#email").after('<span class="error">You forgot to enter the email address to send from.</span>');
				hasError = true;
			} else if(!emailReg.test(emailFromVal)) {
				$("#email").after('<span class="error">Enter a valid email address to send from.</span>');
				hasError = true;
			}

			var messageVal = $("#message").val();
			if(messageVal == '') {
				$("#message").after('<span class="error">You forgot to enter the message.</span>');
				hasError = true;
			}


			if(hasError == false) {
				
				$("#ajax_loader").append('<img src="images/ajax-loader.gif" alt="Loading" id="loading" />Sending');
				$("#ajax_loader").slideDown("normal");
                                //$.post("cgi-bin/sendemail.cgi", {email_from: emailFromVal, name: nameVal, message: messageVal});
				
				$.post("cgi-bin/sendemail.cgi",
				{ email_from: emailFromVal, name: nameVal, message: messageVal}, function(data){
				    alert(data);
					$("#ajax_loader").slideUp("normal", function() {				   
				            $("#ajax_loader").append('<h1>Success</h1><p>Your email was sent.</p>');
					});
                                  });
                                }

			return false;
			});
});

//Helper Functions
function isShowing(selector){
	var state = $(selector).css("display");
	if(state == "block")
	return true;
	else
	return false; 
}

function loadAboutPage(){
	if(isShowing('#contact'))
	$('#contact').toggle("blind", {}, 200, function(){$('#about').toggle("blind", {}, 200);});
	else if(isShowing('#projects'))
	$('#projects').toggle("blind", {}, 200, function(){$('#about').toggle("blind", {}, 200);});
	else
	$('#about').toggle("blind", {}, 200);
}

function loadProjectsPage(){

	if(isShowing('#about'))
	$('#about').toggle("blind", {}, 200, function(){$('#projects').toggle("blind", {}, 200);});
	else if(isShowing('#contact'))
	$('#contact').toggle("blind", {}, 200, function(){$('#projects').toggle("blind", {}, 200);});
	else
	$('#projects').toggle("blind", {}, 200);
}

function loadContactPage(){
	if(isShowing('#about'))
	$('#about').toggle("blind", {}, 200, function(){$('#contact').toggle("blind", {}, 200);});
	else if(isShowing('#projects'))
	$('#projects').toggle("blind", {}, 200, function(){$('#contact').toggle("blind", {}, 200);});
	else
	$('#contact').toggle("blind", {}, 200);	
}


//Extend jQuery to get url params
$.extend({
	getUrlVars: function(){
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	},
	getUrlVar: function(name){
		return $.getUrlVars()[name];
	}
});
}).call(this);
