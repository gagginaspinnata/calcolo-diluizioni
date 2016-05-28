$(document).ready(function() {

    var alertDiv = $('#alert');

    function showAlert(type, message) {
        alertDiv.append("<div class=\"alert alert-" + type + " alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong> " + message + "</strong></div>")
    }

    function deleteAlert() {
        alertDiv.html("");
    }

    // Quando viene premuto il pulsante calcola
    $('#submit').click(function(e) {
        e.preventDefault();
        var parti_acqua = parseInt($('#parti-acqua').val());
        var parti_prodotto = parseInt($('#parti-prodotto').val());
        var quantita_soluzione = parseInt($('#quantita-soluzione').val());

        // Se il vaore quantità soluzione è stato impostato
        if (quantita_soluzione) {

            // Elimina eventuali messaggi di errore mostrati precedentemente
            deleteAlert();

            var parti_totali = parti_acqua + parti_prodotto;

            var ris_prodotto = (quantita_soluzione / parti_totali);
            var ris_acqua = ris_prodotto * parti_acqua;
            $('#result').html("<div class=\"panel panel-success\"><div class=\"panel-heading\"><h3 class=\"panel-title\">Risultato</h3></div><div class=\"panel-body\">Per ottenre una soluzione di " + quantita_soluzione + " ml dovrai utilizzare <strong>" + ris_acqua.toFixed(2) + "</strong> ml di acqua e <strong>" + ris_prodotto.toFixed(2) + "</strong> ml di prodotto</div></div>");


            firebase.database().ref('operations/').once('value').then(function(snapshot) {
                var op = snapshot.val() + 1;
                firebase.database().ref('/').set({
                    operations: op
                });
            });
        }

        // Se non è stato impostato il valore quantià soluzione mostra un errore
        else {
            showAlert('danger', 'Inserisci la quantita\' di soluzione desiderata!');
        }
    });

    // firebase.database().ref('operations/').on('value',function(snapshot){
    //     $('#number_of_operations').html(snapshot.val());
    // });
});