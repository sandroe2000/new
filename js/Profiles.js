import { ScrollTabsHelper } from './helper/ScrollTabsHelper.js';
import { CheckPasswordStrengthHelper } from './helper/CheckPasswordStrengthHelper.js';
import { ProfileController } from './controller/ProfileController.js';

class Profiles {

    constructor(){

        this.scrollTabsHelper = new ScrollTabsHelper();
        this.checkPasswordStrengthHelper = new CheckPasswordStrengthHelper( document.querySelector('#new-password'));
        this.profileController = new ProfileController();
    }
}

let profiles;

document.addEventListener("DOMContentLoaded", () => {
    
    profiles = new Profiles();

    let url = window.location.href;
    url = url.replace('http://localhost:3000/', '').replace('.html', '');

    document.querySelectorAll('ul.navbar-nav.mr-auto li').forEach((li) => {

        if( li.innerHTML.indexOf(url) > -1 ){
            li.classList.add('active');
        }
    });
});