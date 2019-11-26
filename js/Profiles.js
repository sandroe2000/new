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
});