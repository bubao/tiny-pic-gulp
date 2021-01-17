/**
 * @description: 
 * @author: bubao
 * @date: 2021-01-18 03:43:07
 * @last author: bubao
 * @last edit time: 2021-01-18 06:56:57
 */
const { src, dest, parallel, watch, series } = require('gulp');
const imagemin = require('gulp-imagemin');

function webp() {
	return src('../picgo_db/img/*.webp').pipe(dest('output/'));
}

function image() {
	return src([
		'../picgo_db/img/*.jpg', 
		'../picgo_db/img/*.png', 
		'../picgo_db/img/*.jpeg'
	]).pipe(imagemin([imagemin.optipng({ optimizationLevel: 5 })])).pipe(dest('output/'));
}

function watchWebp() {
	watch("../picgo_db/img/*webp", () => {
		return webp();
	})
}

function watchImges() {
	watch([
		'../picgo_db/img/*.jpg', 
		'../picgo_db/img/*.png', 
		'../picgo_db/img/*.jpeg'
	], () => {
		return images();
	})
}

exports.default = series(parallel(image,webp),parallel(watchImges,watchWebp))