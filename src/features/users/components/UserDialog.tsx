import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  CustomFormField,
  FormFieldType,
  SubmitButton,
} from "@/components/forms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import {
  type CreateUser,
  createUserSchema,
  type UpdateUser,
  type User,
  updateUserSchema,
} from "../types";

interface UserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateUser | UpdateUser) => Promise<void>;
  user?: User | null;
  mode?: "create" | "edit";
}

export const UserDialog = ({
  isOpen,
  onOpenChange,
  onSubmit,
  user = null,
  mode = "create",
}: UserDialogProps) => {
  const isEditMode = mode === "edit" && user;

  const form = useForm<CreateUser | UpdateUser>({
    resolver: zodResolver(isEditMode ? updateUserSchema : createUserSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      role: "USER",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (isEditMode) {
        form.reset({
          name: user.name,
          username: user.username,
          password: "",
          role: user.role,
        });
      } else {
        form.reset({
          name: "",
          username: "",
          password: "",
          role: "USER",
        });
      }
    }
  }, [isOpen, isEditMode, user, form]);

  const handleSubmit = async (data: CreateUser | UpdateUser) => {
    try {
      const submitData =
        isEditMode && !data.password ? { ...data, password: undefined } : data;

      await onSubmit(submitData);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "creating"} user:`,
        error,
      );
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit User" : "Create New User"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the user information below."
              : "Add a new user to your system. Fill in the required information below."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              label="Full Name"
              placeholder="John Doe"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="username"
              label="Username"
              placeholder="johndoe"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="password"
              label="Password"
              placeholder={
                isEditMode
                  ? "Leave empty to keep current password"
                  : "Enter password"
              }
            />

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="role"
              label="Role"
              placeholder="Select a role"
            >
              <SelectItem value="USER">User</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
            </CustomFormField>

            <DialogFooter>
              <SubmitButton isLoading={form.formState.isSubmitting}>
                {isEditMode ? "Update User" : "Create User"}
              </SubmitButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
