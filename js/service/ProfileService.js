class ProfileService {

    constructor(){

        this.groups = [];
        this.timeZone = [];
        this.language = [];
        this.profiles = [];
        this.profileView = new ProfileView( document.querySelector('#tableProfileView'),
                                            document.querySelector('#groups'),
                                            document.querySelector('#timeZone'),
                                            document.querySelector('#language') );
    }

    async setGroups(){

        const response = await fetch('data/groups.json', {
            method: 'GET'
        });
        this.groups = await response.json();
        this.profileView.setGroups(this.groups);

    }

    async setTimeZone(){
        const response = await fetch('data/timeZone.json', {
            method: 'GET'
        });
        this.timeZone = await response.json();
        this.profileView.setTimeZone(this.timeZone);
    }

    async setLanguage(){
        const response = await fetch('data/language.json', {
            method: 'GET'
        });
        this.language = await response.json();
        this.profileView.setLanguage(this.language);
    }

    async findAll(){

        const response = await fetch('data/profiles.json', {
            method: 'GET'
        });
        this.profiles = await response.json();
        this.profileView.setTableProfiles(this.profiles);
    }

    findById(id){

        let profiles = profileController.profileService.profiles.list;
        let result = {};

        profiles.forEach(profile => {
            if(profile.id == id){
                result = profile;
            }
        });

        return result;
    }

    add(profile){

    }

    update(profile){

    }

    delete(id){

    }
}