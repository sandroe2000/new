class ScrollTabsHelper {

    constructor(){

        this.hidWidth = 0;
        this.scrollBarWidths = 40;
        this.reAdjust();
        this.init();
    }

    init(){

        $(window).on('resize',function(event){  
            scrollTabsHelper.reAdjust();
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
    
            $('.list').animate({left:"-=" + scrollTabsHelper.getLeftPosi() +"px"},'slow',function(){});
        });
    }

    widthOfList = function(){
        
        let itemsWidth = 0;

        $('.list a').each(function(){
            let itemWidth = $(this).outerWidth();
            itemsWidth += itemWidth;
        });
        return itemsWidth;
    };

    widthOfHidden = function(){
        return ( ( $('.wrapper').outerWidth() ) - this.widthOfList() - this.getLeftPosi() ) - this.scrollBarWidths;
    };

    getLeftPosi = function(){
        return $('.list').position().left;
    };

    reAdjust = function(){
        if (($('.wrapper').outerWidth()) < this.widthOfList()) {
            $('.scroller-right').show().css('display', 'flex');
        }
        else {
            $('.scroller-right').hide();
        }
        
        if (this.getLeftPosi() < 0) {
            $('.scroller-left').show().css('display', 'flex');
        }
        else {
            $('.item').animate({left:"-=" + this.getLeftPosi() + "px"},'slow');
            $('.scroller-left').hide();
        }
    }    
}