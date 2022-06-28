declare type TypographyType = {
    variant?: TypographyVariants;
    children?: string | string[] | any;
    style?: StyleProp<TextStyle>;
    textRef?: any;
    id?: string;
    accessibility?: string;
    numberOfLines?: number;
};