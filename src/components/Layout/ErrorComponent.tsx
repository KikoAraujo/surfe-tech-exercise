import Button from "../Buttons";

const ErrorComponent = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <p>Ups! Something went wrong...</p>
      {/* Refresh Page Button */}
      <Button
        text={"Try Again"}
        className="bg-surfe-dark-blue text-neutral-50"
        onClick={() => window.location.reload()}
      />
    </div>
  );
};

export default ErrorComponent;
