(function ($) {
    'use strict';

    var $timeline_block;

    $(function () {
        $timeline_block = $('.cd-timeline-block');
        hide_timeline_blocks_outside_viewport();
        $(window).on('scroll', show_timeline_blocks_outside_viewport);
    });

    var hide_timeline_blocks_outside_viewport = function () {
        var cut_off_top = get_cut_off_top();
        $timeline_block.each(function () {
            var $block = $(this);
            if ($block.offset().top > cut_off_top) {
                $block.find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
            }
        });
    };

    var show_timeline_blocks_outside_viewport = function () {
        var cut_off_top = get_cut_off_top();
        $timeline_block.each(function () {
            var $block = $(this);
            if ($block.offset().top <= cut_off_top && $block.find('.cd-timeline-img').hasClass('is-hidden')) {
                $block.find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
            }
        });
    };

    var get_cut_off_top = function () {
        var cut_off_top = $(window).scrollTop() + $(window).height() * 0.75;
        return cut_off_top;
    };

}(window.jQuery));
