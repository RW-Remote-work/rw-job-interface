import React, { useState, useRef } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { copyText, toast } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import api from "@/api";
import { ErrorResponse } from "@/types";
export interface IProps {
  data: number;
  onClose?: () => void;
  onApply?: () => void; // 申请函数，由外部传入
  isApply?: boolean; // 是否已申请
}

/** 投递方式弹窗 */
export default function Delivery({ onClose, data, onApply, isApply }: IProps) {
  // 调试信息：查看接收到的所有 props
  console.log('Delivery component props:', { onClose, data, onApply, isApply });
  
  // 使用 ref 来跟踪是否已经在这个 Modal 实例中申请过，防止重复申请
  const hasAppliedInThisSession = useRef(false);

  // 处理弹窗关闭，只有在未申请时才触发申请
  const handleClose = () => {
    console.log('Delivery modal closing, isApply:', isApply, 'hasAppliedInThisSession:', hasAppliedInThisSession.current);
    
    // 只有在以下条件都满足时才触发申请：
    // 1. 外部传入的 isApply 为 false（表示外部认为还未申请）
    // 2. 在这个 Modal 实例中还没有申请过
    // 3. 有申请函数可以调用
    if (!isApply && !hasAppliedInThisSession.current && onApply) {
      console.log('Job not applied yet, triggering apply...');
      hasAppliedInThisSession.current = true; // 标记为已申请，防止重复申请
      onApply();
    } else {
      console.log('Job already applied or no apply function, skipping apply...');
    }
    
    if (onClose) {
      onClose();
    }
  };

  const { data: deliveries, isLoading } = useQuery({
    queryKey: ["getJobDeliver", data],
    queryFn: () =>
      api.web.getJobDeliver(data).then((res) => {
        return [
          {
            label: "邮箱",
            value: res.deliverEmail ? `${res.deliverEmail} (备注来自RW实验室+岗位名称)` : '--',
          },
          {
            label: "微信",
            value: res.deliverWechat,
          },
          {
            label: "Telegram",
            value: res.deliverTelegram,
          },
          {
            label: "网址",
            value: res.deliverWebsite,
          },
        ];
      }),
    refetchOnWindowFocus: false,
    enabled: !!data,
  });



  const deliveryModal = () => (
    <Flex 
      flexDirection="column" 
      padding={{ base: "0 20px 24px 20px", lg: "0 42px 34px 42px" }} 
      width={{ base: "100%", lg: "500px" }}
    >
      <Text
        width="100%"
        padding="15px 20px"
        fontSize="20px"
        fontWeight="400"
        lineHeight="32px"
        color="black"
        textAlign="center"
      >
        投递方式
      </Text>
      {isLoading ? (
        <Flex justifyContent="center" alignItems="center" height="100%">
          <Loading />
        </Flex>
      ) : (
        <>
          {deliveries?.filter(item => item.value && item.value !== '--').map((item) => (
            <Flex key={item.label} direction="column" padding="20px 0">
              <Text fontWeight="700" fontSize="16px" color="primary.600">
                {item.label}
              </Text>
              <Flex justifyContent="space-between">
                <Text
                  fontWeight="900"
                  fontSize={{ base: "16px", lg: "20px" }}
                  overflowWrap="break-word"
                  wordBreak="break-word"
                >
                  {item.value || "--"}
                </Text>
                {item.value ? (
                  <Button
                    width="66px"
                    height="28px"
                    borderRadius="44px"
                    fontWeight="medium"
                    _hover={{ bg: "" }}
                    borderColor="black"
                    variant="outline"
                    onClick={() => copyText(item.value || "")}
                  >
                    复制
                  </Button>
                ) : null}
              </Flex>
            </Flex>
          ))}
          <Flex key={"tip"} direction="column" padding="20px 0">
            <Text fontWeight="700" fontSize="16px" color="gray.500">
              Tips
            </Text>
            <Flex justifyContent="space-between">
              <Text fontWeight="400" fontSize="14px" color="gray.500">
                欢迎发送简历到rwdaoclub@gmail.com，加入RW实验室岗位人才库获得内部推荐机会。
              </Text>
            </Flex>
          </Flex>
        </>
      )}
      <Button
        width="142px"
        height="48px"
        borderRadius="44px"
        fontWeight="medium"
        marginTop="40px"
        alignSelf="center"
        _hover={{ bg: "" }}
        borderColor="black"
        onClick={handleClose}
      >
        记下啦
      </Button>
    </Flex>
  );
  return <>{deliveryModal()}</>;
}
