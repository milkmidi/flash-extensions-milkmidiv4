package milkmidi.v4 {		
	import com.greensock.TweenLite;
	import flash.display.*;	
	import flash.events.*;	
	import flash.geom.*;
	import flash.text.*;	
	public class Tooltip extends AbstractTooltip{				
		private var _target		:InteractiveObject;
		public function Tooltip()  {			
			super();
			alpha = 0;
		}		
		public function set target(pDisplay:InteractiveObject):void {			
			_target = pDisplay;
			if (_target == null) {
				_rollOutHandler(null);
				return;
			}
			_target.addEventListener(MouseEvent.ROLL_OUT , _rollOutHandler);
			TweenLite.to( this , .3, { alpha:1, delay:.2 } );			
			
			if(!this.hasEventListener(Event.ENTER_FRAME))
				addEventListener(Event.ENTER_FRAME , _enterFrameHandler);
		}		
		private function _enterFrameHandler(e:Event):void {			
			x = stage.mouseX +10;				
			y = stage.mouseY +20;	
			x = Math.min( stage.stageWidth - width , x);			
			y = Math.min( stage.stageHeight - height , y);			
		}
		
		private function _rollOutHandler(e:MouseEvent):void {	
			if(_target)
				_target.removeEventListener(MouseEvent.ROLL_OUT , _rollOutHandler);
			_target = null;
			removeEventListener(Event.ENTER_FRAME , _enterFrameHandler);
			TweenLite.to( this , .3, {alpha:0 } );
		}
	
	}	
}