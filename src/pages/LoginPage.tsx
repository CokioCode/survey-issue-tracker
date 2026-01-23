"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import {
  FeatureItem,
  type FeatureItemProps,
} from "@/components/common/FeatureItem";
import { LoginForm } from "@/components/fragments/LoginForm";
import { loginSchema } from "@/lib/validation";

interface LoginPageProps {
  data: FeatureItemProps[];
}

export const LoginPage = (props: LoginPageProps) => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = (values: z.infer<typeof loginSchema>) => {
    console.log(values);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-gradient-to-br from-background to-muted">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm
              onSubmit={form.handleSubmit(handleLogin)}
              control={form.control}
            />
          </div>
        </div>
      </div>

      <div className="relative hidden lg:block overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-chart-2/90 z-10" />
        <Image
          src="/14015.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
          priority
          width={1000}
          height={1000}
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-10 text-primary-foreground">
          <div className="max-w-2xl space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">
                Survey & Issue Tracker
              </h2>
              <p className="text-xl leading-relaxed opacity-95">
                Streamline your workflow with our comprehensive survey and issue
                tracking platform. Monitor feedback, track problems, and resolve
                issues efficiently—all in one place.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              {props.data.map((items) => {
                return (
                  <FeatureItem
                    key={items.title}
                    icon={items.icon}
                    title={items.title}
                    desc={items.desc}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
