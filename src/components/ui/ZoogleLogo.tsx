import * as React from "react";

export interface ZoogleLogoProps {
  size?: string;
}

export const ZoogleLogo = ({ size = "text-3xl" }: ZoogleLogoProps) => {
  return (
    <span className={`${size} font-google font-normal`} aria-label="Zoogle">
      <span className="text-blue-500">Z</span>
      <span className="text-red-500">o</span>
      <span className="text-yellow-500">o</span>
      <span className="text-blue-500">g</span>
      <span className="text-green-500">l</span>
      <span className="text-red-500">e</span>
    </span>
  );
};
