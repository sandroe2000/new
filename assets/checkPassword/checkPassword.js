function checkPasswordStrength() {
    debugger;
    var number = /([0-9])/;
    var lowcase = /([a-z])/;
    var uppercase = /([A-Z])/;
    var special_characters = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;

    if($('#new-password').val().length < 6) {
        $('#password-strength-status').removeClass();
        $('#password-strength-status').addClass('weak-password');
        $('#password-strength-status').html("Fraca (deve ter pelo menos 6 caracteres.)");
    } else {  	
        if($('#new-password').val().match(number) && 
           $('#new-password').val().match(lowcase) && 
           $('#new-password').val().match(uppercase) && 
           $('#new-password').val().match(special_characters)) {            
            $('#password-strength-status').removeClass();
            $('#password-strength-status').addClass('strong-password');
            $('#password-strength-status').html("Forte");
        } else {
            $('#password-strength-status').removeClass();
            $('#password-strength-status').addClass('medium-password');
            $('#password-strength-status').html("Médio (deve incluir letras minúsculas, maiúsculas, números e caracteres especiais.)");
        }
    }
}