class ProfileService {

    constructor(){

        this._profiles = [];
        this._profileView = new ProfileView( document.querySelector('#tableProfileView') );
    }

    get profiles() {
        
        return [].concat(this._profiles);
    }

    async findAll(){

        const response = await fetch('data/users/list.json', {
            method: 'GET'
        });
        this._profiles = await response.json();
        this._profileView.update(this._profiles);
    }

    findById(id){

        let profiles = profileController.profileService.profiles[0].list;
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