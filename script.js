var klassenId;
var week = 25;
var year = 2023;
var buttonB = document.getElementById("buttonBack");
var buttonN = document.getElementById("buttonNext");
let weekDisplay = document.getElementById("week");

buttonN.addEventListener("click", function(){
    week += 1;
    if(week > 52){
        week = 1;
        year += 1;
    }
    weekDisplay.innerHTML = week + " / " + year;
});

buttonB.addEventListener("click", function(){
    week -= 1;
    if(week == 0){
        week = 52;
        year -= 1;
    }
    weekDisplay.innerHTML = week + " / " + year;
});


document.addEventListener("DOMContentLoaded",
    function() {
        
        weekDisplay.innerHTML = week + " / " + year;

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

            dropdownKlasse.addEventListener("change", function(){
                showTafel();
            });
            

        });

     


    },
);

function showTafel(){
    let selectedOptionKlasse = $("#dropdownKlasse option:selected").val();
    $.ajax({
        url: "https://sandbox.gibm.ch/tafel.php?klasse_id=" + selectedOptionKlasse,
        success: function (result){
            if(result != null){
                const resultDetails = JSON.parse(result.responseText);
                const tafel = document.getElementById("data");
                tafel.html(
                    "<table class='table'><tr><th>Datum</th><th>Wochentag</th><th>Von</th><th>Bis</th>" + 
                    "<th>Lehrer</th><th>Fach</th><th>Raum</th></tr>" +
                    "<tr><td>" +
                            +
                            "</td><td>" +
                            +
                            "</td><td>" +
                            +
                            "</td></tr></table>"
            );
            }
        }

    });
}