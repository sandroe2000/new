import { ProjectsController } from './controller/ProjectsController.js';

class Projects {

    constructor(){

        this.projectsController = new ProjectsController();
    }
}

let projects;

document.addEventListener("DOMContentLoaded", () => {
    
    projects = new Projects();
});