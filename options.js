// Saves options to localStorage.
function save_options() {
  var $localeUrl = document.getElementById("localeUrl");
  var localeUrl = $localeUrl.value;
  localStorage["locale_url"] = localeUrl;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var localeUrl = localStorage["locale_url"];
  if (!localeUrl) {
    return;
  }
  var $localeUrl = document.getElementById("localeUrl");
  $localeUrl.value(localeUrl);
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);