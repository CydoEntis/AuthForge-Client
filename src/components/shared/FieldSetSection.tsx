import { type ReactNode } from "react";

type FieldSetSectionProps = {
  title: string;
  children: ReactNode;
};

function FieldSetSection({ title, children }: FieldSetSectionProps) {
  return (
    <section className="px-4 pt-8 pb-4 border rounded border-input relative">
      <h3 className="text-3xl font-semibold absolute -top-5  left-1 bg-background px-3">{title}</h3>
      {children}
    </section>
  );
}

export default FieldSetSection;
