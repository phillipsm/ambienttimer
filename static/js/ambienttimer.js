// Launch html5 fullscreen, thanks http://davidwalsh.name/fullscreen
function launch_full_screen(element) {
    if(element.requestFullScreen) {
        element.requestFullScreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    }
}

// Detect if browser supports fullscreen
function full_screen_enabled (element) {
    if (element.webkitRequestFullScreen || element.mozRequestFullScreen || element.webkitRequestFullScreen) {
        return true;
    }
    
    return false;
}

// Detect if our browser supports fullscreen
if (full_screen_enabled(document.documentElement)) {
    $('#full_screen_container').fadeIn(1000);
}

$('#full_screen_container').on('click', function() {
    launch_full_screen(document.documentElement);
    $(this).fadeOut(2000);
    });


// When full screen is exited
function on_fullscreen_exit() {
    $('#full_screen_container').fadeIn(5000).fadeOut(5000);
}

// Listen for fullscreen exit (so we can fadein the fullscreen icon)
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

// Fadeout fullscreen icon on load
setTimeout(function(){
        $('#full_screen_container').fadeOut(5000);
    });