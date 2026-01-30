import { zodResolver } from "@hookform/resolvers/zod";
import { FilterIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  CustomFormField,
  FormFieldType,
  SubmitButton,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { type Filter, filterSchema } from "../types";

export const FilterDrawer = () => {
  const form = useForm<Filter>({
    resolver: zodResolver(filterSchema),
    mode: "onChange",
    defaultValues: {
      rabHild: "",
      statusJt: "APPROVE",
      sto: "",
      tahun: "",
    },
  });

  const submitForm = (values: Filter) => {
    console.log(values);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline" className="capitalize">
            <FilterIcon />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
          <DrawerHeader>
            <DrawerTitle>Filter Survey</DrawerTitle>
            <DrawerDescription>
              Filter surveys by status, region, and year.
            </DrawerDescription>
          </DrawerHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitForm)} className="p-2">
              <CustomFormField
                control={form.control}
                name="statusJt"
                fieldType={FormFieldType.SELECT}
                label="Status JT"
              >
                <SelectItem value="APPROVE">User</SelectItem>
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="rabHild"
                fieldType={FormFieldType.INPUT}
                label="Rabhild"
              />
              <CustomFormField
                control={form.control}
                name="sto"
                fieldType={FormFieldType.INPUT}
                label="Sto"
              />
              <CustomFormField
                control={form.control}
                name="tahun"
                fieldType={FormFieldType.INPUT}
                label="Tahun"
              />
              <DrawerFooter>
                <SubmitButton isLoading={form.formState.isLoading}>
                  Submit
                </SubmitButton>
              </DrawerFooter>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
