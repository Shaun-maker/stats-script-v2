let modal = document.getElementsByClassName('nyroModal')[0];
var modalTextarea;

function pastStats(stats) {
    setTimeout(function() {
        modalTextarea.value = stats;
    }, 1000);
}

modal.click(); //open modal
window.setTimeout(function() { //wait open animation modal finish
    modalTextarea = document.querySelector("textarea[name=datas]");
}, 1000);

browser.runtime.onMessage.addListener(pastStats);
