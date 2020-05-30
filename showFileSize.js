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

const bundlers = [
	'parcel',
	'rollup',
	'webpack',
];

const sizes = [];

for (const xx of supportedLibraries) {
	// Add a space between libraries
	if (sizes.length > 0) {
		sizes.push({ file: "", size: "" });
	}

	// Measure the output size from each bundler
	const xxSizes = [];
	for (const bundler of bundlers) {
		const x = `${__dirname}/${bundler}/${xx}.js`;
		const { size } = statSync(x);
		xxSizes.push({ file: remove([`${__dirname}/`, ".js"], x), size });
	}

	// Sort by output size for easier comparison
	xxSizes.sort((a, b) => a.size - b.size);
	for (const { file, size } of xxSizes) {
		sizes.push({
			file,
			size: `${(size / 1024).toFixed(1)}kb`.padStart(8),
		});
	}
}

console.table(sizes);
