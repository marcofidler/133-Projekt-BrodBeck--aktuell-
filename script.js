$(document).ready(function () { //funktion wird ausgeführt sobald document geladen ist
	$.ajax({ //Funktion für asynchrone Anfrage
		url: "https://gibm.becknet.ch/warenhaus/getFiliale.php?format=JSON", //aufruf auf URL wird gesendet
		success: function (result) { //wenn erfolgreich Antwort kommt wird success aufgerufen, Antwort wird in result gespeichert
			if (result != null) {
				let resultjson = JSON.parse(result); //JSON datei wird den daten untergeordnet
				resultjson.forEach((x) => { //dropsown optionen werde zusammengestellt
					$("#dropdown").append(
						'<option value="' + x.id + '">' + x.strasse + "</option>"
					);
				});
			}
		},
	});
});
$("#dropdown").change(function () { //wird aufgerufen sobald eine änderung im dropdown geschieht
	let selectedOption = $("#dropdown option:selected").val(); //wert der ausgewählten option
	$.ajax({ //Funktion für asynchrone Anfrage
		url: "https://gibm.becknet.ch/warenhaus/getFiliale.php?format=JSON&filiale=" + 
		selectedOption, //wert der ausgewählten option im JSON format
		success: function (result) { //wenn erfolgreich Antwort kommt wird success aufgerufen, Antwort wird in result gespeichert
			if (result != null) {
				let resultjson = JSON.parse(result);
				$("#data").html( //im DIV werden die Daten angezeigt / neue tabelle mit den wird erstellt
					"<table class='table'><tr><th>Stadt</th><th>Strasse</th><th>Öffnungszeit</tr></tr> <tr><td>" +
						resultjson[0].stadt +
						"</td><td>" +
						resultjson[0].strasse +
						"</td><td>" +
						resultjson[0].oeffnungszeiten +
						"</td></tr></table>"
				);
			}
		},
	});
});