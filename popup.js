(function(){
    //TODO: Need to create an ajax call to get all available languages
    var langs = [
            "default",
            "en-us",
            "fr-fr"
        ];

    //parse file path and select language type
    function selectLocallyStoredLanguage(langCode){
        document.getElementById('languages').value = langCode;
    }

    function selectLocallyStoredFilebase(filebase){
        document.getElementById('fileBase').value = filebase;
    }

    //method to build out select box of languages to choose from
    //defaults to default
    function displayLanguages(langs) {
        if(langs instanceof Array){
            langs.forEach(function (lang){
                if(lang !== 'default'){
                    var selectLanguages = document.getElementById('languages'),
                        option = document.createElement('option');

                    option.value = lang;
                    option.text = lang;
                    selectLanguages.appendChild(option);
                }
            });
        } else {
            console.error('must be an array of languages to build out list');
        }

    }

    //page load
    //display all languages
    displayLanguages(langs);

    //set default language to current language
    if(localStorage.locale_url){
        selectLocallyStoredLanguage(localStorage.locale_url);
    }

    if(localStorage.file_base_url){
        selectLocallyStoredFilebase(localStorage.file_base_url);
    }


    //events
    document.getElementById('formLanguage').onsubmit = function(ev){
        ev.preventDefault();
        var selectedLanguage = document.getElementById('languages').value;

        //set browsers local storage to language
        localStorage.locale_url = selectedLanguage;

        //refresh page after changing language
        chrome.tabs.getSelected(null, function(tab) {
            window.close();
            chrome.tabs.reload(tab.id);
        });
    };

    document.getElementById('fileOptions').onsubmit = function(ev){
        ev.preventDefault();
        var fileBaseURL = document.getElementById('fileBase').value;

        //set browsers local storage to language
        localStorage.file_base_url = fileBaseURL;

        //refresh page after changing language
        chrome.tabs.getSelected(null, function(tab) {
            window.close();
            chrome.tabs.reload(tab.id);
        });
    };
})();