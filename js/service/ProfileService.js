import { ProfileView } from '../view/ProfileView.js';

export class ProfileService {

    constructor(controller){

        this.groups = [];
        this.timeZone = [];
        this.language = [];
        this.profiles = [];
        this.profileController = controller;
        this.profileView = new ProfileView( this.profileController, 
                                            document.querySelector('#tableProfile tbody'),
                                            document.querySelector('#groups'),
                                            document.querySelector('#searchGroup'),
                                            document.querySelector('#timeZone'),
                                            document.querySelector('#language'));
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

        this.profileController.startWait();

        let name = document.querySelector('#searchName').value;
        let group = document.querySelector('#searchGroup').value;        
        let size = document.querySelector('#tableProfileSize').value; 
        let page = 0;

        if(this.profileController && this.profileController.tableProfilePage){
            page = this.profileController.tableProfilePage;
        }
        let uri = `/profiles/search?name=${name}&groupParticipant=${group}&size=${size}&page=${page}`;
        
        const response = await fetch(encodeURI(uri), {
            method: 'GET'
        });

        this.profiles = await response.json();
        this.profileView.setTableProfiles(this.profiles.content);

        this.profileController.stopWait();
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

    add(profile){

    }

    update(profile){

    }

    delete(id){

    }
}