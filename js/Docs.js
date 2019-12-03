import { DocsController } from './controller/DocsController.js';

class Docs {

    constructor(){

        this.docsController = new DocsController();
    }
}

let docs;

document.addEventListener("DOMContentLoaded", () => {
    
    docs = new Docs();

    let url = window.location.href;
    url = url.replace('http://localhost:3000/', '');

    document.querySelectorAll('ul.navbar-nav.mr-auto li').forEach((li) => {

        if( li.innerHTML.indexOf(url) > -1 ){
            li.classList.add('active');
        }
    });
});