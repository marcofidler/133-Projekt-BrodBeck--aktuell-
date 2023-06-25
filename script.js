

document.addEventListener("DOMContentLoaded",
    function() {
        // Dropdown-Element auswählen
        const dropdownBeruf = document.getElementById("dropdownBeruf");
    
        // AJAX-Anfrage senden
        const request = new XMLHttpRequest();
        request.open("GET", "https://sandbox.gibm.ch/berufe.php?format=JSON", true);

        request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            const resultjson = JSON.parse(request.responseText);
            
            resultjson.forEach(x => {
            // Option-Element für jeden Beruf erstellen
            const option = document.createElement("option");
            option.value = x.beruf_id;
            option.text = x.beruf_name;
            
            // Option dem Dropdown hinzufügen
            dropdownBeruf.appendChild(option);
            });
        } else {
            console.error("Fehler beim Abrufen der Daten.");
        }
        };
        request.send();

        dropdownBeruf.addEventListener("change", function(){
            let selectedOption = $("#dropdownBeruf option:selected").val(); //wert der ausgewählten option

            

        });


    },
);



$("#dropdownBeruf").change(function () { //wird aufgerufen sobald eine änderung im dropdown geschieht



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
})









// $(document).ready(function () { //funktion wird ausgeführt sobald document geladen ist
// 	$.ajax({ //Funktion für asynchrone Anfrage
//         //Daten aus Berufsgruppe
// 		url: "https://sandbox.gibm.ch/berufe.php", //aufruf auf URL wird gesendet
// 		success: function (result) { //wenn erfolgreich, wird Antwort in result gespeichert und Funktion success wird aufgerufen
// 			if (result != null) {

// 				let resultjson = JSON.parse(result); //JSON datei wird den daten untergeordnet

// 				resultjson.forEach((x) => { //dropsown optionen werde zusammengestellt
// 					$("#dropdownBeruf").append(

// 						'<option value="' + x.beruf_id + '">' + x.beruf_name + "</option>"
// 					);
// 				});
// 			}
// 		},



// 	});
// });

