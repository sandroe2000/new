class ProfileController {

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
        this._communication = document.querySelector('#communication');
        this._passwordReset = document.querySelector('#passwordReset');
        this._disabled      = document.querySelector('#disabled');
        this._groupPartici  = document.querySelector('#groupPartici');

        this._profileService = new ProfileService();
        this._profileService.findAll();
        
    }
}