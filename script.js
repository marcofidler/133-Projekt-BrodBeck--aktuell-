var klassenId;
var week = 25;
var year = 2023;
//setze Jahreswochen
var buttonB = document.getElementById("buttonBack");
var buttonN = document.getElementById("buttonNext");
let weekDisplay = document.getElementById("week");

//button für nächste Woche
buttonN.addEventListener("click", function(){
    week += 1;
    if(week > 52){
        week = 1;
        year += 1;
    }
    weekDisplay.innerHTML = week + " / " + year;
});
//button für letzte Woche
buttonB.addEventListener("click", function(){
    week -= 1;
    if(week == 0){
        week = 52;
        year -= 1;
    }
    weekDisplay.innerHTML = week + " / " + year;
});


document.addEventListener("DOMContentLoaded", //Wird DOM vollständig geladen, wird Funktion aufgerufen
    function() {
        weekDisplay.innerHTML = week + " / " + year;
        // DropDown Element für Berufe
        const dropdownBeruf = document.getElementById("dropdownBeruf");
        const klasseContainer = document.getElementById("klasseContainer");
        const buttonContainer = document.getElementById("buttonContainer");
        // Anfrage vorbereiten
        const requestBeruf = new XMLHttpRequest();
        requestBeruf.open("GET", "https://sandbox.gibm.ch/berufe.php?format=JSON", true); //URL für Berufe

        //Wird Anfrage geladen, wird Funktion aufgerufen
        requestBeruf.onload = function() {
        if (requestBeruf.status >= 200 && requestBeruf.status < 400) { //Ist Status erfolgreich und Abgeschlossen?
            const resultjson = JSON.parse(requestBeruf.responseText); //Antwort wird geparst
            
            //Optionen werden für jeden Beruf erstellt
            resultjson.forEach(x => { 
            const option = document.createElement("option");
            option.value = x.beruf_id;
            option.text = x.beruf_name;
            
            // Optionen werden dem DropDown hinzugefügt
            dropdownBeruf.appendChild(option);
            });
        } else {
            console.error("Fehler beim Abrufen der Daten aus Berufsgruppe."); //Fehlerausgabe
        }
        };
        requestBeruf.send();


   

        //Wird DropDown von Beruf geändert, wird Funktion aufgerufen
        dropdownBeruf.addEventListener("change", function(){
            const dropdownKlasse = document.getElementById("dropdownKlasse");
            let selectedOption = $("#dropdownBeruf option:selected").val(); //ID der ausgewählten option
           
            let klassenOptionen = dropdownKlasse.options;
            //Optionen werden bei nächster Änderung gelöscht
            while (klassenOptionen.length > 0) {
                klassenOptionen.remove(0);
            }
            // Anfrage vorbereiten
            const requestKlasse = new XMLHttpRequest();
            requestKlasse.open("GET", "http://sandbox.gibm.ch/klassen.php?beruf_id=" + selectedOption, true); //URL mit ausgewählter Option für Klasse
    
            requestKlasse.onload = function() {
            if (requestKlasse.status >= 200 && requestKlasse.status < 400) { //Ist Status erfolgreich und Abgeschlossen?
                const resultjson = JSON.parse(requestKlasse.responseText); //Antwort wird geparst
                
                //Optionen werden für jeden Beruf erstellt
                resultjson.forEach(x => {
                const option = document.createElement("option");
                option.value = x.klasse_id;
                option.text = x.klasse_name;
                
                klassenId = x.klasse_id;

                // Optionen werden dem DropDown hinzugefügt
                dropdownKlasse.appendChild(option);

                });

                klasseContainer.style.display = "block"; //DropDownKlasse wird angezeigt
                buttonContainer.style.display = "block" //Buttons für JahresWochen Anzeige wird angezeigt
                showTafel(); //Funktion, die Daten als Tabelle anzeigen lässt

            } else {
                console.error("Fehler beim Abrufen der Daten aus Klassen."); //Fehlerausgabe
            }
            };
            requestKlasse.send();

        });
    },
);

function showTafel() {
    let selectedOptionKlasse = dropdownKlasse.value;
    
    //Anfrage vorbereiten
    const requestTafel = new XMLHttpRequest();
    requestTafel.open("GET", "http://sandbox.gibm.ch/tafel.php?klasse_id=" + selectedOptionKlasse, true); //URL mit ausgewählter Option für Detaillierte Daten über Stundenplan
    
    requestTafel.onload = function() {
        if (requestTafel.status >= 200 && requestTafel.status < 400) { //Ist Status erfolgreich und Abgeschlossen?
        const resultjson = JSON.parse(requestTafel.responseText);  //Antwort wird geparst
    
        const tafel = document.getElementById("data");
        tafel.innerHTML = ""; // Vorherige Inhalte löschen
  
        const table = document.createElement("table");
        table.classList.add("table");
  
        // Tabellenkopf erstellen
        const tableHead = document.createElement("thead");
        const tableHeadRow = document.createElement("tr");
        const headers = ["Datum", "Wochentag", "Von", "Bis", "Lehrer", "Fach", "Raum"];
        headers.forEach(headerText => {
          const tableHeadCell = document.createElement("th");
          tableHeadCell.textContent = headerText;
          tableHeadRow.appendChild(tableHeadCell);
        });
        tableHead.appendChild(tableHeadRow);
        table.appendChild(tableHead);
  
        // Tabellenkörper erstellen
        const tableBody = document.createElement("tbody");
        
        resultjson.forEach(tafelData => {
          const tableRow = document.createElement("tr");
          Object.values(tafelData).forEach(value => {
            const tableCell = document.createElement("td");
            tableCell.textContent = value;
            tableRow.appendChild(tableCell);
          });
          tableBody.appendChild(tableRow);
        });
        table.appendChild(tableBody);
  
        tafel.appendChild(table);

        } else {
        console.error("Fehler beim Abrufen der Daten aus Stundenplan."); //Fehlerausgabe
        }
    };
    
    requestTafel.send();
}