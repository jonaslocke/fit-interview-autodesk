import React, { FC } from "react";
type Props = {
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  label?: string;
  onClickMethod?: () => void;
  color?: "primary" | "secondary" | "transparent";
};

export const Button: FC<Props> = ({
  leftIcon,
  rightIcon,
  label,
  onClickMethod,
  color = "primary",
}) => {
  const classes = () => {
    switch (color) {
      case "primary":
        return "bg-primary hover-bg-secondary white";
      case "secondary":
        return "bg-secondary hover-bg-primary white";
      case "transparent":
        return "bg-transparent hover-bg-secondary primary hover-white";
    }
  };
  return (
    <div
      className={`${classes()} ph3 pv2 f4 cup`}
      onClick={() => (onClickMethod ? onClickMethod() : null)}
    >
      {leftIcon ? leftIcon : null}
      {label && (
        <span
          className={`${leftIcon ? "ml3" : ""} ${
            rightIcon ? "mr3" : ""
          } lh-copy fw5`}
        >
          {label}
        </span>
      )}

      {rightIcon ? rightIcon : null}
    </div>
  );
};
