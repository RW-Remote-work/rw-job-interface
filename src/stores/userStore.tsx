import { GetUserProfileResponse } from "@/__generated__/RwInterfaceApi";
import { useUserAction, useUserSelector } from "@/hooks/useUser";
import { isClient } from "@/utils";
import { userStorage } from "@/utils/Storage";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

export const UserContext = createContext<GetUserProfileResponse | null>(null);
export const UserDispatchContext = createContext<
  Dispatch<SetStateAction<GetUserProfileResponse | null>>
  >(function () { });

interface Props {
  defaultUserProfile: GetUserProfileResponse | null;
}

export const UserContextProvider = ({ defaultUserProfile, children }: PropsWithChildren<Props>) => {
  const [userProfile, setUserProfile] = useState<GetUserProfileResponse | null>(
    defaultUserProfile || null
  );

  return (
    <UserContext.Provider value={userProfile}>
      <UserDispatchContext.Provider value={setUserProfile}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};
