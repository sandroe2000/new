export class ImgUploadHelper {

    constructor(){
        
        this.uploads = [];
        this.init();
    }
    
    init(){

        $("#imageUpload1").change((event) => {
            this.readURL(event, '#imagePreview1');
        }); 
    
        $("#setUpload1").click((event) => {
            this.upload(event, '#imageUpload1', '#setUpload1', 0);
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
        //debugger;
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
                uploads[slot] = success;
                this.closeSpinner(setUpload);
        }).catch(error => {
            console.log(error);
            this.closeSpinner(setUpload);
        });
    };
}