import { MouseEventHandler, ReactElement } from "react";

export interface ButtonProps {
  text: string;
  className: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon?: { position: "left" | "right"; iconElement: ReactElement };
  disabled?: boolean;
}

const Button = ({ text, className, onClick, icon, disabled }: ButtonProps) => {
  return (
    <div className={`bg-surfe-pink rounded-md ${className}`}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center gap-1 rounded-md font-medium text-sm cursor-pointer px-3 lg:px-6 py-2.5 transition-transform duration-500 ease-out-expo hover:translate-x-[-2px] hover:translate-y-[-2px] ${className}`}
      >
        {icon?.position === "left" ? icon.iconElement : null}
        <p className="hidden lg:flex">{text}</p>
        {icon?.position === "right" ? icon.iconElement : null}
      </button>
    </div>
  );
};

export default Button;
