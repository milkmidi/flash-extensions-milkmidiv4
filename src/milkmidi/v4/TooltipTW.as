/**
 * @author milkmidi
 * @see http://milkmidi.blogspot
 * @version 1.0.1
 * @date created 2010/04/14/
 */
package milkmidi.v4 {		
	import flash.text.TextFieldAutoSize;
	
	public class TooltipTW extends AbstractTooltip{		
		
		public function TooltipTW()  {			
			
			text = "";
			visible = false;
		}		
		override public function get text():String { return super.text; }		
		override public function set text(value:String):void {
			label_txt.text = value || "";
			visible = text =="" ? false : true;
		}
		
		
	}	
}