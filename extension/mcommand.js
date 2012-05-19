/*
 * "M command" bookmarklet, gives you the same functionality as the vim 'm' command but on a webpage
 * May conflict with websites using keys, such as Github, but you can customize the bindings so that it works with your
 * favourite websites
 * Author: Louis Chatriot
 */



console.log("EWEWRWERW");


var mcommandplugin = mcommandplugin || {};
mcommandplugin.i;
mcommandplugin.currentTop = {};
for (mcommandplugin.i = 65; mcommandplugin.i <= 90; mcommandplugin.i += 1) { mcommandplugin.currentTop[mcommandplugin.i] = null; }

mcommandplugin.setCommandPressed = false;
mcommandplugin.getCommandPressed = false;
mcommandplugin.setCommandKey = 77;   // Use 'm' as the command key, as in vim. May need to change since Github uses it, too ...
mcommandplugin.getCommandKey = 222;


//console.log(chrome.windows.onFocusChanged.addListener);
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log("Focus changed for tab " + tabId);
  console.log(changeInfo);
  console.log(tab);
});



mcommandplugin.run = function($) {

  var resetPressedState = function() { mcommandplugin.setCommandPressed = false; mcommandplugin.getCommandPressed = false; };

  mcommandplugin.$body = $('body');
  mcommandplugin.$inputs = $('input');

  //console.log(chrome.windows.WINDOW_ID_CURRENT);

  $(document).bind('keydown', function(e) {

    console.log("Key pressed");


    if (mcommandplugin.$inputs.is(':focus')) {
      resetPressedState();   // Do nothing if user is typing into an input box
      return;
    }

    if (mcommandplugin.setCommandPressed) {
      if ((e.keyCode >= 65) && (e.keyCode <= 90)) {
        mcommandplugin.currentTop[e.keyCode] = mcommandplugin.$body.scrollTop();
      }

      resetPressedState();
    } else if (mcommandplugin.getCommandPressed) {
      if ((e.keyCode >= 65) && (e.keyCode <= 90)) {
        if (mcommandplugin.currentTop[e.keyCode] !== null) {
          mcommandplugin.$body.scrollTop(mcommandplugin.currentTop[e.keyCode]);
        }
      }

      resetPressedState();
    } else {
      if (e.keyCode === mcommandplugin.setCommandKey) {
        mcommandplugin.setCommandPressed = true;
      } else if (e.keyCode === mcommandplugin.getCommandKey) {
        mcommandplugin.getCommandPressed = true;
      } else {
        resetPressedState();
      }
    }
  });

};



// Launch the bookmarklet
(function (app) {
  console.log("M command plugin launched");

  //Get jQuery if the current page doesn't have it
  if ( typeof jQuery === 'undefined' || jQuery.fn.jquery.substring(0,3) !== '1.7') {

    var fileref = document.createElement('script');
    fileref.src = "jquery-1.7.2.min.js";

    fileref.onload = function() {
      app.run(jQuery);
    }


    document.body.appendChild(fileref);
  } else {
    app.run(jQuery);
  }
}(mcommandplugin));


