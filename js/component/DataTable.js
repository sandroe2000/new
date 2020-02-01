export class DataTable {

    constructor(id, listModel){

        this.init(id, listModel);
    }

    init(id, listModel){
        
        let pagin = `<select id="${'TABLE_SIZE_'+id}" class="form-control w-10 mr-3" style="float:left; min-width: 75px;">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>
        <div aria-label="Page navigation">
            <ul id="${'TABLE_PAGINATION_'+id}" class="pagination" style="border-radius: 0"></ul">
        </div>`

        let table = document.querySelector('#'+id);
        let size = document.querySelector('#TABLE_SIZE_'+id);

        if(!size) table.parentNode.insertAdjacentHTML("afterend", pagin);

        //this.setaData(id, listModel, callback);
    }

    async setaData(id, listModel, callback){

        let table = document.querySelector('#'+id);

        let tableBody = '';
        if(listModel){
             tableBody = `${listModel.content.map(profile => `<tr data-id="${profile.id}">
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
        
            let that = this;
            
            $('#TABLE_PAGINATION_'+id).pagination({
                pages: listModel.totalPages,
                currentPage: (new Number(listModel.number)+1),
                ellipsePageSet: true,
                prevText: "Anterior",
                nextText: "Próximo",
                selectOnClick: true,
                onPageClick:function(pageNumber, event) {

                    let size = document.querySelector('#TABLE_SIZE_'+id).value;

                    //uri = that.replaceUriParams(uri, 'size', size);
                    //uri = that.replaceUriParams(uri, 'page', new Number(pageNumber)-1);

                    //that.setaData(id, uri);
                    if(callback) callback();
                }
            });
        }
               
        table.innerHTML = tableBody;

        //TODO - DIZER A QUAL TABELA PERTENCE
        document.querySelectorAll('.oi.oi-pencil').forEach(item => {
            item.addEventListener('click', event => {                
                let tr = event.target.closest('tr');
                this.profileController.loadProfileById(tr.getAttribute('data-id'));
            });
        });

        //TODO - DIZER A QUAL TABELA PERTENCE
        document.querySelectorAll('.oi.oi-trash').forEach(item => {
            item.addEventListener('click', event => {                
                let tr = event.target.closest('tr');
                this.profileController.delete(tr.getAttribute('data-id'));
            });
        });

    }

    replaceUriParams(uri, key, value) {
        let result = '';
        let url = new URLSearchParams(uri);
        url.set(key, value);
        result = decodeURIComponent(url);
        return result;
    }
}