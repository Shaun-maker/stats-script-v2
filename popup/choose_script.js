var all_stats = "";
var url = "";
var numberOfExec = 0;
let cpyStats = "/content_scripts/cpy_stats.js";
let rogersStats = "/content_scripts/rogers_stats.js";

/* navigator.clipboard.writeText(stats); */

function getStats(stats) {
    all_stats += stats;
}

function incrementUrl(url) {
    let index = url.length;
    let array_url = url.split('');
    index -= 6;
    let month = array_url[index];
    month++;
    array_url[index] = month;
    url = array_url.join('');
    return url;
}

async function updatePage(url) {
    let newUrl = incrementUrl(url);
    await browser.tabs.update({url: newUrl});
}

//TODO : rename function to getPage, and make it work small function by small function
async function getPage() {
    await browser.tabs.query({currentWindow: true, active: true})
    .then(function(tabs) {
        let currentUrl = tabs[0].url;
        url = currentUrl;
        return url;
    })
    .catch(function(err) {
        console.log("Une erreur s'est produite sur la récupération de l'url de la page active");
        console.log(err);
    })
}

async function injectScript(fileUrl) {
    await browser.tabs.executeScript({file: fileUrl});   
}

browser.runtime.onMessage.addListener(getStats);

//to go to this url after copy stats
let rogersStatsUrl = browser.tabs.query({
    url: "https://www.processx.net/rogers/index.php?p=statistiques*",
});

document.addEventListener('click', function(event) {
    if (event.target.id == 'script-1') {
        injectScript(cpyStats);
        getPage()
        .then(function() {
            updatePage(url);
        })
        .then(function() {
            browser.tabs.onUpdated.addListener(function(tabId, changeInfo) {
                if (changeInfo.status == "complete") {
                    numberOfExec++;
                    if (numberOfExec < 5) {
                        injectScript(cpyStats);
                        getPage()
                        .then(function() {
                            updatePage(url);
                        });
                    }
                    else {
                        all_stats = all_stats.trimStart();
                        navigator.clipboard.writeText(all_stats);

                        rogersStatsUrl.then(function(value) {
                            let index = value[0].index;
                            let tabId = value[0].id;
                            browser.tabs.highlight({
                                tabs: [index],
                            })
                            .then(function(){
                                injectScript(rogersStats)
                                .then(function() {
                                    browser.tabs.sendMessage(tabId, all_stats); // error
                                })
                            });
                        });
                        browser.tabs.onUpdated.removeListener();
                    }
                };
            });
        })
        .catch(function(err) {
            console.log("Une erreur s'est produite sur l'execution principale de code.");
            console.log(err);
        });
    }
});
