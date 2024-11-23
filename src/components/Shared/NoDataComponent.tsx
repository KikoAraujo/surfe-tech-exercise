import { ReactElement } from "react";

interface NoDataComponentProps {
  title: string;
  subTitle: string | ReactElement;
}

const NoDataComponent = ({ title, subTitle }: NoDataComponentProps) => {
  return (
    <div className="flex items-center flex-col font-semibold cursor-default gap-2">
      <img
        src="https://www.surfe.com/wp-content/uploads/2024/01/Surfer-Paddling-576x320.png"
        height="250"
        width="350"
        alt="Surfe no data image"
      />
      <p className="text-surfe-dark-blue text-xl">{title}</p>
      <p className="text-surfe-dark-blue">{subTitle}</p>
    </div>
  );
};

export default NoDataComponent;
