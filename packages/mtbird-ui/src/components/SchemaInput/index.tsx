import React from "react";
import { Input } from "antd";
import { IOptionItem } from "@mtbird/shared";

interface IProps {
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur: (e: any) => void;
  styleInner: Record<string, any>;
}

const SchemaInput = ({
  disabled,
  value,
  placeholder,
  onChange,
  onBlur,
  styleInner,
}: IProps) => {
  const finalStyle = {
    backgroundColor: "var(--gray-7)",
    color: "white",
    border: 0,
    height: 22,
    width: "100%",
    borderRadius: "2px",
    ...styleInner,
  };

  return (
    <Input
      style={finalStyle}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      onBlur={onBlur}
    />
  );
};

export default SchemaInput;
