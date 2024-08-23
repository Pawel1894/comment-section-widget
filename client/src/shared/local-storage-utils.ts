type LocalStorage = {
  userVotes: Record<string, string>;
};

export const getFromLocalStorage = <K extends keyof LocalStorage>(key: K): LocalStorage[K] | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setInLocalStorage = <K extends keyof LocalStorage>(key: K, value: LocalStorage[K]): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
