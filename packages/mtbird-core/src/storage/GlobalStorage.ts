export const EXTENSION_DEBUG_KEY = 'EXTENSION_DEBUG';
export const TAB_STATE_KEY = 'TAB_STATE_KEY';
export const TOUR_STATE_KEY = 'TOUR_STATE_KEY';

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

const getter = (Storage: ReturnType<typeof getLocal>, key: string) => {
  return () => {
    return Storage.getItem(key) || '';
  };
};

const getterJson = (Storage: ReturnType<typeof getLocal>, key: string, defaultValue?: any) => {
  return () => {
    const res = Storage.getItem(key);
    if (!res) return defaultValue || {};

    try {
      return JSON.parse(res as string) || '';
    } catch (e) {
      return defaultValue;
    }
  };
};

const setter = (Storage: ReturnType<typeof getLocal>, key: string) => {
  return (value: any) => {
    if (!value) {
      Storage.removeItem(key);
      return;
    }
    Storage.setItem(key, value);
  };
};

const setterJson = (Storage: ReturnType<typeof getLocal>, key: string) => {
  return (value: any) => {
    if (!value) {
      Storage.removeItem(key);
      return;
    }
    Storage.setItem(key, JSON.stringify(value));
  };
};

class GlobalStorage {
  static Storage = getLocal();

  static get debugExtension() {
    return getter(this.Storage, EXTENSION_DEBUG_KEY)();
  }

  static set debugExtension(value) {
    setter(this.Storage, EXTENSION_DEBUG_KEY)(value);
  }

  static get tabState() {
    return getterJson(this.Storage, TAB_STATE_KEY, { toolTabs: true, bottomTabs: true, schemaTabs: true })();
  }

  static set tabState(value: Record<string, any>) {
    setterJson(this.Storage, TAB_STATE_KEY)(value);
  }

  static get tourState() {
    const value = getter(this.Storage, TOUR_STATE_KEY)();
    return value !== 'false' ? true : false;
  }

  static set tourState(value: boolean) {
    setter(this.Storage, TOUR_STATE_KEY)(value.toString());
  }
}

export default GlobalStorage;
