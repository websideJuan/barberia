class LocalDB {
  constructor() {
    this.db = window.localStorage;
  }

  save(key, value) {
    this.db.setItem(key, value);
  }

  get(key) {
    return new Promise((resolve) => {
      const data = JSON.parse(this.db.getItem(key));
      resolve(data || null);
    });
  }
  
  remove(key) {
    this.db.removeItem(key);
  }

  clear() {
    this.db.clear();
  }

  getlength() {
    return this.db.length;
  }

  key(index) {
    return this.db.key(index);
  }
}


export default new LocalDB();
