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

COVERAGE_REGEX = /Coverage summary =+\nStatements\s*:\s*([\d.]+)%.*\nBranches\s*:\s*([\d.]+)%.*\nFunctions\s*:\s*([\d.]+)%.*\n/;

function coverage(path) {
	try {
		const output = cp
			.execSync(`nyc --reporter text-summary node ${path}`)
			.toString("utf8");
		const [, statements, branches, functions] = output.match(
			COVERAGE_REGEX
		);
		return `Stmts: ${String(Math.round(statements)).padStart(
			2
		)}%, Functions: ${String(Math.round(functions)).padStart(2)}%`;
	} catch {
		return "Runtime error!";
	}
}

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
				coverage: coverage(x)
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
