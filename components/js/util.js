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

  const baseTag = document.querySelector('base');
  if (baseTag) {
    let href = baseTag.href
    if (href.endsWith('/')) {
      href = href.slice(0, -1)
    }
    return href
  }

  return `${protocol}//${hostname}${portPart}`
}

function FindWebViewUrl()
{
  let url = "";

  if (wpsType == "ppt") {
    const slidesCount = dlgFunc.getDoc().Slides.Count
    Array.from({ length: slidesCount }, (_, i) => {
      if (url && url != "") {
        return
      }

      const slide = dlgFunc.getDoc().Slides.Item(i + 1)

      if (slide) {
        const shapesCount = slide.Shapes.Count
        Array.from({ length: shapesCount }, (_, j) => {
          const shape = slide.Shapes.Item(j + 1)

          if (shape.Name == "paracraft" && shape.Type == MsoShapeType.msoShapeTypeWebView) {
            url = shape.WebShape.Url
            return
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
  let username = ""

  if (wpsType == "ppt") {
    const url = FindWebViewUrl()

    if (!url) {
      return username
    }

    // 创建URL对象
    const parsedUrl = new URL(url)
    const path = parsedUrl.pathname
    const parts = path.split('/')

    // 获取username部分
    username = parts[1]
  } else if (wpsType == "word") {
    // TOOD: 获取当前文档的keepwork用户名
  }

  return username
}

function GetKeepworkFilename()
{
  let filename = ""

  if (wpsType == "ppt") {
    const url = FindWebViewUrl()

    if (!url) {
      return filename
    }

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
    filename = dlgFunc.getDoc().Name.replace(/\.pptx$/, '');
  } else if (wpsType == "word") {

  }

  return filename
}

let isDev = null;
window.isDev = function () {
  if (isDev !== null) {
    return isDev;
  }

  const ele = document.querySelector('#dev')
  if (ele) {
    isDev = true
  } else {
    isDev = false
  }

  return isDev
}

function checkDocumentSaved() {
  if (wpsType === "ppt") {
    if (/\.pptx?$/.test(dlgFunc.getDoc().FullName)) {
      return true
    } else {
      return false
    }
  } else if (wpsType === "word") {
    if (/\.docx?$/.test(dlgFunc.getDoc().FullName)) {
      return true
    } else {
      return false
    }
  }
}

function RGB(r, g, b) {
  return (r & 0xff) | ((g & 0xff) << 8) | ((b & 0xff) << 16);
}

function getCurrentFormattedTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}_${hours}:${minutes}:${seconds}`;
}

export default {
  WPS_Enum,
  MsoShapeType,
  GetUrlPath,
  GetKeepworkUsername,
  GetKeepworkFilename,
  GetFilename,
  checkDocumentSaved,
  RGB,
  getCurrentFormattedTime,
}
