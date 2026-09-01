import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function InputField({
  label,
  placeholder,
  type,
  name,
}: {
  label: string;
  placeholder: string;
  type: string;
  name: string;
}) {
  return (
    <Field>
      <FieldLabel htmlFor={name} className="text-sm uppercase opacity-85">
        {label}
      </FieldLabel>
      <Input name={name} id={name} type={type} placeholder={placeholder} className="text-sm" />
    </Field>
  );
}
