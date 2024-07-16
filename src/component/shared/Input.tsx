import React from "react";

interface IInput {
  title?: string;
  name: string;
  type: string;
  maxLength?: number;
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IInput> = ({
  title,
  onChange,
  onInput,
  placeholder,
  name,
  type,
  maxLength,
  className,
}) => {
  return (
    <div className="my-3">
      <label htmlFor="name">{title}</label>
      <input
        type={type}
        name={name}
        onInput={onInput}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`${className} border border-gray-200 w-full bg-transparent py-2 rounded outline-none px-2 focus:border-green-500`}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
