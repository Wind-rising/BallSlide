
function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
    __.prototype = b.prototype;
    d.prototype = new __();
};
window.generateEUI = {};
generateEUI.paths = {};
generateEUI.styles = undefined;
generateEUI.skins = {"eui.TextInput":"resource/eui_skins/TextInputSkin.exml"}
generateEUI.paths['resource/eui_skins/skin_BallSlideGame.exml'] = window.skin_BallSlideGame = (function (_super) {
	__extends(skin_BallSlideGame, _super);
	function skin_BallSlideGame() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = skin_BallSlideGame.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 1136;
		t.horizontalCenter = 0;
		t.source = "Background_png";
		t.verticalCenter = 0;
		t.width = 640;
		return t;
	};
	return skin_BallSlideGame;
})(eui.Skin);