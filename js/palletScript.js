
const countries = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "ur-PK": "Urdu",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "zh-HANS":'Chinese',
    "pa-IN":"Punjabi",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
}
let exchageIcon = document.querySelector(".exchange");
let selectTag = document.querySelectorAll("select");
let select1 = document.querySelector("#select1");
let select2 = document.querySelector("#select2");

chrome.storage.local.get('alert_text', function(result){
    if(result.alert_text=='checked'){
        document.getElementById("alert_text").checked= true;
    }
    else{
        document.getElementById("alert_text").checked= false;
    }
})
chrome.storage.local.get('replace_text', function(result){
    if(result.replace_text=='checked'){
        document.getElementById("replace_text").checked= true;
    }
    else{
        document.getElementById("replace_text").checked= false;
    }
})

selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? country_code ==  'en-GB' ? "selected" : "" : country_code == 'ur-PK' ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});
exchageIcon.addEventListener("click", () => {
    tempLang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
    let translateFrom = selectTag[0].value;
    let translateTo = selectTag[1].value;
    let from=selectTag[0].options[selectTag[0].selectedIndex].text
    let to=selectTag[1].options[selectTag[1].selectedIndex].text
    chrome.storage.local.set({ "translate":[translateFrom,translateTo,from,to]});
    
});
document.getElementById('select1').addEventListener('change', function(){
    let translateFrom = selectTag[0].value;
    let translateTo = selectTag[1].value;
    let from=selectTag[0].options[selectTag[0].selectedIndex].text
    let to=selectTag[1].options[selectTag[1].selectedIndex].text
    chrome.storage.local.set({ "translate":[translateFrom,translateTo,from,to]});
})
document.getElementById('select2').addEventListener('change', function(){
    let translateFrom = selectTag[0].value;
    let translateTo = selectTag[1].value;
    let from=selectTag[0].options[selectTag[0].selectedIndex].text
    let to=selectTag[1].options[selectTag[1].selectedIndex].text
    chrome.storage.local.set({ "translate":[translateFrom,translateTo,from,to]});
})


   let objectLength = Object.keys(countries).length
    for (let index = 0; index < objectLength; index++) {
        try{
            select1.removeChild(select1.firstElementChild);
            select2.removeChild(select2.firstElementChild); 
        }
        catch(e){
            console.log(e)
        }    
    }
    chrome.storage.local.get('translate', function(result){
        let translateFrom=result.translate[0];
        let translateTo=result.translate[1];
        let From=result.translate[2];
        let To=result.translate[3];
        selectTag.forEach((tag, id) => {
        for (let country_code in countries) {
            let selected = id == 0 ? country_code == translateFrom ? "selected" : "" : country_code == translateTo ? "selected" : "";
            let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
            tag.insertAdjacentHTML("beforeend", option);
        }
        });
})
        
document.getElementById('replace_text').addEventListener('onchange',function(value){
    console.log(value);
    console.log('yes');
})

$("#replace_text").change(function() {  
    if($(this).is(":checked")) {
       var selectedval = $(this).val();
       var selectedtext = $(this).next().text();
       console.log('replace checked text');
       chrome.storage.local.set({ "replace_text":"checked" });
    }
     else {
        const cb = document.querySelector('#alert_text');
        if(!cb.checked){
            document.getElementById("alert_text").checked= true;
            chrome.storage.local.set({ "alert_text":"checked" });
        }
        else{
            chrome.storage.local.set({ "replace_text":"unchecked" });
            console.log('replace no checked');
        }
    
    }
});

$("#alert_text").change(function() {  
    if($(this).is(":checked")) {
       chrome.storage.local.set({ "alert_text":"checked" });
    }
     else {
        const cb = document.querySelector('#replace_text');
        if(!cb.checked){
            document.getElementById("alert_text").checked= true;
            chrome.storage.local.set({ "alert_text":"checked" });
        }
        else{
            chrome.storage.local.set({ "alert_text":"unchecked" });
        }
        
    }
});
 



