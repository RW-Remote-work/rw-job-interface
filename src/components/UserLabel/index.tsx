import { TextProps, Text, Image } from '@chakra-ui/react';
import close from '@/assets/icons/close.svg';
import { buttonHover } from '@/theme/style';
export interface UserLabelProps extends TextProps {
  isSelected: boolean;
}

export default function UserLabel({
  isSelected,
  children,
  ...otherProps
}: UserLabelProps) {
  return (
    <Text
      width="fit-content"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      fontSize="14px"
      fontWeight="500"
      lineHeight="20px"
      color={isSelected ? 'black' : '#616161'}
      bgColor={isSelected ? '#EAF8F1' : '#F2F2F2'}
      padding="4px 10px"
      borderRadius="8px"
      _hover={buttonHover}
      {...otherProps}
    >
      {children}

      {isSelected && <Image marginLeft="15px" src={close} width="6px" alt="" />}
    </Text>
  );
}
