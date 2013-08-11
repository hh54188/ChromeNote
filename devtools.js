chrome.devtools.panels.create(
    "TheNameOfYourExtension", 
    "icons/16x16.png", 
    "devtools/index.html",
    function() {
        console.log("This is a test page");
    }
);