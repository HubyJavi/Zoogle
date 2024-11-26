import * as React from "react";

import { useState, useEffect, useRef, ReactNode, HTMLAttributes } from "react";

export const Dialog: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement, {
              isOpen,
              setIsOpen,
            })
          : child
      )}
    </div>
  );
};

interface DialogTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

export const DialogTrigger: React.FC<DialogTriggerProps> = ({
  children,
  isOpen,
  setIsOpen,
  ...props
}) => {
  return (
    <button onClick={() => setIsOpen && setIsOpen(true)} {...props}>
      {children}
    </button>
  );
};

interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

export const DialogContent: React.FC<DialogContentProps> = ({
  children,
  isOpen,
  setIsOpen,
  className,
  ...props
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node) &&
        overlayRef.current?.contains(event.target as Node)
      ) {
        setIsOpen && setIsOpen(false);
      }
    };

    // Close on Escape key
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen && setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto"
    >
      <div
        ref={dialogRef}
        className={`relative w-full max-w-lg bg-white rounded-lg shadow-xl p-6 ${className}`}
        {...props}
      >
        <button
          onClick={() => setIsOpen && setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export const DialogHeader: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

export const DialogTitle: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h2 className={`text-xl font-semibold mb-2 ${className}`} {...props}>
    {children}
  </h2>
);
