function disableStream(videoContainer) {
	videoContainer.style.display = "none";
	console.info("stream not running - but soon ;)");
}


function monitor_vid(vidplayer) {
	const videoContainer = document.getElementById('videoContainer');
	const videoTitle = document.getElementById('videoTitle');
	const iFrame = videoContainer.getElementsByTagName("iframe")[0];

	const url = new URL(iFrame.src);

	const server = url.origin;
	const channel = url.pathname.replace("/view/","").replace("/", "");

	// get informations
	$.getJSON({
		url: server + "/apiv1/channel/" + channel
	}).then(function(data) {
		if (data.results.length > 0) {
			let channel = data.results[0];
			if (channel.stream > 0) {
				videoContainer.style.display = "border";
			} else {
				disableStream(videoContainer);
			}
		}
	}, function() {
		console.warn("channel not found");
		disableStream(videoContainer);
	});
}
$(document).ready(function() {

	monitor_vid();
	setInterval(monitor_vid, 10000);
});
