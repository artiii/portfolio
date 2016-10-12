'use strict';

module.exports = function() {
    $.gulp.task('js:other', function() {
        return $.gulp.src('./source/js/other/*.js')
            .pipe($.gp.sourcemaps.init())
            // .pipe($.gp.concat('app.js'))
            .pipe($.gp.sourcemaps.write())
            .pipe($.gulp.dest($.config.root + '/assets/other/js'))
    })
};
