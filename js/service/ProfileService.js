class ProfileService {

    constructor(){

        this.profiles = [];
        this.profileView = new ProfileView( document.querySelector('#tableProfileView') );
    }

    async findAll(){

        const response = await fetch('data/users/list.json', {
            method: 'GET'
        });
        this.profiles =await response.json();
        this.profileView.update(this.profiles);
    }

    findById(id){

        let profiles = profileController.profileService.profiles.list;
        let result = {};

        profiles.forEach(profile =>{
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