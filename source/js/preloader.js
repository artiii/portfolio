(function( $ ){
    $.fn.myPluginName = function() {
        var imgs = [];

        $.each($('*'), function () {
            var
                $this = $(this),
                background = $this.css('background-image'),
                img = $this.is('img');

            if (background != 'none') {
                var path = background.replace('url("', '').replace('")', '');
                imgs.push(path);
                console.log(path);
            }

            if (img) {
                var path = $this.attr('src');
                console.log(path);
                if (path) {
                    imgs.push(path);
                }
            }
        });
    };
})( jQuery )