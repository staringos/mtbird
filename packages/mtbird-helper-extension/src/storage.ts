const StorageFactory = (storage: Storage) => {
  return {
    getItem: (key: string) => {
      if (!storage) return;
      return storage.getItem(key);
    },

    setItem: (key: string, value: string) => {
      if (!storage) return;
      storage.setItem(key, value);
    },

    removeItem: (key: string) => {
      if (!storage) return;
      storage.removeItem(key);
    },

    clear: () => {
      if (!storage) return;
      storage.clear();
    },
  };
};

export default StorageFactory;
