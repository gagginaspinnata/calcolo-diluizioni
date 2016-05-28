$(document).ready(function() {

    // Questo oggetto jquery lo devo creare prima
    var loginLinksDiv = $('#loginLinks');
    createLoginLinks();

    // TODO ancora non funziona
    var user = firebase.auth().currentUser;
    if (user) {
        console.log(user)
    } else {
        console.log(user)
    }

    // Inizializzo i vari oggi jQuery che andrò ad usare
    var alertDiv = $('#alert');
    var googleLink = $('#loginGoogle');
    var facebookLink = $('#loginFacebook');

    // Mostra un div di allerta
    function showAlert(type, message) {
        alertDiv.append("<div class=\"alert alert-" + type + " alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong> " + message + "</strong></div>")
    }

    // Cancella tutti i messaggi di allerta
    function deleteAlert() {
        alertDiv.html("");
    }


    function createLoginLinks() {
        loginLinksDiv.html("<div class=\"row\"><div class=\"col-md-6\"><a href=\"#\" id=\"loginGoogle\">Esegui l\'accesso con Google</a></div><div class=\"col-md-6\"><a href=\"#\" id=\"loginFacebook\">Esegui l\'accesso con Facebook</a></div></div>");
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
            setTimeout(function() {
                deleteAlert();
            }, 3000);
        }
    });

    // Quando viene premuto il link di login google
    googleLink.on('click', function(e) {
        e.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    });

    // Quando viene premuto il link di login facebook
    facebookLink.on('click', function(e) {
        e.preventDefault();
        console.log('Premuto facebook');
    });

});