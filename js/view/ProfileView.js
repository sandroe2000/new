class ProfileView {

    constructor(el){
        this._el = el;
    }

    _template(model){ 
        
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
                            <td class="w-10">${profile.id}</td>
                            <td class="w-40" title="${profile.firstName} ${profile.lastName}">
                                ${profile.firstName} ${profile.lastName}
                            </td>
                            <td class="w-20" title="${profile.groupParticipant}">
                                ${profile.groupParticipant}
                            </td>
                            <td class="w-10">${profile.disabled}</td>
                            <td class="w-10 text-right">
                                <span class="oi oi-pencil mr-2 ico-mouse-hand"></span>
                            </td>
                        </tr>`).join('')} 
                    </tbody>
                </table>`;
    } 
    
    update(model) {
        
        this._el.innerHTML = this._template(model);

        document.querySelectorAll('.ico-mouse-hand').forEach(item => {
            item.addEventListener('click', event => {                
                let tr = event.target.closest('tr');
                profileController.loadProfileById(tr.getAttribute('data-id'));
            });
        });
    }
}