import NiceModal, {useModal} from "@ebay/nice-modal-react";
import {BaseModal} from "@/components/Modal/BaseModal";
import {useRouter} from "next/router";
import {Button, Flex, Text} from "@chakra-ui/react";
import {CopyIcon} from "@chakra-ui/icons";
import {copyText, isClient} from "@/utils";
import {useUserSelector} from "@/hooks/useUser";
import * as process from "process";
import {useEffect,useState} from "react";

export const Invite = NiceModal.create(()=> {
    const { userProfile } = useUserSelector()
    // console.log(userProfile)
    const inviteCode = userProfile?.invitationCode
    const modal = useModal()
    const router = useRouter();

    const [link, setLink] = useState("https://www.nomaddao.club/register")
    // const link = "http://localhost:3000/register/"+inviteCode

    useEffect(() => {
        const isProd = process.env.NEXT_PUBLIC_NODE_ENV === 'test'
        console.log(process.env.NODE_ENV)
        setLink(isProd?"https://test.nomaddao.club/register/"+inviteCode:"https://www.nomaddao.club/register/"+inviteCode)
    }, [inviteCode]);

    return (
        <BaseModal
            isOpen={modal.visible}
            onCancel={() => modal.remove()}
            footer={false}
            title="邀请好友注册"
            headerProps={{width:"640px",height:"62px"}}
            bodyProps={{height:"378px",width:"640px"}}
            closeBtn={true}
        >
            <Flex width={"508px"} height={"249px"} flexDirection={"column"}  alignItems={"center"} margin={"auto"} >
                <Text fontWeight="500" fontSize="24px">
                    邀请好友赚取贝壳
                </Text>
                <Text whiteSpace="pre-wrap" marginTop={"27px"} fontWeight={400} fontSize={"15px"} textAlign={"center"} color={"#84858B"}>
                    将RW数字游民社区分享给你最好的朋友，共同探索数字游民新世界，{'\n'}
                    朋友越多，你的数字游民生活越精彩！
                </Text>
                <Flex marginTop={"24px"} style={{width:"430px",height:"52px",border: "1px solid #13172E",borderRadius:"32px",alignItems:"center",justifyContent:"center"}}>
                    <Text fontWeight={"400"} overflow={"hidden"} fontSize={"14px"} maxWidth={"250px"} whiteSpace={"nowrap"} textOverflow={"ellipsis"}>{link}</Text>
                    <Button onClick={()=>copyText(link,'复制成功,快去分享吧')} style={{background:"white",color:"#000000",fontSize:"14px",fontWeight:"500"}}><CopyIcon>复制专属注册链接</CopyIcon>复制专属注册链接</Button>
                </Flex>
                <Text whiteSpace="pre-wrap" textAlign={"center"} marginTop={"24px"} fontSize={"12px"} fontWeight={"400"} color={"#5A6CD8"}>通过你的链接加入社区的小伙伴将额外获得10枚贝壳奖励， {'\n'}作为分享感谢我们也将赠送你20枚贝壳。贝壳奖励上限为1000枚</Text>
            </Flex>
        </BaseModal>)
});