import api, { UpdateSocialMediaRequest, UserCommunityInfoResponse } from '@/api';
import { IModalContentProps } from '@/hooks/useModal';
import { Flex, Stack, Text, Input, Button } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';

export interface Data {
    communityInfos?: UserCommunityInfoResponse;
    refetch: () => Promise<void>
}

function Index({ data }: IModalContentProps<Data>) {
    const communityInfos = data?.communityInfos;

    const [publicAccounts, setPublicAccounts] = useState(
        communityInfos?.publicAccounts
    );
    const [redId, setRedId] = useState(communityInfos?.redId);
    const [instagramId, setInstagramId] = useState(communityInfos?.instagramId);

    const updateSocialMediaMutation = useMutation({
        mutationKey: ['updateSocialMedia'],
        mutationFn: ({ data }: { data: UpdateSocialMediaRequest }) => {
            return api.web.updateSocialMedia(data)
        },
        onSuccess: data?.refetch
    });

    const handleUpdate = async () => {
        try {

            await updateSocialMediaMutation.mutateAsync({
                data: {
                    publicAccounts,
                    redId,
                    instagramId
                }

            })
        } catch (error) {

        }
    };

    return (
        <Flex width="100%" flexDirection="column" alignItems="center">
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
                社交媒体
            </Text>
            <Stack
                spacing={30}
                padding="40px"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Flex flexDirection="row" gap="17px" alignItems="center">
                    <Text width="68px" fontSize="14px" textAlign="right" color="rgba(173, 173, 173, 1)">公众号</Text>
                    <Input
                        w="294px"
                        h="34px"
                        rounded="30px"
                        color="grey.900"
                        value={publicAccounts}
                        onChange={(e) => {
                            setPublicAccounts(e.target.value);
                        }}
                        placeholder="请添加你的公众号"
                    />
                </Flex>
                <Flex flexDirection="row" gap="17px" alignItems="center">
                    <Text width="68px" fontSize="14px" textAlign="right" color="rgba(173, 173, 173, 1)">小红书</Text>
                    <Input
                        w="294px"
                        h="34px"
                        rounded="30px"
                        color="grey.900"
                        value={redId}
                        onChange={(e) => {
                            setRedId(e.target.value);
                        }}
                        placeholder="请添加你的小红书账号"
                    />
                </Flex>
                <Flex flexDirection="row" gap="17px" alignItems="center">
                    <Text width="68px" fontSize="14px" textAlign="right" color="rgba(173, 173, 173, 1)">instagram</Text>
                    <Input
                        w="294px"
                        h="34px"
                        rounded="30px"
                        color="grey.900"
                        value={instagramId}
                        onChange={(e) => {
                            setInstagramId(e.target.value);
                        }}
                        placeholder="请添加你的instagram"
                    />
                </Flex>
            </Stack>
            <Button
                isLoading={updateSocialMediaMutation.isLoading}
                width="142px"
                marginBottom="35px"
                borderRadius="28px"
                fontWeight="medium"
                _hover={{ bg: '' }}
                borderColor="black"
                bg="primary.900"
                variant="outline"
                color="#FFF"
                onClick={handleUpdate}
            //   onClick={handleOffline}
            >
                保存
            </Button>
        </Flex>
    );
}

export default Index;
