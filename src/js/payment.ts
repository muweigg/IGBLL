$(() => {
    let loginIGB = $('.login-igb a');
    let confirmPay = $('.confirm-pay button');
    let searchBar = $('.search-bar i');
    let sort = $('.skins .all-and-sort .sort');
    let pay = $('.balance button');
    let refresh = $('.skins .all-and-sort .refresh');

    loginIGB.click(function () {
        $('.login-igb').hide();
        $('.confirm-pay').show();
    });

    confirmPay.click(function () {
        $('.confirm-pay').hide();
        $('.chose-skins').show();
    });

    searchBar.click(function () {
        $('.search-bar').toggleClass('open');
    });

    pay.click(function () {
        $(this).addClass('disabled').find('span').text('等待中...');
        setTimeout(() => {
            $('.waiting').show();

            setTimeout(() => {
                $('.container-wrap').eq(0).hide();
                $('.pay-results').show();
            }, 1000);
        }, 1000);
    });
    
    refresh.click(function () {
        $(this).toggleClass('refreshing');
    });

    sort.click(function () {
        $(this).toggleClass('reverse');
    });
    
    let tradeUrlWrapEl = document.querySelector('.trade-url > span:nth-last-of-type(1)');
    let tradeUrlSaveEl = tradeUrlWrapEl.querySelector('a');
    let tradeInput$ = Rx.Observable.fromEvent(tradeUrlWrapEl.querySelector('input'), 'input');
    tradeInput$.map(e => e.target.value).subscribe(value => {
        if (_.trim(value) === '')
            $(tradeUrlWrapEl).removeClass('input').removeClass('success').addClass('no-input');
        else
            $(tradeUrlWrapEl).removeClass('no-input').addClass('input');
    })
    $(tradeUrlSaveEl).click(() => {
        $(tradeUrlWrapEl).removeClass('input').addClass('invalid');
        setTimeout(() => loadErrorDialog.open({
            title: '提示',
            content: '请输入正确的交易链接'
        }, () => alert('callback...')), 1000);
    });
    
    // 对话框
    let loadErrorDialog = {
        el: document.querySelector('.load-steam-error'),
        cb: null,
        title: null,
        content: null,
        buttonText: null,
        default: { title: '提示', content: '', buttonText: '确定' },
        init: function () {
            Rx.Observable.fromEvent(this.el.querySelector('.dialog-overlay'), 'click').subscribe(() => this.close());
            Rx.Observable.fromEvent(this.el.querySelector('.dialog-close'), 'click').subscribe(() => this.close());
            Rx.Observable.fromEvent(this.el.querySelector('.buttons button'), 'click').subscribe(() => this.close());
            this.title = this.el.querySelector('.dialog-content p:nth-of-type(1)');
            this.content = this.el.querySelector('.dialog-content p:nth-of-type(2)');
            this.buttonText = this.el.querySelector('.buttons button span');
        },
        open: function (options:any = {}, cb) {
            let opt = Object.assign({}, this.default, options);
            this.title.innerText = opt.title;
            this.content.innerText = opt.content;
            this.buttonText.innerText = opt.buttonText;
            this.el.classList.add('active');
            this.cb = cb;
        },
        close: function () {
            this.el.classList.remove('active');
            if (typeof this.cb === 'function') this.cb();
        }
    };
    loadErrorDialog.init();
});