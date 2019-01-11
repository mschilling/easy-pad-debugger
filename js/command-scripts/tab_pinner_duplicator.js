'use strict';

chrome.commands.onCommand.addListener(function (command) {
    chrome.tabs.update({}, function (tab) {
        if (command === 'pinner') {
            chrome.tabs.update({pinned: !tab.pinned});
        } else if (command == 'duplicator') {
            chrome.tabs.duplicate(tab.id);
        }
    });
});
