class Profile {

    constructor(){

        this._id            = document.querySelector('#id');
        this._image         = document.querySelector('#image');
        this._fisrtName     = document.querySelector('#fisrtName');
        this._lastName      = document.querySelector('#lastName');
        this._birthDate     = document.querySelector('#birthDate');
        this._dept          = document.querySelector('#dept');
        this._contactPhone  = document.querySelector('#contactPhone');
        this._emailAddress  = document.querySelector('#emailAddress');
        this._username      = document.querySelector('#username');
        this._password      = document.querySelector('#password');
        this._language      = document.querySelector('#language');
        this._timeZone      = document.querySelector('#timeZone');
        //this._communication = document.querySelector('#communication');
        this._passwordReset = document.querySelector('#passwordReset');
        this._disabled      = document.querySelector('#disabled');
        //this._groupPartici  = document.querySelector('#groupPartici');
    }

    get id(){
        return this._id;
    }
    
    get image(){
        return this._image;
    }
    
    get fisrtName(){
        return this._fisrtName;
    }
    
    get lastName(){
        return this._lastName;
    } 
    
    get birthDate(){
        return this._birthDate;
    } 
    
    get dept(){
        return this._dept;
    }
    
    get contactPhone(){
        return this._contactPhone;
    }
    
    get emailAddress(){
        return this._emailAddress;
    }
    
    get username(){
        return this._username;
    } 
    
    get password(){
        return this._password;
    }
    
    get language(){
        return this._language;
    } 
    
    get timeZone(){
        return this._timeZone;
    } 
    
    get communication(){
        return this._communication;
    }
    
    get passwordResetVerif(){
        return this._passwordResetVerif;
    }
    
    get disabled(){
        return this.disabled;
    } 
    
    get groupParticipant(){
        return this._groupParticipant;
    }
}