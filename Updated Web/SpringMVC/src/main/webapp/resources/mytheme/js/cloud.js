

function generateCloud(frequency_list) {

	console.log("frequency_list =" + JSON.stringify(frequency_list));
	var color = d3.scale.linear()
	.domain([0,1,2,3,4,5,6,10,15,20,100])
	.range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

	d3.layout.cloud().size([850, 320])
	.words(frequency_list)
	.rotate(0)
	.fontSize(function(d) { return (d.size*2); })
	.on("end", draw)
	.start();

	function draw(words) {
		d3.select("body").append("svg")
		.attr("width", 850)
		.attr("height", 320)
		.attr("class", "wordcloud")
		.append("g")
		// without the transform, words words would get cutoff to the left and top, they would
		// appear outside of the SVG area
		.attr("transform", "translate(320,200)")
		.selectAll("text")
		.data(words)
		.enter().append("text")
		.style("font-size", function(d) { return d.size + "px"; })
		.style("fill", function(d, i) { return color(i); })
		.attr("transform", function(d) {
			return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
		})
		.text(function(d) { return d.text; });
	}	

}
