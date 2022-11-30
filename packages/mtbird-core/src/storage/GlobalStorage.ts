export const EXTENSION_DEBUG_KEY = 'EXTENSION_DEBUG';

const getLocal = () => {
  if (typeof window !== 'undefined') {
    return localStorage;
  } else {
    return {
      getItem(key: string) {},
      removeItem(key: string) {},
      setItem(key: string, value: string) {}
    };
  }
};

class GlobalStorage {
  static Storage = getLocal();

  static get debugExtension() {
    return this.Storage.getItem(EXTENSION_DEBUG_KEY) || '';
  }

  static set debugExtension(value: string) {
    if (!value) {
      this.Storage.removeItem(EXTENSION_DEBUG_KEY);
      return;
    }
    this.Storage.setItem(EXTENSION_DEBUG_KEY, value);
  }
}

export default GlobalStorage;
