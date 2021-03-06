$(() => {
    let phoneValidDialogEl = document.querySelector('.phone-valid-dialog');

    if (phoneValidDialogEl) {
        window.phoneValidDialog = {
            el: phoneValidDialogEl,
            box: null,
            okCB: null,
            closeCB: null,
            init: function () {
                this.box = this.el.querySelector('.dialog-box');
                Rx.Observable.fromEvent(this.el.querySelector('.dialog-close'), 'click').subscribe(() => this.close());
                Rx.Observable.fromEvent(this.el.querySelector('.buttons button:nth-of-type(1)'), 'click').subscribe(() => this.ok());
                Rx.Observable.fromEvent(this.el.querySelector('.buttons button:nth-last-of-type(1)'), 'click').subscribe(() => this.close());
                Rx.Observable.fromEvent(this.el, 'animationend').subscribe(() => this.HDText());
            },
            open: function (okCB, closeCB) {
                this.el.classList.add('active');
                this.okCB = okCB;
                this.closeCB = closeCB;
            },
            ok: function () {
                let subject = null, subject$;
                if (typeof this.okCB === 'function') subject = this.okCB();

                if (subject && typeof subject === 'object') {
                    subject$ = subject.subscribe(valid => {
                        if (valid) {
                            this.el.classList.remove('active');
                            this.clearInlineStyle();
                        }
                    });
                } else {
                    this.el.classList.remove('active');
                    this.clearInlineStyle();
                    if (subject$) subject$.unsubscribe();
                }
            },
            close: function () {
                if (typeof this.closeCB === 'function') this.closeCB();
                this.el.classList.remove('active');
                this.clearInlineStyle();
            },
            clearInlineStyle: function () {
                this.box.removeAttribute("style");
            },
            HDText: function () {
                if (window.isMobile) return;
                if (this.el.classList.contains('active')) {
                    let { width, height } = this.box.getBoundingClientRect();
                    width = parseInt(width);
                    height = parseInt(height);
                    if (width % 2 === 1) width = width + 1;
                    if (height % 2 === 1) height = height + 1;
                    this.box.style.minWidth = `${width}px`;
                    this.box.style.minHeight = `${height}px`;
                }
            }
        };

        window.phoneValidDialog.init();
    }
});