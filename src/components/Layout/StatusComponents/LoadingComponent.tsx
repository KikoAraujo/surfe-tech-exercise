import { Icons } from "../../Icons";

const LoadingComponent = () => {
  return (
    <div data-testid="loading_component" className="flex justify-center">
      <div className="animate-spin">
        {Icons.ellipse("h-14 w-14", "#073742")}
      </div>
    </div>
  );
};

export default LoadingComponent;
