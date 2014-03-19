package  milkmidi.v4 {		
	import com.greensock.TweenLite;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import flash.text.TextField;
	import flash.filters.*;
	import com.gskinner.geom.ColorMatrix;
	
	public class ItemMC extends Sprite{		
		public var label_txt	:TextField;
		public var bg_mc		:MovieClip;
		public var describeTW	:String;
		private var _describe		:String;		
		private var _colorMat:ColorMatrix = new ColorMatrix();
		private var _filters	:Array;
		public function ItemMC()  {			
			buttonMode = true;
			label_txt.mouseEnabled = false;
			addEventListener(MouseEvent.ROLL_OVER , _rollOverHandler);
			addEventListener(MouseEvent.ROLL_OUT , _rollOutHandler);			
			addEventListener(MouseEvent.CLICK , _rollOutHandler);	
			_colorMat.adjustColor( -97, 34, 94, 135);
			var coloMatrix0:ColorMatrixFilter = new ColorMatrixFilter(_colorMat);
			var dropShadow0:DropShadowFilter = new DropShadowFilter(2, 90, 0x00ffff, 1, 6, 6, 0.8, 3, false, false, false);
			_filters = [coloMatrix0, dropShadow0];
		}		
		
		private function _rollOverHandler(e:MouseEvent):void {
			TweenLite.to( bg_mc , .4 , { tint:0x656D12 } );
			//label_txt.filters = _filters;
			

		}
		
		private function _rollOutHandler(e:MouseEvent):void {
			TweenLite.to( bg_mc , .2 , { tint:null } );
			//label_txt.filters = null;
		}
		public function set label(pLabel:String):void {
			label_txt.text = pLabel;
		}
		
		public function get describe():String { return _describe; }		
		public function set describe(value:String):void {
			_describe = value;
		}
	}	
}