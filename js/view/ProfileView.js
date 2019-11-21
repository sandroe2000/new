class ProfileView {

    constructor(tableProfiles, selectGroups, selectTimeZone, selectLanguage){
        this.tableProfiles = tableProfiles;
        this.selectGroups = selectGroups;
        this.selectTimeZone = selectTimeZone;
        this.selectLanguage = selectLanguage;
    }

    _tableProfiles(model){ 
        
        return `<table id="tableProfile" class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th class="w-10">#</th>
                            <th class="w-40">Name</th>
                            <th class="w-20">Groups</th>
                            <th class="w-10">Disabled</th>
                            <th class="w-10"></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${model.list.map(profile => `<tr data-id="${profile.id}">
                            <td class="w-10">
                                ${profile.id}
                            </td>
                            <td class="w-40" title="${profile.firstName} ${profile.lastName}">
                                ${profile.firstName} ${profile.lastName}
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
                        </tr>`).join('')} 
                    </tbody>
                </table>`;
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
                profileController.loadProfileById(tr.getAttribute('data-id'));
            });
        });
    }

    setGroups(data){

        this.selectGroups.innerHTML = this._groups(data);
    }

    setLanguage(data){

        this.selectLanguage.innerHTML = this._language(data);
    }

    setTimeZone(data){

        this.selectTimeZone.innerHTML = this._timeZone(data);
    }
}