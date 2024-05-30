$(document).ready(function () {
    const aantalKlanten = 75; // Aantal gewenste klanten
    const klantenContainer = $('.klanten-container');

    const vertalingenAanspreektitel = {
        "Mr": "Mr. ",
        "Monsieur": "Mr. ",
        "Mrs": "Mvr. ",
        "Ms": "Mvr. ",
        "Mademoiselle": "Mvr. ",
        "Miss": "Mvr. ",
    };

    const vertalingenLand = {
        "United States": "Verenigde Staten",
        "Canada": "Canada",
        "Australia": "Australië",
        "France": "Frankrijk",
        "Turkey": "Turkije",
        "Ireland": "Ierland",
        "Mexico": "Mexico",
        "Brazil": "Brazilië",
        "Switzerland": "Zwitserland",
        "Spain": "Spanje",
        "Netherlands": "Nederland",
        "Germany": "Duitsland",
        "Norway": "Noorwegen",
        "Denmark": "Denemarken",
        "United Kingdom": "Verenigd Koninkrijk",
        "Ukraine": "Oekraïne",
        "Serbia": "Servië",
    };

    function vertaal(engelseTerm, vertalingen) {
        return vertalingen[engelseTerm] || engelseTerm;
    }

    function maakKlantElement(klant) {
        return $(`
            <div class="klant">
                <img src="${klant.picture.large}" alt="${klant.name.first} ${klant.name.last}">
                <p>${vertaal(klant.name.title, vertalingenAanspreektitel)}${klant.name.first} ${klant.name.last}</p>
                <p>Land: ${vertaal(klant.location.country, vertalingenLand)}</p>
            </div>
        `);
    }

    function haalKlantGegevensOp() {
        return $.ajax({
            url: 'https://randomuser.me/api/',
            dataType: 'json',
        });
    }

    function toonFoutMelding(error) {
        console.error('Fout bij het ophalen van klantgegevens:', error);
    }

    function voegKlantToeAanContainer(klantElement) {
        klantenContainer.append(klantElement);
    }

    for (let i = 0; i < aantalKlanten; i++) {
        haalKlantGegevensOp()
            .then(function (data) {
                const klant = data.results[0];
                const klantElement = maakKlantElement(klant);
                voegKlantToeAanContainer(klantElement);
            })
            .catch(toonFoutMelding);
    }
});
