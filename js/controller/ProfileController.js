import { AppView } from '../view/AppView.js';
import { ProfileView } from '../view/ProfileView.js';
import { ScrollTabsHelper } from '../helper/ScrollTabsHelper.js';
import { CheckPasswordStrengthHelper } from '../helper/CheckPasswordStrengthHelper.js';
import { ScopeHelper } from '../helper/ScopeHelper.js';
import { Profile } from '../model/Profile.js';
import { Combo } from '../model/Combo.js';
import { ImgUploadHelper } from '../helper/ImgUploadHelper.js';
import { ProfileService } from '../service/ProfileService.js';
//import { DataTable } from '../component/DataTable.js';

class ProfileController {

    constructor(){
        
        this.appView = new AppView( 
            document.querySelector('#navHeader'),
            document.querySelector('#navFooter')
        );
        
        this.scrollTabsHelper = new ScrollTabsHelper();
        
        this.checkPasswordStrengthHelper = new CheckPasswordStrengthHelper( document.querySelector('#new-password'));
        
        this.scopeHelper = {};
        
        this.listProfiles = [];
        
        this.profile = {};
        
        this.imgUploadHelper1 = new ImgUploadHelper('imgProfile1', '/files?folder=none');
        //this.imgUploadHelper2 = new ImgUploadHelper('imgProfile2', '/files?folder=none');
        
        this.profileService = new ProfileService(this);        
        
        this.profileView = new ProfileView( 
            this, 
            document.querySelector('#tableProfile tbody'),
            document.querySelector('#groups'),
            document.querySelector('#searchGroup'),
            document.querySelector('#timeZone'),
            document.querySelector('#language'));

        this.page = 0;

        this.sort = 'name,ASC';

        this.init();
    }

    init(){

        this.find();       

        this.setGroups();

        this.setTimeZone();

        this.setLanguage();

        document.querySelector('.btnSaveProfile').addEventListener('click', (event) => { this.save() }, false);

        document.querySelector('.btnNewProfile').addEventListener('click', (event) => { this._new() }, false);

        document.querySelector('#btnSearchProfiles').addEventListener('click', (event) =>{ this.page = 0; this.find() } ,false);

        document.querySelector('#TABLE_SIZE_tableProfile').addEventListener('change', (event) =>{ this.page = 0; this.find() } ,false);

        document.querySelectorAll('#tableProfile > thead > tr th span').forEach(item => {
            
            item.addEventListener('click', event => {                
                let th = event.target.closest('th');
                this.sortDirection(th.getAttribute('data-field'), event.target);
            });
        });
    }

    async find(){
       
        this.startWait();

        let name = document.querySelector('#searchName').value;
        let group = document.querySelector('#searchGroup').value;        
        let size = document.querySelector('#TABLE_SIZE_tableProfile').value;        
        let uri = `/profiles/search?name=${name}&groupParticipant=${group}&size=${size}&page=${this.page}&sort=${this.sort}`;
        
        this.listProfiles = await this.profileService.find(uri);        
        this.profileView.setTableProfiles(this.listProfiles);
        
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

        this.scopeHelper = new ScopeHelper();
        this.profile = this.profileService.findById(id);
        this.scopeHelper.init( this.profile );
        
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

    sortDirection(field, ico){

        let clazz = ico.getAttribute('class');

        document.querySelectorAll('#tableProfile > thead > tr th span').forEach(item => {
                         
            if(ico === item){

                if(clazz.indexOf('oi-caret-bottom') > -1){
                    item.classList.replace('oi-elevator', 'oi-caret-top');           
                    item.classList.replace('oi-caret-bottom', 'oi-caret-top');
                    this.sort = `${field},DESC`;
                }else{
                    item.classList.replace('oi-elevator', 'oi-caret-bottom');           
                    item.classList.replace('oi-caret-top', 'oi-caret-bottom');
                    this.sort = `${field},ASC`;
                }

            }else{
                item.classList.replace('oi-caret-top', 'oi-elevator');           
                item.classList.replace('oi-caret-bottom', 'oi-elevator');
            }

        });

        this.find();
    }

    save(){

        this.profileService.saveOrUpdate(this.profile).then(result =>{

            document.querySelector('#searchName').value = this.profile.name;
            $('#profileTab li:eq(0) a').tab('show');
            this.page = 0;
            this.find();
        });
    }

    _new(){

        this.profile = new Profile();
        this.scopeHelper = new ScopeHelper();
        this.scopeHelper.init( this.profile );
        $('#profileTab li:eq(1) a').tab('show');
    }

    delete(id){

        let hulla = new hullabaloo();

        this.profileService.delete(id).then(result =>{
            hulla.send("Removido com sucesso!", "success")
            this.find();
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    
    new ProfileController();    
    OverlayScrollbars(document.querySelectorAll('#all'), { });
});