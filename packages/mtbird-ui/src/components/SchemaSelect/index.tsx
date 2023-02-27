import React from "react";
import { IOptionItem } from "@mtbird/shared";

interface IProps {
  disabled?: boolean;
  options: IOptionItem[];
  placeholder?: string;
  value?: string;
  multiple?: boolean;
  onChange: (value: string) => void;
}

const SchemaSelect = ({
  options,
  disabled,
  value,
  placeholder,
  multiple,
  onChange,
}: IProps) => {
  const style = {
    backgroundColor: "var(--gray-7)",
    color: "white",
    border: 0,
    height: 22,
    width: "100%",
    borderRadius: "2px",
  };

  return (
    <select
      style={style}
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      multiple={multiple}
    >
      <option selected={value === undefined} value={undefined} disabled>
        {placeholder ? placeholder : "-- 请选择 --"}
      </option>
      {options.map((cur: any) => (
        <option value={cur.value}>{cur.label}</option>
      ))}
    </select>
  );
};

export default SchemaSelect;
