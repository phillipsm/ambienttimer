var svg_container = d3.select("svg");
				
// Create our huge sliding line
// This slides to our lower right corner
var slide_line = svg_container.append('line')
			.attr("x1", 300)
			.attr("y1", -1300)
			.attr("x2", -1300)
			.attr("y2", 300)
			.attr("class", "slide");

// Drow our grill lines
for (var i = 0; i < 21; i++) {
	svg_container.append('line')
				.attr("x1", i * 110)
				.attr("y1", -20)
				.attr("x2", -20)
				.attr("y2", i * 110)
				.attr("class", "grill");
}

// Start the slide on load
if (num_mili_seconds > 0) {
    slide_line.transition()
    	.attr("x1", 1000)
    	.attr("y1", 0)
    	.attr("x2", 0)
    	.attr("y2", 1000)
    	.duration(num_mili_seconds)
    	.ease('linear');
}