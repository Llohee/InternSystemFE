import { ErrorResponse } from "@/models/api/common";
import { Button } from "../../ui/button/button";
import { Input } from "../../ui/input/input";
import { useLoginForm } from "../hooks";
import Link from "next/link";
import Avatar from "@/components/ui/avatar/avatar";

const LoginNormalForm = () => {
  const {
    setValue,
    register,
    clearErrors,
    handleSubmit,
    handleFormSubmit,
    mutation,
    errors,
  } = useLoginForm();

  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-col gap-6">
          {/* <div className="flex flex-col gap-4 text-title-3 items-center">
            <Avatar name={props.email} size="large" />
            <div className="text-center text-heading-7">{props.email}</div>
          </div> */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              <Input
                label="Email"
                name="email"
                register={register}
                intent={
                  mutation.isError || errors.password ? "error" : "default"
                }
                message={
                  mutation.isError
                    ? (mutation.error.response?.data as ErrorResponse)
                        ?.description ??
                      mutation.error.response ??
                      "Đã có lỗi xảy ra, vui lòng thử lại sau!"
                    : errors.password?.message ?? ""
                }
                type={"text"}
                autoFocus
                required
              />
              <Input
                label={"Mật khẩu"}
                name="password"
                register={register}
                intent={
                  mutation.isError || errors.password ? "error" : "default"
                }
                type={"password"}
                placeholder={"Nhập mật khẩu"}
                message={
                  mutation.isError
                    ? (mutation.error.response?.data as ErrorResponse)
                        ?.description ??
                      mutation.error.response ??
                      "Đã có lỗi xảy ra, vui lòng thử lại sau!"
                    : errors.password?.message ?? ""
                }
                required
              />
              {/* <div className="flex gap-2 items-center text-button-3 justify-end ">
                <Link
                  href={`/reset-password/?email=${props.email}`}
                  className="text-right w-fit"
                  >
                  Quên mật khẩu?
                </Link>
                  </div> */}
            </div>
            <Button
              intent={"primary"}
              size={"medium"}
              type="submit"
              fullWidth={true}
              posting={mutation.isLoading}
            >
              Đăng nhập
            </Button>
          </div>
        </div>
      </form>
      {/* <div
        onClick={props.pre}
        className="flex gap-2 mt-4 items-center text-button-3 select-text cursor-pointer justify-center text-center text-primary-base hover:text-primary-hover focus:text-primary-pressed active:text-primary-pressed"
      >
        Quay lại
      </div> */}
    </>
  );
};

export default LoginNormalForm;
