
let klassenId;

document.addEventListener("DOMContentLoaded",
    function() {
        // Dropdown-Element auswählen
        const dropdownBeruf = document.getElementById("dropdownBeruf");
    
        // AJAX-Anfrage senden
        const requestBeruf = new XMLHttpRequest();
        requestBeruf.open("GET", "https://sandbox.gibm.ch/berufe.php?format=JSON", true);

        requestBeruf.onload = function() {
        if (requestBeruf.status >= 200 && requestBeruf.status < 400) {
            const resultjson = JSON.parse(requestBeruf.responseText);
            
            resultjson.forEach(x => {
            // Option-Element für jeden Beruf erstellen
            const option = document.createElement("option");
            option.value = x.beruf_id;
            option.text = x.beruf_name;
            
            // Option dem Dropdown hinzufügen
            dropdownBeruf.appendChild(option);
            });
        } else {
            console.error("Fehler beim Abrufen der Daten aus Berufsgruppe.");
        }
        };
        requestBeruf.send();



        //Aufruf bei ausgewähltem Beruf
        dropdownBeruf.addEventListener("change", function(){
            
            const dropdownKlasse = document.getElementById("dropdownKlasse");
            
            let selectedOption = $("#dropdownBeruf option:selected").val(); //wert der ausgewählten option
            let klassenOptionen = dropdownKlasse.options;

            //Optionen werden bei nächster Änderung gelöscht
            while (klassenOptionen.length > 0) {
                klassenOptionen.remove(0);
            }

            const requestKlasse = new XMLHttpRequest();
            requestKlasse.open("GET", "http://sandbox.gibm.ch/klassen.php?beruf_id=" + selectedOption, true);
    
            requestKlasse.onload = function() {
            if (requestKlasse.status >= 200 && requestKlasse.status < 400) {
                const resultjson = JSON.parse(requestKlasse.responseText);
                
                resultjson.forEach(x => {
                // Option-Element für jeden Beruf erstellen
                const option = document.createElement("option");
                option.value = x.klasse_id;
                option.text = x.klasse_name;
                
                klassenId = x.klasse_id;

                // Option dem Dropdown hinzufügen
                dropdownKlasse.appendChild(option);
                });
            } else {
                console.error("Fehler beim Abrufen der Daten aus Klassen.");
            }
            };
            requestKlasse.send();

            showTafel();

        });


    },
);


function showTafel(){
    
}


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

