import Util from "./util"

function getDoc() {
  let doc

  if (wpsType == "ppt") {
    doc = wps.WppApplication().ActivePresentation
  } else if (wpsType == "word") {
    doc = wps.WpsApplication().ActiveDocument
  }

  return doc;
}

function AddWebview(worldUrl) {
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
    // let slide = doc.Slides.FindBySlideID(doc.Application.ActiveWindow.Selection.SlideRange.SlideID);
    let slide = wps.WppApplication().ActiveWindow.Selection.SlideRange

    if(!slide){
      // create a new slide if no slide is selected
      slide = doc.Slides.Add(1, 1)
    }

    // add text shape
    let shapeText = slide.Shapes.AddTextbox(1, 20, 10, 900, 32) // msoTextOrientationHorizontal = 1
    if (shapeText) {
      // remove the mod and modParams from the url in shape.
      let urlObj = new URL(worldUrl);
      if (urlObj.searchParams.has("mod")) {
        urlObj.searchParams.delete("mod");
      }
      if (urlObj.searchParams.has("modParams")) {
        urlObj.searchParams.delete("modParams");
      }

      let shapeWorldUrl = urlObj.toString();

      shapeText.Name = "UrlText"
      shapeText.TextFrame.TextRange.Text = decodeURIComponent(shapeWorldUrl)
      shapeText.TextFrame.TextRange.Font.Size = 12
      shapeText.TextFrame.TextRange.Font.Color.RGB = Util.RGB(128, 128, 128)
      shapeText.TextFrame.TextRange.ParagraphFormat.Alignment = 1

      shapeText.ActionSettings.Item(1).Action = 1
      shapeText.ActionSettings.Item(1).Hyperlink.Address = shapeWorldUrl
    }

    // add web view shape
    let shape = slide.Shapes.AddWebShape(worldUrl, 20, 42, 900, 495)
    shape.Name = "paracraft"

    if (isDev()) {
      let shapeText = slide.Shapes.AddTextbox(1, 20, 25, 900, 32) // msoTextOrientationHorizontal = 1
      if (shapeText) {
        shapeText.Name = "UrlTextDebug"
        shapeText.TextFrame.TextRange.Text = "debug: " + decodeURIComponent(worldUrl)
        shapeText.TextFrame.TextRange.Font.Size = 12
        shapeText.TextFrame.TextRange.Font.Color.RGB = Util.RGB(255, 0, 0)
        shapeText.TextFrame.TextRange.ParagraphFormat.Alignment = 1

        shapeText.ActionSettings.Item(1).Action = 1
        shapeText.ActionSettings.Item(1).Hyperlink.Address = worldUrl
      }
    }
  } else if (wpsType == "word") {
    const pageSetup = Application.ActiveDocument.PageSetup
    const left = pageSetup.LeftMargin
    const top = pageSetup.TopMargin
    const right = pageSetup.RightMargin
    const width = pageSetup.PageWidth - left - right

    // add text shape
    let shapeText = doc.Shapes.AddShape(1, pageSetup.LeftMargin, top, width, 32)
    if (shapeText) {
      shapeText.TextFrame.TextRange.Text = worldUrl;
      shapeText.TextFrame.TextRange.ParagraphFormat.Alignment = 1
    }

    // add web view shape
    doc.Shapes.AddWebShape(worldUrl, 0, 32, width, width * 0.56)
  }
}

function onClickCreateWebview(worldUrl)
{
  AddWebview(worldUrl)
  window.close()
}

function getModUrl(username, sectionName, modName)
{
  let docFilename = Util.GetKeepworkFilename();
  const localFilename = Util.GetFilename();

  if (!docFilename || docFilename == "") {
    docFilename = localFilename
  }

  let domain = "keepwork.com"

  if (isDev()) {
    domain = "keepwork-dev.kp-para.cn"
  }

  const url = `https://${domain}/${username}/edunotes/wps/${docFilename}` +
    `?layout=ppt` +
    `&mod=${modName}` +
    `#${sectionName}`;

  return url
}

function updateWebviews(username)
{
  let docFilename = Util.GetKeepworkFilename();
  const localFilename = Util.GetFilename();

  if (!docFilename || docFilename == "") {
    docFilename = localFilename
  }

  if (wpsType == "ppt") {
    const slidesCount = getDoc().Slides.Count
    const currentSlideIndex = wps.WppApplication().ActiveWindow.Selection.SlideRange.SlideIndex || 1;

    for (let i = 0; i < slidesCount; i++) {
      const slide = getDoc().Slides.Item(i + 1)

      if (slide) {
        const shapesCount = slide.Shapes.Count

        for (let j = 0; j < shapesCount; j++) {
          const shape = slide.Shapes.Item(j + 1)

          if (shape) {
            if (shape.Name === "paracraft" && shape.Type == Util.MsoShapeType.msoShapeTypeWebView) {
              const originUrl = shape.WebShape.Url
              let urlObj = new URL(originUrl)
              let path = urlObj.pathname
              let pathParts = path.split('/')

              if (pathParts[1] !== username || pathParts[4] !== encodeURIComponent(docFilename)) {
                pathParts[1] = username
                pathParts[4] = docFilename

                urlObj.pathname = pathParts.join('/')
                const newUrl = urlObj.toString()
                const webviewSize = { height: shape.Height, width: shape.Width, top: shape.Top, left: shape.Left }
                shape.Delete()
                let newShape = slide.Shapes.AddWebShape(newUrl, webviewSize.left, webviewSize.top, webviewSize.width, webviewSize.height)
                newShape.Name = "paracraft"
              }
            } else if (shape.Name === "UrlText") {
              const originUrl = shape.TextFrame.TextRange.Text
              let urlObj = new URL(originUrl)
              let path = urlObj.pathname
              let pathParts = path.split('/')

              if (pathParts[1] !== username || pathParts[4] !== encodeURIComponent(docFilename)) {
                pathParts[1] = username
                pathParts[4] = docFilename

                urlObj.pathname = pathParts.join('/')
                const newUrl = decodeURIComponent(urlObj.toString())
                shape.TextFrame.TextRange.Text = newUrl
              }
            }
          }
        }
      }
    }

    // Restore the originally selected slide, and in some cases jump to another slide.
    getDoc().Slides.Item(currentSlideIndex).Select()
  }
}

function removeCurrentPageWebview()
{
  if (wpsType === "ppt") {
    const slide = wps.WppApplication().ActiveWindow.Selection.SlideRange
    const shapesCount = slide.Shapes.Count
    const removeShapes = []

    for (let i = 0; i < shapesCount; i++) {
      const shape = slide.Shapes.Item(i + 1)
      if (shape.Name === "UrlText" || shape.Name === "paracraft") {
        removeShapes.push(shape)
      }
    }

    removeShapes.forEach(shape => {
      shape.Delete()
    })
  } else if (wpsType === "word") {

  }
}

export default{
  onClickCreateWebview,
  AddWebview,
  getDoc,
  getModUrl,
  updateWebviews,
  removeCurrentPageWebview,
}