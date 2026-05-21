import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Link,
  LinkProps,
  Stack,
  Text,
  TextProps,
  useOutsideClick,
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import api from "@/api";
import documentIcon from "@/assets/images/document.svg";
import globe from "@/assets/svgs/globe.svg";
import menu from "@/assets/svgs/menu.svg";
import headClose from "@/assets/svgs/head-close.svg";
import frame from "@/assets/images/frame.png";
import avatar from "@/assets/svgs/avatar.svg";
import { useUser } from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { buttonHover } from "@/theme/style";
import { HeaderMenu } from "@/components/HeaderMenu";

import userIdentity from "@/assets/images/userIdentity.png";
import blackArrow from "@/assets/images/blackArrow.svg";
import useModal from "@/hooks/useModal";
import BuyShell from "@/components/Modals/BuyShell";
import NiceModal from "@ebay/nice-modal-react";
import { AccountShellRecord } from "../Modals/AccountShellRecord";
import RWHIRING from "@/assets/images/RWHIRING.svg";
import RWTALENT from "@/assets/images/RWTALENT.svg";
import rightArrowBlack from "@/assets/images/rightArrowBlack.svg";
import { Invite } from "@/components/Modals/Invite";
import { MembershipRedeem } from "@/components/Modals/MembershipRedeem";
import { useTranslation } from "next-i18next";
import { setCookie } from "@/utils/cookies";
import { useMembership } from "@/hooks/useMembership";
import { getLink } from "@/utils/navigation";

// 控制会员功能显示/隐藏的开关
const SHOW_MEMBERSHIP_FEATURES = true;

export interface IProps { }

const linkStyle: LinkProps & TextProps = {
  color: "grey.500",
  fontSize: "14px",
  lineHeight: "17px",
  fontStyle: "normal",
  position: "relative",
  textDecoration: "none",

  _hover: {
    textDecoration: "none",
    color: "grey.800",
  },

  sx: {
    '&::after': {
      content: '""',
      position: "absolute",
      bottom: "-2px",
      left: "0",
      width: "100%",
      height: "1px",
      backgroundColor: "transparent",
      transition: "background-color 0.2s ease",
    },
    '&:hover::after': {
      backgroundColor: "grey.800",
    },
  },
};

const linkActive: LinkProps & TextProps = {
  color: "black",
  sx: {
    '&::after': {
      backgroundColor: "black",
    },
  },
};

export const LinkItem = ({
  name,
  shell = "",
  href,
  isDisabled = false,
  onClick,
}: {
  name: string;
  shell?: string;
  href?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <Link href={href}>
      <Flex
        width="100%"
        justifyContent="space-between"
        _hover={buttonHover}
        _disabled={{ bgColor: "gray.500", cursor: "not-allowed" }}
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) onClick();
        }}
      >
        <Flex flexDirection="column" alignItems="flex-start">
          <Text fontSize="14px" fontWeight="400" color="black.100">
            {" "}
            {name}
          </Text>
          {shell && (
            <Text
              fontSize="12px"
              fontWeight="400"
              color="#84858B"
              lineHeight="20px"
            >
              {" "}
              {t("obtain(shell)shells", { shell: shell })}
            </Text>
          )}
        </Flex>
        <Image width="14px" height="11px" src={blackArrow} alt="" />
      </Flex>
    </Link>
  );
};

