'use strict';

module.exports = function() {
    $.gulp.task('spriteimg', function () {
            var spriteData = $.gulp.src('./source/images/icons/*.png').pipe($.gp.spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css',
            algorithm: 'left-right'
        }));

        spriteData.img
        // DEV: We must buffer our stream into a Buffer for `imagemin`
            .pipe($.gp.buffer())
            .pipe($.gp.imagemin())
            .pipe($.gulp.dest('./source/images/sprite'));

        // Pipe CSS stream through CSS optimizer and onto disk
        spriteData.css
            .pipe($.gp.csso())
            .pipe($.gulp.dest('./source/style/common'));

        // Return a merged stream to handle both `end` events
        // return $.gp.merge(imgStream, cssStream);

        return spriteData
    })
};

