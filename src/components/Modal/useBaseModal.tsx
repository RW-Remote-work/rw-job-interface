import NiceModal from "@ebay/nice-modal-react";
import { BaseModal, BaseModalProps } from "./BaseModal";

const NiceBaseModal = NiceModal.create<BaseModalProps>(BaseModal)


export const useBaseModal = () => {
  return NiceModal.useModal(NiceBaseModal)
}
