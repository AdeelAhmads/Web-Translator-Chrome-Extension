

chrome.runtime.onInstalled.addListener(() => {
  // console.log(chrome.runtime.getURL('Modal/index.html'));

  console.log("hello");
  chrome.storage.local.set({ "translate": ['en-GB', 'ur-PK', 'English', 'Urdu'] });
  chrome.storage.local.set({ "alert_text": "checked" });
  chrome.storage.local.set({ "replace_text": "unchecked" });
  chrome.contextMenus.create({
    id: "Text translator",
    title: 'Translate for: "%s" =',
    contexts: ["selection"],
    "documentUrlPatterns": ["https://*/*", "http://*/*"]
  });

  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //   chrome.tabs.update(tabs[0].id, { url:'textPallet.html' });
  // });

});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  var expression = info.selectionText;
  let text = expression;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    try {
      chrome.tabs.sendMessage(tabs[0].id, { Message: "text", expression: text });
    }
    catch (error) {
      console.log(error);
    }
  });

});
let url = chrome.runtime.getURL("textPallet.html");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  sendResponse(url);
});


chrome.action.onClicked.addListener((tab) => {
  console.log('clicked icon');
});

