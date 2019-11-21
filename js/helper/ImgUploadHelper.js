class ImgUploadHelper {

    constructor(renderPlace, imgInputId, uri, slot){
        
        this.uploads = [];
        this.imgInputId = imgInputId;
        this.renderPlace = document.querySelector(`#${renderPlace}`);
        this.slot = slot;
        this.uri = uri;
        this.init();
    }

    _template(){

        return `<div class="float-left ml-4 mr-4">
                    <div class="avatar-upload">
                        <div class="avatar-edit">
                            <input type='file' name="file" id="${this.imgInputId}Upload" accept=".webp, .png, .jpg, .jpeg" />
                            <label for="${this.imgInputId}Upload"></label>
                        </div>
                        <div class="avatar-set-upload">
                            <label id="${this.imgInputId}SetUpload"></label>
                        </div>
                        <div class="avatar-preview">
                            <div id="${this.imgInputId}Preview" style="background-image: url(img/avatar/avatar.webp);"></div>
                        </div>
                    </div>
                </div>`;
    }
    
    init(){

        this.renderPlace.innerHTML += this._template();

        $(`#${this.imgInputId}Upload`).change((event) => {
            this.readURL(event, `#${this.imgInputId}Preview`);
        }); 
    
        $(`#${this.imgInputId}SetUpload`).click((event) => {
            this.upload(event, `#${this.imgInputId}Upload`, `#${this.imgInputId}SetUpload`, this.slot);
        });
    }
    
    readURL = (event, imagePreview) => {
        let input = event.target;
        let preview = document.querySelector(imagePreview);
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = (ev) => {
            let img = ev.target.result;
                document.querySelector(imagePreview).style.backgroundImage = 'url(' + img + ')';
            };
            reader.readAsDataURL(input.files[0]);
        }
    };

    initSpinner = (setUpload) => {
        document.querySelector(setUpload).classList.add('fa');
        document.querySelector(setUpload).classList.add('fa-spin');
        document.querySelector(setUpload).classList.add('fa-fw');
    };

    closeSpinner = (setUpload) => {
        document.querySelector(setUpload).classList.remove('fa');
        document.querySelector(setUpload).classList.remove('fa-spin');
        document.querySelector(setUpload).classList.remove('fa-fw');
    };

    upload = (event, inputFile, setUpload, slot) => {

        event.preventDefault();

        this.initSpinner(setUpload);

        let input = document.querySelector(inputFile);
        let formData = new FormData();
            formData.append('file', input.files[0]);

        fetch(this.uri, {
            method: 'POST',
            body: formData
        }).then(
            response => response.json()
        ).then(success => {
                //uploads[slot] = success;
                this.closeSpinner(setUpload);
        }).catch(error => {
            console.log(error);
            this.closeSpinner(setUpload);
        });
    };
}