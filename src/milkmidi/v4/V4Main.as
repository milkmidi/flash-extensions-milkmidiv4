package  milkmidi.v4 {			
	import flash.display.MovieClip;
	import flash.display.Sprite;	
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.MouseEvent;
	import adobe.utils.*;	
	public class V4Main extends Sprite {	
		public var tooltiptw_mc		:TooltipTW;
		private var _container		:Sprite = new Sprite();
		private const LABEL_ARR		:Array =
		[			
			"Ro", "Cp", "Pp", "Na" , "Dl", "", 
			"Fs", "Hb", "La", ""   , "" ,"",				
			"Cl", "Tn", "" , "" , "" , "",
			"Sb", "XD"
		]
		private static const DESCRIBE_TW_ARR		:Array = [
			"去死吧小數點", "複製點選物的座標", "貼上剛剛點選物的座標", "多選物件同時命名", "重製目前所選的時間軸", "",
			"點元件,找到對映的元件庫", "建立只有感應區的按鈕", "選一個元件,幫他增加說明用表籤", "", "", "",
			"更改類別和基底類別", "吐所選物件的實體名稱", "", "", "", "",
			"平滑化所選的點陣圖","下班, 但還不能點 XD"
		];
		private static const DESCRIBE_EN_ARR		:Array =
		[
			"round x y" , "copy position" , "paste stored position", "name by position" , "duplicate layer" , "duplicate(library) " ,
			"find symbol in library" , "hitArea button" , "add label in selected symbol" , "" , "", "",
			"change base class" , "trace selected name", "" , "" , "" , "",
			"smooth bitmap(library)","XD"
		];
		
		private var _tooltip:Tooltip;
		private var _storedPosArr:Array = [0, 0];		
		public function V4Main()  {			
			stage.align = StageAlign.TOP_LEFT;
			stage.scaleMode = StageScaleMode.NO_SCALE;
			_container.x = 11;
			_container.y = 42;
			addChild(_container);		
			
			for (var i:int = 0; i < LABEL_ARR.length; i++) {
				var _label:String = LABEL_ARR[i];
				if (_label == "") {
					continue;
				}
				var _mc:ItemMC = new ItemMC();
				_mc.label = _label;
				_mc.addEventListener(MouseEvent.ROLL_OVER , _itemOverHandler);
				_mc.addEventListener(MouseEvent.ROLL_OUT , _itemOutHandler);
				_mc.addEventListener(MouseEvent.CLICK , _itemClickHandler);
				_mc.x = 32 * (i % 6);
				_mc.y = int(i / 6) * 35;
				_mc.name = _label;
				_mc.describe = DESCRIBE_EN_ARR[i];
				_mc.describeTW = DESCRIBE_TW_ARR[i]
				_container.addChild(_mc);
			}
			
			_tooltip = new Tooltip();			
			addChild(_tooltip);
		}		
		

		
		private function _itemClickHandler(e:MouseEvent):void {
			var _name	:String = e.currentTarget.name;
			var _excute	:String = _executeString( _name );
			if (_name == "Cp") {
				_storedPosArr = MMExecute(_excute).toString().split(",");					
			}else if(_name == "Pp"){
				_excute = _executeString( _name , _storedPosArr[0] , _storedPosArr[1] );
				MMExecute(_excute);	
			}else {
				MMExecute(_excute)
			}
			_tooltip.target = null;
		}
		private function _executeString(pFun:String , ...args):String {			
			var _params:String = "";
			if (args.length > 1 ) {						
				for (var i:int = 0; i < args.length; i++) {
					_params += ",\"" + args[i] + "\"";
				}				
			}
			var _excute:String = 'fl.runScript(fl.configURI+"WindowSWF/milkmidiJsfl.jsfl","' + pFun +'"' + _params + ')';		
			return _excute;
		}
		
		private function _itemOverHandler(e:MouseEvent):void {
			_tooltip.target = e.currentTarget as Sprite;
			_tooltip.text = e.currentTarget.describe;
			tooltiptw_mc.text = e.currentTarget.describeTW			
		}
		private function _itemOutHandler(e:MouseEvent):void {
			tooltiptw_mc.text = "";
		}
	}	
}