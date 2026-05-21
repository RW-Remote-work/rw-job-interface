import React, { useRef, useState } from 'react';
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  Text,
  Button,
} from '@chakra-ui/react';
import { AreaSelector, AreaSelectorStruct } from '@/components/AreaSelector';
import { TagSelector, TagSelectorStruct } from '../TagSelector';
import { identityTagKeys, hobbyTagKeys } from '@/data/tags';
import { useTranslation } from 'next-i18next';
import { textNormalStyle } from '@/theme/style';
import api, { GetUserProfileResponse, UserCommunityInfoResponse } from '@/api';
import { IModalContentProps } from '@/hooks/useModal';
import { useUserSelector } from '@/hooks/useUser';
import { UserAvatarUpload } from '../AvatarUpload';
import NiceModal from '@ebay/nice-modal-react';
import UpdateNickname from './UpdateNickname';
import { Pencil02Icon } from '../Icons/Pencil-02';

export interface Data {
  userProfile: GetUserProfileResponse;
  communityInfos: UserCommunityInfoResponse;
  refresh: () => Promise<void>
}

const tabs = [
  {
    id: 1,
    name: '坐标',
  },
  {
    id: 2,
    name: '标签',
  },
  {
    id: 3,
    name: '兴趣爱好',
  },
  {
    id: 4,
    name: '自我介绍',
  },
];

function Index({ data, onClose }: IModalContentProps<Data>) {
  const { t } = useTranslation();
  const { userProfile } = useUserSelector()
  const [selfIntro, setSelfIntro] = useState(
    data?.userProfile?.selfIntroduction || ''
  );
  const [isLoading, setIsLoading] = useState(false)
  const areaSelectorRef = useRef<AreaSelectorStruct>(null);
  const identityTagRef = useRef<TagSelectorStruct>(null);
  const hobbyTagRef = useRef<TagSelectorStruct>(null);

  const identityTags = identityTagKeys.map(key => t(key));
  const hobbyTags = hobbyTagKeys.map(key => t(key));

  const renderSelfIntroduction = () => {
    return (
      <Box w="100%" position="relative">
        <Textarea
          w="100%"
          {...textNormalStyle}
          value={selfIntro}
          onChange={(e) => setSelfIntro(e.target.value)}
          color="black"
          placeholder="一段有趣的自我介绍，是小伙伴认识你的第一印象！"
          px="19px"
          py="15px"
          resize="none"
          border="1px solid #eee"
          bg="#F8F8F8"
          rounded="16px"
          rows={7}
          maxLength={30}
          _focus={{ border: '1px solid #000', shadow: 'none' }}
        />
        <Text
          position="absolute"
          bottom="6px"
          right="6px"
          fontSize="14px"
          lineHeight="20px"
          color="#ADADAD"
          zIndex="1"
        >
          ({selfIntro.length}/30)
        </Text>
      </Box>
    );
  };
  const handleSubmit = async () => {
    try {

      const areaResult: any = areaSelectorRef?.current?.submit();
      const identityResult = identityTagRef?.current?.submit();
      const hobbyTagResult = hobbyTagRef?.current?.submit();

      setIsLoading(true)
      await Promise.all([
        api.web.updateUserRegion({
          cityId: areaResult?.area?.value,
          countryId: areaResult?.country?.value
        }),
        api.web.updateUserHobbyList(hobbyTagResult?.selectedTags as string[]),
        api.web.updateUserLabel(identityResult?.selectedTags as string[]),
        api.web.updateSelfIntroduction({
          selfIntroduction: selfIntro,
        }),
      ]);
      await data?.refresh()
      onClose?.()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  };

  const showUpdateNicknameModal = () => {
    NiceModal.show(UpdateNickname)
  };

  return (
    <Flex flexDirection="column" paddingBottom="34px" width="100%">
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
      <Flex
        width="100%"
        flexDirection="column"
        alignItems="center"
        justify="center"
        padding="26px 0"
      >

        <UserAvatarUpload />

        <Flex mb="24px" mt="8px" alignItems="center">
          <Text
            px="4px" py="8px" fontSize="14px" lineHeight="22px"
          >{userProfile?.displayName}</Text>
          <Pencil02Icon cursor="pointer" onClick={() => showUpdateNicknameModal()} />
        </Flex>

        <Tabs
          variant="unstyled"
          //   width="475px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <TabList
            // padding="25px 32px"
            // bgColor="#EAF8F1"
            borderRadius="8px"
            gap="50px"
          // border="1px solid rgba(175, 235, 185, 0.3)"
          >
            {tabs.map((item) => {
              return (
                <Tab
                  key={item.id}
                  padding="0"
                  fontSize="14px"
                  fontWeight="400"
                  lineHeight={'24px'}
                  color="#ADADAD"
                  _selected={{
                    color: 'black',
                    borderBottom: '2px solid black',
                  }}
                >
                  {item.name}
                </Tab>
              );
            })}
          </TabList>
          <TabPanels>
            <TabPanel paddingTop="48px">
              <AreaSelector
                ref={areaSelectorRef}
                defaultAddressIds={[
                  data?.userProfile?.countryId?.toString() as string,
                  data?.userProfile?.areaId?.toString() as string,
                ]}
              />
            </TabPanel>
            <TabPanel width="512px">
              <TagSelector
                key="identity"
                ref={identityTagRef}
                tags={identityTags}
                defaultSelectedTags={data?.userProfile?.labelList}
                minCount={1}
                maxCount={3}
                inputPlaceholder="请输入文字添加自定义标签，按 Enter 分隔~"
              />
            </TabPanel>
            <TabPanel width="418px">
              <TagSelector
                key="hobby"
                ref={hobbyTagRef}
                tags={hobbyTags}
                defaultSelectedTags={data?.userProfile?.hobbyList}
                minCount={1}
                maxCount={3}
                inputPlaceholder="请输入文字添加你的兴趣爱好，按 Enter 分隔~"
              />
            </TabPanel>
            <TabPanel width="520px">{renderSelfIntroduction()}</TabPanel>
          </TabPanels>
        </Tabs>
        <Button
          isLoading={isLoading}
          onClick={handleSubmit}
          marginTop="24px"
          width="142px"
          height="42px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          borderRadius="44px"
        >
          保存
        </Button>
      </Flex>
    </Flex >
  );
}
export default Index;
