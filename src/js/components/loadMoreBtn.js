export default class LoadMoreBtn {
    constructor({selector, hidden = false}) {
        this.refs = this.getRefs(selector);
    }
    getRefs(selector) {
        const refs = {};
        refs.node = document.querySelector(selector);
        return refs;
    }
    show() {
        this.refs.node.classList.remove('is-hidden');
    }
    hide() {
        this.refs.node.classList.add('is-hidden');
    }
    enable() {
        this.refs.node.disabled = false;
      }
    disable() {
    this.refs.node.disabled = true;
    }
}