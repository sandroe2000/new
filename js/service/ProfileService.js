export class ProfileService {

    constructor(controller){

        this.groups = [];
        this.timeZone = [];
        this.language = [];
        this.profiles = [];
        this.profileController = controller;
    }

    async getGroups(){
        
        const response = await fetch('data/groups.json', {
            method: 'GET'
        });

        this.groups = await response.json();
        return this.groups;
    }

    async getTimeZone(){
        
        const response = await fetch('data/timeZone.json', {
            method: 'GET'
        });

        this.timeZone = await response.json();
        return this.timeZone;
    }

    async getLanguage(){
       
        const response = await fetch('data/language.json', {
            method: 'GET'
        });

        this.language = await response.json();
        return this.language;
    }

    async findAll(uri){

        const response = await fetch(encodeURI(uri), {
            method: 'GET'
        });

        this.profiles = await response.json();
        return this.profiles;
    }

    findById(id){

        let profiles = this.profileController.profileService.profiles.content;
        let result = {};

        profiles.forEach(profile => {
            if(profile.id == id){
                result = profile;
            }
        });

        return result;
    }

    async saveOrUpdate(profile){

        console.log(profile);
        return;

        let method = 'POST';
        let uri = '/profiles';

        if(profile.id){
            method = 'PUT';
            uri = `/profiles/${profile.id}`;
        }

        const response = await fetch(uri, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile)
        });
        document.querySelector('#searchName').value = profile.name;
        await this.findAll();
    }

    async delete(id){

        const response = await fetch(`/profiles/${id}`, {
            method: 'DELETE'
        });
        await this.findAll();
    }
}