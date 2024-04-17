window.ParaDebug = (data) => {
  const debugMsg = wps.PluginStorage.getItem("debug") || [];
  let isFinished = false;

  // remove the outputed data
  while (!isFinished) {
    if (debugMsg.length === 0) {
      isFinished = true;
    }

    for (let i = 0; i < debugMsg.length; i++) {
      if (debugMsg[i].output === true) {
        debugMsg.splice(i, 1);
        break;
      }

      if (i === debugMsg.length - 1) {
        isFinished = true;
      }
    }
  }

  debugMsg.push({ data: data, output: false });
  wps.PluginStorage.setItem("debug", debugMsg);
}

const error = window.console.error

window.console.error = () => {
  error.apply(window.console, arguments)
  ParaDebug(arguments[0])
}

setInterval(() => {
  const debugMsg = wps.PluginStorage.getItem("debug");

  if (debugMsg) {
    for (let i = 0; i < debugMsg.length; i++) {
      if (debugMsg[i].output === false) {
        console.log(debugMsg[i].data);
        debugMsg[i].output = true;
      }
    }

    wps.PluginStorage.setItem("debug", debugMsg);
  }
}, 200);