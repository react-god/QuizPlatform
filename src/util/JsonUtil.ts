const ENCODING_TYPE = "utf8";
const NOT_EXIST_JSON_FILE_ERROR_MESSAGE = "JSON FILE 이 존재하지 않습니다.";

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

export { writeJsonToLocalStorage, readJsonFromLocalStorage };
