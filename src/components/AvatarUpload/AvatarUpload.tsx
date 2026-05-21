import { Box, BoxProps, Image, useToast } from "@chakra-ui/react";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Camera01Icon } from "@/components/Icons";
import DashedCircle from "@/assets/svgs/dashed-circle.svg";
import { useHover } from "react-use";
import { useMutation } from "@tanstack/react-query";
import api from "@/api";

export interface AvatarUploadProps extends Omit<BoxProps, 'url' | 'onChange'> {
    size?: number

    url?: string

    onChange?: (url: string) => void

    id?: string
}
const AVATAR_SIZE_LIMIT = 1024 * 1024 * 1;

const Empty = (props: BoxProps) => {
    return (
        <Box
            cursor="pointer"
            _hover={{
                filter: "brightness(0.97)"
            }}
            transition="all 0.3s"
            {...props}
        >
            <Image src={DashedCircle} alt="" />
            <Camera01Icon
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
            />
        </Box>
    )
}
export const AvatarUpload = ({
    size = 90, url, onChange, ...otherProps
}: PropsWithChildren<AvatarUploadProps>) => {

    const toast = useToast()

    const [localUrl, setLocalUrl] = useState(url);

    useEffect(() => {
        setLocalUrl(url)
    }, [url])

    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadAvatarMutation = useMutation({
        mutationFn() {
            return api.web.uploadAvatar({
                file: fileInputRef.current?.files?.[0]!,
            });
        },
        onSuccess(response) {
            onChange?.(response.avatarUrl!);
            setLocalUrl(response.avatarUrl || "");
        },
        onError(error) {
            toast({
                title: '上传失败',
                status: "error",
            });
            onChange?.(localUrl || '');

        }
    });


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > AVATAR_SIZE_LIMIT) {
            return toast({
                title: "图片大小不能超过1M",
                status: "error",
            });
        }
        const blobUrl = URL.createObjectURL(file);
        setLocalUrl(blobUrl);
        uploadAvatarMutation.mutate();
    };

    const handleToUpload = () => {
        fileInputRef.current?.click();
    }

    const [hoverable] = useHover((hovered) => {
        return (
            <Box w="100%" h="100%">
                <Image src={localUrl} w="100%" h="100%" objectFit="cover" alt="" />
                <Empty
                    position="absolute"
                    zIndex={1}
                    top={0}
                    transition="opacity 0.3s"
                    opacity={hovered ? 0.6 : 0}
                    onClick={handleToUpload}
                />
            </Box>
        )
    });

    return (
        <Box w={size} h={size} rounded="50%" position="relative" overflow="hidden" {...otherProps}>
            {localUrl ? hoverable : <Empty onClick={handleToUpload} />}

            <input
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                maxLength={1}
                type="file"
                hidden
            />
        </Box>
    );
};
