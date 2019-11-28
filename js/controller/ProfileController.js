import { Scope } from './Scope.js';
import { ImgUploadHelper } from '../helper/ImgUploadHelper.js';
import { AppView } from '../view/AppView.js';
import { Profile } from '../model/Profile.js';
import { ProfileService } from '../service/ProfileService.js';

export class ProfileController {

    constructor(){
        
        this.startWait();

        this.scope = {};
        this.profile = {};
        this.imgUploadHelper1 = new ImgUploadHelper('imgProfile1', '/files?folder=none');
        //this.imgUploadHelper2 = new ImgUploadHelper('imgProfile2', '/files?folder=none');
        this.appView = new AppView( 
            document.querySelector('#navHeader'),
            document.querySelector('#navFooter')
        );
        this.tableProfilePage = 0;
        this.profileService = new ProfileService(this);
        this.init();
    }

    init(){

        document.querySelector('#btnSearchProfiles').addEventListener('click', (event) =>{

            this.tableProfilePage = 0;
            this.profileService.findAll();
        } ,false);

        document.querySelector('#tableProfileSize').addEventListener('change', (event) =>{

            this.tableProfilePage = 0;
            this.profileService.findAll();
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
                        
                this.profileService.findAll();
            } ,false);
        });

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

    startWait(){
        $('#modalWait').modal({backdrop: 'static'},'show');
    }

    stopWait(){
        setTimeout(() => {
            $('#modalWait').modal('hide');
        }, 500);
    }
}