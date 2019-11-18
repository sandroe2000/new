class ProfileService {

    constructor(){

        this._profiles = [];
        this._profileView = new ProfileView( document.querySelector('#tableProfileView') );
    }

    get profiles() {
        
        return [].concat(this._profiles);
    }

    async findAll(){
        const response = await fetch('data/users/list.json', {
            method: 'GET'
        });
        this._profiles = await response.json();
        this._profileView.update(this._profiles);

        $('span.oi.oi-pencil').click(function(event){
            let id = $(event.target.closest('tr')).find('td:eq(0)').text();

            for(let profile in this._profiles){
                if(profile.id == id){
                    console.log(profile);
                }
            }

            $('#profileTab li:eq(1) a').tab('show');
        });
    }

    findById(id){

    }

    add(profile){

    }

    update(profile){

    }

    delete(id){

    }
}