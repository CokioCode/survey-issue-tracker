import Link from "next/link";
import { type Control, Controller } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { loginSchema } from "@/lib/validation";

interface LoginFormProps extends React.ComponentProps<"form"> {
  control: Control<z.infer<typeof loginSchema>>;
}

export function LoginForm({ className, control, ...props }: LoginFormProps) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup className="rounded-lg border bg-card p-6">
        <div className="flex flex-col items-center gap-1 text-center mb-2">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>

        <Field>
          <FieldLabel>Email</FieldLabel>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="username"
                placeholder="m@example.com"
                className="rounded-md"
              />
            )}
          />
        </Field>

        <Field>
          <FieldLabel>Password</FieldLabel>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input {...field} type="password" className="rounded-md" />
            )}
          />
        </Field>

        <Field>
          <Button
            type="submit"
            className="w-full rounded-md bg-gradient-to-r from-primary to-chart-2 hover:opacity-90 transition-all"
          >
            Login
          </Button>
        </Field>

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
  );
}
