// import api, { JobDTO, PagingJobRequest, PagingJobResponse } from '@/api';
import { PagingJobResponse } from "@/api";
import { formatDate } from "@/utils/common";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  FlexProps,
  Heading,
  Image,
  Stack,
  Text,
  Tag
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Star from "@/assets/svgs/star.svg";
import StarActive from "@/assets/svgs/star-active.svg";
import useModal from "@/hooks/useModal";
import Delivery from "../Modals/Delivery";
import OfflineJob from "../Modals/OfflineJob";
import { useUserSelector } from "@/hooks/useUser";
// import { useUserAction, useUserSelector } from '@/hooks/useUser';
import { useFavoriteAction } from "@/hooks/useFavorite";
import { JobSalaryType, JobType } from "@/data/constants";
import { TFunction, i18n, useTranslation } from "next-i18next";
// import { useMutation } from '@tanstack/react-query';
// import { ErrorResponse } from '@/types';
// import { toast } from '@/utils';
export enum ActionType {
  APPLY = "APPLY",
  OFFLINE = "OFFLINE",
  DENY = "DENY",
  PENDING_REVIEW = "PENDING_REVIEW",
  ONLINE = "ONLINE",
}
export type JobCardProps = PagingJobResponse &
  FlexProps & {
    /** 卡片操作栏类别 */
    actionType?: ActionType;
    /** 重新请求列表数据 */
    refetch?: () => void;
  };

