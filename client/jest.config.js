module.exports = {
    moduleDirectories: [
        'node_modules',
        // add the directory with the test-utils.js file, for example:
        'utils', // a utility folder
        __dirname, // the root directory
    ],
    testEnvironment: 'jsdom',
    modulePathIgnorePatterns: ["src", "__tests__/config"],
    moduleNameMapper: { '^.+\\.(css|less)$': '<rootDir>/__tests__/config/CSSStub.ts' },
    preset: 'ts-jest'
}