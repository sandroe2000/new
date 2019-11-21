let profileController;

document.addEventListener("DOMContentLoaded", () => {
    
    scrollTabsHelper = new ScrollTabsHelper();
    checkPasswordStrengthHelper = new CheckPasswordStrengthHelper( document.querySelector('#new-password'));
    profileController = new ProfileController();
});