const Info = ({ data }: { data: any }) => {
  const ref: any = React.useRef();
  const router = useRouter();
  const [, { logoutMutation }] = useUser();
  const [buyShellModal, { onOpen }] = useModal(BuyShell);
  const { t } = useTranslation();

  // 获取会员状态
  const membership = useMembership(data?.userProfile, t);

  useOutsideClick({
    ref: ref,
    handler: () => data.setIsOpen(false),
  });

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    router.push("/");
  };

  const showAccountShellRecord = () => {
    NiceModal.show(AccountShellRecord);
  };

  return (
    <Box
      onMouseLeave={() => data.setIsOpen(false)}
      ref={ref}
      zIndex={999}
      position="absolute"
      top="53px"
      right="0px"
      bgColor="white"
      width="286px"
      padding="32px"
      borderRadius="10px"
      border="1px solid #E2E8F0"
    >
      <Stack direction="row" spacing="16px">
        <Image
          width="48px"
          height="48px"
          src={data?.userProfile?.avatarUrl || avatar}
          borderRadius="50%"
          alt=""
        />
        <Flex direction="column" justifyContent="space-between">
          <Flex alignItems="center">
            <Text fontSize="16px" fontWeight="700" lineHeight="24px">
              {data?.userProfile?.displayName || "RUU"}
            </Text>
            <Image width="16px" height="16px" src={userIdentity} alt="" />
          </Flex>
          <Text fontSize="12px" fontWeight="400" lineHeight="20px">
            {data?.userProfile?.email}
          </Text>
          {/* 会员到期时间显示 */}
          {membership.isValidMember && (
            <Text 
              fontSize="11px" 
              fontWeight="400" 
              lineHeight="16px"
              color={membership.expireWarning ? membership.expireWarning.color : "#6478F0"}
              mt="2px"
            >
              {membership.displayTexts.endTimeText}
            </Text>
          )}
        </Flex>
      </Stack>
      <Stack spacing="15px" marginTop="30px">
        <Text
          width="100%"
          textAlign="left"
          fontSize="14px"
          fontWeight="400"
          color="black"
        >
          {t("numberOfShells")}
          {data?.communityInfos?.shellAccountAmount || 0}
        </Text>
        <LinkItem
          name={t("ShellBankStatement")}
          onClick={() => {
            showAccountShellRecord();
          }}
        />
        <Flex
          onClick={() => {
            onOpen && onOpen();
          }}
          justifyContent="center"
          alignItems="center"
          padding="0 15px"
          height="40px"
          width="220px"
          borderRadius="29px"
          border="1px solid #000"
          fontSize="12px"
          _hover={buttonHover}
        >
          {t("rechargeShells")}
        </Flex>
        {SHOW_MEMBERSHIP_FEATURES && (
          <Flex
            onClick={() => {
              // 如果用户已经是会员，则不执行操作
              if (!membership.isValidMember) {
                NiceModal.show(MembershipRedeem);
              }
            }}
            justifyContent="center"
            alignItems="center"
            padding="0 15px"
            height="40px"
            width="220px"
            borderRadius="29px"
            border={membership.isValidMember ? "1px solid #CBD5E0" : "1px solid #6366F1"}
            backgroundColor={membership.isValidMember ? "#F7FAFC" : "#F8FAFC"}
            color={membership.isValidMember ? "#A0AEC0" : "#6366F1"}
            fontSize="12px"
            cursor={membership.isValidMember ? "not-allowed" : "pointer"}
            _hover={membership.isValidMember ? {} : {
              backgroundColor: "#6366F1",
              color: "white",
              cursor: "pointer",
            }}
            opacity={membership.isValidMember ? 0.6 : 1}
          >
            {membership.isValidMember ? t("alreadyMember") : t("membershipRedeem")}
          </Flex>
        )}
        <LinkItem name={t("PostRemoteWork")} shell="5" href={"/publish"} />
        <LinkItem
          name={t("ShareTheDigitalNomadBase(StayTuned)")}
          shell="40"
          isDisabled={true}
          href={"/"}
        />
        <LinkItem
          name={t("InviteFriendsToRegister")}
          shell={"20"}
          onClick={() => {
            NiceModal.show(Invite);
          }}
        />
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          height="52px"
          direction="column"
        >
          <Divider />
          <LinkItem name={t("Resume")} href={"/user/resume"} />
          <Divider />
        </Flex>
        <LinkItem name={t("Account")} href={"/user"} />
        <Text
          onClick={handleLogout}
          width="100%"
          textAlign="left"
          fontSize="14px"
          fontWeight="400"
          color="black"
          _hover={buttonHover}
        >
          {t("logOut")}
        </Text>
      </Stack>
      {buyShellModal}
    </Box>
  );
};

