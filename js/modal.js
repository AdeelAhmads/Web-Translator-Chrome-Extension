window.onload = () => {
    chrome.storage.local.get('translated_text', function (result) {

        console.log(result);
        // document.querySelector('#loader').style.display = 'none';
        document.querySelector("#translated_text").innerText = result.translated_text.Result;
        document.querySelector("#from").innerText = result.translated_text.From;
        document.querySelector("#to").innerText = result.translated_text.To;

        document.getElementById("xclose").addEventListener("click", function () {
            window.parent.postMessage('close_pallet', "*")
        })

        window.addEventListener('click', function (e) {
            if (e.target.className == 'flex') {
                console.log('model id');
                window.parent.postMessage('close_pallet', "*")
            }
        })

    })
    window.addEventListener("message", (e) => {
        console.log('message recieved');
        console.log(e.data);
    })

}