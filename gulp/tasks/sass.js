import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // Сжатие CSS файла
import webpcss from 'gulp-webpcss'; // Вывод WEBP изображений
import autoprefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Групировка медиа запросов

const builder = gulpSass(dartSass);

export const sass = () => {
	return app.gulp.src([app.path.src.sass], {allowEmpty: true})
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "SASS",
            message: "Error: <%= error.message %>"
        })))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
		.pipe(
			app.plugins.if(
				app.isBuild,
				groupCssMediaQueries()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				autoprefixer({
					grid: true,
					overrideBrowserslist: ["last 5 versions"],
					cascade: true
				})
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				webpcss(
					{
						webpClass: ".webp",
						noWebpClass: ".no-webp"
					}
				)
			)
		)
        .pipe(builder())
		.pipe(app.gulp.dest(app.path.build.css))
		// если нужен не сжатый дубль файла стилей
		.pipe(
			app.plugins.if(
				app.isBuild,
				cleanCss()
			)
		)
		.pipe(rename({
			extname: ".min.css"
		}))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream());
}