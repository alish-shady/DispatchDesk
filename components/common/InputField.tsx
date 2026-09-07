import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function InputField({
  label,
  placeholder,
  type,
  name,
  children,
}: {
  label: string;
  placeholder: string;
  type: string;
  name: string;
  children?: Readonly<React.ReactNode> | null;
}) {
  return (
    <Field>
      <FieldLabel htmlFor={name} className="text-sm uppercase opacity-85">
        {label}
      </FieldLabel>
      {type === "custom" ? (
        children
      ) : (
        <Input name={name} id={name} type={type} placeholder={placeholder} className="text-sm" />
      )}
    </Field>
  );
}
