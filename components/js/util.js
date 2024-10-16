import dlgFunc from './dialog.js'

//在后续的wps版本中，wps的所有枚举值都会通过wps.Enum对象来自动支持，现阶段先人工定义
var WPS_Enum = {
  msoCTPDockPositionLeft: 0,
  msoCTPDockPositionRight: 2
}

var MsoShapeType = {
  msoAutoShape: 1,
  msoShapeTypeWebView: 103,
}

function GetUrlPath() {
  // 在本地网页的情况下获取路径
  if (window.location.protocol === 'file:') {
    const path = window.location.href
    // 删除文件名以获取根路径
    return path.substring(0, path.lastIndexOf('/'))
  }

  // 在非本地网页的情况下获取根路径
  const { protocol, hostname, port } = window.location
  const portPart = port ? `:${port}` : ''
  console.log(`${protocol}//${hostname}${portPart}`)
  return `${protocol}//${hostname}${portPart}`
}

function FindWebViewUrl()
{
  let url = "";

  if (wpsType == "ppt") {
    const slidesCount = dlgFunc.getDoc().Slides.Count
    Array.from({ length: slidesCount }, (_, i) => {
      const slide = dlgFunc.getDoc().Slides.Item(i + 1)

      if (slide) {
        const shapesCount = slide.Shapes.Count
        Array.from({ length: shapesCount }, (_, j) => {
          const shape = slide.Shapes.Item(j + 1)

          if (shape.Name == "paracraft" && shape.Type == MsoShapeType.msoShapeTypeWebView) {
            url = shape.WebShape.Url
          }
        })
      }
    })
  } else {

  }

  return url
}

function GetKeepworkUsername()
{
  let username = "";

  if (wpsType == "ppt") {
    const url = FindWebViewUrl();
    // 创建URL对象
    const parsedUrl = new URL(url);
    const path = parsedUrl.pathname;
    const parts = path.split('/');

    // 获取username部分
    username = parts[1];
  } else if (wpsType == "word") {
    // TOOD: 获取当前文档的keepwork用户名
  }

  return username;
}

function GetKeepworkFilename()
{
  let filename = "";

  if (wpsType == "ppt") {
    const url = FindWebViewUrl()

    const parseUrl = new URL(url)
    const path = parseUrl.pathname

    const segments = path.split('/')
    const filenameWithExtension = segments[segments.length - 1]
    const encodeFilename = filenameWithExtension.split('.')[0]
    const decodeFilename = decodeURIComponent(encodeFilename)

    filename = decodeFilename
  } else if (wpsType == "word") {

  }

  return filename
}

function GetFilename()
{
  let filename = "";

  if (wpsType == "ppt") {
    filename = dlgFunc.getDoc().FullName
  } else if (wpsType == "word") {

  }

  return filename
}

export default {
  WPS_Enum,
  GetUrlPath,
  GetKeepworkUsername,
  GetKeepworkFilename,
  GetFilename,
}
