//-- Image Upload
let uploads = [];

$("#imageUpload1").change((event) => {
    readURL(event, '#imagePreview1');
}); 

$("#setUpload1").click((event) => {
    upload(event, '#imageUpload1', '#setUpload1', 0);
});

let readURL = (event, imagePreview) => {
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

let initSpinner = (setUpload) => {
    document.querySelector(setUpload).classList.add('fa');
    document.querySelector(setUpload).classList.add('fa-spin');
    document.querySelector(setUpload).classList.add('fa-fw');
};

let closeSpinner = (setUpload) => {
    document.querySelector(setUpload).classList.remove('fa');
    document.querySelector(setUpload).classList.remove('fa-spin');
    document.querySelector(setUpload).classList.remove('fa-fw');
};

let upload = (event, inputFile, setUpload, slot) => {
    //debugger;
    event.preventDefault();

    initSpinner(setUpload);

    let input = document.querySelector(inputFile);
    let formData = new FormData();
        formData.append('file', input.files[0]);

    fetch('/uploads?folder=none', {
        method: 'POST',
        body: formData
    }).then(
        response => response.json()
    ).then(success => {
            uploads[slot] = success;
            closeSpinner(setUpload);
    }).catch(error => {
        console.log(error);
        closeSpinner(setUpload);
    });
};
