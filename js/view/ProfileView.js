export class ProfileView {

    constructor(controller, tableProfiles, selectGroups, selectSearchGroup, selectTimeZone, selectLanguage){
        
        this.profileController = controller;
        this.tableProfiles = tableProfiles;
        this.selectGroups = selectGroups;
        this.selectSearchGroup = selectSearchGroup;
        this.selectTimeZone = selectTimeZone;
        this.selectLanguage = selectLanguage;
    }

    _tableProfiles(model){ 
        
        return `${model.map(profile => `<tr data-id="${profile.id}">
                    <td class="w-10">
                        ${profile.id}
                    </td>
                    <td class="w-40" title="${profile.name}">
                        ${profile.name}
                    </td>
                    <td class="w-20" title="${profile.groupParticipant}">
                        ${profile.groupParticipant}
                    </td>
                    <td class="w-10">
                        ${profile.disabled}
                    </td>
                    <td class="w-10 text-right">
                        <span class="oi oi-pencil mr-2 ico-mouse-hand"></span>
                    </td>
                </tr>`).join('')}`;
    } 

    _language(data){

        return  `<option value="">Please choose an option</option>${data.list.map(item =>
                `<option value="${item.value}">${item.descr}</option>`).join('')}`;
    }

    _timeZone(data){

        return  `<option value="">Please choose an option</option>${data.list.map(item =>
                `<option data-offset="${item.dataOffset}" value="${item.value}">${item.descr}</option>`).join('')}`;
    }

    _groups(data){

        return  `<option value="">Please choose an option</option>${data.list.map(item => 
                `<option value="${item.value}">${item.descr}</option>`).join('')}`;
    }
    
    setTableProfiles(model) {
        
        this.tableProfiles.innerHTML = this._tableProfiles(model);

        document.querySelectorAll('.ico-mouse-hand').forEach(item => {
            item.addEventListener('click', event => {                
                let tr = event.target.closest('tr');
                this.profileController.loadProfileById(tr.getAttribute('data-id'));
            });
        });
    }

    setPaginationProfiles(objPagination, options, i){
        let more = false;
        let label = i+1;
        if(i>=20){
            more = true;
            label = '...';
        }
        let li = document.createElement('li');
        if(i==new Number(options.page)){
            li.setAttribute('class', 'page-item active');
        }else{
            if(more){
                li.setAttribute('class', 'page-item disabled');
            }else{
                li.setAttribute('class', 'page-item')
            }
        }
        let a = document.createElement('a');
            a.setAttribute('class', 'page-link');
            a.setAttribute('href', '#');
        let aNumber = document.createTextNode(label);

        a.appendChild(aNumber);
        li.appendChild(a);
        objPagination.appendChild(li);
    }

    setGroups(data){

        let groups = this._groups(data);
        this.selectGroups.innerHTML = groups;
        this.selectSearchGroup.innerHTML = groups;
    }

    setLanguage(data){

        this.selectLanguage.innerHTML = this._language(data);
    }

    setTimeZone(data){

        this.selectTimeZone.innerHTML = this._timeZone(data);
    }
}