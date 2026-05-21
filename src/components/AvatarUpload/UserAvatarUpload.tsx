import { PropsWithChildren, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import { useUser } from "@/hooks/useUser";
import { AvatarUpload, AvatarUploadProps } from "./AvatarUpload";

interface UserAvatarUploadProps extends AvatarUploadProps {
    /**
     * 初始头像
     * 为 undefined, 会使用 用户信息 里的 avatarUrl
     * 为 null, 会使用 Empty 组件
     * 为 string, 会使用 传入的 url
     * @default undefined
     */
    initAvatarUrl?: string | null
}

export const UserAvatarUpload = ({
    initAvatarUrl, ...otherProps
}: PropsWithChildren<UserAvatarUploadProps>) => {

    const [{ userProfile }, { updateUser }] = useUser()
    const [url, setUrl] = useState(() => {
        if (initAvatarUrl === null) {
            return undefined
        }
        if (initAvatarUrl === undefined) {
            return userProfile?.avatarUrl
        }
        return initAvatarUrl
    })

    const updateAvatarUrlMutation = useMutation({
        mutationFn(url: string) {
            return api.web.updateAvatarUrl({
                avatarUrl: url,
            });
        },
        onSuccess(_, url) {
            updateUser((oldV) => ({ ...oldV, avatarUrl: url }));
        },
    });



    return (
        <AvatarUpload
            url={url}
            onChange={(url) => {
                setUrl(url)
                updateAvatarUrlMutation.mutate(url)
            }}
            {...otherProps}
        />
    );
};
