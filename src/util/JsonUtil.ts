function writeJsonToLocalStorage<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

function readJsonFromLocalStorage<T>(key: string): T | undefined {
  const jsonBuffer = localStorage.getItem(key);

  if (!jsonBuffer) {
    return undefined;
  }

  return JSON.parse(jsonBuffer) as T;
}

function writeJsonToSessionStorage<T>(key: string, data: T) {
  sessionStorage.setItem(key, JSON.stringify(data));
}

function readJsonFromSessionStorage<T>(key: string): T | undefined {
  const jsonBuffer = sessionStorage.getItem(key);

  if (!jsonBuffer) {
    return undefined;
  }

  return JSON.parse(jsonBuffer) as T;
}

export {
  writeJsonToLocalStorage,
  readJsonFromLocalStorage,
  writeJsonToSessionStorage,
  readJsonFromSessionStorage,
};
