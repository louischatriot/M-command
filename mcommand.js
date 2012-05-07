var mcommandplugin = mcommandplugin || {};
mcommandplugin.i;
mcommandplugin.currentTop = {};
for (mcommandplugin.i = 65; mcommandplugin.i <= 90; mcommandplugin.i += 1) { mcommandplugin.currentTop[mcommandplugin.i] = null; }

mcommandplugin.setCommandPressed = false;
mcommandplugin.getCommandPressed = false;
mcommandplugin.setCommandKey = 77;   // Use 'm' as the command key, as in vim. May need to change since Github uses it, too ...
mcommandplugin.getCommandKey = 222;


$(document).ready(function() {
  mcommandplugin.$body = $('body');

  $(document).bind('keydown', function(e) {
    if (mcommandplugin.setCommandPressed) {
      if ((e.keyCode >= 65) && (e.keyCode <= 90)) {
        mcommandplugin.currentTop[e.keyCode] = mcommandplugin.$body.scrollTop();
      } else {
        mcommandplugin.setCommandPressed = false;
        mcommandplugin.getCommandPressed = false;
      }
    } else if (mcommandplugin.getCommandPressed) {
      if ((e.keyCode >= 65) && (e.keyCode <= 90)) {
        if (mcommandplugin.currentTop[e.keyCode] !== null) {
          mcommandplugin.$body.scrollTop(mcommandplugin.currentTop[e.keyCode]);
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


