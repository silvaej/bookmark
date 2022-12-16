module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        'standard-with-typescript',
        'eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugIns: ['@typescript-eslingt', 'prettier', 'import'],
    rules: {
        'prettier/prettier': 'error',
        'import/extensions': 'off',
        'no-console': 'off',
        'import/order': [
            'error',
            {
                'newlines-between': 'never',
                groups: [
                    ['builtin', 'external'],
                    ['internal', 'parent', 'sibling', 'index'],
                ],
            },
        ],
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts'],
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: '.tsconfig.json',
            },
        },
    },
}
