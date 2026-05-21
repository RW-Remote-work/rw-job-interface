import api, { OfflineJobRequest } from '@/api';
import { Button, Flex, Stack, Text, Textarea } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { IModalContentProps } from '@/hooks/useModal';

export interface Data {
  jobId?: number;
  onSuccess?: () => void;
}

function Index({ data, onClose }: IModalContentProps<Data>) {

  const jobId = data?.jobId
  const onSuccess = data?.onSuccess
  const [reason, setReason] = useState('');

  const offlineMutation = useMutation({
    mutationKey: ['offlineMutation'],
    mutationFn: ({ id, data }: { id: number, data: OfflineJobRequest }) => {
      return api.web.offLineJob(id, data);
    },
    onSuccess,
  });

  const handleOffline = async () => {
    try {
      await offlineMutation.mutateAsync({
        id: jobId as number,
        data: {
          offlineReason: reason,
        },
      });
      onClose?.();
    } catch (error) { }
  };
  return (
    <Flex flexDirection="column" alignItems="center">
      <Text
        width="100%"
        padding="15px 20px"
        fontSize="20px"
        fontWeight="400"
        lineHeight="32px"
        color="black"
        fontFamily="Alibaba PuHuiTi 2.0"
        borderBottom="1px dashed #ADADAD"
      >
        编辑名片
      </Text>
      <Flex width="100%" justify="center" alignItems="center" padding="40px">
        <Textarea
          width="100%"
          borderColor="rgba(173, 173, 173, 1)"
          placeholder="请输入请输入标记失效的原因"
          borderRadius="16px"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        ></Textarea>
      </Flex>
      <Stack direction="row" gap="58px" paddingBottom="35px">
        <Button
          width="142px"
          borderRadius="28px"
          fontWeight="medium"
          _hover={{ bg: '' }}
          borderColor="black"
          bg="white"
          variant="outline"
          color="black"

        // onClick={(e) => handleDelivery(e)}
        >
          取消
        </Button>
        <Button
          width="142px"
          borderRadius="28px"
          fontWeight="medium"
          _hover={{ bg: '' }}
          borderColor="black"
          bg="primary.900"
          variant="outline"
          color="#FFF"
          onClick={handleOffline}
        >
          确认标记
        </Button>
      </Stack>
    </Flex>
  );
}

export default Index;
