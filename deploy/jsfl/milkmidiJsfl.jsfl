/*
 * Design by milkmidi
 * http://milkmidi.com
 * modify date:2010/12/02
 * */ 
var DOC   = fl.getDocumentDOM();
var LIB   = DOC.library;
var SELES = DOC.selection; /*Array*/
var ITEMS = LIB.items; /*Array*/


var NOTHING_SELECTED = "Error: Nothing selected.";
function tracer(){
	var _length = arguments.length;
	var _str = "";	
	for(var i = 0 ; i< _length ; i++){
		_str += arguments[i] + " ,";
	}
	_str = _str.substr(0, _str.length - 1);
	fl.trace(_str);
}

//round x y
function Ro(){
	if(SELES.length <= 0) return;	
	for(var i = 0; i < SELES.length; i++){		
		SELES[i].x = Math.round(SELES[i].x)
		SELES[i].y = Math.round(SELES[i].y)
	}	
	tracer("round x y");
}
//copy position
function Cp() {
	var _storedPosX;
	var _storedPosY;
	if (SELES.length > 1){
		alert('You have more than one element selected.');
	}else if (SELES.length == 1 && SELES[0].x != ""){
        _storedPosX = SELES[0].x;
        _storedPosY = SELES[0].y;		
		return Math.round(_storedPosX) +"," + Math.round(_storedPosY);		
	}else{
        alert('You must select an element to copy its position.');
	}	
	tracer("copy position");
}
/*
 *paste stored position 
*/
function Pp(pX , pY) {		
	for(var i = 0 ; i <SELES.length ; i++){
		if(SELES[i].x != undefined){
			SELES[i].x = Math.round(pX / 1);			
			SELES[i].y = Math.round(pY / 1);			
		}
	}
	tracer("paste stored position ");
}

//name by position
//Na();
function Na(){	
	if(SELES.length <= 0) {
		tracer(NOTHING_SELECTED);
		return;
	}
	var ui = DOC.xmlPanel(fl.configURI + "WindowSWF/xmlPanel/setSelectedNamesByPosition.xml");		
	if (ui.dismiss != "accept") 	
		return;		
	var _arr = [];/* Object */	
	for (var i = 0; i < SELES.length; i++) {		
		_arr.push( { obj:SELES[i], x:SELES[i].x, y:SELES[i].y } );					
	}	
	
	var _length = _arr.length;	
	var tempObj;	
	
	
	switch(ui.layout) {		
		case "0":
			//_arr.sortOn('x');			
			 for (i = 0; i < _length; i++) {				 				 
					for (j = 0; j < _length; j++) {						
						if (_arr[i].x < _arr[j].x) {							
							temp = _arr[i];
							_arr[i] = _arr[j];
							_arr[j] = temp;
						}
					}
				}				
			break;
		case "1":
			//_arr.sortOn('y');		
			for (i = 0; i < _length; i++) {				
					for (j = 0; j < _length; j++) {						
						if (_arr[i].y < _arr[j].y) {							
							temp = _arr[i];							
							_arr[i] = _arr[j];							
							_arr[j] = temp;
						}
					}
				}	
			break;		
	}	
	var _index = ui.index / 1;	
	for (i = 0; i < _arr.length; i++) {						
		_arr[i].obj.name = ui.prefix + ( _index + i);		
	}	
	tracer("name by position");
}

//duplicate layer
//Dl();
function Dl() {
	var tl = DOC.getTimeline();	
	var frameSeq = tl.getSelectedFrames();
    var layerSeq = tl.getSelectedLayers();
    if (layerSeq.length <= 0) 
		return;
    var selectedLayerIndex = layerSeq[0];
    var selectedLayer = tl.layers[selectedLayerIndex];
    tl.setSelectedLayers(selectedLayerIndex,true);
    tl.copyFrames();
    var newLayerIndex = tl.addNewLayer(selectedLayer.name,selectedLayer.layerType,true);
    tl.setSelectedLayers(newLayerIndex,true);
    tl.pasteFrames(); 
   	tracer("duplicate layer");
}



/**
 *find symbol in library 
 */
function Fs() {			
	var selItem = SELES[0];		
	if (!selItem) { tracer(NOTHING_SELECTED); return; };
	if (!selItem.libraryItem) { tracer('Error: Not a valid symbol.'); return; };		
	var libItem = selItem.libraryItem;
	var tmp = libItem.name.split('/');
	tmp.pop();	
	var n = '';
	for (var i = 0; i < tmp.length; i++){
		n += tmp[i];
		LIB.expandFolder(true, false, n);
		n += '/';
	}
	LIB.selectItem(libItem.name);
	tracer("find symbol in library");
}

