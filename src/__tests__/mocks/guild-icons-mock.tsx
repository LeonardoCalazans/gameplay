import React from 'react';
import { View } from 'react-native';

interface MockGuildIconsProps {
    guildId: string;
    iconId: string;
}

const mockGuildIcons: React.FC<MockGuildIconsProps> =
({
    guildId,
    iconId
}) => {
    return (
        <View testID={`mocked-guild-icons${guildId}${iconId}`} />
    );
};

export { mockGuildIcons };