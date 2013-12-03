//very basic implementation of an ajax method.
//if we need a fully fleshed out ajax API, we can use a third-party or spend time to write a more
//in depth library
function ajaxRequest(method, fileURL, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, fileURL, true);
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                success(xhr.responseText);
            } else {
                console.error(xhr.statusText);
                error(xhr.statusText);
            }
        }
    };

    xhr.onerror = function(e){
        console.error(xhr.statusText);
        error(xhr.statusText);
    };

    xhr.send(null);
}