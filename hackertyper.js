var isTyping = false;
var codePane;
var charPerStroke = 3;
var position;
var text;
function init(){
	document.getElementById("go-button").onclick=start;
	codePane = document.getElementById("code-pane");
}
function start(){
	document.getElementById("pref-form").style.display = "none";
	document.getElementById("code-form").style.display = "";
	charPerStroke=parseInt(document.getElementById("keystroke-chars").value);
	var fileToLoad = document.getElementById("select-text-input").value;
	var localFilesToLoad = document.getElementById("file-upload").files;
	if (localFilesToLoad.length > 0){
		loadCustomFile(localFilesToLoad[0]);
	}
	else{
		loadFile(fileToLoad);
	}
}
function loadFile(fileToLoad){
	var req = new XMLHttpRequest();
	req.open("GET", fileToLoad, false);
	req.send(null);
	text = req.responseText;
	ready();
}
function loadCustomFile(file){
	text = file.getAsText("");
	ready();
}
function ready(){
	isTyping=true;
	position = 0;
	codePane.textContent = "";
}
function keyHandler(e){
	if(!isTyping){
		return true;
	}
	position+=charPerStroke;
	if(position>text.length){
		position = text.length;
	}
	codePane.textContent = text.substr(0, position);
	window.scrollTo(0, document.body.scrollHeight);
	return false;
}
window.onload=init;
window.onkeydown=keyHandler;
