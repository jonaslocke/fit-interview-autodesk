import { FC } from "react";
type Props = {
  closeMethod: () => void;
};

export const NewUserModal: FC<Props> = ({ closeMethod }) => {
  const handleClose = () => {
    closeMethod();
  };
  return (
    <div className="bg-black-80 fixed h-100 left-0 top-0 w-100 pa4">
      <div
        className="bg-white w-100 br2 flex flex-column justify-between"
        style={{ minHeight: 300 }}
      >
        <div className="pv3 ph4 bb b--black-30 flex justify-between items-center">
          <h3>Create item</h3>
          <i
            className="fa-solid fa-circle-xmark cup f4 black-30 hover-black-70"
            onClick={handleClose}
          ></i>
        </div>
        <div className="pv3 ph4">body</div>
        <div className="pv3 ph4 bt b--black-30">footer</div>
      </div>
    </div>
  );
};
