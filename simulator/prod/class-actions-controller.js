import inputs from './class-input-controller.js';
import compute from './class-compute.js';
import operation from './class-operation-controller';
import print from './class-print-controller.js';

class ActionsController {
  constructor() {
    this.nodeRun = document.getElementById('button-run');
    this.nodeReset = document.getElementById('button-reset');
    this._running = false;
    this._paused = false;
    this._addListeners();
    this.block(this.nodeRun);
  }

  start() {
    for (let property in inputs) inputs[property].block();
    if (this._paused) compute.continue();
    else compute.initiate();
    this._running = true;
    this._paused = false;
    this.nodeRun.value = 'Pause';
  }

  pause() {
    for (let property in inputs) inputs[property].unblock();
    this._running = false;
    this._paused = true;
    this.nodeRun.value = 'Continue';
    compute.stop();
  }

  stop() {
    for (let property in inputs) inputs[property].unblock();
    this._running = false;
    this._paused = false;
    this.nodeRun.value = 'Start';
    compute.stop();
  }

  reset() {
    this.stop();
    operation.reset();
    for (let input in inputs) inputs[input].reset();
    print.clear();
  }

  update() {
    if (this._paused) return this.stop();
    for (let property in inputs) {
      let input = inputs[property];
      if (input.valid === false) {
        this.block(this.nodeRun);
        return;
      }
    }
    this.unblock(this.nodeRun);
  }

  block(node) {
    node.setAttribute('disabled', 'disabled');
  }

  unblock(node) {
    node.removeAttribute('disabled');
  }

  _addListeners() {
    this.nodeRun.addEventListener('click', () => {
      if (!this._running) this.start();
      else this.pause();
    });
    this.nodeReset.addEventListener('click', () => this.reset());
  }

}

export default new ActionsController();