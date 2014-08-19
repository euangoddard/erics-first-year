(function ($) {
    'use strict';

    $(function () {
        hide_timeline_blocks_outside_viewport();
        $(window).on('scroll', show_timeline_blocks_inside_viewport);
    });

    var hide_timeline_blocks_outside_viewport = function () {
        var cut_off_top = get_cut_off_top();
        $('.cd-timeline-block').each(function () {
            var $block = $(this);
            if ($block.offset().top > cut_off_top) {
                $block.find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
            }
        });
    };

    var show_timeline_blocks_inside_viewport = function () {
        var cut_off_top = get_cut_off_top();
        $('.cd-timeline-img.is-hidden').each(function () {
            var $img = $(this);
            var $block = $img.parent();
            if ($block.offset().top <= cut_off_top) {
                var $elements = $img.next('.cd-timeline-content').addBack();
                $elements.removeClass('is-hidden').addClass('bounce-in');
            }
        });
    };

    var get_cut_off_top = function () {
        var cut_off_top = $(window).scrollTop() + $(window).height() * 0.75;
        return cut_off_top;
    };

}(window.jQuery));
