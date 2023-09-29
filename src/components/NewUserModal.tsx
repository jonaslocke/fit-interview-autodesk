import { FC, useEffect, useState } from "react";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
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

  const InputGroupEl = ({
    text,
    identifier,
    disabled,
    required,
    pattern,
    defaultValue,
  }: InputGroup) => {
    const options: RegisterOptions<User, keyof User> | undefined = { required };

    if (pattern) {
      Object.assign(options, { pattern });
    }
    return (
      <fieldset className="bn ma0 pa0 flex flex-column mb3">
        <label className="mb1" htmlFor={identifier}>
          {text}
        </label>
        <input
          className="pa2"
          {...register(identifier, options)}
          disabled={disabled}
          defaultValue={defaultValue}
        />
        {errors[identifier]?.type === "required" && (
          <span className="mt1 orange fw6">This field is required</span>
        )}
        {errors[identifier]?.type === "pattern" && (
          <span className="mt1 orange fw6">
            this doesn't match the criteria{" "}
          </span>
        )}
      </fieldset>
    );
  };

  const headerFooterClasses = (footer: boolean = true) =>
    `pv2-l pv1 ph4-l ph3 ${
      footer ? "bt" : "bb"
    } b--black-30 flex justify-between items-center`;

  useEffect(() => {
    getUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  interface InputGroup {
    identifier: keyof User;
    text: string;
    required: boolean;
    pattern: RegExp | null;
    disabled: boolean;
    defaultValue: string | undefined;
  }

  const inputGroups: InputGroup[] = [
    {
      identifier: "id",
      text: "ID",
      required: false,
      pattern: null,
      disabled: true,
      defaultValue: id.toString(),
    },
    {
      identifier: "first_name",
      text: "First name",
      required: true,
      pattern: null,
      disabled: false,
      defaultValue: undefined,
    },
    {
      identifier: "last_name",
      text: "Last name",
      required: true,
      pattern: null,
      disabled: false,
      defaultValue: undefined,
    },
    {
      identifier: "email",
      text: "E-mail",
      required: true,
      pattern: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
      disabled: false,
      defaultValue: undefined,
    },
  ];

  return (
    <div className="bg-black-80 fixed h-100 left-0 top-0 w-100 pa4-l pa3-ns pa2">
      <div
        className="bg-white w-100 br2 flex flex-column justify-between"
        style={{ minHeight: 300 }}
      >
        <div className={headerFooterClasses(false)}>
          <h3 className="ma0 mv3-l mv2">Create item</h3>
          <i
            className="fa-solid fa-circle-xmark cup f4-l f6-m black-30 hover-black-70"
            onClick={handleClose}
          ></i>
        </div>
        <div
          className="pv2 ph4 w-100"
          style={{ maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="pv4"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            {inputGroups.map((input, index) => (
              <InputGroupEl key={index} {...input} />
            ))}

            <input
              type="submit"
              id="submit-new-user"
              hidden
              disabled={loading}
            />
          </form>
        </div>

        <div className={headerFooterClasses()}>
          <label className="cup black-80 mv3" htmlFor="create-another">
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
            <Button color="transparent" onClickMethod={() => handleClose()}>
              <span>Cancel</span>
            </Button>
            <span className="ml2"></span>
            <label htmlFor="submit-new-user">
              <Button>
                <>{loading ? "Loading..." : "Create"}</>
              </Button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
