class Print {
  constructor() {
    this._nodeJS = document.getElementById('js-results');
    this._nodeLib = document.getElementById('lib-results');
    this._addListeners();
  }

  add(prints) {
    this._nodeJS.insertBefore(document.createElement('BR'), this._nodeJS.childNodes[0]);
    this._nodeJS.insertAdjacentText('afterbegin', `${prints[0]}`);
    this._nodeLib.insertBefore(document.createElement('BR'), this._nodeLib.childNodes[0]);
    this._nodeLib.insertAdjacentText('afterbegin', `${prints[1]}`);
  }

  clear() {
    this._nodeJS.innerHTML = '';
    this._nodeLib.innerHTML = '';
  }

  _addListeners() {
    this._nodeJS.addEventListener('scroll', () => {
      this._nodeLib.scrollTop = this._nodeJS.scrollTop;
    });
    this._nodeLib.addEventListener('scroll', () => {
      this._nodeJS.scrollTop = this._nodeLib.scrollTop;
    });
  }
}

export default new Print();