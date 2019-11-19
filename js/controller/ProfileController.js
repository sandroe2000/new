class ProfileController {

    constructor(){

        this.scope = {};
        this.profile = {};
        this.profileService = new ProfileService();
        this.profileService.findAll();        
    }

    loadProfileById(id){

        this.profile = new Profile( this.profileService.findById(id) );
        $('#profileTab li:eq(1) a').tab('show');
        
        //-- TWO WAY DATA BIND
        this.scope = new Scope();
        this.scope.init( this.profile.profile );
        console.log(this.profile);
    }
}