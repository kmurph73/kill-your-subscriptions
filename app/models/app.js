import { genUUID } from '../util.js';

const json_attrs = ['uuid', 'name', 'selected', 'amount', 'frequency', 'site']

class App {
  constructor(attrs) {
    for (let prop in attrs) {
      this[prop] = attrs[prop];
    }

    if (!this.uuid) {
      this.uuid = genUUID(attrs.name);
    }
  }

  tersify(name) {
    return name.toLowerCase().replace(/\s/, '')
  }

  setName(name) {
    this.name = name
    this.terse = this.tersify(name)

    App.saveToLocalStorage()
  }

  setSelected(val) {
    this.selected = val

    App.saveToLocalStorage()
  }

  static getAll() {
    if (this.apps) { return this.apps; }

    const apps = JSON.parse(localStorage.getItem('apps')) || window.apps;
    this.apps = apps.map(a => new App(a));

    return this.apps;
  }

  toJSON() {
    const json = {};

    for (let a of json_attrs) {
      json[a] = this[a];
    }

    return json;
  }

  static saveToLocalStorage(json) {
    localStorage.setItem('apps', JSON.stringify(this.getAll()));
  }
}

export default App;
