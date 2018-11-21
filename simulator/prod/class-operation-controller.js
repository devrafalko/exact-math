import log from './class-log-controller.js';
import actions from './class-actions-controller.js';

class Operation {
  constructor({ id, options, selected = 0 }) {
    this._dom = {
      select: document.getElementById(id),
      options: [],
      selected: null
    };
    this._data = {
      defaultSelected: selected,
      currentSelected: selected,
      options: options
    };
    this._addOptions();
    this._addListeners();
  }

  get value() {
    return this._data.options[this._data.currentSelected].value;
  }

  reset() {
    this._dom.select.selectedIndex = this._data.defaultSelected;
    this._data.currentSelected = this._data.defaultSelected;
  }

  _addListeners() {
    this._dom.select.addEventListener('change', () => {
      this._data.currentSelected = this._dom.select.selectedIndex;
      log.update([]);
      actions.update();
    });
  }

  _addOptions() {
    for (let item of this._data.options) {
      let node = document.createElement('OPTION');
      node.value = item.value;
      node.innerHTML = item.html;
      this._dom.options.push(node);
      this._dom.select.add(node);
    }
    this._dom.options[this._data.defaultSelected].setAttribute('selected', 'selected');
  }
}

export default new Operation({
  id: 'select-sign',
  options: [
    { value: 'add', html: 'Addition' },
    { value: 'sub', html: 'Subtraction' },
    { value: 'mul', html: 'Multiplication' },
    { value: 'div', html: 'Division' }
  ],
  selected: 0
});