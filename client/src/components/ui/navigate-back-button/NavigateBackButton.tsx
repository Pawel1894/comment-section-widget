import { Link } from "react-router-dom";
import { Button } from "../button/Button";
import { FC } from "react";

type NavigateBackButtonProps = {
  className?: string;
};

export const NavigateBackButton: FC<NavigateBackButtonProps> = ({ className }) => {
  return (
    <Link className={className} to={-1}>
      <Button>Go back</Button>
    </Link>
  );
};
