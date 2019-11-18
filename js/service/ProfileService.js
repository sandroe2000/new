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

        //--TODO, PRECISA DE UMA SOLUÇÃO MAIS LIMPA PARA ESTE EVENTO/METODO
        $('span.oi.oi-pencil').click(function(event){
            
            let id = $(event.target.closest('tr')).find('td:eq(0)').text();
            let profiles = profileController.profileService.profiles[0].list;
            
            //--TODO, DATA-BIND
            profiles.forEach(p =>{
                if(p.id == id){
                    console.log(p);
                }
            });

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