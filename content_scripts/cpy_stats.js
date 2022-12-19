var allTable = document.getElementsByTagName('table');

var statsTable = allTable[1];
var innerText = statsTable.innerText;

var lines = innerText.split('\n');
lines.splice(0,4);

var newText = lines.join('\n');
newText = newText.trimEnd();

var sendStats = browser.runtime.sendMessage(newText);