import { AppView } from '../view/AppView.js';
import { ProfileView } from '../view/ProfileView.js';
import { ScrollTabsHelper } from '../helper/ScrollTabsHelper.js';
import { CheckPasswordStrengthHelper } from '../helper/CheckPasswordStrengthHelper.js';
import { ScopeHelper } from '../helper/ScopeHelper.js';
import { Profile } from '../model/Profile.js';
import { Combo } from '../model/Combo.js';
import { ImgUploadHelper } from '../helper/ImgUploadHelper.js';
import { ProfileService } from '../service/ProfileService.js';

class ProfileController {

    constructor(){
        
        this.appView = new AppView( 
            document.querySelector('#navHeader'),
            document.querySelector('#navFooter')
        );

        this.scrollTabsHelper = new ScrollTabsHelper();
        this.checkPasswordStrengthHelper = new CheckPasswordStrengthHelper( document.querySelector('#new-password'));
        this.scopeHelper = {};
        this.profile = {};
        this.imgUploadHelper1 = new ImgUploadHelper('imgProfile1', '/files?folder=none');
        //this.imgUploadHelper2 = new ImgUploadHelper('imgProfile2', '/files?folder=none');
        
        this.tableProfilePage = 0;
        this.profileService = new ProfileService(this);
        
        this.profileView = new ProfileView( 
            this, 
            document.querySelector('#tableProfile tbody'),
            document.querySelector('#groups'),
            document.querySelector('#searchGroup'),
            document.querySelector('#timeZone'),
            document.querySelector('#language'));

        this.init();
    }

    init(){

        $('.btnSaveProfile').click((event) =>{

            this.profileService.saveOrUpdate(this.profile.profile);
            $('#profileTab li:eq(0) a').tab('show');
        });

        $('.btnNewProfile').click((event) =>{

            this.profile = new Profile();
            this.scopeHelper = new ScopeHelper();
            this.scopeHelper.init( this.profile.profile );
            $('#profileTab li:eq(1) a').tab('show');
        });

        document.querySelector('#btnSearchProfiles').addEventListener('click', (event) =>{

            this.tableProfilePage = 0;
            this.findAll();
        } ,false);

        document.querySelector('#tableProfileSize').addEventListener('change', (event) =>{

            this.tableProfilePage = 0;
            this.findAll();
        } ,false);

        document.querySelectorAll('.page-link').forEach((pageLink) => {

            pageLink.addEventListener('click', (event) => {

                switch (event.target.innerHTML) {
                    case 'Previous':
                            this.tableProfilePage = (new Number(this.tableProfilePage) -1);
                        break;

                    case 'Next':
                        this.tableProfilePage = (new Number(this.tableProfilePage) +1);
                        break;
                        
                    default:
                        this.tableProfilePage = (new Number(event.target.innerHTML) -1);
                        break;
                }
                        
                this.findAll();
            } ,false);
        });

        this.findAll();        
        this.setGroups();
        this.setTimeZone();
        this.setLanguage();
    }

    async findAll(){

        this.startWait();

        let name = document.querySelector('#searchName').value;
        let group = document.querySelector('#searchGroup').value;        
        let size = document.querySelector('#tableProfileSize').value; 
        let page = 0;

        if(this.tableProfilePage){
            page = this.tableProfilePage;
        }
        
        //let uri = `/profiles/search?name=${name}&groupParticipant=${group}&size=${size}&page=${page}`;
        let uri = `data/profiles.json?name=${name}&groupParticipant=${group}&size=${size}&page=${page}`;
        
        this.profiles = await this.profileService.findAll(uri);
        this.profileView.setTableProfiles(this.profiles);

        this.stopWait();
    }

    async setGroups(){

        let groups = new Combo();
        groups = await this.profileService.getGroups();
        this.profileView.setGroups(groups);
    }

    async setTimeZone(){

        let timeZones = new Combo();
        timeZones = await this.profileService.getTimeZone();
        this.profileView.setTimeZone(timeZones);
    }

    async setLanguage(){

        let languages = new Combo();
        languages = await this.profileService.getLanguage();
        this.profileView.setLanguage(languages);
    }

    loadProfileById(id){

        this.profile = new Profile( this.profileService.findById(id) );
        this.scopeHelper = new ScopeHelper();
        this.scopeHelper.init( this.profile.profile );
        
        $('#profileTab li:eq(1) a').tab('show');
    }

    startWait(){

        $('#modalWait').modal({backdrop: 'static'},'show');
    }

    stopWait(){

        setTimeout(() => {
            $('#modalWait').modal('hide');
        }, 500);
    }

    delete(id){

        this.profileService.delete(id);
    }
}

let profileController;

document.addEventListener("DOMContentLoaded", () => {
    
    profileController = new ProfileController();    
    OverlayScrollbars(document.querySelectorAll("body"), { });
});