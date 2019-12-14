export class CheckPasswordStrengthHelper {

    constructor(inputPass){

        this.inputPass = inputPass;
        this.init();
    }

    init(){

        this.inputPass.addEventListener('keyup', event => {
            this.verify();
        });
    }

    verify() {

        let number = /([0-9])/;
        let lowcase = /([a-z])/;
        let uppercase = /([A-Z])/;
        let special_characters = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;
        let min = 8;

        if($(this.inputPass).val().length < min) {

            $('#password-strength-status').removeClass();
            $('#password-strength-status').addClass('weak-password');
            $('#password-strength-status').html(`Fraca (deve ter pelo menos ${min} caracteres.)`);
        } else {  

            if( $(this.inputPass).val().match(number) && 
                $(this.inputPass).val().match(lowcase) && 
                $(this.inputPass).val().match(uppercase) && 
                $(this.inputPass).val().match(special_characters) ) {
                           
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
}