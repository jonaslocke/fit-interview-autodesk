import React, { FC } from "react";
type Props = {
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  children?: JSX.Element;
  onClickMethod?: () => void;
  color?: "primary" | "secondary" | "transparent";
};

export const Button: FC<Props> = ({
  leftIcon,
  rightIcon,
  children,
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
      className={`${classes()} ph3 pv2 f4-l f6-m cup`}
      onClick={() => (onClickMethod ? onClickMethod() : null)}
    >
      {leftIcon ? leftIcon : null}

      {children && <span className="lh-copy fw5">{children}</span>}

      {rightIcon ? rightIcon : null}
    </div>
  );
};
