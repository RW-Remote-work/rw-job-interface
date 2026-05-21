import NiceModal from '@ebay/nice-modal-react';
import { PaymentMethodModal, PaymentMethodModalProps } from './PaymentMethodModal';

const NicePaymentMethodModal = NiceModal.create<PaymentMethodModalProps>((props) => {
    const modal = NiceModal.useModal();
    console.log('NicePaymentMethodModal 渲染，props:', props);
    console.log('modal.visible:', modal.visible);
    return (
        <PaymentMethodModal
            {...props}
            isOpen={modal.visible}
            onCancel={() => modal.hide()}
        />
    );
});

export const usePaymentMethodModal = () => {
    return NiceModal.useModal(NicePaymentMethodModal);
};
