import React, { useState } from "react";
import { Button, Flex, Text, Image, useClipboard } from "@chakra-ui/react";
import { copyText } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import api from "@/api";
import { ErrorResponse } from "@/types";
import share from "public/svg/share.svg";
import link from "public/svg/link.svg";
import { useTranslation } from "next-i18next";
import { on } from "events";
import { toast as showToast } from "@/utils/toast";

export interface IProps {
    data: number;
    onClose?: () => void;
}

/** 文章详情弹窗 */
export default function RssDetail({ onClose, data }: IProps) {
    const { t } = useTranslation();
    const { hasCopied, onCopy } = useClipboard(window.location.href);
    const { data: article, isLoading } = useQuery({
        queryKey: ["getArticlesId", data],
        queryFn: () =>
            api.rss.getArticlesId(data),
        refetchOnWindowFocus: false,
        enabled: !!data,
    });

    console.log("article", article);

    const openUrl = (url: string) => {

        window.open(url, '_blank');
    }

    const rssDetailModal = () => (
        <Flex flexDirection="column" padding="0 42px 34px 42px" width="800px">
            <Text
                width="100%"
                padding="15px 20px"
                fontSize="20px"
                fontWeight="400"
                lineHeight="32px"
                color="black"
                textAlign="center"
            >
                {article?.title}
            </Text>
            {isLoading ? (
                <Flex justifyContent="center" alignItems="center" height="100%">
                    <Loading />
                </Flex>
            ) : (
                <Flex flexDirection={"column"}>
                    <Flex justifyContent={"right"} marginBottom={"19px"}>
                        <Flex
                            _hover={{ backgroundColor: "rgba(217, 217, 217, 0.2)" }}
                            cursor="pointer"
                            onClick={() => { onCopy(); showToast({ title: t("复制成功,快去分享吧"), status: 'success', duration: 5000, }) }}
                        >
                            <Image width={"12.8px"} src={share} alt="分享"></Image>
                            <Text paddingLeft={"8px"} fontSize='12px'>{t("分享")}</Text>
                        </Flex>
                        <Flex
                            marginLeft={"28px"}
                            cursor="pointer"
                            onClick={() => openUrl(article?.link || '')}
                        >
                            <Image width={"12.8px"} src={link} alt="链接"></Image>
                            <Text paddingLeft={"8px"} fontSize='12px'>{t("查看原文")}</Text>
                        </Flex>
                    </Flex>

                    {
                        (article?.link?.includes("xiaohongshu")) && <Flex
                            overflowX={"hidden"}
                            height={"50vh"}
                        >
                            <Flex
                                flexDirection={"column"}
                                width={"480px"}
                                marginRight={"16px"}
                                className="hidden-text"
                                dangerouslySetInnerHTML={{ __html: article?.description?.replace(/\n/g, "<br/>") || "", }}
                            >
                            </Flex>
                            <Flex
                                flexDirection={"column"}
                                width={"320px"}
                                className="hidden-img"
                                dangerouslySetInnerHTML={{ __html: article?.description?.replace(/\n/g, "<br/>") || "", }}
                            >
                            </Flex>
                        </Flex>
                    }

                    {(article?.link?.includes("youtube")) && <Flex
                        overflowX={"hidden"}
                        height={"50vh"}
                        flexDirection={"column"}
                        width="100%"
                    >
                        <Flex
                            flex={3}
                            maxHeight="60%"
                            minHeight="480px"
                        >
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ border: "none", minHeight: "300px" }}
                                src={article?.link.replace('watch?v=', 'embed/') + '?autoplay=1&controls=1'}
                            ></iframe>
                        </Flex>
                        <Flex
                            flex={1}
                            flexDirection={"column"}
                            width="100%"
                            // overflow="auto"
                            className="hidden-img"
                            dangerouslySetInnerHTML={{ __html: article?.description?.replace(/\n/g, "<br/>") || "", }}
                        ></Flex>
                    </Flex>}

                    {(article?.link?.includes("spotify")) && <Flex
                        overflowX={"hidden"}
                        height={"50vh"}
                        flexDirection={"column"}
                    >
                        <Flex width="100%" flexDirection={"column"}>
                            <audio style={{ width: '100%' }} controls src={article?.mp3Url}></audio>
                            <Text
                                textAlign="center"
                                fontSize="12px"
                                color="gray.600"
                                mt="2"
                            >
                                {t('yin-pin-wei-yu-lan-yin-pin-wan-zheng')}
                            </Text>
                        </Flex>
                        <Flex
                            marginTop={"16px"}
                            flexDirection={"column"}
                            className="hidden-img"
                            dangerouslySetInnerHTML={{ __html: article?.description?.replace(/\n/g, "<br/>") || "", }}
                        >
                        </Flex>
                    </Flex>}

                </Flex>
            )}
            {/* <Button
        width="142px"
        height="48px"
        borderRadius="44px"
        fontWeight="medium"
        marginTop="40px"
        alignSelf="center"
        _hover={{ bg: "" }}
        borderColor="black"
        onClick={onClose}
      >
        记下啦
      </Button> */}
        </Flex>
    );
    return <>{rssDetailModal()}</>;
}
function toast(arg0: { title: any; status: string; duration: number; }): React.ReactNode | Iterable<React.ReactNode> {
    throw new Error("Function not implemented.");
}
