/*
 * "M command" bookmarklet, gives you the same functionality as the vim 'm' command but on a webpage
 * May conflict with websites using keys, such as Github, but you can customize the bindings so that it works with your
 * favourite websites
 * Author: Louis Chatriot
 */


var mcommandplugin = mcommandplugin || {};
mcommandplugin.i;
mcommandplugin.currentTop = {};
for (mcommandplugin.i = 65; mcommandplugin.i <= 90; mcommandplugin.i += 1) { mcommandplugin.currentTop[mcommandplugin.i] = null; }

mcommandplugin.setCommandPressed = false;
mcommandplugin.getCommandPressed = false;
mcommandplugin.setCommandKey = 77;   // Use 'm' as the command key, as in vim. May need to change since Github uses it, too ...
mcommandplugin.getCommandKey = 222;


mcommandplugin.run = function($) {

  $(document).ready(function() {

    mcommandplugin.$body = $('body');

    $(document).bind('keydown', function(e) {
      if (mcommandplugin.setCommandPressed) {
        if ((e.keyCode >= 65) && (e.keyCode <= 90)) {
          mcommandplugin.currentTop[e.keyCode] = mcommandplugin.$body.scrollTop();
          mcommandplugin.setCommandPressed = false;
          mcommandplugin.getCommandPressed = false;
        } else {
          mcommandplugin.setCommandPressed = false;
          mcommandplugin.getCommandPressed = false;
        }
      } else if (mcommandplugin.getCommandPressed) {
        if ((e.keyCode >= 65) && (e.keyCode <= 90)) {
          if (mcommandplugin.currentTop[e.keyCode] !== null) {
            mcommandplugin.$body.scrollTop(mcommandplugin.currentTop[e.keyCode]);
            mcommandplugin.setCommandPressed = false;
            mcommandplugin.getCommandPressed = false;
          }
        } else {
          mcommandplugin.setCommandPressed = false;
          mcommandplugin.getCommandPressed = false;
        }
      } else {
        if (e.keyCode === mcommandplugin.setCommandKey) {
          mcommandplugin.setCommandPressed = true;
        } else if (e.keyCode === mcommandplugin.getCommandKey) {
          mcommandplugin.getCommandPressed = true;
        } else {
          mcommandplugin.setCommandPressed = false;
          mcommandplugin.getCommandPressed = false;
        }
      }
    });
  });

};



// Launch the bookmarklet
(function (app) {
  //Get jQuery if the current page doesn't have it
  if( typeof jQuery === 'undefined' || jQuery.fn.jquery.substring(0,3) !== '1.7') {

    var fileref = document.createElement('script');
    fileref.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"

    document.body.appendChild(fileref);
  }


  console.log(mcommandplugin);

  app.run(jQuery);
}(mcommandplugin));


