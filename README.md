# Paracraft WPS addin

## Project setup & debug
```
npm install
wpsjs debug
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## publish模式

run
```
wpsjs publish
```
use https://wps.keepwork.com/ as publish base url. 

### 1.1 模式介绍
publish模式是通过wpsjs工具包的wpsjs publish命令打包，将生成的文件夹下的所有文件部署到打包时填写服务器地址去。告知用户publish.html地址，业务系统开发商可将publish.html的功能按需整合到自己的页面中，便于做基础环境监测。也可以复用此页面给到用户，用户可自己控制启用和禁用哪些加载项。

### 1.2 部署
- 使用wpsjs包的wpsjs publish命令进行打包
- 将目录wps-addon-build下的文件署到服务器
- 将wps-addon-publish下的publish.html文件部署到服务器上，一般与加载项分开部署。
- 告知用户publish.html文件地址。
### wpsjs工具包使用
### 1.3 加载项加载流程
- 用户在浏览器中打开publish.html文件
- 校验加载项是否正常
- 在线模式：去请求地址+/ribbon.xml和 地址+/index.html
- 离线模式：校验改地址是否能够访问到压缩包
- 点击安装或卸载的加载项

- 本地自动生成publish.xml文件
    -  window：%appdata%/kingsoft/wps/jsaddons
    - linux: ~/.local/share/Kingsoft/wps/jsaddons
- 启动WPS
- 读取本地publish.xml文件
- 加载对应组件的所有加载项
- 根据业务系统指定的加载项名称，使用该加载项来接收参数
- 业务开发方可将此页面的方法按需整合到自己的需要调起WPS的业务场景中，从而达到自动化的环境配置。