const path = require('path');

const POSIX_SEP = '/';

function toPosix(p) {
  return p.split(path.sep).join(POSIX_SEP);
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Use relative import for targets inside the same directory or its subdirectories; keep alias for cross-module imports.',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          aliasPrefix: { type: 'string', default: '@/' },
          srcRoot: { type: 'string', default: 'src' },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      preferRelative:
        'Import points to the same directory or a subdirectory. Prefer a relative path instead of the alias.',
    },
  },

  create(context) {
    const options = context.options?.[0] || {};
    const aliasPrefix = options.aliasPrefix || '@/';
    const srcRoot = options.srcRoot || 'src';

    return {
      ImportDeclaration(node) {
        const source = node.source && node.source.value;
        if (typeof source !== 'string') return;
        if (!source.startsWith(aliasPrefix)) return;

        const filename = context.getFilename();
        if (filename === '<text>') return;

        const fromDir = path.dirname(filename);

        const aliased = source.slice(aliasPrefix.length);
        const projectRoot = path.resolve(context.getCwd ? context.getCwd() : process.cwd());
        const toAbs = path.resolve(projectRoot, srcRoot, aliased);

        const toAbsPosix = toPosix(toAbs);

        const isInsideSameDir = toAbsPosix.startsWith(toPosix(path.resolve(fromDir)) + POSIX_SEP);

        if (!isInsideSameDir) return;

        let rel = toPosix(path.relative(fromDir, toAbs));
        if (!rel.startsWith('.')) rel = './' + rel;

        context.report({
          node: node.source,
          messageId: 'preferRelative',
          fix(fixer) {
            return fixer.replaceText(node.source, `'${rel}'`);
          },
        });
      },
    };
  },
};
