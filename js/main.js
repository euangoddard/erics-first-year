(function ($) {
    'use strict';

    var post_ids_by_top_offset = {};

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

    var position_dots = function () {
        var $footer = $('footer');
        var start_date = new Date($footer.data('start-date'));
        var end_date = new Date($footer.data('end-date'));
        var date_span = end_date - start_date;
        $footer.find('.dot').each(function () {
            var $dot = $(this);
            var date = new Date($dot.data('post-date'));
            var delta = date - start_date;
            var delta_percent = 1 + (97 * delta / date_span);
            $dot.css({left: delta_percent + '%'});
        });
    };

    var jump_to_post = function () {
        var $dot = $(this);
        var post_id = $(this).data('post-id');
        var $post = $('#' + post_id);
        if ($post.length) {
            $('html,body').animate(
                {scrollTop: $post.offset().top},
                500,
                show_timeline_blocks_inside_viewport
            );
        }
    };

    var cache_posts_top_positions = function () {
        $('.cd-timeline-block').each(function () {
            var $block = $(this);
            var post_top_offset = parseInt($block.offset().top, 10);
            post_ids_by_top_offset[post_top_offset] = $block.attr('id');
        });
    };

    var highlight_active_post_dot = function () {
        var y_offset = $(window).scrollTop();
        var post_id;
        while (0 < y_offset) {
            post_id = post_ids_by_top_offset[y_offset];
            if (typeof post_id === 'undefined') {
                y_offset -= 1;
            } else {
                break;
            }
        }

        if (post_id) {
            $('.dot').removeClass('active');
            $('[data-post-id="' + post_id + '"]').addClass('active');
        }
    };

    var debounce = function (fn, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    };

    $(function () {
        hide_timeline_blocks_outside_viewport();
        $(window).on('scroll', debounce(show_timeline_blocks_inside_viewport, 250));
        $(window).on('scroll', debounce(highlight_active_post_dot, 300));
        
        position_dots();
        $(document).on('click', '.dot', jump_to_post);

        $(window).on('load', cache_posts_top_positions);
    });

}(window.jQuery));
