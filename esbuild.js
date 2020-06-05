const dirs = {
  'esbuild-0.3.9': require('esbuild-0.3.9'),
  'esbuild-0.4.2': require('esbuild-0.4.2'),
  'esbuild-0.4.6': require('esbuild-0.4.6'),
};

const libName = process.env.LIB;

async function main() {
  for (const dir in dirs) {
    try {
      await dirs[dir].build({
        stdio: 'inherit',
        bundle: true,
        entryPoints: [`${__dirname}/src/${libName}.js`],
        outdir: `${__dirname}/${dir}`,
        minify: true,
        format: 'cjs',
        define: {
          'process.env.NODE_ENV': '"production"',
        },
      });
    } catch (e) {
      console.error(e)
    }
  }
}

main();
