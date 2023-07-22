import React from "react";

type FormFieldProps = {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
};

const FormField: React.FC<FormFieldProps> = ({
  type,
  title,
  state,
  placeholder,
  isTextArea,
  setState,
}) => {
  return (
    <div className="flex items-center justify-start flex-col w-full gap-4">
      <label className="w-full">{title}</label>
      {isTextArea ? (
        <textarea
          value={state}
          className="form-field"
          placeholder={placeholder}
          onChange={(e) => setState(e.target.value)}
        ></textarea>
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder}
          required
          value={state}
          className="form-field"
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  );
};
export default FormField;
