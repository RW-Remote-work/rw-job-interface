import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Flex,
} from '@chakra-ui/react';
import Image from 'next/image';

// 对勾图标组件
const CheckIcon: React.FC = () => (
  <Image
    src="/svg/subtract.svg"
    alt="check"
    width={16}
    height={16}
    style={{ width: '16px', height: '16px' }}
  />
);

interface UpdateResumeModalProps {
  isOpen: boolean;
  onUpdate: () => void;
}

/**
 * 更新简历提示弹窗组件
 * 用于引导用户上传简历并开启 AI 找工作功能
 */
export const UpdateResumeModal: React.FC<UpdateResumeModalProps> = ({
  isOpen,
  onUpdate,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={() => {}} closeOnOverlayClick={false} isCentered>
      <ModalOverlay bg="rgba(0, 0, 0, 0.5)" />
      <ModalContent
        borderRadius="16px"
        bg="white"
        maxWidth="456px"
        mx="auto"
        boxShadow="0px 4px 16px 0px rgba(0, 0, 0, 0.25)"
      >
        {/* 头部 */}
        <ModalHeader
          p="4px 20px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom="1px dashed #ADADAD"
          minHeight="52px"
        >
          <Text
            fontSize="20px"
            fontWeight="400"
            color="#000000"
            fontFamily="Alibaba PuHuiTi 2.0"
          >
            上传简历
          </Text>
        </ModalHeader>

        {/* 内容区域 */}
        <ModalBody p="0px 32px" textAlign="center">
          <Flex direction="column" align="center" gap="16px" py="24px">
            {/* 主标题 */}
            <Text
              fontSize="18px"
              fontWeight="700"
              color="#000000"
              fontFamily="Source Han Sans CN"
              lineHeight="1.444"
            >
              找工作本来就很难！
            </Text>
            
            {/* 副标题 */}
            <Text
              fontSize="14px"
              fontWeight="500"
              color="#84858B"
              fontFamily="Source Han Sans CN"
              lineHeight="1.571"
            >
              借助AI来匹配最合适的工作，提高你的成功率
            </Text>

            {/* 模拟岗位卡片 */}
            <Flex
              direction="column"
              bg="#13172E"
              borderRadius="16px"
              p="16px"
              gap="24px"
              w="100%"
            >
              {/* 标签和薪资行 */}
              <Flex direction="column" gap="12px">
                {/* 标签 */}
                <Flex gap="12px">
                  <Flex
                    bg="#F1F2F3"
                    borderRadius="4px"
                    px="8px"
                    py="2px"
                    h="24px"
                    align="center"
                  >
                    <Text
                      fontSize="12px"
                      fontWeight="500"
                      color="#13172E"
                      fontFamily="Source Han Sans CN"
                    >
                      全职远程
                    </Text>
                  </Flex>
                  <Flex
                    bg="#F1F2F3"
                    borderRadius="4px"
                    px="8px"
                    py="2px"
                    h="24px"
                    align="center"
                  >
                    <Text
                      fontSize="12px"
                      fontWeight="500"
                      color="#13172E"
                      fontFamily="Source Han Sans CN"
                    >
                      美国
                    </Text>
                  </Flex>
                </Flex>
                
                {/* 标题和薪资 */}
                <Flex justify="space-between" align="center">
                  <Text
                    fontSize="16px"
                    fontWeight="700"
                    color="#FFFFFF"
                    fontFamily="Source Han Sans CN"
                  >
                    高级开发人员
                  </Text>
                  <Text
                    fontSize="20px"
                    fontWeight="700"
                    color="#FFFFFF"
                    fontFamily="Alibaba PuHuiTi 2.0"
                  >
                    USD130000-150000/年薪
                  </Text>
                </Flex>
              </Flex>

              {/* 匹配度 */}
              <Flex
                bg="#A2AEF6"
                borderRadius="12px"
                p="12px 16px 8px"
                justify="space-between"
                align="center"
              >
                <Text
                  fontSize="20px"
                  fontWeight="700"
                  color="#13172E"
                  fontFamily="Alibaba PuHuiTi 2.0"
                >
                  👍 非常匹配
                </Text>
                <Text
                  fontSize="40px"
                  fontWeight="700"
                  color="#13172E"
                  fontFamily="Montserrat"
                  letterSpacing="5%"
                  lineHeight="1.2"
                >
                  99%
                </Text>
              </Flex>
            </Flex>

            {/* 功能介绍列表 */}
            <Flex direction="column" align="center" gap="8px" w="100%">
              {/* 第1项 */}
              <Flex align="center" gap="8px" w="100%">
                <CheckIcon />
                <Text
                  fontSize="12px"
                  fontWeight="400"
                  color="#13172E"
                  fontFamily="Source Han Sans CN"
                  lineHeight="1.667"
                >
                  只申请符合你条件的岗位；
                </Text>
              </Flex>
              
              {/* 第2项 */}
              <Flex align="center" gap="8px" w="100%">
                <CheckIcon />
                <Text
                  fontSize="12px"
                  fontWeight="400"
                  color="#13172E"
                  fontFamily="Source Han Sans CN"
                  lineHeight="1.667"
                >
                  根据你的技能，而不仅仅是岗位名称来寻找匹配的工作；
                </Text>
              </Flex>
              
              {/* 第3项 */}
              <Flex align="center" gap="8px" w="100%">
                <CheckIcon />
                <Text
                  fontSize="12px"
                  fontWeight="400"
                  color="#13172E"
                  fontFamily="Source Han Sans CN"
                  lineHeight="1.667"
                >
                  匹配全球工作机会；
                </Text>
              </Flex>
              
              {/* 第4项 */}
              <Flex align="center" gap="8px" w="100%">
                <CheckIcon />
                <Text
                  fontSize="12px"
                  fontWeight="400"
                  color="#13172E"
                  fontFamily="Source Han Sans CN"
                  lineHeight="1.667"
                >
                  想在岗位发布的第一时间进行申请？立马开启我们的订阅岗位功能吧
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>

        {/* 按钮区域 */}
        <ModalFooter
          p="16px 8px 24px"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            bg="#13172E"
            borderRadius="80px"
            height="48px"
            px="28px"
            fontSize="16px"
            fontWeight="500"
            color="white"
            fontFamily="Source Han Sans CN"
            _hover={{ bg: "#2A2F45" }}
            _active={{ bg: "#1A1E35" }}
            onClick={onUpdate}
          >
            <Flex align="center" gap="10px">
              <Text fontSize="16px">✨</Text>
              <Text>立即开启AI找工作</Text>
            </Flex>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateResumeModal;