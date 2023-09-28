import React, { FC } from "react";
type Props = {
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  label?: string;
  onClickMethod?: () => void;
};

export const Button: FC<Props> = ({
  leftIcon,
  rightIcon,
  label,
  onClickMethod,
}) => {
  return (
    <div
      className="bg-primary white ph3 pv2 f4 cup hover-bg-secondary"
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