//hitArea Button
function Hb() {
	var ran_name = getRandomName();
	var cur_mc = DOC.convertToSymbol("button", "hide_btn_" + ran_name, "top left");
	DOC.selection[0].name = "_btn";
	DOC.enterEditMode("inPlace");
	DOC.getTimeline().cutFrames();
	DOC.getTimeline().pasteFrames(3);
	DOC.exitEditMode();	
	tracer("hitArea Button");
}
function getRandomName(){
	return "_" + String(Math.floor(Math.random() * 99999));
}

//add label in selected symbol
function La() {
	if(SELES.length <= 0) {
		tracer(NOTHING_SELECTED);
		return;
	}
	Ro();
	DOC.enterEditMode("inPlace");
	var timeline = DOC.getTimeline();
	var current = timeline.currentFrame;
	timeline.addNewLayer("LabelComponent");
	fl.componentsPanel.addItemToDocument( { x:65.0, y: -25.0 }, 'milkmidi', 'LabelComponent');					
	tracer("add label in selected symbol");
}

/*
function La(){
	if(SELES.length <= 0) {
		tracer(NOTHING_SELECTED);
		return;
	}
	var ui = DOC.xmlPanel(fl.configURI + "WindowSWF/xmlPanel/addLabelInSelectedSymbol.xml");		
	if (ui.dismiss != "accept") 	
		return;		

	var selItem = SELES[0];
	if (!selItem) { tracer('Error: Nothing selected.'); return; };
	if (!selItem.libraryItem) { tracer('Error: Not a valid symbol.'); return; };
	
	
	var elementName = DOC.getElementProperty("name");
	var newName;
	if (ui.prefix != "") { 
		newName = ui.prefix;
	} else if (elementName == "") {
		newName = "instance" + getRandomName();
	}else {
		newName = elementName;
	}	
	//tracer(newName)
	DOC.enterEditMode("inPlace");
	document.selectNone();	
	DOC.getTimeline().addNewLayer("_label_" + newName);	
	DOC.addNewText( { left:0, top:0, right:200, bottom:20 } , newName );		
	DOC.setTextString(newName); 	
	var layerArray = DOC.getTimeline().getSelectedLayers(); 	

	DOC.selection = DOC.getTimeline().layers[layerArray].frames[0].elements;
	var theSELES = DOC.selection;
	var selectTXTObj = theSELES[0];
	
	selectTXTObj.setTextAttr("size", 16);
	selectTXTObj.setTextAttr("fillColor", 0x0);
	selectTXTObj.setTextAttr("face", "Arial");
	selectTXTObj.textType = "dynamic";
	selectTXTObj.border = true;
	selectTXTObj.x = 0;
	selectTXTObj.y = 0;
	
	//
	var libraryName =  newName + ".label" + getRandomName();
	var newMc = DOC.convertToSymbol("movie clip", libraryName , "top left");	
	DOC.enterEditMode('inPlace');	
	
	var _scriptCode = "this.visible = false; \nparent.removeChild(this);";	
	DOC.getTimeline().layers[0].frames[0].actionScript = _scriptCode;		
	DOC.exitEditMode();
	DOC.exitEditMode();	
	//fl.trace("createLabel complete library name:" + newName);	
}*/


//change base class
//Cl();
function Cl() {		
	if(SELES.length <= 0) {
		tracer(NOTHING_SELECTED);
		return;
	}	
	if ( SELES.length == 1) _changeBaseClassSingle();
	else					_changeBaseClass();	
}

function _changeBaseClassSingle() {
	var ui 		= DOC.xmlPanel(fl.configURI + "WindowSWF/xmlPanel/changeBaseClassSingle.xml");		
	if (ui.dismiss != "accept") 		
		return;			
	var _baseClassName  = (ui.baseClassType == "custom class") ? ui.baseClassName : ui.baseClassType;		
	var selItem = SELES[0];	
	var libItem = selItem.libraryItem;
	var _originLibName = libItem.name;
	libItem.linkageExportForAS = false;		
	if (ui.className != "")	libItem.name = ui.className;		
	libItem.linkageExportForAS  = true;
	libItem.linkageExportInFirstFrame  = (ui.exportInFirstFrame == "true") ? true : false;
	libItem.linkageBaseClass = _baseClassName;		
	if (ui.autoSetLibraryName != "true") 
		libItem.name = _originLibName;	
	tracer(libItem.name + "  change base Class:" + _baseClassName);	
}

