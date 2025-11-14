type FormErrorProps = {
  message: string;
};

function FormError({ message }: FormErrorProps) {
  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-between gap-4 text-sm px-6 py-3 rounded-lg transition-all duration-300 font-semibold inset-shadow-failure bg-linear-to-t from-red-400/10 to-red-400/40 text-red-500 border border-red-500/30">
        <span>{message}</span>
      </div>
    </div>
  );
}

export default FormError;
