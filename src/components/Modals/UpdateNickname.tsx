import { useUser } from '@/hooks/useUser';
import { Input, useToast } from '@chakra-ui/react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useState } from 'react';
import { BaseModal } from '../Modal/BaseModal';

interface UpdateNicknameProps {
}
export default NiceModal.create<UpdateNicknameProps>(({ }) => {
    // Use a hook to manage the modal state
    const modal = useModal();

    const [{ userProfile }, { updateUserNickname }] = useUser()
    const [nickname, setNickname] = useState(userProfile?.displayName || '')
    const toast = useToast()
    const [isLoading, setLoadingStatus] = useState(false)

    const handleUpdate = async () => {
        const realNickname = nickname.trim()
        if (!realNickname) {
            toast({
                title: '昵称不能为空',
                status: 'error'
            })
            return
        }

        setLoadingStatus(true)
        try {
            await updateUserNickname(nickname)
            modal.hide()
        } catch (err: any) {
            toast({
                title: err.detail,
                status: 'error'
            })
            return
        } finally {
            setLoadingStatus(false)
        }
    }



    return (
        <BaseModal
            title="修改昵称"
            onOk={handleUpdate}
            isOpen={modal.visible}
            okBtnProps={{ isLoading }}
            onCancel={() => modal.hide()}
            afterClose={() => modal.remove()}
            contentProps={{
                w: "500px"
            }}
        >
            <Input
                placeholder='请输入你的昵称~'
                value={nickname}
                onChange={e => setNickname(e.target.value)} maxLength={10}
                _focusVisible={{
                    boxShadow: "0 0 0 1px #FEEAE3",
                    border: "1px solid #FCC1AC"
                }}
            />
        </BaseModal >
    );
});