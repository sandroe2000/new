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

        this.init();
    }

    init(){

        this.findAll();        
        this.setGroups();
        this.setTimeZone();
        this.setLanguage();

        $('.btnSaveProfile').click((event) =>{
            
            this.profileService.saveOrUpdate(this.profile).then(result =>{

                document.querySelector('#searchName').value = this.profile.name;
                $('#profileTab li:eq(0) a').tab('show');
                this.page = 0;
                this.findAll();
            });            
        });

        $('.btnNewProfile').click((event) =>{

            this.profile = new Profile();
            this.scopeHelper = new ScopeHelper();
            this.scopeHelper.init( this.profile );
            $('#profileTab li:eq(1) a').tab('show');
        });

        document.querySelector('#btnSearchProfiles').addEventListener('click', (event) =>{

            this.page = 0;
            this.findAll();
        } ,false);

        document.querySelector('#TABLE_SIZE_tableProfile').addEventListener('change', (event) =>{

            this.page = 0;
            this.findAll();
        } ,false);
    }

    async findAll(){
       
        this.startWait();

        let name = document.querySelector('#searchName').value;
        let group = document.querySelector('#searchGroup').value;        
        let size = document.querySelector('#TABLE_SIZE_tableProfile').value; 

        if(this.page){
            this.page = this.page;
        }
        
        let uri = `/profiles/search?name=${name}&groupParticipant=${group}&size=${size}&page=${this.page}`;
        
        this.listProfiles = await this.profileService.findAll(uri);
        this.profileView.setTableProfiles(this.listProfiles);

        let that = this;

        $('#TABLE_PAGINATION_tableProfile').pagination({
            pages: this.listProfiles.totalPages,
            currentPage: (new Number(this.listProfiles.number)+1),
            ellipsePageSet: true,
            prevText: "Anterior",
            nextText: "Próximo",
            selectOnClick: true,
            onPageClick:function(pageNumber, event) {

                that.page = (pageNumber - 1);
                that.findAll();                
            }
        });
        
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

        this.profile = this.profileService.findById(id);
        this.scopeHelper = new ScopeHelper();
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

    delete(id){

        let hulla = new hullabaloo();

        this.profileService.delete(id).then(result =>{
            hulla.send("Removido com sucesso!", "success")
            this.findAll();
        });
    }
}

let profileController;

document.addEventListener("DOMContentLoaded", () => {
    
    profileController = new ProfileController();    
    OverlayScrollbars(document.querySelectorAll('#all'), { });
});