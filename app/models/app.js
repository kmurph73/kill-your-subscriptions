import { genUUID } from '../util.js';
import sumBy from 'lodash/sumBy';
import map from 'lodash/map';

const json_attrs = ['uuid', 'name', 'selected', 'starting_amount_cents', 'current_amount_cents', 'frequency', 'website']

import { centsToDollaString } from '../util.js';

class App {
  constructor(attrs) {
    for (let prop in attrs) {
      this[prop] = attrs[prop];
    }

    this.starting_amount_cents_value = attrs.starting_amount_cents ? centsToDollaString(attrs.starting_amount_cents).replace('$', '') : ''
    this.current_amount_cents_value = attrs.current_amount_cents ? centsToDollaString(attrs.current_amount_cents).replace('$', '') : ''

    if (!this.uuid) {
      this.uuid = genUUID(attrs.name);
    }

    this.errors = []
  }

  tersify(name) {
    return name.toLowerCase().replace(/\s/, '')
  }

  setName(name) {
    this.name = name
    this.terse = this.tersify(name)

    App.saveToLocalStorage()
  }

  monthlyCurrentAmount() {
    return this.frequency === 'monthly' ? this.current_amount_cents : Math.round(this.current_amount_cents / 12)
  }

  monthlyStartingAmount() {
    return this.frequency === 'monthly' ? this.starting_amount_cents : Math.round(this.starting_amount_cents / 12)
  }

  setSelected(val) {
    this.selected = val

    App.saveToLocalStorage()
  }

  static validateData(data) {
    let errors = [];

    if (!data.name || !data.name.length > 2) {
      errors.push(['name must be at least 3 chars']);
    }

    return errors;
  }

  clone() {
    let app = Object.assign(App.blankApp(), this.toJSON())
    delete app.uuid

    return app;
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

  static blankApp() {
    return {
      name: '',
      amount: '',
      website: '',
      frequency: 'monthly'
    }
  }

  static find(uuid) {
    return App.getAll().find(a => a.uuid === uuid);
  }

  static remove(app) {
    this.apps = this.getAll().filter(a => a.uuid != app.uuid)
    App.saveToLocalStorage()
  }

  static addApp(data) {
    let app = new App(data)
    App.getAll().push(app)
    App.saveToLocalStorage()
  }

  static allToJSON() {
    return map(this.getAll(), a => a.toJSON())
  }

  static sumStartingAmountsCents() {
    return sumBy(App.getAll(), app => app.monthlyStartingAmount() || 0)
  }

  static sumCurrentAmountsCents() {
    return sumBy(App.getAll(), app => app.monthlyCurrentAmount() || 0)
  }

  static saveToLocalStorage(json) {
    localStorage.setItem('apps', JSON.stringify(this.getAll()));
  }
}

export default App;
