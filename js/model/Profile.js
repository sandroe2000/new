class Profile {

    constructor(id, image, fisrtName, lastName, birthDate, dept, contactPhone,
                emailAddress, username, password, language, timeZone, 
                communication, passwordResetVerif, disabled, groupParticipant){

        this._id = id;
        this._image = image;
        this._fisrtName = fisrtName;
        this._lastName= lastName;
        this._birthDate = birthDate;
        this._dept = dept;
        this._contactPhone = contactPhone;
        this._emailAddress = emailAddress;
        this._username = username;
        this._password = password;
        this._language = language;
        this._timeZone = timeZone;
        this._communication = communication;
        this._passwordResetVerif = passwordResetVerif;
        this._disabled = disabled;
        this._groupParticipant = groupParticipant;
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