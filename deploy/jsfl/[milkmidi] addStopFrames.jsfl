/*
 * Design by milkmidi
 * http://milkmidi.com
 * modify date:2009/07/01
 * */
addStopFrames();
function addStopFrames() {
	var dom 	 		= fl.getDocumentDOM();
	var timeline 		= dom.getTimeline();
	var selections  	= timeline.getSelectedFrames();
	var numSelections	= selections.length;
	for(var i = 0; i < numSelections; i += 3) {	
		cLayer = selections[i];
		startFrame = selections[i + 1];
		endFrame = selections[i + 2];
		timeline.setSelectedFrames([cLayer, startFrame, endFrame], true);
		timeline.convertToKeyframes();
		for (f = startFrame; f < endFrame;++f) {		
			timeline.layers[cLayer].frames[f].actionScript = "stop();";
		}
	}
}


