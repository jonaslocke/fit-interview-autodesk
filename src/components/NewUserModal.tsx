import { FC, FormEvent, useEffect, useState } from "react";
import { Button } from "./Button";
import { useUserData } from "../hooks/useUserData";
type Props = {
  closeMethod: () => void;
};

export const NewUserModal: FC<Props> = ({ closeMethod }) => {
  const { fetchUsers } = useUserData();
  const [id, setId] = useState(0);

  const getUserId = async () => {
    const users = await fetchUsers();
    if (users?.length) {
      setId(users?.length);
    }
  };
  const handleClose = () => {
    closeMethod();
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    getUserId();
  }, []);
  return (
    <div className="bg-black-80 fixed h-100 left-0 top-0 w-100 pa4">
      <div
        className="bg-white w-100 br2 flex flex-column justify-between"
        style={{ minHeight: 300 }}
      >
        <div className="pv3 ph4 bb b--black-30 flex justify-between items-center">
          <h3 className="ma0 mv4">Create item</h3>
          <i
            className="fa-solid fa-circle-xmark cup f4 black-30 hover-black-70"
            onClick={handleClose}
          ></i>
        </div>
        <div className="pv3 ph4">
          <form onSubmit={handleSubmit}>
            <input type="number" name="" id="" value={id} disabled />
          </form>
        </div>
        <div className="pv3 ph4 bt b--black-30 flex justify-between items-center">
          <label className="cup black-80 mv4" htmlFor="create-another">
            <input type="checkbox" name="create-another" id="create-another" />
            <span className="ml2">Create another</span>
          </label>
          <div className="flex">
            <Button
              label="Cancel"
              color="transparent"
              onClickMethod={() => handleClose()}
            />
            <span className="ml2"></span>
            <Button label="Create" />
          </div>
        </div>
      </div>
    </div>
  );
};
