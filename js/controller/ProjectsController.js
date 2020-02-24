import { AppView } from '../view/AppView.js';

export class ProjectsController {

    constructor(){

        this.appView = new AppView( 
            document.querySelector('#navHeader'),
            document.querySelector('#navFooter')
        );
    }
}

document.addEventListener("DOMContentLoaded", () => {
    
    new ProjectsController();    
    OverlayScrollbars(document.querySelectorAll('#all'), { });
});