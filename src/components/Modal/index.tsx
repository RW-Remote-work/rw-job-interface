import {
    ModalBody,
    Modal,
    ModalContent,
    ModalOverlay,
    ModalProps,
    Image,
    ModalContentProps,
  } from '@chakra-ui/react';
  import React, { cloneElement } from 'react';
  
  import px2vw from '@/theme/utils/px2vw';
  import { buttonHover } from '@/theme/style';
  
  import close from '@/assets/icons/close.svg';
  
  // import { buttonHover } from '@/theme/utils';
  export * from './PaymentModal';
  export * from './usePaymentModal';
  export * from './PaymentMethodModal';
  export * from './usePaymentMethodModal';
  export interface IModalProps extends ModalProps {
    hasBg?: boolean; //是否有背景
    hasCloseButton?: boolean; //是否有叉叉的关闭按钮
    hasTopRightCloseButton?: boolean; //是否有右上方的关闭按钮
    hasBottomRightCloseButton?: boolean; //是否有下方的关闭按钮
    footerRender?: () => React.ReactNode;
    width?: number; //最小宽度
    padding?: number; //内边剧
    modalBodyProps?: any;
    modalContentProps?: ModalContentProps;
    bg?: string; // 背景色
    data?: any;
    onCloseButtonClick?: () => void;
    onSuccess?: () => void; // 成功回调
    onApply?: () => void; // 申请回调
    isApply?: boolean; // 是否已申请
    children: any;
  
    // | React.ReactNode
    // | ReactElement<any, string | JSXElementConstructor<any>>
    // | ((props: {
    //     isOpen: boolean
    //     onClose: () => void
    //     data?: any
    //   }) => ReactElement<any, string | JSXElementConstructor<any>>)
  }
  
  function Index({
    isOpen,
    data,
    isCentered = true,
    children,
    width = 640,
    padding = 0,
    bg = '',
    hasTopRightCloseButton = true,
    onClose,
    onSuccess,
  
    modalContentProps,
    modalBodyProps,
    ...otherModalProps
  }: IModalProps) {
    // 提取 Modal 相关的 props 和其他 props
    const {
      hasBg,
      hasCloseButton,
      hasBottomRightCloseButton,
      footerRender,
      onCloseButtonClick,
      ...childProps
    } = otherModalProps;
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={isCentered}
        {...childProps}
      >
        <ModalOverlay />
        <ModalContent
          zIndex={9999}
          position="relative"
          // 下面这一行在生产环境会导致modal 没垂直居中， 在顶上显示， 但是在开发环境没问题
          // 先注释掉
          // marginTop={{ base: 'inherit', lg: 'inherit', xl: 'inherit' }}
          background={bg || 'white'}
          borderRadius="16px"
          boxShadow="0px 4px 16px rgba(0, 0, 0, 0.25)"
          w={{ base: '92vw', lg: width }}
          maxW="initial"
          maxH="100vh"
          {...modalContentProps}
        >
          <ModalBody
            minHeight={{ base: px2vw(200), lg: '200px' }}
            padding={{ base: px2vw(padding), lg: `${padding}px` }}
            {...modalBodyProps}
          >
            {typeof children === 'function'
              ? children({
                  isOpen,
                  onClose,
                  data,
                  onSuccess,
                  ...childProps,
                })
              : children
              ? React.Children.map(children, (child) =>
                  child
                    ? cloneElement(child, {
                        isOpen,
                        onClose,
                        data,
                        onSuccess,
                        ...childProps,
                      })
                    : child
                )
              : children}
          </ModalBody>
          {hasTopRightCloseButton && (
            <Image
              position="absolute"
              width="12px"
              height="12px"
              top={{ base: px2vw(34), lg: '26px' }}
              right={{ base: px2vw(34), lg: '26px' }}
              src={close}
              ignoreFallback
              _hover={buttonHover}
              onClick={onClose}
              alt=""
            />
          )}
        </ModalContent>
      </Modal>
    );
  }
  export default Index;
  