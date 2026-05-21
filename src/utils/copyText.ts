// import { toast } from "./toast";
//
// export const copyText = (value: string, title = '复制成功') => {
//   navigator.clipboard.writeText(value);
//   toast({
//     title,
//     status: 'success',
//     duration: 5000,
//   })
// }

import { toast } from "./toast";

export const copyText = (value: string, title = '复制成功') => {

  if (typeof window !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(value).then(() => {
      console.log("Text copied to clipboard");
    }).catch(err => {
      console.error("Failed to copy text: ", err);
    });
  } else {
    console.error("Clipboard API is not available");
  }

  // 显示成功消息
  toast({
    title,
    status: 'success',
    duration: 5000,
  });

};