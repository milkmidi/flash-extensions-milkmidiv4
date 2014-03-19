/**
 * @author milkmidi
 * @see http://milkmidi.blogspot
 * @version 1.0.1
 * @date created 2010/04/14/
 */
package milkmidi.v4 {		
	import flash.display.*;	
	import flash.text.*;		
	public class AbstractTooltip extends Sprite{	
	
		public var label_txt    :TextField;
		public var bg_mc        :MovieClip;			
		public function AbstractTooltip()  {			
			label_txt.autoSize = TextFieldAutoSize.LEFT;
			mouseEnabled = false;
			mouseChildren = false;			
		}		
		public function get text():String { return label_txt.text; }
		public function set text(pText:String):void {
			label_txt.text = pText;
			bg_mc.width = label_txt.textWidth + 5;
		}
		
		
	}	
}