function Index() {
  const { t, i18n } = useTranslation("common");

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWorkMenuOpen, setIsWorkMenuOpen] = useState(false);

  const [{ userProfile, isLogin }] = useUser();
  const { isValidMember } = useMembership(undefined, t);
  const { data: communityInfos, refetch } = useQuery({
    queryKey: ["getUserCommunityInfo"],
    queryFn: () => api.web.getUserCommunityInfo(),
    refetchOnWindowFocus: false,
    enabled: isLogin,
  });

  const menuItemsData = {
    label: t("remoteWork"),
    menus: [
      {
        title: t("RWHIRINGStayTuned"),
        titleColor: "#6478F0",
        description: "Find the world’s top talent",
        linkText: t("TalentMarket"),
        link: "/",
        imgSrc: "",
        border: "1px solid #6478F033",
        bgColor: "#6478F01A",
        rightIcon: RWHIRING,
      },
      {
        title: "RW TALENT BAZAAR",
        titleColor: "#F4A882",
        description: "Join the world’s best community",
        linkText: t("DiscoverJobs"),
        link: getLink('JOB', '/'),
        imgSrc: "",
        border: "1px solid #F4A8824D",
        bgColor: "#F4A8821A",
        rightIcon: RWTALENT,
      },
    ],
  };

  const links = [
    {
      label: t("home"),
      path: getLink('MAIN', '/'),
    },
    {
      label: t("Works"),
      path: getLink('JOB', '/'),
    },
    {
      label: t("island"),
      path: getLink('MAIN', '/land'),
    },
    {
      label: t("游民资讯"),
      path: getLink('MAIN', '/rss'),
    },
  ];

  const renderLinks = (isMobile = false) => {
    return links.map((item, index) => (
      <Flex key={item.path} direction="column" width={isMobile ? "100%" : "auto"}>
        <Flex position="relative" width={isMobile ? "100%" : "auto"}>
          <Link
            position="relative"
            key={item.path}
            {...(router.pathname === item.path
              ? { ...linkStyle, ...linkActive }
              : linkStyle)}
            href={item.path}
            width={isMobile ? "100%" : "auto"}
            px={isMobile ? "16px" : 0}
            py={isMobile ? "16px" : 0}
            {...(isMobile
              ? {
                  borderBottom: "none",
                  color: "#13172E",
                  fontWeight: "500",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  _hover: { textDecoration: "none", color: "#13172E" },
                }
              : {})}
            onMouseOver={() => {
              if (!isMobile && item.label === menuItemsData.label)
                setIsWorkMenuOpen(true);
              else setIsWorkMenuOpen(false);
            }}
          >
            {item.label}
          </Link>
          {!isMobile && isWorkMenuOpen && item.label === menuItemsData.label && (
            <HeaderMenu
              menuItems={menuItemsData.menus}
              onMouseLeave={() => {
                setIsWorkMenuOpen(false);
              }}
            ></HeaderMenu>
          )}
        </Flex>
        {/* 临时隐藏分割线
        {isMobile && item.label === t("游民资讯") && (
          <Box mx="16px" height="0.5px" bgColor="#F1F2F3" />
        )}
        */}
      </Flex>
    ));
  };
  const toLogin = async () => {
    router.push(`/login?next=${encodeURIComponent(router.asPath)}`);
  };

  // 跳转到会员介绍组件的函数
  const navigateToMembership = () => {
    if (router.pathname === '/') {
      // 如果在首页，直接滚动到会员介绍组件
      if (typeof document !== 'undefined') {
        const membershipSection = document.getElementById('membership-section');
        if (membershipSection) {
          membershipSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    } else {
      // 如果不在首页，跳转到首页并携带滚动参数
      if (typeof window !== 'undefined') {
        window.location.href = '/?scrollTo=membership';
      }
    }
  };


  {/* Mobile header: always rendered but hidden on md+ via CSS to ensure SSR renders correct styles */}
  const MobileHeader = (
    <Box display={{ base: "block", md: "none" }} zIndex={99} position="fixed" width="100%" borderBottom="1px solid #f2f2f2" background="white">
      <Flex
        justify="space-between"
        alignItems="center"
        height={"56px"}
        padding="0 16px"
      >
        <IconButton
          aria-label="Menu"
          icon={<Image src={isMobileMenuOpen ? headClose : menu} alt="菜单" />}
          variant="ghost"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        <Image src={frame} alt="frame" width="58px" height="32px" />
        <Box position="relative" cursor="pointer" onClick={!isLogin ? toLogin : undefined}>
          <Image
            src={(isLogin && userProfile?.avatarUrl) || avatar}
            alt={t("avatar")}
            width="32px"
            height="32px"
            borderRadius="50%"
            objectFit={"cover"}
          />
          {/* VIP 标识 - 覆盖在头像底部边缘 */}
          {isLogin && isValidMember && (
            <Box
              position="absolute"
              bottom="0"
              left="50%"
              transform="translateX(-50%)"
              px="4px"
              py="0.5px"
              bg="#6366F1"
              borderRadius="3px"
              border="1px solid #6366F1"
              zIndex="1"
              pointerEvents="none"
            >
              <Text
                fontSize="7px"
                fontWeight="600"
                lineHeight="10px"
                color="white"
                textAlign="center"
              >
                VIP
              </Text>
            </Box>
          )}
        </Box>
      </Flex>
      {isMobileMenuOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={0}>
            {renderLinks(true)}
            {/* 临时注释 Figma 中的发布岗位和加入人才库按钮
            <Flex
              justifyContent="space-between"
              alignItems="center"
              px="16px"
              py="16px"
              cursor="pointer"
              onClick={() => { window.location.href = '/publish'; }}
            >
              <Text color="#13172E" fontWeight="500" fontSize="14px">
                {t("post a job")}
              </Text>
              <Image src={rightArrowBlack} alt="" width="12px" height="7px" />
            </Flex>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              px="16px"
              py="16px"
              cursor="pointer"
              onClick={() => { router.push('/work'); }}
            >
              <Text color="#13172E" fontWeight="500" fontSize="14px">
                {t("joinTalentPool")}
              </Text>
              <Image src={rightArrowBlack} alt="" width="12px" height="7px" />
            </Flex>
            */}
          </Stack>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      {MobileHeader}
      <Box
        display={{ base: "none", md: "block" }}
        zIndex={99}
        position="fixed"
        width="100%"
        borderBottom="1px solid #f2f2f2"
        background="white"
      >
        <Flex
          justify="space-between"
          alignItems="center"
          height={"60px"}
          maxWidth={"1200px"}
          margin="0 auto"
        >
          <Flex alignItems="center">
            <Image src={frame} alt="frame" width="62px" height="34px"></Image>
            <Stack direction="row" spacing="40px" marginLeft="72px" height="100%">
              {renderLinks(false)}
            </Stack>
          </Flex>
          <Stack
            direction="row"
            spacing="16px"
            flexDirection="row"
            alignItems="center"
          >
            <IconButton
              aria-label="document"
              icon={<Image src={documentIcon} alt={t("document")} width="24px" height="24px" />}
              variant="ghost"
              onClick={() => {
                window.open(
                  "https://jgooc5ig5w.feishu.cn/docx/doxcnY92GMIrmTsUDbhfeWBSUsf?from=from_parent_sheet",
                  "newWindow"
                );
              }}
            />
            <IconButton
              aria-label="language"
              icon={<Image src={globe} alt="Language Switch" width="24px" height="24px" />}
              variant="ghost"
              onClick={() => {
                const lang = i18n.language === "zh" ? "en" : "zh";
                setCookie("lang", lang);
                router.push(router.asPath, router.asPath, { locale: lang });
              }}
            />

            {!isLogin && (
              <>
                <Button
                  onClick={toLogin}
                  variant="link"
                  color="gray.800"
                  fontWeight="500"
                  fontSize="14px"
                >
                  {t("Login/Register")}
                </Button>
                {SHOW_MEMBERSHIP_FEATURES && (
                  <Button
                    onClick={navigateToMembership}
                    variant="solid"
                    colorScheme="blue"
                    size="sm"
                    borderRadius="29px"
                    bgColor="#13172E"
                    color="white"
                    fontSize="12px"
                  >
                    {t("membershipBenefits")}
                  </Button>
                )}
                <Button
                  onClick={() => {
                    // 使用强制跳转确保页面正常跳转
                    window.location.href = '/publish';
                  }}
                  variant="outline"
                  colorScheme="gray"
                  size="sm"
                  borderRadius="29px"
                  borderColor="#13172E"
                  color="#13172E"
                  fontSize="12px"
                >
                  {t("post a job")}
                </Button>
              </>
            )}

            {isLogin && (
              <>
                {SHOW_MEMBERSHIP_FEATURES && !isValidMember && (
                  <Button
                    onClick={navigateToMembership}
                    variant="solid"
                    colorScheme="blue"
                    size="sm"
                    borderRadius="29px"
                    bgColor="#13172E"
                    color="white"
                    fontSize="12px"
                  >
                    会员权益
                  </Button>
                )}
                <Button
                  onClick={() => {
                    // 使用强制跳转确保页面正常跳转
                    window.location.href = '/publish';
                  }}
                  variant="outline"
                  colorScheme="gray"
                  size="sm"
                  borderRadius="29px"
                  borderColor="#13172E"
                  color="#13172E"
                  fontSize="12px"
                >
                  {t("post a job")}
                </Button>
                <Box position="relative">
                      <Button
                        onMouseEnter={() => {
                      setIsOpen(!isOpen);
                        }}
                    backgroundSize="cover"
                    width="32px"
                    height="32px"
                    minWidth="32px"
                    borderRadius="50%"
                    padding="0"
                    border="0"
                  >
                    <Image
                      src={userProfile?.avatarUrl || avatar}
                      alt={t("avatar")}
                      width="32px"
                      height="32px"
                      borderRadius="50%"
                      objectFit={"cover"}
                    />
                  </Button>
                  {/* VIP 标识 - 覆盖在头像底部边缘 */}
                  {isValidMember && (
                    <Box
                      position="absolute"
                      bottom="0"
                      left="50%"
                      transform="translateX(-50%)"
                      px="6px"
                      py="1px"
                      bg="#6366F1"
                      borderRadius="4px"
                      border="1px solid #6366F1"
                      zIndex="1"
                      pointerEvents="none"
                    >
                      <Text
                        fontSize="8px"
                        fontWeight="600"
                        lineHeight="12px"
                        color="white"
                        textAlign="center"
                      >
                        VIP
                      </Text>
                    </Box>
                  )}
                  {isOpen && (
                    <Info
                      data={{
                        communityInfos,
                        userProfile,
                        setIsOpen: setIsOpen,
                      }}
                    />
                  )}
                </Box>
              </>
            )}
          </Stack>
        </Flex>
      </Box>
    </>
  );
}

export default Index;
