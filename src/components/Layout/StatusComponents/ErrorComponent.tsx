import DefaultButton from "../../Shared/Buttons/DefaultButton";

const ErrorComponent = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <p>Ups! Something went wrong...</p>
      {/* Refresh Page Button */}
      <DefaultButton
        text={"Try Again"}
        className="bg-surfe-dark-blue text-neutral-50"
        onClick={() => window.location.reload()}
      />
    </div>
  );
};

export default ErrorComponent;
