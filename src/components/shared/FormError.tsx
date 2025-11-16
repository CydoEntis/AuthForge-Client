type FormErrorProps = {
  message: string;
};

function FormError({ message }: FormErrorProps) {
  return (
    <div className="gap-4 text-sm px-6 py-3 rounded-lg transition-all duration-300 font-semibold  shadow-sm bg-linear-to-t from-red-500/10 to-red-500/30 text-red-500 border border-red-500/30 w-full text-center">
      <p>{message}</p>
    </div>
  );
}

export default FormError;
