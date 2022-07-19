import React, { FC } from "react";
import { Text } from "./styles";

const Typography: FC<TypographyType> = ({
  textRef = React.createRef(),
  children,
  id = "typography",
  ...rest
}) => (
  <Text
    testID={id}
    accessibility={`${children}`}
    accessibilityLabel={`${children}`}
    ref={textRef}
    {...rest}
  >
    {children}
  </Text>
);

export default Typography;
