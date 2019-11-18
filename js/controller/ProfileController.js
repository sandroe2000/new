class ProfileController {

    constructor(){

        this._profileService = new ProfileService();
        this._profileService.findAll();        
    }

    get profileService(){
        return this._profileService;
    }

    loadProfileById(id){
         debugger;
        //--TODO, DATA-BIND
        let profile = this._profileService.findById(id);
        $('#profileTab li:eq(1) a').tab('show');
        console.log(profile);
    }
}