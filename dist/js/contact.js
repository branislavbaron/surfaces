$(function(){

// DOM CACHE

var $formControl = $('.form-control');
// EVENTS

$formControl.on({
  focus: function() {
        if($(this).is('textarea')) {
          $(this).next().css('top', '-13%');
        } else {
          $(this).next().css('top', '-35%');
        }
  },
  blur: function() {
        if(!$(this).val()){
          $(this).next().css('top', '32%');
        }
  }
});



  // FORM VALIDATION
  var $inputs = $('.form-control');


    // loop thru inputs
    $inputs.each(function(index, el) {
      $inputs.on('blur', function() {


      function validateEmail(email) {
          var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

          return pattern.test($.trim(email));
      }

      function validatePhone(phone) {
        var pattern = /^0(6([0-6]|9)){1}((\-)|(\/))?(((\d{6}|\d{7}))|((\d{3}){1}((\-)|(\/))?(\d{3}|\d{4}))|((\d{4}){1}((\-)|(\/))?(\d{3})))$/;
        
        return pattern.test($.trim(phone));
      }

                if(!$(this).val()){
                  $(this).addClass('was-validate is-invalid');
                  $(this).addClass('animated shake');
                  $(this).parent().find('.invalid-feedback').show().addClass('animated fadeInDown').text('Niste popunili polje!');
                  $('button').prop('disabled', true);
                  return false;

                } 
                else {

                  $(this).removeClass('is-invalid');
                  $(this).addClass('was-validate is-valid');
                  $(this).removeClass('animated shake');
                  $(this).parent().find('.invalid-feedback').hide();
                } 
                // else if($(this).attr('name', 'email')) {
                //     var email = $(this).val();
                //    validateEmail();
                // }
    });


  });



$('#form-contact').on('submit', function(event) {
  event.preventDefault();
  var $that = $(this);

  var url = $that.attr('action');
  var data = $that.serialize();

  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    data: data,
    beforeSend: function(){
      $('btn', $that).text('Šalje se...');
    },
    success: function(response){
      if (response.signal == 'ok') {
         $('.msg', $that).html('<div class="alert alert-success alert-dismissible fade show" role="alert">' + 
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' + '</button>' + response.msg + '</div>');
         $that[0].reset();
       } else {
         $('.msg', $that).html('<div class="alert alert-warning alert-dismissible fade show" role="alert">' + 
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' + '</button>' + response.msg + '</div>');
       }
     
    },
    error: function(xhr){
        $('.msg', $that).html('<div class="alert alert-danger alert-dismissible fade show" role="alert">' + 
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' + '</button>' + xhr.status + xhr.statusText + '</div>');
    },
    complete: function(){
      $('btn', $that).text('Pošalji');
    }
  });

  return false;
});

});