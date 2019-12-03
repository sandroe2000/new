import { ProjectsController } from './controller/ProjectsController.js';

class Projects {

    constructor(){

        this.projectsController = new ProjectsController();
    }
}

let projects;

document.addEventListener("DOMContentLoaded", () => {
    
    projects = new Projects();

    let url = window.location.href;
    url = url.replace('http://localhost:3000/', '');

    document.querySelectorAll('ul.navbar-nav.mr-auto li').forEach((li) => {

        if( li.innerHTML.indexOf(url) > -1 ){
            li.classList.add('active');
        }
    });

});