const setOrGet = (key, value) => {
  if (value !== undefined) {
    return localStorage.setItem(key, value);
  } else {
    return localStorage.getItem(key) || "";
  }
};

class LocalStorage {
  selectedTodoId = (value) => setOrGet("selectedTodoId", value);
}

export default new LocalStorage();
