import NiceModal, { useModal } from "@ebay/nice-modal-react"
import { ReactNode, useState } from "react"
import { BaseModal, BaseModalProps } from "./BaseModal"
import { Flex, Text } from '@chakra-ui/react'
import { useEventCallback } from "@/hooks/useEventCallback"

interface ConfirmModalProps extends Omit<BaseModalProps, 'isOpen' | 'children' | 'isOkLoading'> {
  autoClose?: boolean
  content?: ReactNode
  description?: string
}


const ConfirmModal = NiceModal.create<ConfirmModalProps>(({ title, content, description, autoClose = true, onOk, onCancel }) => {
  const modal = useModal();

  const [isOkLoading, setOkLoading] = useState(false)

  const handleCancel = useEventCallback(() => {
    setOkLoading(false)
    onCancel?.()
    modal.resolve(false)
    modal.hide()
  })



  const handleOk = useEventCallback(() => {
    if (!autoClose) {
      modal.resolve({
        setOkLoading,
        close: handleCancel,
      })
      return
    }

    onOk?.()
    modal.resolve(true)
    modal.hide()
  })


  return (
    <BaseModal
      isOpen={modal.visible}
      title={title}
      closeBtn
      overlayClosable
      isOkLoading={isOkLoading}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Flex justifyContent="center" alignItems="center" direction="column" rowGap="16px">
        <Text fontSize="20px" fontWeight="500">{content}</Text>
        <Text fontSize="14px" color="#ADADAD">{description}</Text>
      </Flex>
    </BaseModal>
  )
})


export const useConfirmModal = () => {
  return NiceModal.useModal(ConfirmModal)
}
