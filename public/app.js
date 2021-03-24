$(document).ready(function () {

    const questionsContainer = $('#questions-container');

    function getQuestionMarkup(question){
        return '<div class="form-group">'+
        
        '<label>'+question.question+'</label>'+
        '<br />'+
        '<label>Medicamento</label>'+
        '<input type="text" class="form-control medicine-name" rows="3" />'+
        '<label>Responder</label>'+
        '<textarea class="form-control answer-1" rows="3"></textarea>'+
        '<label>Costo</label>'+
        '<input type="text" class="form-control medicine-cost" rows="3" />'+
        '</div>'+
        '<button type="buton" data-question='+btoa(JSON.stringify(question))+' class="btn btn-primary btn-answer">Responder</button>';
        
    }

    function getQuestions() {

        firebase.firestore().collection("stores").doc('Ni6t5NOEL8qo7mla5UEN').collection('question').onSnapshot(function (doc) {
            console.log("Current data: ", doc);

            questionsContainer.html('');

            doc.forEach(function (quest) {

                console.log(quest.data());
                questionsContainer.append(getQuestionMarkup(quest.data()));

            });
        });
    }

    $(document).on('click', '.btn-answer', function(){
        const question = JSON.parse(atob($(this).data('question')));
        firebase.firestore().collection('users').doc(question.user).collection('questions').doc('tvGHaMWJyWmvW6Zbmmki').collection('store_response').add({
            answer: $.trim($('.answer-1').val()),
            distance: '1mts',
            storename: 'Drogueria acacias',
            medicineName:  $.trim($('.medicine-name').val()),
            cost: $.trim($('.medicine-cost').val()),
            phone:"3216217994",
            whatsapp:"3216217994"
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
           
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });


    });

    setTimeout(() => {
        
        getQuestions();

    }, 2000);

});


