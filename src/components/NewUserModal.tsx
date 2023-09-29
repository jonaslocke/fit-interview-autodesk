import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToastie } from "../hooks/useToastie";
import { useUserData } from "../hooks/useUserData";
import { User } from "../types";
import { Button } from "./Button";

type Props = {
  closeMethod: () => void;
};

export const NewUserModal: FC<Props> = ({ closeMethod }) => {
  const { fetchUsers, createUser } = useUserData();
  const { success, error } = useToastie();

  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [keepOpen, setKeepOpen] = useState(false);

  const getUserId = async () => {
    const users = await fetchUsers();
    if (users?.length) {
      setId(users?.length);
    }
  };
  const handleClose = () => {
    reset();
    closeMethod();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = async (user) => {
    user.id = id;
    setLoading(true);
    const response = await createUser(user);

    if (!response.ok) {
      error("Some went wrong on this creation");
      setLoading(false);
      return;
    }

    const userData = await response.json();
    console.log(userData);

    success("User created successfully");
    reset();

    setLoading(false);
    if (!keepOpen) {
      handleClose();
    }
  };

  const classes = {
    input: `input-reset mv3 db w-100 pa3`,
    label: `db mt4`,
    span: `db mb2`,
  };

  useEffect(() => {
    getUserId();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-50 pv4"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <label className={classes.label} htmlFor="id">
              <span className={classes.span}>ID</span>
              <input
                className={classes.input}
                value={id}
                {...register("id")}
                disabled
              />
            </label>
            <label htmlFor="first_name" className={classes.label}>
              <span className={classes.span}>First Name</span>
              <input
                className={classes.input}
                {...register("first_name", { required: true })}
              />
              {errors.first_name && <span>This field is required</span>}
            </label>
            <label htmlFor="first_name" className={classes.label}>
              <span className={classes.span}>Last Name</span>
              <input
                className={classes.input}
                {...register("last_name", { required: true })}
              />
              {errors.last_name && <span>This field is required</span>}
            </label>
            <label htmlFor="first_name" className={classes.label}>
              <span className={classes.span}>E-mail</span>
              <input
                className={classes.input}
                {...register("email", {
                  required: true,
                  pattern: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                })}
              />
              {errors.email?.type === "required" && (
                <span>This field is required</span>
              )}
              {errors.email?.type === "pattern" && (
                <span>this email doesn't match the criteria </span>
              )}
            </label>
            <input
              type="submit"
              id="submit-new-user"
              hidden
              disabled={loading}
            />
          </form>
        </div>
        <div className="pv3 ph4 bt b--black-30 flex justify-between items-center">
          <label className="cup black-80 mv4" htmlFor="create-another">
            <input
              type="checkbox"
              name="create-another"
              id="create-another"
              checked={keepOpen}
              onChange={() => setKeepOpen((prev) => !prev)}
            />
            <span className="ml2">Create another</span>
          </label>
          <div className="flex">
            <Button
              label="Cancel"
              color="transparent"
              onClickMethod={() => handleClose()}
            />
            <span className="ml2"></span>
            <label htmlFor="submit-new-user">
              <Button label={loading ? "Loading..." : "Create"} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
