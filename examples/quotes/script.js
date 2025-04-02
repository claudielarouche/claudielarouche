var randomNum = 0;
var arrayQuote = [];
var keys;

$(document).ready(function() {	
	fillQuoteArray();

    $("#getQuote").on("click", function() {		
		getQuote();
	});
});

function getQuote(){
	var html = "";
	
	var newNum = Math.floor((Math.random() * keys));
		
	//Ensure that the new quote is different from the one currently showing on the screen
	while (newNum == randomNum){
		newNum = Math.floor((Math.random() * keys));
	}	
	randomNum = newNum;			
	
	html += "<blockquote><p>" + arrayQuote[randomNum]["quote"]  + "</p>";
	html += "<footer>Source: <cite title=\"Source Title\">" + arrayQuote[randomNum]["author"]  + "</cite></footer></blockquote>"

	$(".quote").html(html);	
}

function fillQuoteArray(){
	$.getJSON("quotes.json", function(data) {
		
		$.each(data, function(key, val) {
			keys = Object.keys(val).length;
			
			var myObject;
			
			for(var i = 0; i<keys; i++){
				myObject = new Object();
				myObject.quote = val[i]["quote"];
				myObject.author = val[i]["author"];
				arrayQuote.push(myObject);
			}
			
		});
	});
}