function JobCard({
  job = { id: 0 },
  labels = [],
  isFavorite,
  favoriteCount,
  actionType = ActionType.APPLY,
  refetch,
  ...containerProps
}: JobCardProps) {
  const router = useRouter();
  const {
    id = 0,
    name,
    type,
    jobClassId,
    currencyName,
    countryId,
    currencyId,
    salaryMin,
    salaryMax,
    salaryType,
    duty,
    requirement,
    companyInfo,
    status,
    publisherId,
    publishTime,
    currencyCode,
    offlineReason,
    jobClassName,
    countryName,
    countryEngName,
    publisherName,
    publisherAvatar,
    recommendFlag
  } = job;
  const { t } = useTranslation();
  const [OfflineModal, { onOpen: offlineOnOpen }] = useModal(OfflineJob, {
    width: 500,
    data: {
      jobId: id,
      onSuccess: refetch,
    },
  });
  const [DeliveryModal, { onOpen }] = useModal(Delivery, {
    width: 500,
    data: id,
    hasTopRightCloseButton: false, // 去除右上角关闭按钮
    closeOnOverlayClick: false, // 禁用点击外部区域关闭弹窗
  });
  const { isLogin } = useUserSelector();
  const { handleFavorite } = useFavoriteAction({
    id,
    isFavorite,
    onSuccess: refetch,
  });

  const handleDelivery = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (isLogin) {
      onOpen();
    } else {
      router.push("/login");
    }
  };

  const handleOffline = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (isLogin) {
      offlineOnOpen();
    } else {
      router.push("/login");
    }
  };

  const handleFavoriteClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    handleFavorite();
  };

  const { isApply, ...containerPropsNoIsApply } = containerProps;

  return (
    <Flex
      padding="24px"
      width="800px"
      maxWidth="800px"
      flexDirection="column"
      borderRadius="4px"
      borderBottom="1px solid"
      borderColor="gray.100"
      background="#fff"
      cursor="pointer"
      _first={{ borderTop: "1px solid", borderColor: "gray.100" }}
      fontFamily="Alibaba PuHuiTi 2.0"
      onClick={() => {
        if (isLogin) {
          window.open(`/detail/${id}`);
        } else {
          const currentUrl = router.asPath || `/detail/${id}`;
          router.push('/login?next=' + encodeURIComponent(currentUrl));
        }
      }}
      _hover={{ bg: "#FBFBFB" }}
      {...containerPropsNoIsApply}
    >
      <Heading as="h5" size="sm" marginBottom="30px">
        {name}
      </Heading>
      <Flex
        flexDirection="row"
        alignItems="center"
        width="100%"
        justifyContent="space-between"
        marginBottom="30px"
        fontWeight="900"
      >

        <Flex>
          {recommendFlag == 1 ? <Tag backgroundColor={"#FEEAE3"} width={"40px"} height={"24px"} color={"#F38B64"} fontSize={"12px"} marginRight={"8px"}>推荐</Tag> : ''}

          <Stack direction="row" alignItems="center" spacing="10px">
            <Text fontSize="14px" color={"#ADADAD"}>
              {/* @ts-ignore: 后端文档类型没改 */}
              {t(JobType[type])}
            </Text>
            <Divider orientation="vertical" borderColor={"#ADADAD"} />
            <Text fontSize="14px" color={"#ADADAD"}>
              {t(jobClassName || "")}
            </Text>
            <Divider orientation="vertical" borderColor={"#ADADAD"} />
            <Text fontSize="14px" color={"#ADADAD"}>
              {i18n?.language === "zh" ? t(countryName || "") : (countryEngName || countryName || "")}
            </Text>
          </Stack>
        </Flex>
        <Flex>
          <Heading as="h5" size="sm" marginRight="40px">
            {i18n?.language === "zh" ? currencyName : currencyCode}
          </Heading>
          <Heading as="h5" size="sm">
            {/*{salaryType?.value !== "UNKNOWN_PAY" ? `${salaryMin}-${salaryMax} / ${salaryType?.desc}` : salaryType?.desc}*/}
            {salaryType !== "UNKNOWN_PAY" && salaryType
              ? `${salaryMin}-${salaryMax} / ` + t(JobSalaryType[salaryType])
              : t(JobSalaryType[salaryType ?? "UNKNOWN_PAY"])}
            {/* {salaryMin} - {salaryMax} / {salaryType?.desc} */}
          </Heading>
        </Flex>
      </Flex>
      <Flex marginBottom="24px" flexDirection="column" position="relative">
        {/* <Heading as="h3" size="md" my="2" fontWeight="900" mb="16px">岗位职责</Heading> */}
        <Text
          mb="4"
          as="p"
          className="ellipsis3"
          dangerouslySetInnerHTML={{
            __html: duty?.replace(/\n/g, "<br/>") || "",
          }}
        ></Text>
        {actionType === ActionType.PENDING_REVIEW && (
          <Button
            position="absolute"
            height="24px"
            right="-4px"
            borderRadius="28px"
            fontWeight="medium"
            _hover={{ bg: "" }}
            border="0"
            bg="rgba(244, 168, 130, 0.20)"
            variant="outline"
            color="black"
          >
            {t('dai-shen-he-0')} </Button>
        )}
        {actionType === ActionType.DENY && (
          <Button
            position="absolute"
            height="24px"
            right="-4px"
            fontWeight="medium"
            _hover={{ bg: "" }}
            border="0"
            bg="purple.100"
            variant="outline"
            color="black"
            borderRadius="30px"
          >
            {t('shen-he-wei-tong-guo')} </Button>
        )}
        {actionType === ActionType.OFFLINE && (
          <Button
            height="24px"
            right="-4px"
            position="absolute"
            fontSize="14px"
            padding="4px 16px"
            fontWeight="medium"
            border="0"
            color="black"
            _hover={{ bg: "" }}
            borderColor="black"
            bg="primary.10"
            variant="outline"
            borderRadius="30px"
          >
            {t('yi-xia-xian')} </Button>
        )}

        {/* <Text>{requirement}</Text> */}
      </Flex>
      <Flex marginBottom="24px">
        {labels.map((item) => (
          <Text key={item.id} marginRight="40px" fontWeight="900">
            #{item.type}/{item.name}
          </Text>
        ))}
      </Flex>
      <Flex justifyContent="space-between">
        <Flex
          alignItems="center"
          fontSize="12px"
          color="rgba(0, 0, 0, 0.5)"
          fontWeight="900"
        >
          <Avatar
            name={publisherName}
            src={publisherAvatar}
            marginRight="16px"
            width="40px"
            height="40px"
          />
          <Text marginRight="8px">
            {publisherName?.slice(0, 5) || publisherId}
          </Text>
          <Text marginRight="8px">·</Text>
          <Text>{formatDate(publishTime || "")}</Text>
        </Flex>
        <Flex alignItems="center" position="relative">
          {actionType === ActionType.APPLY && (
            <Button
              borderRadius="28px"
              fontWeight="medium"
              _hover={{ bg: "" }}
              borderColor="black"
              bg="primary.900"
              variant="outline"
              color="#FFF"
              marginRight="24px"
              onClick={(e) => handleDelivery(e)}
            >
              {t('li-ke-shen-qing')} </Button>
          )}
          {actionType === ActionType.ONLINE && (
            <Button
              borderRadius="28px"
              fontWeight="medium"
              _hover={{ bg: "" }}
              borderColor="black"
              bg="primary.900"
              variant="outline"
              color="#FFF"
              marginRight="24px"
              onClick={(e) => handleOffline(e)}
            >
              {t('biao-ji-shi-xiao')} </Button>
          )}

          <Flex
            onClick={(e) => handleFavoriteClick(e)}
            marginRight="8px"
            width="40px"
            height="40px"
            alignItems="center"
            justifyContent="center"
            borderRadius="50%"
            bg="rgba(217, 217, 217, 0.2)"
          >
            <Image
              src={isFavorite ? StarActive : Star}
              alt={t('shou-cang')}
              width="24px"
              height="24px"
              color="black"
            ></Image>
          </Flex>
          <Box color="rgba(0,0,0,0.2)">{favoriteCount}</Box>
        </Flex>
      </Flex>
      {DeliveryModal}
      {OfflineModal}
    </Flex>
  );
}

export default JobCard;
