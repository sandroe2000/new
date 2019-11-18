class ProfileController {

    constructor(){

        this._profile = new Profile();
        this._profileService = new ProfileService();
        this._profileService.findAll();        
    }

    get profile (){
         return this._profile;
    }

    get profileService(){
        return this._profileService;
    }
}