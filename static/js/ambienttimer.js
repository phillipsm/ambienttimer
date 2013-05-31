//////////////////////////////////////////////////////
// Start favicon logic
//////////////////////////////////////////////////////

// We fill in the favicon as we fill in the window
// if we have a short timer, only swap out a couple favicons

// Chrome and Opera seem okay with swapping favicons
if(/chrom(e|ium)|opera/.test(navigator.userAgent.toLowerCase())){

    var favicons_to_display = [0,7,15,23];

    if (num_millisecs >= 3000) {
        favicons_to_display = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    }

    var num_favicons = favicons_to_display.length - 1;

    var swap_favicon = function() {
        if (favicons_to_display.length > 0) {
            $('#favicon').attr('href', '/static/img/favicon-' + favicons_to_display[0] + '.png');
            favicons_to_display.splice(0,1);
            setTimeout(swap_favicon, num_millisecs/num_favicons);
        }
    }

    if (num_millisecs != 0) {
        swap_favicon();
    }
}
//////////////////////////////////////////////////////
// End favicon logic
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
// Start IE management
//////////////////////////////////////////////////////

// Fullscreen (view box with 100% height and width) in IE is beyond me. Fuck it.

if(/msie/.test(navigator.userAgent.toLowerCase())){
    $('.example').remove();
    $("#instructions").append("AmbientTimer doesn't work so well in Internet Explore. Sorry. Can you give another browser a try?");
}


//////////////////////////////////////////////////////
// End IE management
//////////////////////////////////////////////////////


//////////////////////////////////////////////////////
// Start fullscreen logic
//////////////////////////////////////////////////////

function launch_full_screen(element) {
    // Launch html5 fullscreen
    
    if(element.requestFullScreen) {
        element.requestFullScreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    }
}

function full_screen_enabled(element) {
    // Detect if browser supports fullscreen
    
    // Test browser for fullscreen element
    var full_screen_avail = element.webkitRequestFullScreen || element.mozRequestFullScreen || element.webkitRequestFullScreen;
    
    // Fullscreen seems spaztastic on mobile, so don't show our fullscreen icon. 
    if ((/iPhone|iPod|iPad|Android|BlackBerry/).test(navigator.userAgent)) {
        full_screen_avail = false;
    }
    
    return full_screen_avail;
}

function on_fullscreen_exit() {
    // When full screen exists
    
    $('#full_screen_container').fadeIn(1000).fadeOut(6500);
}

if (full_screen_enabled(document.documentElement)) {
    // Show fullscreen icon and listen for fullscreen exit (so we can fadein the fullscreen icon)
    
    // FadeIn and Fadeout fullscreen icon on load
    $('#full_screen_container').fadeIn(1000).fadeOut(6500);
    
    document.addEventListener("fullscreenchange", function () {
        if (!document.fullscreen) {
            on_fullscreen_exit()
        }
    }, false);
    
    document.addEventListener("mozfullscreenchange", function () {
        if (!document.mozFullScreen) {
            on_fullscreen_exit()
        }
    }, false);
    
    document.addEventListener("webkitfullscreenchange", function () {
        if (!document.webkitIsFullScreen) {
            on_fullscreen_exit()
        }
    }, false);
}

// Our clickable, fullscreen element
$('#full_screen_container').on('click', function() {
    launch_full_screen(document.documentElement);
    $(this).fadeOut(1000);
});

//////////////////////////////////////////////////////
// End fullscreen logic
//////////////////////////////////////////////////////