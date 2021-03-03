export default class LoadMoreBtn {
    constructor(selector) {
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
}




// const loadMoreBtn = {
//     refs: {
//         node: document.querySelector('button[data-action="load-more"]'),
//     },
//     show() {
//         this.refs.node.classList.remove('is-hidden');
//     },
//     hide() {
//         this.refs.node.classList.add('is-hidden');
//     },
//   }
//   export default loadMoreBtn;
