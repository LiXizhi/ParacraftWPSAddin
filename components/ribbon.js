import Util from './js/util.js'
import dlgFunc from './js/dialog.js'
import "./js/debug.js"

//这个函数在整个wps加载项中是第一个执行的
function OnAddinLoad(ribbonUI){
    if (typeof (wps.ribbonUI) != "object"){
		wps.ribbonUI = ribbonUI
    }
    if (typeof (wps.Enum) != "object") { // 如果没有内置枚举值
        wps.Enum = Util.WPS_Enum
    }
    return true
}

function OnAction(control) {
    const eleId = control.Id
    switch (eleId) {
        case "paracraft.addWorld":
            wps.ShowDialog(Util.GetUrlPath() + "/dialog", "创建Paracraft", 500 * window.devicePixelRatio, 210 * window.devicePixelRatio, true)
            break
        case "paracraft.addWebview":
            wps.ShowDialog(Util.GetUrlPath() + "/dialog", "创建webviewer", 500 * window.devicePixelRatio, 210 * window.devicePixelRatio, true)
            break
        case "paracraft.openParacraft":
            dlgFunc.AddWebview("https://webparacraft.keepwork.com/")
            break
        case "demo.btnShowTaskPane":
            {
                let tsId = wps.PluginStorage.getItem("taskpane_id")
                if (!tsId) {
                    let tskpane = wps.CreateTaskPane(Util.GetUrlPath() + "taskpane")
                    let id = tskpane.ID
                    wps.PluginStorage.setItem("taskpane_id", id)
                    tskpane.Visible = true
                } else {
                    let tskpane = wps.GetTaskPane(tsId)
                    tskpane.Visible = !tskpane.Visible
                }
            }
            break
        case "compudoc.btnCodeBlock":
            {
                wps.ShowDialog(
                  Util.GetUrlPath() + "/addkeepworkmod?mod=codeblock",
                  "CodeBlock",
                  500 * window.devicePixelRatio,
                  300 * window.devicePixelRatio,
                  true
                );
            }
            break;
        case "compudoc.btnGeobraMath":
            {
                wps.ShowDialog(
                  Util.GetUrlPath() + "/addkeepworkmod?mod=geobramath",
                  "GeobraMath",
                  500 * window.devicePixelRatio,
                  300 * window.devicePixelRatio,
                  true
                );
            }
            break;
        case "compudoc.btnParacraft":
            {
                wps.ShowDialog(
                  Util.GetUrlPath() + "/addkeepworkmod?mod=paracraft",
                  "Paracraft",
                  500 * window.devicePixelRatio,
                  300 * window.devicePixelRatio,
                  true
                );
            }
            break;
        case "compudoc.btnCAD":
            {
                wps.ShowDialog(
                  Util.GetUrlPath() + "/addkeepworkmod?mod=cad",
                  "CAD",
                  500 * window.devicePixelRatio,
                  300 * window.devicePixelRatio,
                  true
                );
            }
            break;
        case "compudoc.btnAIChat":
            {
                wps.ShowDialog(
                  Util.GetUrlPath() + "/addkeepworkmod?mod=aichat",
                  "AIChat",
                  500 * window.devicePixelRatio,
                  300 * window.devicePixelRatio,
                  true
                );
            }
            break;
        case "compudoc.btnEvaluation":
            {
                wps.ShowDialog(
                  Util.GetUrlPath() + "/addkeepworkmod?mod=evaluation",
                  "Evaluation",
                  500 * window.devicePixelRatio,
                  300 * window.devicePixelRatio,
                  true
                );
            }
            break;
        default:
            break
    }
    return true
}

function GetImage(control) {
    const eleId = control.Id
    switch (eleId) {
        case "paracraft.addWebview":
            return "images/addWebview.svg"
        case "paracraft.addWorld":
            return "images/addWorld.svg"
        case "paracraft.openParacraft":
            return "images/learn.svg"
        default:
            return "images/1.svg"
    }
    return "images/addWorld.svg"
}

//这些函数是给wps客户端调用的
export default {
    OnAddinLoad,
    OnAction,
    GetImage,
};