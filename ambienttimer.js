var svg_container = d3.select("svg");
				
var slide_line = svg_container.append('line')
			.attr("x1", 300)
			.attr("y1", -1300)
			.attr("x2", -1300)
			.attr("y2", 300)
			.attr("class", "slide");

for (var i = 0; i < 21; i++) {
	svg_container.append('line')
				.attr("x1", i * 110)
				.attr("y1", -20)
				.attr("x2", -20)
				.attr("y2", i * 110)
				.attr("class", "grill");
}

d3.select('body').on("click", function() {
  		slide_line.transition()
		.attr("x1", 1000)
		.attr("y1", 0)
		.attr("x2", 0)
		.attr("y2", 1000)
		.duration(60000)
		.ease('linear');
	});