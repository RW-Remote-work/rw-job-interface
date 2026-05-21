import NiceModal, {useModal} from "@ebay/nice-modal-react";
import {BaseModal} from "@/components/Modal/BaseModal";
import {useRouter} from "next/router";
import {Text} from "@chakra-ui/react";

export const FinishModels = NiceModal.create(()=> {
    const modal = useModal()
    const router = useRouter();
    
    const handleOk = async () => {
        modal.hide(); // 先关闭Modal
        await router.replace(`/user/resume`);
    };
    
    return (
        <BaseModal
            isOpen={modal.visible}
            onOk={handleOk}
            footer={true}
            title="提交人才简历"
            headerProps={{width:"640px",height:"62px"}}
            bodyProps={{height:"221px",width:"640px",textAlign:"center"}}
        >
            <Text fontWeight="500" fontSize="40px">
                提交成功！
            </Text>
        </BaseModal>)
});
