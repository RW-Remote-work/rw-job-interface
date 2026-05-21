import api, { PagingShellAccoutFlowResponse } from "@/api";
import {Box, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import Loading from "../Loading";
import { BaseModal } from "../Modal/BaseModal";
import Pagination from "../Pagination";
import { SimplePagination } from "../Pagination/SimplePagination";

type ReasonType = PagingShellAccoutFlowResponse['reasonType'] & {}

const ReasonTypeMapping: Record<ReasonType, string> = {
    'GET_JOB_CONTACT': '获取联系方式',
    'ATTEND_OFFLINE_ACTIVITY': '参加线下活动',
    'ATTEND_ONLINE_ACTIVITY': '参加线上活动',
    'LIVE_OFFLINE_SPACE': '线下空间直播',
    'APPLY_JOB': '申请岗位',
    // 'DEDUCT_OTHER': '扣除',
    'FULFILL_INFO': '完善信息',
    'ADD_JOB': '发布岗位',
    'BUY_SHELL': '购买贝壳',
    "OTHER": '其他',
    // 'ADD_OTHER': '增加',
    'UNLOCK_RESUME_DETAIL':'解锁简历详情',
    'ADD_RESUME':'完善简历',
    'INVITATION':'邀请'
}

export const AccountShellRecord = NiceModal.create(() => {
    const modal = useModal()

    const [page, setPage] = useState(1)

    const { data: response, status } = useQuery({
        queryKey: ['getUserAccountFlow', page],
        queryFn() {
            return api.shell.getUserAccountFlow({
                page:page,
                size:4
            })
        }
    })

    const list = useMemo(() => {
        return response?.records || []
    }, [response])

    const thStyle = {
        px: '24px',
        py: '9px',
        fontSize: '14px',
        lineHeight: '22px',
        color: '#54555D',
        fontWeight: 'bold'
    }

    const tdStyle = {
        px: '24px',
        py: '15px',
        fontSize: '14px',
        lineHeight: '22px',
        color: '#54555D'
    }

    return (
        <BaseModal
            isOpen={modal.visible}
            afterClose={() => modal.remove()}
            onCancel={() => modal.hide()}
            bodyProps={{
                p: '12px'
            }}
            footer={null}
            title="贝壳流水记录"
        >
            <Box>
            <Table variant="unstyled" layout="fixed" maxH={'calc(80vh - 50px)'}>
                <Thead>
                    <Tr>
                        <Th {...thStyle}>类型</Th>
                        <Th {...thStyle}>贝壳数量</Th>
                        <Th {...thStyle}>时间</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        list.map(item => {
                            return (
                                <Tr key={item.id}>
                                    <Td {...tdStyle}>{item.reasonType ? ReasonTypeMapping[item.reasonType] : '--'}</Td>
                                    <Td {...tdStyle}>{item.type === 'PLUS' ? `+ ${item.quantity}` : `- ${item.quantity}`}</Td>
                                    <Td {...tdStyle}>{item.time}</Td>
                                </Tr>
                            )
                        })
                    }
                    {
                        list.length === 0 && status === 'success' ? (
                            <Tr>
                                <Td colSpan={3} {...tdStyle} textAlign="center" py="44px">暂无数据</Td>
                            </Tr>
                        ) : null
                    }

                    {
                        status === "loading" ? (
                            <Tr>
                                <Td colSpan={3}>
                                    <Loading display="flex" justifyContent="center" py="44px" />
                                </Td>
                            </Tr>
                        ) : null
                    }
                </Tbody>
            </Table>

            <SimplePagination justifyContent="center"  page={page} onChange={setPage} total={response?.total} />
            </Box>
        </BaseModal>
    )
})
