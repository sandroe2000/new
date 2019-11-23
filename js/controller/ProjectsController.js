class ProjectsController {

    constructor(){

        this.appView = new AppView( 
            document.querySelector('#navHeader'),
            document.querySelector('#navFooter')
        );
    }
}