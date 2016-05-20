// function addOperation(num) {
//     firebase.database().ref('operations/').set({
//         operations: num + 1
//     });
// }

// function getOperations(cb) {
//     firebase.database().ref('operations/').on('value', function(snapshot) {
//         cb(snapshot.val())
//     });
// }

$(document).ready(function() {
    $('#submit').click(function(e) {
        e.preventDefault();
        var parti_acqua = parseInt($('#parti-acqua').val());
        var parti_prodotto = parseInt($('#parti-prodotto').val());
        var quantita_soluzione = parseInt($('#quantita-soluzione').val());
        if (quantita_soluzione) {

            var parti_totali = parti_acqua + parti_prodotto;

            var ris_prodotto = (quantita_soluzione / parti_totali);
            var ris_acqua = ris_prodotto * parti_acqua;
            $('#result').html("<div class=\"panel panel-success\"><div class=\"panel-heading\"><h3 class=\"panel-title\">Risultato</h3></div><div class=\"panel-body\">Per ottenre una soluzione di " + quantita_soluzione + " ml dovrai utilizzare <strong>" + ris_acqua.toFixed(2) + "</strong> ml di acqua e <strong>" + ris_prodotto.toFixed(2) + "</strong> ml di prodotto</div></div>");
            // getOperations(function(){
                
            // });
        }
    });
});