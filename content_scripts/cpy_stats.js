let allTable = document.getElementsByTagName('table');

let statsTable = allTable[1];
let innerText = statsTable.innerText;

let lines = innerText.split('\n');
lines.splice(0,4);

let newText = lines.join('\n');
newText = newText.trimEnd();

var sendStats = browser.runtime.sendMessage(newText);