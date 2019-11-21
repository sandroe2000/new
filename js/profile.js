let profileController;

document.addEventListener("DOMContentLoaded", () => {
    
    imgUploadHelper1 = new ImgUploadHelper('imgInputUpload_1', 'img_up_1_', '/files?folder=none', 0);
    scrollTabsHelper = new ScrollTabsHelper();
    checkPasswordStrengthHelper = new CheckPasswordStrengthHelper( document.querySelector('#new-password'));
    profileController = new ProfileController();
});