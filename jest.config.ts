import type { Config } from '@jest/types';
import { defaults } from 'jest-config';

// Sync object
const config: Config.InitialOptions = {
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
    verbose: true,
    preset: "jest-expo",
    testPathIgnorePatterns: [
        "/node_modules",
        "src/__tests__/mocks",
        "/android",
        "/ios",
    ],
    transform: {
        "\\.[jt]sx?$": "babel-jest",
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/fileTransformer.js',
    },
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!**/coverage/**",
        "!**/node_modules/**",
        "!**/babel.config.js",
        "!**/jest.setup.js"
    ],
    setupFilesAfterEnv: [
        "./jestSetupFile.js",
        "@testing-library/jest-native/extend-expect",
        "jest-styled-components"
    ]
};

export default config;
