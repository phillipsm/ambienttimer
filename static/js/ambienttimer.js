
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
    
    $('#full_screen_container').fadeIn(3000).fadeOut(5000);
}

if (full_screen_enabled(document.documentElement)) {
    // Show fullscreen icon and listen for fullscreen exit (so we can fadein the fullscreen icon)
    
    // FadeIn and Fadeout fullscreen icon on load
    $('#full_screen_container').fadeIn(1000).fadeOut(5000);
    
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
    $(this).fadeOut(2000);
});