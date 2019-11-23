class ProfileView {

    constructor(tableProfiles, selectGroups, selectTimeZone, selectLanguage){
        
        this.tableProfiles = tableProfiles;
        this.selectGroups = selectGroups;
        this.selectTimeZone = selectTimeZone;
        this.selectLanguage = selectLanguage;
    }

    _tableProfiles(model){ 
        
        return `<div class="row mb-3">
                    <div class="col-md-5">
                        <label class="mb-0">Search</label>
                        <input id="searchName" type="text" class="form-control" />
                    </div>
                    <div class="col-md-5">
                        <label class="mb-0">Groups</label>
                        <input id="searchGroup" type="text" class="form-control" />
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-success btn-block mt-4">Search</button>
                    </div>
                </div>
                <table id="tableProfile" class="table table-striped">
                    <thead>
                        <tr>
                            <th class="w-10">#</th>
                            <th class="w-40">Name<span class="oi oi-caret-bottom ml-2"></span></th>
                            <th class="w-20">Groups<span class="oi oi-elevator ml-2"></span></th>
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
                </table>
                <nav aria-label="Page navigation">
                    <ul class="pagination pagination-sm justify-content-end" style="border-radius: 0">
                        <li class="page-item disabled">
                            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                        </li>
                        <li class="page-item active" aria-current="page">
                            <span class="page-link">
                                1
                                <span class="sr-only">(current)</span>
                            </span>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>`;
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