import api from "@/api"

export const isUserExist = async (email: string): Promise<boolean> => {
    const res = await api.web.checkEmailExists(email)
    return res.exists || false
}