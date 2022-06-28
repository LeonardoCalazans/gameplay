import { Platform } from 'react-native';
import Haptic from 'react-native-haptic';

export const generateHaptic = (haptic: any = 'impact'): void => {
    if (Platform.OS === 'ios') {
        Haptic.generate(haptic);
    }
};
