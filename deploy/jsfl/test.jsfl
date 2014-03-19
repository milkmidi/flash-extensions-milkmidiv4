var DOC   = fl.getDocumentDOM();
var LIB   = DOC.library;
var SELES = DOC.selection; /*Array*/
var ITEMS = LIB.items; /*Array*/
var NOTHING_SELECTED = "Error: Nothing selected.";
//XD();
/*
function XD(){
	fl.closeAll();
}*/


Sb();
function Sb() {
	fl.trace( ITEMS.length+" "+SELES.length );
	if (ITEMS.length == 0 ||SELES.length==0) {
		fl.trace( "Sb()" +" "+ NOTHING_SELECTED );
		return;				
	}
	if (SELES.length == 1) {		
		Fs();
	}	
	var _bitmapItemPanelTxt = "WindowSWF/xmlPanel/BitmapItemPanel.txt";
	//fl.trace(SELES.length);
	//var ui 		= DOC.xmlPanel(fl.configURI + "WindowSWF/xmlPanel/changeBaseClassSingle.xml");		
	FLfile.write(fl.configURI+_bitmapItemPanelTxt,"select="+SELES.length);		
	var ui 		= DOC.xmlPanel(fl.configURI + "WindowSWF/xmlPanel/test.xml");		
	if (ui.dismiss == "cancle") {		
		return;		
	}
	
	//fl.trace(ui.dismiss + "" +  ITEMS.length);
	for (var i = 0; i < ITEMS.length; i++) {		
		var _item = ITEMS[i];
		fl.trace(_item.itemType);
		if(_item.itemType == "bitmap") {
			_item.allowSmoothing = ui.smooth == "true" ? true : false;
			_item.quality = parseInt(ui.quality);
		}
	}
	fl.trace("Sb() "+ "Smooth:"+ui.smooth + " Quality:" + ui.quality);	
	//FLfile.remove(fl.configURI+_bitmapItemPanelTxt);	
}

/**
 *find symbol in library 
 */
function Fs() {			
	fl.trace("Fs()");
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
}