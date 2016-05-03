// From http://inspirationalpixels.com/tutorials/creating-an-accordion-with-html-css-jquery
// Needed some customization though
$(document).ready(function() {
    function close_accordion_section() {
        $('.accordion .accordion-section-title').removeClass('active');
        $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
    }
 
    $('.accordion-section-title').click(function(e) {
        
        // Grab current anchor value
        var currentItem = $(this).siblings(".accordion-section-content").eq(0);

        if($(e.target).is('.active')) {
            close_accordion_section();
        }else {
            close_accordion_section();
 
            // Add active class to section title
            $(this).addClass('active');

            // Open up the hidden content panel
            $(currentItem).slideDown(300).addClass('open'); 
        }
 
        e.preventDefault();
    });
});