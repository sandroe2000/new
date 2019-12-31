export class ProfileView {

    constructor(controller, tableProfiles, selectGroups, selectSearchGroup, selectTimeZone, selectLanguage){
        
        this.profileController = controller;
        this.tableProfiles = tableProfiles;
        this.selectGroups = selectGroups;
        this.selectSearchGroup = selectSearchGroup;
        this.selectTimeZone = selectTimeZone;
        this.selectLanguage = selectLanguage;
        this.init();
    }

    init(){

        $(document).ready(function(){

            $('.pass_show').append('<i class="fa fa-eye ptxt"></i>'); 
        });

        $(document).on('click','.pass_show .ptxt', function(){ 

            $(this).toggleClass('fa-eye fa-eye-slash');

            $(this).prev().attr('type', function(index, attr){
                return attr == 'password' ? 'text' : 'password'; 
            }); 

        });
    }

    setTableProfiles(model) {

        let tableProfiles = `${model.content.map(profile => `<tr data-id="${profile.id}">
                                <td class="w-10">
                                    ${profile.id}
                                </td>
                                <td class="w-40 ellipsis" title="${profile.name}">
                                    ${profile.name}
                                </td>
                                <td class="w-20 ellipsis" title="${profile.groupParticipant}">
                                    ${profile.groupParticipant}
                                </td>
                                <td class="w-10">
                                    ${profile.disabled == null ? '' : profile.disabled}
                                </td>
                                <td class="w-10 text-right">
                                    <span class="oi oi-pencil mr-4 ico-mouse-hand"></span>
                                    <span class="oi oi-trash mr-2 ico-mouse-hand"></span>
                                </td>
                            </tr>`).join('')}`;
        
        this.tableProfiles.innerHTML = tableProfiles;

        document.querySelectorAll('.oi.oi-pencil').forEach(item => {
            item.addEventListener('click', event => {                
                let tr = event.target.closest('tr');
                this.profileController.loadProfileById(tr.getAttribute('data-id'));
            });
        });

        document.querySelectorAll('.oi.oi-trash').forEach(item => {
            item.addEventListener('click', event => {                
                let tr = event.target.closest('tr');
                this.profileController.delete(tr.getAttribute('data-id'));
            });
        });
    }

    setGroups(data){

        let groups = `<option value="">Please choose an option</option>${data.list.map(item => 
                     `<option value="${item.value}">${item.descr}</option>`).join('')}`;

        this.selectGroups.innerHTML = groups;
        this.selectSearchGroup.innerHTML = groups;
    }

    setLanguage(data){

        let language = `<option value="">Please choose an option</option>${data.list.map(item =>
                       `<option value="${item.value}">${item.descr}</option>`).join('')}`;
        this.selectLanguage.innerHTML = language;
    }

    setTimeZone(data){

        let timeZone = `<option value="">Please choose an option</option>${data.list.map(item =>
                       `<option data-offset="${item.dataOffset}" value="${item.value}">${item.descr}</option>`).join('')}`;

        this.selectTimeZone.innerHTML = timeZone;
    }
}