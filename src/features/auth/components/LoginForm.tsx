import Link from "next/link";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import {
  CustomFormField,
  FormFieldType,
} from "@/components/forms/CustomFormField";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import type { loginSchema } from "@/features/auth/types";
import { cn } from "@/lib/utils";

interface LoginFormProps extends React.ComponentProps<"form"> {
  form: UseFormReturn<z.infer<typeof loginSchema>>;
  isLoading: boolean;
}

export const LoginForm = ({
  className,
  isLoading,
  form,
  ...props
}: LoginFormProps) => {
  return (
    <Form {...form}>
      <form className={cn("flex flex-col gap-6", className)} {...props}>
        <FieldGroup className="rounded-lg border bg-card p-6">
          <div className="flex flex-col items-center gap-1 text-center mb-2">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to login to your account
            </p>
          </div>

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="username"
            label="Username"
            placeholder="JohnDoe"
            iconSrc="/icons/user.svg"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="password"
            label="Password"
            placeholder="********"
            iconSrc="/icons/lock.svg"
          />

          <SubmitButton isLoading={isLoading}>Login</SubmitButton>

          <Field>
            <FieldDescription className="text-center">
              Don't have an account?{" "}
              <Link
                href="/contact-admin"
                className="font-medium text-primary hover:underline underline-offset-4"
              >
                Contact Admin
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
};
