import { AppView } from '../view/AppView.js';

export class DocsController {

    constructor(){

        this.appView = new AppView( 
            document.querySelector('#navHeader'),
            document.querySelector('#navFooter')
        );
    }
}

document.addEventListener("DOMContentLoaded", () => {
    
    new DocsController();    
    OverlayScrollbars(document.querySelectorAll('#all'), { });
});