import { emailRegex, phoneRegex, removeSpecialCharacter } from "@/hooks/regex";
import { VariantProps, cva } from "class-variance-authority";
import { useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export const inputStyles = cva(
  "relative appearance-none py-2 px-3 focus:outline-none leading-tight peer text-body-3 w-full gap-2 text-typography-label rounded-lg transition-all border focus-within:border-primary-base  checked:text-grey-1 h-[38px] placeholder-typography-placeholder",
  {
    variants: {
      intent: {
        default: "border-border-1",
        error: "border-error-base",
        success: "border-success-base",
      },
      disabled: {
        true: "cursor-not-allowed !text-typography-disabled placeholder-typography-disabled !bg-grey-disabled",
        false: "cursor-auto",
      },
      size: {
        small: "!px-4 !py-1 h-6",
        medium: "!px-4 !py-2 h-[38px]",
        large: "!px-4 !py-4 h-12",
      },
      labelLocation: {
        top: "",
        left: "",
        inside: "",
        right: "",
      },
    },
    defaultVariants: {
      intent: "default",
      disabled: false,
      size: "medium",
    },
  }
);
export const messageStyles = cva("text-subtitle-4", {
  variants: {
    intent: {
      default: "text-primary-base",
      info: "text-primary-base",
      success: "text-success-base",
      error: "text-error-base",
    },
  },
  defaultVariants: {
    intent: "default",
  },
});

interface InputProps<T extends FieldValues>
  extends VariantProps<typeof inputStyles> {
  name: Path<T>;
  intent?: "default" | "error" | "success";
  register: UseFormRegister<T>;
  label?: React.ReactNode;
  /** Type for input*/
  type?:
    | "text"
    | "number"
    | "search"
    | "password"
    | "textArea"
    | "datetime-local"
    | "checkbox"
    | "hidden"
    | "radio"
    | "date";

  id?: string;
  placeholder?: string;
  defautValue?: string;
  /** Custom TailwindCSS style */
  className?: string;
  classNameLabel?: string;
  message?: string;
  disabled?: boolean;
  showPlaceholderDisabled?: boolean;
  /** When type = 'textArea' you can set rows of textArea */
  lineTextArea?: number;
  required?: boolean;
  icon?: React.ReactNode;
  autoFocus?: boolean;
  onChange?: (event: any) => void;
  onInput?: (event: any) => void;
  check?: boolean;
  maxLength?: number;
  notRule?: boolean;
  autoComplete?: string;
  inputmode?:
    | "text"
    | "search"
    | "email"
    | "none"
    | "tel"
    | "url"
    | "numeric"
    | "decimal"
    | undefined;
  pattern?: string;
  max?: number;
  min?: number;
}

export function Input<T extends FieldValues>({
  intent = "default",
  type = "text",
  size = "medium",
  required = false,
  ...props
}: InputProps<T>) {
  const {
    name,
    id,
    placeholder,
    label,
    register,
    lineTextArea,
    defautValue,
    autoFocus,
    check,
    onInput,
    autoComplete,
    inputmode,
    pattern,
    max,
    min,
  } = props;
  const { onChange, onBlur, ref } = register(name);
  const maxL = props.maxLength
    ? props.maxLength
    : name === "phone"
    ? 10
    : name === "department"
    ? 50
    : name === "description"
    ? 250
    : name === "password"
    ? 20
    : type === "password"
    ? 20
    : 50;
  const [isShowPassword, setIsShowPassword] = useState(false);
  if (!props.notRule)
    register(name, {
      required:
        required === true
          ? label
            ? `${label} là bắt buộc`
            : `Trường này là bắt buộc`
          : required,
      maxLength: {
        value: maxL,
        message: `Trường này cho phép tối đa 50 ký tự`,
      },
    });
  else
    register(name, {
      required:
        required === true
          ? label
            ? `${label} là bắt buộc`
            : `Trường này là bắt buộc`
          : required,
    });
  if (
    !props.notRule &&
    name != "email" &&
    type != "password" &&
    type != "datetime-local" &&
    name != "description" &&
    name != "phone" &&
    name != "contract_value" &&
    name != "project_value"
  )
    register(name, {
      pattern: {
        value: /^[\p{L}\p{N}_.\-@ ]*$/gmu,
        message: `Không nhập ký tự đặc biệt`,
      },
    });
  if (!props.notRule && name === "phone") {
    register(name, {
      pattern: {
        value: phoneRegex,
        message: `Nhập chưa đúng định dạng số điện thoại`,
      },
    });
  }
  if (!props.notRule && name === "email") {
    register(name, {
      pattern: {
        value: emailRegex,
        message: `Nhập chưa đúng định dạng email`,
      },
    });
  }
  return (
    <>
      <div
        className={`flex flex-1 ${
          props.labelLocation === "left"
            ? "gap-2 items-center"
            : "flex-col gap-2"
        }  ${
          props.labelLocation === "right"
            ? "!flex-row-reverse w-fit items-center gap-2"
            : ""
        } 
        
        `}
      >
        {label && props.labelLocation != "inside" && (
          <label
            className={`flex gap-1 text-label-3 text-typography-label ${
              props.classNameLabel ?? ""
            }`}
            htmlFor={id ?? ""}
          >
            {label}
            {required === true && (
              <div className="text-error-base text-subtitle-4">*</div>
            )}
          </label>
        )}
        <div className="grow flex flex-col gap-2">
          <div className="relative">
            <div className="relative flex items-center gap-2 z-0 ">
              {props.icon ?? <></>}
              {type !== "textArea" ? (
                <>
                  <input
                    {...{
                      name,
                      id,
                      placeholder,
                      autoFocus,
                      onBlur,
                      ref,
                      onChange,
                      pattern,
                      max,
                      min,
                    }}
                    inputMode={inputmode}
                    autoComplete={autoComplete ?? "off"}
                    spellCheck="false"
                    {...register(name)}
                    type={
                      type !== "password"
                        ? type
                        : isShowPassword
                        ? "text"
                        : "password"
                    }
                    onChange={(e) => {
                      let value = e.currentTarget.value;

                      if (props.notRule === true) {
                        onChange(e);
                      } else {
                        if (type === "number" && max && Number(value) > max) {
                          value = max.toString();
                        }
                        if (type === "number" && min && Number(value) < min)
                          value = min.toString();
                        if (
                          name != "email" &&
                          name != "description" &&
                          type != "password" &&
                          type != "datetime-local" &&
                          type != "date"
                        )
                          value = removeSpecialCharacter(value);
                        value = value.substring(0, maxL);

                        e.currentTarget.value = value;
                        props.onChange?.(e);
                        onChange(e);
                      }
                    }}
                    autoFocus={autoFocus}
                    disabled={props.disabled ?? false}
                    className={
                      type !== "radio"
                        ? type !== "checkbox"
                          ? inputStyles({
                              intent: intent,
                              disabled: props.disabled,
                              className: props.className,
                              // size: size,
                            })
                          : "w-4 h-4 rounded  checked:bg-primary-base border-border-1"
                        : "w-4 h-4 rounded  checked:bg-primary-base border-border-1"
                    }
                    placeholder={
                      props.labelLocation === "inside"
                        ? " "
                        : props.disabled
                        ? props.showPlaceholderDisabled
                          ? placeholder
                          : " "
                        : placeholder ?? " "
                    }
                    defaultValue={defautValue}
                    checked={
                      type == "checkbox"
                        ? check
                        : type == "radio"
                        ? check
                        : false
                    }
                    aria-describedby={props.message ? "message" : undefined}
                    aria-invalid={intent === "error" ? "true" : undefined}
                  />
                  {type === "password" && (
                    <span
                      onClick={() => {
                        setIsShowPassword(!isShowPassword);
                      }}
                      className="absolute right-2 cursor-pointer select-none"
                    >
                      {!isShowPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 fill-grey-9/60"
                        >
                          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                          <path
                            fillRule="evenodd"
                            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 fill-grey-9/60 "
                        >
                          <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                          <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                          <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                        </svg>
                      )}
                    </span>
                  )}
                </>
              ) : (
                <textarea
                  {...{ type, name, id, placeholder }}
                  {...register(name)}
                  disabled={props.disabled ?? false}
                  rows={lineTextArea}
                  className={`relative appearance-none py-2 px-4 focus:outline-none leading-tight peer w-full gap-2 text-typography-label text-body-3 rounded-lg transition-all border focus-within:border-primary-base  checked:text-grey-1 h-auto  border-border-1 cursor-auto ${inputStyles(
                    { disabled: props.disabled }
                  )}`}
                  placeholder={
                    props.labelLocation === "inside"
                      ? " "
                      : props.disabled
                      ? props.showPlaceholderDisabled
                        ? placeholder
                        : " "
                      : placeholder ?? " "
                  }
                  autoFocus={autoFocus}
                  onInput={(e) => {
                    if (onInput) onInput(e);
                    if (!props.notRule) {
                      let value = e.currentTarget.value;
                      if (name == "description") {
                        value = value.substring(0, maxL);
                      }

                      e.currentTarget.value = value;
                    }
                  }}
                  aria-describedby={props.message ? "message" : undefined}
                ></textarea>
              )}
              {props.labelLocation === "inside" && (
                <label
                  className={`absolute text-label z-10 text-info-pressed duration-200 transform -translate-y-6 peer-focus:!bg-white peer-focus:!top-3 ml-3 scale-75 top-auto mx-auto peer-focus:mb-2 peer-focus:text-info-pressed origin-[0] peer-focus:text-subtitle peer-placeholder-shown:scale-100 peer-placeholder-shown:mt-0 peer-placeholder-shown:text-typography-subtitle peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                    type === "textArea" && "left-0"
                  } ${props.classNameLabel ?? ""} ${type === "checkbox" && ""}`}
                  htmlFor={id ?? ""}
                >
                  {label ?? placeholder}
                </label>
              )}
            </div>
          </div>
          {props.message && (
            <small
              id="message"
              className={messageStyles({
                intent: intent,
              })}
            >
              {props.message}
            </small>
          )}
        </div>
      </div>
    </>
  );
}
