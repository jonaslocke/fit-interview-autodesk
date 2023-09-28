import { Button } from "./Button";

export const ActionsBar = () => {
  return (
    <div className="flex justify-between pv2">
      <Button
        leftIcon={<i className="fa-solid fa-plus"></i>}
        label="Create item"
      />
      <div>1</div>
    </div>
  );
};
