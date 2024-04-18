// import Util from "./util.js"

function AddWebview(worldUrl) {
    ParaDebug("AddWebview: " + worldUrl)
    let doc
    
    if (wpsType == "ppt") {
        doc = wps.WppApplication().ActivePresentation
    } else if (wpsType == "word") {
        doc = wps.WpsApplication().ActiveDocument
    }

    if (!doc) {
        alert("当前没有打开任何文档")
        return
    }

    if (!worldUrl || worldUrl.length === 0) {
        worldUrl = "https://webparacraft.keepwork.com/"
    } else if (!worldUrl.startsWith("http")) {
        worldUrl = "https://webparacraft.keepwork.com/?pid=" + worldUrl
    }

    if (wpsType == "ppt") {
        // get the current selected slide
        let slide = doc.Slides.FindBySlideID(doc.Application.ActiveWindow.Selection.SlideRange.SlideID);
        if(!slide){
            // create a new slide if no slide is selected
            slide = doc.Slides.Add(1, 1)
        }

        // add text shape
        let shapeText = slide.Shapes.AddShape(1, 20, 10, 600, 32) // msoShapeRectangle = 1
        if (shapeText){
            shapeText.TextFrame.TextRange.Text = worldUrl;
            shapeText.TextFrame.TextRange.ParagraphFormat.Alignment = 1
        }

        // add web view shape
        let shape = slide.Shapes.AddWebShape(worldUrl, 20, 42, 900, 500)
        shape.Name = "paracraft"
    } else if (wpsType == "word") {
        const pageSetup = Application.ActiveDocument.PageSetup
        const left = pageSetup.LeftMargin
        const top = pageSetup.TopMargin
        const right = pageSetup.RightMargin
        const width = pageSetup.PageWidth - left - right

        // add text shape
        let shapeText = doc.Shapes.AddShape(1, pageSetup.LeftMargin, top, width, 32)
        if (shapeText){
            shapeText.TextFrame.TextRange.Text = worldUrl;
            shapeText.TextFrame.TextRange.ParagraphFormat.Alignment = 1
        }

        // add web view shape
        doc.Shapes.AddWebShape(worldUrl, 0, 32, width, width * 0.56)
    }
}

function onClickCreateWebview(worldUrl)
{
    AddWebview(worldUrl);

    // TODO: how to close the dialog after adding the webview? 
    // wps.DialogUtil.CloseDialog()
}

export default{
    onClickCreateWebview,
    AddWebview
}