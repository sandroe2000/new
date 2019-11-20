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
                            <th class="w-20">Dept.</th>
                            <th class="w-10">Disabled</th>
                            <th class="w-10"></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${model.list.map(profile => `<tr data-id="${profile.id}">
                            <td>${profile.id}</td>
                            <td>${profile.firstName} ${profile.lastName}</td>
                            <td>${profile.dept.descr}</td>
                            <td>${profile.disabled}</td>
                            <td class="text-right">
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