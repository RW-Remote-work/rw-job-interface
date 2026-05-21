import { Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { memo, PropsWithChildren, useState } from "react";
import LoginInput, { LoginInputProps } from "./LoginInput";

interface PasswordInputProps extends LoginInputProps {
  defaultShowPassword?: boolean
}
const PasswordInput = (props: PropsWithChildren<PasswordInputProps>) => {

  const { defaultShowPassword = false, ...otherProps } = props;

  const [isShowPwd, setShowPwdStatus] = useState(defaultShowPassword);
  return (
    <InputGroup>
      <LoginInput {...otherProps} type={isShowPwd ? "text" : "password"} />
      <InputRightElement>
        <Button
          bg="transparent"
          color="grey.900"
          onClick={() => setShowPwdStatus(!isShowPwd)}
          _active={{}}
          _hover={{}}
        >
          {isShowPwd ? <ViewIcon /> : <ViewOffIcon />}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default memo(PasswordInput);
