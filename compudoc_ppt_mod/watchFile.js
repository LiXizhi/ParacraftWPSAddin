import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';
import { promises as fsPromises } from 'fs';

const componentsDir = path.join(process.cwd(), '../components');
const cacheDir = path.join(process.cwd(), 'src/.cache');

// 确保.cache目录存在
async function ensureCacheDir() {
  try {
    await fsPromises.mkdir(cacheDir, { recursive: true });
  } catch (err) {
    console.error('无法创建.cache目录:', err);
  }
}

// 复制所有vue文件到.cache目录
async function copyAllVueFiles() {
  try {
    const files = await fsPromises.readdir(componentsDir);
    for (const file of files) {
      if (file.endsWith('.vue')) {
        const source = path.join(componentsDir, file);
        const dest = path.join(cacheDir, file);
        await fsPromises.copyFile(source, dest);
        console.log(`已复制: ${source} -> ${dest}`);
      }
    }
  } catch (err) {
    console.error('复制文件时出错:', err);
  }
}

// 初始化并复制所有文件
(async () => {
  await ensureCacheDir();
  await copyAllVueFiles();

  // 初始化watcher
  const watcher = chokidar.watch(componentsDir, {
    persistent: true,
    ignoreInitial: false,
    depth: 99, // 添加递归监听
    usePolling: true, // 增加轮询模式确保可靠性
    awaitWriteFinish: {
      stabilityThreshold: 500, // 延长稳定阈值
      pollInterval: 200
    }
  });

  // 处理文件变化
  const handleFileChange = (filePath) => {
    if (!filePath.endsWith('.vue')) return;
    const fileName = path.basename(filePath);
    const destFile = path.join(cacheDir, fileName);
    
    fs.copyFile(filePath, destFile, (err) => {
      if (err) {
        console.error(`同步文件失败: ${filePath} -> ${destFile}`, err);
        return;
      }
      console.log(`已同步: ${filePath} -> ${destFile}`);
    });
  };

  // 处理文件删除
  const handleFileRemove = (filePath) => {
    if (!filePath.endsWith('.vue')) return;
    const fileName = path.basename(filePath);
    const destFile = path.join(cacheDir, fileName);
    
    fs.unlink(destFile, (err) => {
      if (err && err.code !== 'ENOENT') {  // 忽略文件不存在的错误
        console.error(`删除文件失败: ${destFile}`, err);
        return;
      }
      console.log(`已删除: ${destFile}`);
    });
  };

  watcher
    .on('add', handleFileChange)    // 新增文件
    .on('change', handleFileChange) // 文件修改
    .on('unlink', handleFileRemove); // 文件删除

  console.log(`正在监听 ${componentsDir} 目录下的.vue文件变化`);
  
  // 添加键盘事件监听
  process.stdin.setRawMode(true);
  process.stdin.on('data', async (key) => {
    if (key.toString() === 'x') {
      console.log('\n正在停止监听并清理缓存...');
      
      // 关闭文件监听
      await watcher.close();
      
      // 删除缓存目录
      try {
        await fsPromises.rm(cacheDir, { recursive: true, force: true });
        console.log('成功删除缓存目录');
      } catch (err) {
        console.error('删除缓存目录失败:', err);
      }
      
      process.exit(0);
    }
  });
  
  console.log('按 x 键停止监听并删除缓存');
})();