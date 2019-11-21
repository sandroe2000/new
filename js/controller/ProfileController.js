class ProfileController {

    constructor(){
        
        this.scope = {};
        this.profile = {};
        this.imgUploadHelper1 = new ImgUploadHelper('imgProfile1', '/files?folder=none');
        this.imgUploadHelper2 = new ImgUploadHelper('imgProfile2', '/files?folder=none');
        this.profileService = new ProfileService();
        this.profileService.findAll();        
        this.profileService.setGroups();
        this.profileService.setTimeZone();
        this.profileService.setLanguage();
    }

    loadProfileById(id){

        this.profile = new Profile( this.profileService.findById(id) );
        this.scope = new Scope();
        this.scope.init( this.profile.profile );
        
        $('#profileTab li:eq(1) a').tab('show');
    }
}