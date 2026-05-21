import {
  Box,
  Flex,
  Text,
  Textarea,
  Image,
  BoxProps,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import {
  ChangeEvent,
  forwardRef,
  PropsWithChildren,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { TagButton } from './TagButton';
import closeSvg from '@/assets/icons/close.svg';
import { useEventCallback } from '@/hooks/useEventCallback';

export interface TagSelectorStruct {
  submit: () => { selectedTags: string[]; tags: string[] } | undefined;
  setSelectedTags: (tags: string[]) => void;
  getSelectedTags: () => string[];
}

export interface TagSelectorProps extends Omit<BoxProps, 'onChange'> {
  value?: string[];
  onChange?: (value: string[]) => void;
  onErrorMsgChange?: (value: string) => void;
  maxCount?: number;
  minCount?: number;
  contentLength?: number;
  inputPlaceholder?: string
  disabled?: boolean
}

export const ControlledTagSelector = (props: PropsWithChildren<TagSelectorProps>) => {
  const {
    value = [],
    onChange,
    maxCount = 3,
    minCount = 0,
    contentLength = 12,
    inputPlaceholder,
    disabled,
    ...otherProps
  } = props;
  const [inputValue, setInputValue] = useState('');
  const selectedTags = value;
  const setSelectedTags = onChange || (() => { });

  const [errorMessage, setErrorMessage] = useState('');


  const inputTags = useMemo(() => {
    return inputValue
      .split(',')
      .filter((v) => v.trim())
      .filter(Boolean);
  }, [inputValue]);

  const selectTags = (localTags: string[]) => {
    const newSelectedTags = Array.from(new Set([...selectedTags]));

    localTags.forEach((item) => {
      const localItem = item.trim();

      if (!selectedTags.includes(localItem)) {
        newSelectedTags.push(localItem);
      } else {
        setErrorMessage('标签已存在');
      }
    });

    if (newSelectedTags.length > maxCount) {
      maxWarning();
      return;
    }

    setSelectedTags(newSelectedTags);
  };

  const maxWarning = useCallback(() => {
    setErrorMessage(`最多只能选择${maxCount}个标签`);
  }, [maxCount]);



  const clearSelectedTags = (localTags: string[]) => {
    const newSelectedTags = selectedTags.filter(
      (v) => !localTags.includes(v)
    );
    setErrorMessage('');
    setSelectedTags(newSelectedTags);
  };

  const confirmInputTags = () => {
    if (selectedTags.length >= maxCount) {
      setTimeout(maxWarning, 0);
      return;
    }

    selectTags(inputTags);
    setInputValue('');
  };

  const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const originValue = event.target.value;

    // 去掉空格键入标签逻辑
    // if (newValue && originValue.includes(' ')) {
    //   setTimeout(confirmInputTags);
    //   return;
    // }

    if (originValue.length > contentLength) {
      setErrorMessage(`标签长度不能超过${contentLength}个字符`);
    } else {
      setErrorMessage('');
    }
    setInputValue(originValue);
  };


  const handleErrorMsgChange = useEventCallback(() => {
    props.onErrorMsgChange?.(errorMessage)
  })

  useEffect(() => {
    handleErrorMsgChange()
  }, [errorMessage, handleErrorMsgChange])

  const handleKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code === 'Enter' && event.nativeEvent.isComposing === false) {
      confirmInputTags();
      event.preventDefault();
    }
  };


  return (
    <Box {...otherProps}>
      <Flex
        alignItems="center"
        w="100%"
        mt="19px"
        borderWidth="1px"
        borderColor="primary.900"
        rounded="8px"
        minHeight="82px"
        flexDirection="column"
        p="15px"
        position="relative"
      >
        <Flex
          w="full"
          wrap="wrap"
          rowGap="16px"
          columnGap="24px"
          mb={selectedTags.length ? '14px' : 0}
        >
          {selectedTags.map((tag) => {
            return (
              <TagButton
                tag={tag}
                key={tag}
                selected={true}
                onClick={() => clearSelectedTags([tag])}
                append={
                  <Image
                    ml="14px"
                    w="8px"
                    display="inline-block"
                    src={closeSvg}
                    alt=""
                  />
                }
              />
            );
          })}
        </Flex>
        <Textarea
          resize="none"
          outline="none"
          border="none"
          boxShadow="0 0 0 0 transparent !important"
          p="0"
          value={inputValue}
          disabled={disabled}
          onChange={handleInput}
          onKeyDown={handleKeydown}
          placeholder={inputPlaceholder}
        ></Textarea>
        <Text
          position="absolute"
          bottom="6px"
          right="6px"
          fontSize="14px"
          lineHeight="20px"
          color="#ADADAD"
        >
          ({selectedTags.length}/{maxCount})
        </Text>
      </Flex>
    </Box>
  );
}


ControlledTagSelector.displayName = 'ControlledTagSelector';
