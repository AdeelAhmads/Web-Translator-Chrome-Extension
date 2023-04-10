// 
const removeIframe = () => {
  console.log('remove iframe');
  var iframes = document.querySelectorAll('iframe');
  for (var i = 0; i < iframes.length; i++) {
    let id = iframes[i].id
    if (id == 'pallet') {
      iframes[i].parentNode.removeChild(iframes[i]);
    }
  }
}
const createPallet = () => {
  var div = document.createElement("div");
  let url = chrome.runtime.getURL('Modal/modal.html');
  div.innerHTML = `<iframe src='${url}' id="pallet" frameborder="1" width="500"></iframe>`;
  document.body.appendChild(div);
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.storage.local.get('translate', function (result) {
    let translateFrom = result.translate[0];
    let translateTo = result.translate[1];
    let text = request.expression;
    console.log(translateFrom, translateTo);
    createPallet()
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
      if (result.alert_text == 'checked') {
        let sendData = {
          From: countries[translateFrom],
          To: countries[translateTo],
          Result: data.responseData.translatedText
        }
        var frame = document.getElementById("pallet");
        frame = frame ? frame.contentWindow : null;
        console.log(data.responseData.translatedText);
        frame.postMessage(sendData, "*");

        // alert(data.responseData.translatedText);
      }
    })
    chrome.storage.local.get('replace_text', function (result) {
      if (result.replace_text == 'checked') {

        replaceSelectedText(data.responseData.translatedText)
      }
    })
  })

  function replaceSelectedText(replacementText) {

    let result = replacementText.includes("&quot;");
    if (result) {
      replacementText = replacementText.replace(/&quot;/g, "\"");
    }
    var sel, range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(replacementText));
      }
    } else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      range.text = replacementText;
      console.log(range.text);
    }


  }
});

window.addEventListener("message", function (evt) {
  if (evt.data == "close_pallet") {
    removeIframe()
  }
});