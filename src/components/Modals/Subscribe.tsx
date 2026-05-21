import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Checkbox, CheckboxGroup, Divider, Flex, Input, Radio, RadioGroup, Stack, Text, useToast } from '@chakra-ui/react';
import { AreaSelector as SelectSearch } from '../AreaSelector';
import { AreaSelectorStruct } from '../AreaSelector';
import useModal from '@/hooks/useModal';
import api, { AddJobSubscribeRequest } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useUser } from '@/hooks/useUser';

interface SubscribeModalProps {
    jobClasses?: { name: string; value: number }[];
    jobTypes?: { name?: string; value: string }[];
    countryId?: string | undefined;
    jobName?: string;
    selectedJobClass?: string[];
    selectedJobType?: string[];
    selectedCountry?: string;
    onClose?: () => void;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({
    jobClasses = [],
    jobTypes = [],
    countryId,
    jobName,
    selectedJobClass,
    selectedJobType,
    onClose,
}) => {
    const [jobClass, setJobClass] = useState<string>(selectedJobClass?.[selectedJobClass.length - 1] || '');
    const [jobType, setJobType] = useState<string>(selectedJobType?.[selectedJobType.length - 1] || '');
    const [country, setCountry] = useState<string | undefined>(countryId);
    const SelectorRef = useRef<AreaSelectorStruct>(null);
    const [jobKeyword, setJobKeyword] = useState<string>(jobName || '');
    const toast = useToast();
    const router = useRouter();
    const [{ userProfile }] = useUser();

    useEffect(() => {
        setJobClass(selectedJobClass?.[selectedJobClass.length - 1] ?? '');
        setJobType(selectedJobType?.[selectedJobType.length - 1] || '');
    }, [selectedJobClass, selectedJobType, countryId]);

    const handleJobClassChange = (name: string) => {
        if (name === '不限') {
            setJobClass('不限');
        } else {
            setJobClass(name);
        }
    };

    const handleJobTypeChange = (name: string) => {
        setJobType(name);
    };

    const handleCountryChange = (countryId?: string) => {
        setCountry(countryId);
    };

    const addJobSubscribe = useMutation({
        mutationKey: ["addJobSubscribe"],
        mutationFn: () => api.job.addJobSubscribe({
            keywords: [jobKeyword],
            jobClassIds: jobClasses.find(item => item.value.toString() === jobClass)?.value === 0 ? [] : [jobClasses.find(item => item.value.toString() === jobClass)?.value!],
            types: jobTypes.find(item => item.value === jobType)?.value ? [jobTypes.find(item => item.value === jobType)?.value!] : [],
            countryIds: country ? [parseInt(country)] : [0],
            alarmType: 1,
        }),
        onSuccess: () => {
            toast({ title: '订阅成功' });

        }
    });

    const onConfirm = () => {
        addJobSubscribe.mutateAsync();
        onClose?.();
        router.reload();
    };
    const ConfirmationModal = ({
        jobKeyword,
        jobClass,
        jobType,
        country,
        onClose,
        onConfirm
    }: {
        jobKeyword: string;
        jobClass: string;
        jobType: string;
        country: string;
        onClose?: () => void;
        onConfirm?: () => void;
    }) => (
        <Box padding="24px" height="448px" width="449px">
            <Text fontSize="20px" fontWeight="400" textAlign="left" mb="16px">确认订阅的岗位信息</Text>
            <Divider borderStyle="dashed" borderColor="#ADADAD" />
            <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
                p="2px"
            >
                <Flex
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    width="100%"
                    height="90%"
                    mt="50px"
                    ml="250px"
                    mb="120px"
                    fontSize="14px"
                    fontWeight="400">
                    <Flex direction="row" alignItems="flex-start">
                        <Text mb="10px">岗位关键词:</Text> <Text ml="20px" fontSize="12px">{jobKeyword}</Text>
                    </Flex>
                    <Flex direction="row" alignItems="flex-start">
                        <Text mb="10px">职位分类：</Text> <Text ml="20px" fontSize="12px">{jobClass}</Text>
                    </Flex>
                    <Flex direction="row" alignItems="flex-start">
                        <Text mb="10px">工作类型：</Text> <Text ml="20px" fontSize="12px">{jobType}</Text>
                    </Flex>
                    <Flex direction="row" alignItems="flex-start">
                        <Text mb="10px">国家/地区：</Text> <Text ml="20px" fontSize="12px">{country}</Text>
                    </Flex>
                </Flex>
                {/* <Flex direction="column" justifyContent="center" width="100%"> */}
                <Flex justifyContent="center" width="80%" ml="50px">
                    <Button
                        width="142px"
                        height="48px"
                        borderRadius="29px"
                        fontWeight="medium"
                        backgroundColor="white"
                        color="black"
                        border="1px solid black"
                        _hover={{ bg: '' }}
                        onClick={onClose}
                        mr="10px"
                    >
                        返回
                    </Button>
                    <Button
                        width="142px"
                        height="48px"
                        borderRadius="29px"
                        fontWeight="medium"
                        backgroundColor="white"
                        _hover={{ bg: '' }}
                        borderColor="#13172E"
                        bg="primary.900"
                        variant="outline"
                        color="#FFF"
                        onClick={onConfirm}
                    >
                        立即订阅
                    </Button>
                </Flex>
            </Flex>

            {/* </Flex> */}
        </Box >
    );

    const [ConfirmModal, { onOpen }] = useModal(
        //@ts-ignore
        ({ data, onClose }) => (
            <ConfirmationModal
                jobKeyword={data.jobKeyword}
                jobClass={data.jobClass}
                jobType={data.jobType}
                country={data.country}
                onClose={onClose}
                onConfirm={onConfirm}
            />
        ),
        {
            width: 500,
        }
    );

    const handleSubscribeClick = () => {
        const selectedJobClassName = jobClasses.find(item => item.value.toString() === jobClass)?.name || '';
        const selectedJobTypeName = jobTypes.find(item => item.value === jobType)?.name || '';
        const countryName = SelectorRef.current?.getCountryName() || '不限';
        if (jobKeyword.trim() === '' || selectedJobTypeName === '') return toast({ title: '请输入必填信息' })
        onOpen({
            jobKeyword,
            jobClass: selectedJobClassName,
            jobType: selectedJobTypeName,
            country: countryName
        });
    };

    return (
        <Box padding="24px" >
            <Text fontSize="20px" fontWeight="400" textAlign="left" mb="16px" ml="50px">
                订阅最新岗位信息
            </Text>
            <Divider borderStyle="dashed" borderColor="#ADADAD" />
            <Flex
                direction="column"
                alignItems="flex-start"
                ml="50px"
                mt="16px"
                fontSize="14px"
                fontWeight="400"
            >
                <Flex direction="row" alignItems="center" width="100%" mb="16px">
                    <Text width="20%">岗位关键词<Text as="span" color="red.500">*</Text></Text>
                    <Input
                        placeholder="请输入岗位关键词"
                        width="50%"
                        size="sm"
                        fontSize="14px"
                        value={jobKeyword}
                        onChange={(e) => setJobKeyword(e.target.value)}
                    />
                </Flex>

                <Text mb="8px">职位分类</Text>
                <RadioGroup value={jobClass} onChange={(value) => handleJobClassChange(value)}>
                    <Flex wrap="wrap" justifyContent="space-between" width="100%" >
                        {jobClasses.map((item) => (
                            <Radio
                                key={item.value.toString()}
                                value={item.value.toString()}
                                borderColor="gray.500"
                                width="30%"
                                mb="8px"
                                size="sm"
                            >
                                {item.name}
                            </Radio>
                        ))}
                    </Flex>
                </RadioGroup>

                <Text marginTop="16px" mb="8px">
                    工作类型<Text as="span" color="red.500">*</Text>
                </Text>
                <RadioGroup value={jobType} onChange={(value) => handleJobTypeChange(value)}>
                    <Flex wrap="wrap" justifyContent="space-between" width="100%">
                        {jobTypes.map((item) => (
                            <Radio
                                key={item.value}
                                value={item.value}

                                width="50%"
                                mb="8px"
                                size="sm"
                                borderColor="gray.500"
                            >
                                {item.name}
                            </Radio>
                        ))}
                    </Flex>
                </RadioGroup>
                <Flex direction="row" alignItems="center" width="100%" mb="16px">
                    <Text mr="70px" mb="20px">国家/地区</Text>
                    <SelectSearch
                        showLabel={false}
                        showArea={false}
                        ref={SelectorRef}
                        defaultAddressIds={[countryId]}
                        onChange={handleCountryChange}
                    />
                </Flex>

                <Flex direction="row" alignItems="flex-end" width="100%" mb="16px">
                    <Text mr="80px">订阅邮箱</Text>
                    <Text mt="4px">{userProfile?.email}</Text>
                </Flex>


                <Flex justifyContent="center" direction="column" alignItems="center" width="100%" my="16px">
                    <Button
                        width="142px"
                        height="48px"
                        borderRadius="24px"
                        fontWeight="medium"
                        size="xs"
                        backgroundColor="#13172E"
                        color="#FFF"
                        _hover={{ bg: '#13172E' }}
                        onClick={handleSubscribeClick}
                    >
                        确认订阅
                    </Button>
                    <Text my="10px" fontSize="12px" color="#3B3D46" fontFamily="Alibaba PuHuiTi 2.0" textAlign="center">10 枚贝壳/30天</Text>

                </Flex>
                <Text fontSize="12px" color="#00000066" fontFamily="Alibaba PuHuiTi 2.0" mt="30px">1、每次订阅时效为 30 天，中途取消订阅将不退回贝壳</Text>
                <Text fontSize="12px" color="#00000066" fontFamily="Alibaba PuHuiTi 2.0" >2、每天推送符合条件的新岗位，若无新岗位则当日无邮件推送</Text>
                <Text fontSize="12px" color="#00000066" fontFamily="Alibaba PuHuiTi 2.0" >3、最多同时订阅 3 个岗位信息</Text>
            </Flex>
            {ConfirmModal}
        </Box>


    );
};

export default SubscribeModal;
