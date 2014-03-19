/*
 * Design by milkmidi
 * http://milkmidi.com
 * modify date:2010/12/02
 * */ 
var DOC   = fl.getDocumentDOM();
var LIB   = DOC.library;
var SELES = DOC.selection; /*Array*/
var ITEMS = LIB.items; /*Array*/



if (fl.getDocumentDOM().selection.length > 0){
	var cur_selection = fl.getDocumentDOM().selection;
	var mySelected = new Array();
	for(var i in cur_selection){
		mySelected.push(fl.getDocumentDOM().selection[i]);
	}
	for(var i in mySelected){
		var sel = mySelected[i];
		var path = sel.libraryItem.name;
		var pName = sel.name;
		var mc_name = path.substr(path.lastIndexOf("/")+1);
		if (mc_name != null){
			fl.trace(path + "_" + pName);
			fl.getDocumentDOM().selectNone();
			fl.getDocumentDOM().selection = [sel];		
			var newMc = fl.getDocumentDOM().convertToSymbol("movie clip", path + "_" + pName, "top left");
			fl.getDocumentDOM().selection[0].name = pName;
			fl.getDocumentDOM().selection = mySelected;
		}
	}
}
//converSelectsToSymbol();
function converSelectsToSymbol(){
	if(SELES.length <= 0) return;	
	for(var i = 0; i < SELES.length; i++){		
		var sel = SELES[i];
		var path = sel.libraryItem.name;
		var pName = sel.name;
		var mc_name = path.substr(path.lastIndexOf("/")+1);
		if (mc_name != null){
			fl.trace(path + "_" + pName);
			fl.getDocumentDOM().selectNone();
			fl.getDocumentDOM().selection = [sel];		
			var newMc = fl.getDocumentDOM().convertToSymbol("movie clip", path + "_" + pName, "top left");
			fl.getDocumentDOM().selection[0].name = pName;
			fl.getDocumentDOM().selection = mySelected;
		}
		//SELES[i].x = Math.round(SELES[i].x)
		//SELES[i].y = Math.round(SELES[i].y)
		//var ran_name = getRandomName();
		//var cur_mc = SELES[i].convertToSymbol("movie clip", "hide_btn_" + ran_name, "top left");
		/*DOC.selection[0].name = "_btn";
		DOC.enterEditMode("inPlace");
		DOC.getTimeline().cutFrames();
		DOC.getTimeline().pasteFrames(3);
		DOC.exitEditMode();	
		tracer("hitArea Button");*/
	}	
	fl.trace("SELES.length:"+SELES.length);
}

function getRandomName(){
	return "_" + String(Math.floor(Math.random() * 99999));
}