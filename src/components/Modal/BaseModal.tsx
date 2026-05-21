'use client'
import { useEventCallback } from "@/hooks/useEventCallback";
import { Button, ButtonProps, CSSVarsProps, Flex, Modal, ModalBody, ModalBodyProps, ModalCloseButton, ModalCloseButtonProps, ModalContent, ModalContentProps, ModalFooter, ModalFooterProps, ModalHeader, ModalHeaderProps, ModalOverlay, ModalProps, SystemCSSProperties } from "@chakra-ui/react";
import { PropsWithChildren, useEffect } from "react";
import { useLatest, useUpdate, useUpdateEffect } from "react-use";
import { CloseIcon } from "../Icons";

export interface BaseModalProps extends Omit<ModalProps, 'onClose'> {

    contentProps?: ModalContentProps
    headerProps?: ModalHeaderProps
    bodyProps?: ModalBodyProps
    footerProps?: ModalFooterProps
    closeBtnProps?: ModalCloseButtonProps


    closeBtn?: null | React.ReactNode
    footer?: null | React.ReactNode

    overlayClosable?: boolean
    overlay?: boolean
    title?: string

    isOkLoading?: boolean
    okText?: string
    okBtnProps?: ButtonProps
    /**
     * 点击确认按钮时触发， 未传递时， 不渲染确认按钮
     * @returns 
     */
    onOk?: () => void

    cancelText?: string
    cancelBtnProps?: ButtonProps
    /**
     * 点击取消按钮 | 关闭图标 时触发， 未传递时， 不渲染取消按钮
     * @returns 
     */
    onCancel?: () => void

    afterClose?: () => void
}

export const BaseModal = ({
    contentProps, headerProps, bodyProps, footerProps, closeBtnProps, okBtnProps, cancelBtnProps,
    title = 'Title', overlay = true, overlayClosable = true, okText = '确认', cancelText = '取消', isOkLoading = false,
    children, closeBtn = true, footer = true,
    onOverlayClick, onOk, onCancel, afterClose,
    ...otherProps
}: PropsWithChildren<BaseModalProps>) => {


    const afterCloseLatest = useLatest(afterClose)

    useUpdateEffect(() => {
        let timer: NodeJS.Timer | null = null
        if (!otherProps.isOpen) {
            timer = setTimeout(() => {
                afterCloseLatest.current?.()
            }, 300)
        }

        return () => {
            timer && clearTimeout(timer)
        }
    }, [otherProps.isOpen])


    const renderCloseIcon = () => {
        if (!closeBtn || !onCancel) return null

        if (closeBtn === true) return (
            <ModalCloseButton w="24px" h="24px" right="24px" top="25px" {...closeBtnProps}>
                <CloseIcon w="12px" h="12px" />
            </ModalCloseButton>
        )

        return <ModalCloseButton w="24px" h="24px" right="24px" top="25px" {...closeBtnProps}>{closeBtn}</ModalCloseButton>
    }

    const renderFooter = () => {
        if (!footer) return null

        if (footer === true) return (
            <ModalFooter py="8px" justifyContent="center" gap="58px" {...footerProps}>
                {
                    onCancel ? (
                        <Button
                            variant='outline' rounded="44px" p="10px" fontSize="18px" lineHeight="157%" w="142px"
                            {...cancelBtnProps}
                            onClick={() => {
                                onCancel?.()
                            }}
                        >{cancelText}</Button>
                    ) : null
                }

                {
                    onOk ? (
                        <Button
                            variant='solid' rounded="44px" p="10px" fontSize="18px" lineHeight="157%" w="142px"
                            isLoading={isOkLoading}
                            {...okBtnProps}
                            onClick={() => {
                                onOk?.()
                            }}
                        >{okText}</Button>
                    ) : null
                }
            </ModalFooter >
        )

        return (
            <ModalFooter py="8px" {...footerProps} />
        )
    }


    return <Modal  {...otherProps} onClose={() => {
        onCancel?.()
    }}>
        {
            overlay ? (
                <ModalOverlay onClick={() => {
                    overlayClosable && onCancel?.()
                }} />
            ) : null
        }
        <ModalContent w="640px" maxW="892px" maxHeight="80vh" pb="24px" m="auto" rounded="16px" position="relative" top="0%" {...contentProps}>
            <ModalHeader
                borderBottom="1px dashed #ADADAD"
                fontSize="18px"
                fontWeight="400"
                color="#000"
                p="24px"
                {...headerProps}
            >
                {title}
            </ModalHeader>


            {renderCloseIcon()}

            <ModalBody py="32px" maxHeight="80vh" px="24px" {...bodyProps}>
                {children}
            </ModalBody>

            {renderFooter()}
        </ModalContent>
    </Modal>
}