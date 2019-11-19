//--Nav-tabs Horizontal scroll
var hidWidth;
var scrollBarWidths = 40;

var widthOfList = function(){
    var itemsWidth = 0;

    $('.list a').each(function(){
        var itemWidth = $(this).outerWidth();
        itemsWidth += itemWidth;
    });
    return itemsWidth;
};

var widthOfHidden = function(){
    return ( ( $('.wrapper').outerWidth() )-widthOfList()-getLeftPosi() )-scrollBarWidths;
};

var getLeftPosi = function(){
    return $('.list').position().left;
};

var reAdjust = function(){
    if (($('.wrapper').outerWidth()) < widthOfList()) {
        $('.scroller-right').show().css('display', 'flex');
    }
    else {
        $('.scroller-right').hide();
    }
    
    if (getLeftPosi()<0) {
        $('.scroller-left').show().css('display', 'flex');
    }
    else {
        $('.item').animate({left:"-="+getLeftPosi()+"px"},'slow');
        $('.scroller-left').hide();
    }
}

reAdjust();

$(window).on('resize',function(e){  
    reAdjust();
});

$('.scroller-right').click(function() {

    $('.scroller-left').fadeIn('slow');
    //$('.scroller-right').fadeOut('slow');
    
    //$('.list').animate({left:"+="+widthOfHidden()+"px"},'slow',function(){});
    $('.list').animate({left:"+="+(-150)+"px"},'slow',function(){});
});

$('.scroller-left').click(function() {

    //$('.scroller-right').fadeIn('slow');
    $('.scroller-left').fadeOut('slow');

    $('.list').animate({left:"-="+getLeftPosi()+"px"},'slow',function(){
    
    });
});  

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

let profileController;

$( document ).ready(function() {
    
    profileController = new ProfileController();
    
    //--Password Test Strength
    $('#newPassword').strengthMeter('progressBar', {
        container: $('#passwordMeter')
    });
});