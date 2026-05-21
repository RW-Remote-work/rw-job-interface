import { useFileSelector } from "@/hooks/useFileSelector";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { useCounter, useDropArea } from "react-use";
import { PlusIcon } from "../Icons/Plus";
import api from "@/api";

export interface UploadFile {
    name: string;
    url: string;
}

interface SingleDragUploadProps {
    uploadFile?: UploadFile;
    onChange?: (uploadFile: UploadFile) => void;
    onDelete?: () => void;
}

export const SingleDragUpload = memo(({ uploadFile, onChange, onDelete, ...otherProps }: SingleDragUploadProps) => {


    const [bond, state] = useDropArea({
        onFiles: files => {
            const [file] = files;
            api.admin.uploadResume({file: file}).then(r=>{
                onChange?.({
                    name: file.name,
                    url: r.resumeUrl||""
                })
            })
        },
    });


    const { selectFile } = useFileSelector({
        max: 1,
        onChange(event) {
            const file = event.target.files?.[0];
            if (!file) return
            api.admin.uploadResume({file: file}).then(r=>{
                onChange?.({
                    name: file.name,
                    url: r.resumeUrl||""
                })
            })
        }
    })


    return (
        <Box
            {...bond}
            border="1px solid #CCCED1"
            rounded="8px"
            bg="#F1F2F3"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minH="96px"
            cursor={uploadFile ? "default" : "pointer"}
            transition="all 0.2s"
            borderColor={state.over ? "#5A6CD8" : "#CCCED1"}
            {...otherProps}
            onClick={() => {
                uploadFile || selectFile()
            }}
        >
            {
                uploadFile ? (
                    <>
                        <Text fontSize="16px" color="#000" lineHeight="24px" mb="2px">{uploadFile.name}</Text>
                        <Button variant="link" fontSize="14px" color="#5A6CD8" onClick={() => onDelete?.()}>删除</Button>
                    </>
                ) : (
                    <>
                        <PlusIcon />
                        <Text mt="12px" fontSize="14px" color="#13172E">拖拽或点击上传</Text>
                    </>
                )
            }

        </Box>
    )
})

SingleDragUpload.displayName = "SingleDragUpload";