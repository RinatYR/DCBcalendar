import type { Config } from '@jest/types';
import { jsWithBabel as tsjPreset } from 'ts-jest/presets';

const config: Config.InitialOptions = {
    globals: {
        BUILD_VERSION: '',
        LATEST_COMMIT_HASH: '',
        'ts-jest': {},
    },
    testEnvironment: 'jsdom',
    testRunner: 'jest-jasmine2',
    moduleDirectories: ['node_modules', 'src'],
    setupFilesAfterEnv: ['<rootDir>/tools/jestSetup.ts'],
    transform: {
        ...tsjPreset.transform,
    },
    transformIgnorePatterns: ['node_modules/(?!(@sbbol|@sberbusiness)/.*)'],
    verbose: true,
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^.+\\.(css|less)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '__mocks__/fileMock.ts',
    },
};

export default config;
