// import { buttonHover } from '@/theme/style';
import {
  Flex,
  Text,
  Image,
  Stack,
  Link,
  FlexProps,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

import logo from '@/assets/images/logo.png';
// import { BeatLoader } from 'react-spinners';

export interface LoginProps extends FlexProps {
  isRegister?: boolean;
  //   title: string;
  //   desc: string;
  //   link: string;
  //   cover: string;
}

function LoginCard({ isRegister, ...containerProps }: LoginProps) {
  return (
    <Flex
      padding="26px 47px"
      width="450px"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      borderRadius="20px"
      border="1px solid"
      borderColor="#C7F5E7"
      background="#FFF"
      {...containerProps}
    >
      <Image
        width="114px"
        height="62px"
        marginBottom="55px"
        src={logo}
        alt="Remote Worker Labs Logo"
      />
      {/* <h1>账号注册</h1> */}
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <FormControl>
          <Input
            marginBottom="40px"
            borderColor="rgba(0, 0, 0, 0.5)"
            focusBorderColor="rgba(100, 120, 240, 1)"
            variant="flushed"
            type="text"
            placeholder="邮箱"
          />
          <Input
            marginBottom="45px"
            borderColor="rgba(0, 0, 0, 0.5)"
            focusBorderColor="rgba(100, 120, 240, 1)"
            variant="flushed"
            type="password"
            placeholder="密码"
          />
          <Button
            // isLoading={true}
            colorScheme="blue"
            // spinner={<BeatLoader size={8} color='white' />}
            height="60px"
            width="356px"
            background="#6478F0"
            borderRadius="40px"
            color="white"
            fontSize="24px"
            fontWeight="bold"
          >
            登录
          </Button>
        </FormControl>
        <Text fontWeight="400" marginBottom="90px" marginTop="16px">
          忘记密码
        </Text>
        <Text fontWeight="400">
          还没有账号？立即
          <Link color="rgba(19, 14, 199, 1)" textDecoration="underline">
            注册
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}

export default LoginCard;
