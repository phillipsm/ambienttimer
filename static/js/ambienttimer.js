var svg_container = d3.select("svg");
				
// Create our huge sliding line
// This slides to our lower right corner
var slide_line = svg_container.append('line')
			.attr("x1", 300)
			.attr("y1", -1300)
			.attr("x2", -1300)
			.attr("y2", 300)
			.attr("class", "slide");

// Draw our grill lines
for (var i = 0; i < 21; i++) {
	svg_container.append('line')
				.attr("x1", i * 110)
				.attr("y1", -20)
				.attr("x2", -20)
				.attr("y2", i * 110)
				.attr("class", "grill");
}

if (num_millisecs > 0) {
    // Start the slide on load
    slide_line.transition()
    	.attr("x1", 1000)
    	.attr("y1", 0)
    	.attr("x2", 0)
    	.attr("y2", 1000)
    	.duration(num_millisecs)
    	.ease('linear');
    	
    // Hide the fullscreen icon after three seconds
    setTimeout(function(){
        d3.select('#full_screen_container').attr("class", "hidden");
      }, 5000);
}


// Fullscreen, thanks http://davidwalsh.name/fullscreen
// Find the right method, call on correct element
function launch_full_screen(element) {
    if(element.requestFullScreen) {
        element.requestFullScreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    }
}

d3.select('#full_screen_container').on("click", function() {
    launch_full_screen(document.documentElement);
    d3.select(this).attr("class", "hidden");
    });
