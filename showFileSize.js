const filesize = require("filesize");
const { statSync } = require("fs");
const cp = require("child_process");
const { remove } = require("rambdax");
require("console.table");

const supportedLibraries = [
	"lodash-es",
	"lodash",
	"rxjs",
	"react-icons",
	"remeda",
	"ramda",
	"ramdaBabel",
	"rambda",
	"rambdax"
];

try {
	const filePaths = supportedLibraries
		.map(xx => {
			return [
				`${__dirname}/parcel/${xx}.js`,
				`${__dirname}/rollup/${xx}.js`,
				`${__dirname}/webpack/${xx}.js`
			];
		})
		.reduce((acc, v) => acc.concat(v), []);

	const sizes = filePaths
		.map(x => {
			const { size } = statSync(x);
			return {
				file: remove([`${__dirname}/`, ".js"], x),
				size: filesize(size),
			};
		})
		.reduce((acc, v, i) => {
			if (v.file.includes("parcel") && i !== 0)
				acc.push({ file: "", size: "" });
			acc.push(v);
			return acc;
		}, []);
	console.table(sizes);
} catch (err) {
	console.log(err);
}
