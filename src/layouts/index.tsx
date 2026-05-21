import { PropsWithChildren } from "react";
import { Main } from "./Main";
import { Meta } from "./Meta";

export interface ILayoutProps extends PropsWithChildren {
  title?: string;
  description?: string;
}
export const Layout = ({ title, description, children }: ILayoutProps) => {
  return (
    <Main
      meta={
        <Meta
          title={title}
          description={description}
        />
      }
    >
      {children}
    </Main>
  );
};
