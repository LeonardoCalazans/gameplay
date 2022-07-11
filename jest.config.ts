import type { Config } from '@jest/types';
import { defaults } from 'jest-config';

// Sync object
const config: Config.InitialOptions = {
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
    verbose: true,
};

export default config;
