import { FC } from "react";
import { ActionsBar } from "./ActionsBar";
type Props = {};

export const Dashboard: FC<Props> = () => {
  return (
    <div className="pa4">
      <h1>Users</h1>
      <ActionsBar />
    </div>
  );
};
