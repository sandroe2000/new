import { DocsController } from './controller/DocsController.js';

class Docs {

    constructor(){

        this.docsController = new DocsController();
    }
}

let docs;

document.addEventListener("DOMContentLoaded", () => {
    
    docs = new Docs();
});