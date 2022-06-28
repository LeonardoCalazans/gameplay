import React, { FC } from 'react';

import { Text } from './styles';

const Typography: FC<TypographyType> = ({
  style = [{}],
  textRef = React.createRef(),
  variant = 'body',
  children,
  id,
  ...rest
}) => (
  <Text
    testID={id}
    accessibility={`${children}`}
    accessibilityLabel={`${children}`}
    ref={textRef}
    style={style}
    variant={variant}
    {...rest}
  >
    {children}
  </Text>
);

export default Typography;