function _changeBaseClass() {
	var ui 		= DOC.xmlPanel(fl.configURI + "WindowSWF/xmlPanel/changeBaseClass.xml");		
	if (ui.dismiss != "accept") 
		return;		
	var _baseClassName  = ui.baseClassName;		
	for (var i = 0; i < SELES.length; i++) {
		var selItem = SELES[i];	
		var libItem = selItem.libraryItem;		
		libItem.linkageExportForAS = false;				
		libItem.linkageExportForAS  = true;
		libItem.linkageExportInFirstFrame  = (ui.exportInFirstFrame == "true") ? true : false;
		libItem.linkageBaseClass = _baseClassName;					
		tracer(libItem.name + " change base Class:" + _baseClassName);
	}			
}

//trace selected name
function Tn() {	
	if(SELES.length <= 0) {
		tracer(NOTHING_SELECTED);
		return;
	}	
	var _resultStr = "";
	fl.outputPanel.clear();
	
	//tracer(SELES[0].name == "");
	
	//return;
	tracer("=======================");
	for (var i = 0; i < SELES.length; i++) {
		var selItem = SELES[i];	
		var libItem = selItem.libraryItem;		
		var _type = "";		
		if (selItem.name == "" || selItem.name == null || selItem.name == undefined) continue;
		
		if (selItem.elementType == "text")  {
			_type = "TextField";		
		}else if (libItem.linkageExportForAS) {			
			var _spli_array = libItem.linkageClassName.split(".");									
			_type = (_spli_array.length <= 1) ? _convertString2ClassName(libItem.itemType) : _spli_array[_spli_array.length - 1];
		} else 
			_type = _convertString2ClassName(libItem.itemType);				
		_resultStr += "public var " + _fixSpace(selItem.name) + ":" +  _type + ";\n"		
	}		
	tracer(_resultStr);				
	fl.clipCopyString(_resultStr);
}
function _convertString2ClassName(pStr) {
	if (pStr == "movie clip") 	return "MovieClip";
	if (pStr == "button") 		return "SimpleButton";
	return "";
}
function _fixSpace(pStr) {
	var _returnStr = pStr;
	if (_returnStr.length < 13) {		
		var _length = 13 - _returnStr.length;
		for (var i = 0 ; i < _length ; i++ ) {
			_returnStr += " ";
		}		
	}
	return _returnStr;
}

/**
*smooth bitmap 
*/
//Sb();
function Sb() {
	//fl.trace( ITEMS.length+" "+SELES.length );
	if (ITEMS.length == 0 ||SELES.length==0) {
		fl.trace( "Sb()" +" "+ NOTHING_SELECTED );
		return;				
	}
	var _currentQuality = 90;
	if (SELES.length == 1) {		
		Fs();		
		var _item = ITEMS[0];		
		if(_item.itemType == "bitmap") {			
			_currentQuality = _item.quality / 1;
		}
		
	}	
	var _bitmapItemPanelTxt = "WindowSWF/xmlPanel/BitmapItemPanel.txt";		
	FLfile.write(fl.configURI+_bitmapItemPanelTxt,"select="+SELES.length+"&quality="+_currentQuality);		
	var ui 		= DOC.xmlPanel(fl.configURI + "WindowSWF/xmlPanel/BitmapItemPanel.xml");		
	if (ui.dismiss == "cancle") {		
		return;		
	}
	
	//fl.trace(ui.dismiss + "" +  ITEMS.length);
	for (var i = 0; i < ITEMS.length; i++) {		
		var _item = ITEMS[i];
		//fl.trace(_item.itemType);
		if(_item.itemType == "bitmap") {
			_item.allowSmoothing = ui.smooth == "true" ? true : false;
			_item.quality = parseInt(ui.quality);
		}
	}
	tracer("smooth bitmap  " + "Smooth:" + ui.smooth + " Quality:" + ui.quality);		
	//FLfile.remove(fl.configURI+_bitmapItemPanelTxt);	
}

/*
function Ki()
{
	fl.componentsPanel.addItemToDocument( { x:20, y: -20 }, 'Progression Buttons', 'AnchorButton');	
}*/

function XD()
{
	fl.closeAll();
	tracer("還不能下班 XD()");
}