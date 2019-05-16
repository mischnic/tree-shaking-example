const filesize = require("filesize");
const { statSync } = require("fs");
const { remove, replace, sort, s, flatMap, flatten } = require("rambdax");
const cTable = require("console.table");
s();

const BYTES = " B";
const KILOBYTES = " KB";

function hasBytes(x) {
	return;
}

function sortSizes(sizes) {
	const sortFn = (aRaw, bRaw) => {
		const a = aRaw.size;
		const b = bRaw.size;
		if (a.includes(BYTES) && b.includes(BYTES)) {
			return Number(remove(BYTES, a)) > Number(remove(BYTES, b));
		}
		if (a.includes(BYTES) && b.includes(KILOBYTES)) return -1;
		if (a.includes(KILOBYTES) && b.includes(BYTES)) return 1;

		return Number(remove(KILOBYTES, a)) > Number(remove(KILOBYTES, b));
	};

	return sort(sortFn, sizes);
}

const supportedLibraries = [
	"lodash-es",
	"lodash",
	"rxjs",
	"remeda",
	"ramda",
	"ramdaBabel",
	"rambda",
	"rambdax"
];

const showFileSize = async () => {
	try {
		const filePaths = supportedLibraries
			.s(
				flatMap(xx => {
					return [
						`${__dirname}/parcel/${xx}.js`,
						`${__dirname}/rollup/${xx}.js`,
						`${__dirname}/webpack/${xx}.js`
					];
				})
			)
			.s(flatten);

		const sizes = filePaths
			.map(x => {
				const { size } = statSync(x);
				return {
					file: remove([`${__dirname}/`, ".js"], x),
					size: filesize(size)
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
};

showFileSize();
