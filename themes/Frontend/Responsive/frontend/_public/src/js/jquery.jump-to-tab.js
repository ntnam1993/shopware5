(function($, window) {
    'use strict';

    /**
     * Tab Switcher Plugin
     *
     * This Plugin switches to the correct content tab when the user adds
     * a product review which causes a page reload. The Plugin also
     * scrolls to the correct page position where the alert messages
     * are shown.
     */
    $.plugin('swJumpToTab', {

        defaults: {
            contentCls: 'has--content',
            tabDetail: '.tab-menu--product',
            tabCrossSelling: '.tab-menu--cross-selling',
            btnJumpSelectors: [
                '.product--rating-link',
                '.link--publish-comment'
            ]
        },

        init: function () {
            var me = this,
                param = decodeURI((/(?:action|jumpTab)=(.+?)(&|$)/.exec(location.search) || [null, null])[1]);

            me.applyDataAttributes();

            me.$htmlBody = $('body, html');
            me.$tabMenuCrossSelling = me.$el.find(me.opts.tabCrossSelling);
            me.lastClick = 0;

            me.resizeCrossSelling();
            me.registerEvents();

            if (param === 'rating') {
                var $tab = $('[data-tabName="' + param + '"]'),
                    index = $tab.index() || 1;

                me.jumpToTab(index, $tab);
            }
        },

        resizeCrossSelling: function () {
            var me = this,
                $container;

            if (StateManager.isCurrentState(['xs', 's']) && me.$tabMenuCrossSelling.length) {
                me.$tabMenuCrossSelling.find('.tab--container').each(function (i, el) {
                    $container = $(el);

                    if ($container.find('.tab--content').html().trim().length) {
                        $container.addClass('has--content');
                    }
                });
            }
        },

        registerEvents: function () {
            var me = this;

            me.$el.on(me.getEventName('click touchstart'), me.opts.btnJumpSelectors.join(', '), $.proxy(me.onJumpToTab, me));

            $.publish('plugin/swJumpToTab/onRegisterEvents', [me]);
        },

        onJumpToTab: function (event) {
            var me = this,
                $tab = $('[data-tabName="rating"]'),
                index = $tab.index() || 1;

            if (event.timeStamp < me.lastClick + 10) {
                return;
            }
            me.lastClick = event.timeStamp;

            event.preventDefault();

            me.jumpToTab(index, $tab);

            $.publish('plugin/swJumpToTab/onClick', [me, event]);
        },

        jumpToTab: function (tabIndex, jumpTo) {
            var me = this;
            me.tabMenuProduct = me.$el.find(me.opts.tabDetail).data('plugin_swTabMenu');

            if (!me.$el.hasClass('is--ctl-blog') && me.tabMenuProduct) {
                me.tabMenuProduct.changeTab(tabIndex);
            }

            $.publish('plugin/swJumpToTab/onChangeTab', [me, tabIndex, jumpTo]);

            if (!jumpTo || !jumpTo.length) {
                return;
            }

            me.$htmlBody.animate({
                scrollTop: $(jumpTo).offset().top
            }, 0);

            $.publish('plugin/swJumpToTab/onJumpToTab', [me, tabIndex, jumpTo]);
        },

        /**
         * Destroys the plugin by removing all events of the plugin.
         */
        destroy: function() {
            var me = this;

            me.$el.off(this.getEventName('click'), me.opts.btnJumpSelectors.join(', '));
            me._destroy();
        }
    });
})(jQuery, window);
