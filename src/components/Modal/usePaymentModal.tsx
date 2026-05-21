import NiceModal from '@ebay/nice-modal-react';
import { PaymentModal, PaymentModalProps } from './PaymentModal';

const NicePaymentModal = NiceModal.create<PaymentModalProps>((props) => {
    const modal = NiceModal.useModal();
    console.log('NicePaymentModal 渲染，props:', props);
    console.log('modal.visible:', modal.visible);
    return (
        <PaymentModal
            {...props}
            isOpen={modal.visible}
            onCancel={() => modal.hide()}
        />
    );
});

export const usePaymentModal = () => {
    return NiceModal.useModal(NicePaymentModal);
};