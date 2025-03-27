class StorageManager {
  static cache = {};

  static set(key, value, ttl = 0) {
    try {
      const data = {
        value: JSON.stringify(value),
        expires: ttl ? Date.now() + ttl * 1000 : null
      };
      localStorage.setItem(key, JSON.stringify(data));
      // 更新内存缓存
      StorageManager.cache[key] = {
        value: value,
        expires: data.expires
      };
      return true;
    } catch (error) {
      console.error('StorageManager set error:', error);
      return false;
    }
  }

  static get(key, forceReadFromStorage = false) {
    try {
      // 优先读取内存缓存
      if (!forceReadFromStorage && StorageManager.cache[key] && (!StorageManager.cache[key].expires || Date.now() < StorageManager.cache[key].expires)) {
        return StorageManager.cache[key].value;
      }

      const stored = localStorage.getItem(key);
      if (!stored) return null;

      const data = JSON.parse(stored);
      if (data.expires && Date.now() > data.expires) {
        localStorage.removeItem(key);
        delete StorageManager.cache[key];
        return null;
      }

      // 更新内存缓存
      const parsedValue = JSON.parse(data.value);
      StorageManager.cache[key] = {
        value: parsedValue,
        expires: data.expires
      };

      return parsedValue;
    } catch (error) {
      console.error('StorageManager get error:', error);
      return null;
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(key);
      // 删除内存缓存
      delete StorageManager.cache[key];
      return true;
    } catch (error) {
      console.error('StorageManager remove error:', error);
      return false;
    }
  }

  static clear() {
    try {
      localStorage.clear();
      // 清空内存缓存
      StorageManager.cache = {};
      return true;
    } catch (error) {
      console.error('StorageManager clear error:', error);
      return false;
    }
  }
}

export default StorageManager