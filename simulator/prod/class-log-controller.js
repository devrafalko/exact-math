class LogController {
  constructor() {
    this._message = document.getElementById('log-message');
    this._node = document.getElementById('box-output');
  }

  update(messages = []) {
    const pointer = '&#129170;';
    let newMessage = '';
    for (let message of messages) newMessage += `${pointer} ${message}<br/>`;
    this._message.innerHTML = newMessage;
    this._node.style.height = this._message.scrollHeight + 'px';
  }
}

export default new LogController();