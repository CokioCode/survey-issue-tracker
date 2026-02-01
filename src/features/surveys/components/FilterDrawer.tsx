import { zodResolver } from "@hookform/resolvers/zod";
import { FilterIcon, X } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  CustomFormField,
  FormFieldType,
  SubmitButton,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { type Filter, filterSchema, statusJtEnum } from "../types";

interface FilterDrawerProps {
  onFilterChange?: (filters: Filter) => void;
}

export const FilterDrawer = (props: FilterDrawerProps) => {
  const { onFilterChange } = props;

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
    onFilterChange?.(values);
  };

  const handleReset = () => {
    const emptyFilter: Filter = {
      rabHild: "",
      statusJt: "APPROVE",
      sto: "",
      tahun: "",
    };

    form.reset(emptyFilter);
    onFilterChange?.(emptyFilter);
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline" size="default" className="gap-2">
          <FilterIcon className="h-4 w-4" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="fixed bottom-0 right-0 left-auto mt-0 w-full sm:w-[400px] rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none h-[85vh] sm:h-full">
        <DrawerHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-xl font-semibold">
                Filter Survey
              </DrawerTitle>
              <DrawerDescription className="mt-1 text-sm text-muted-foreground">
                Filter surveys berdasarkan status, region, dan tahun
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitForm)}
              className="space-y-5"
              id="filter-form"
            >
              <CustomFormField
                control={form.control}
                name="statusJt"
                fieldType={FormFieldType.SELECT}
                label="Status JT"
                placeholder="Pilih status"
              >
                {statusJtEnum.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.replaceAll("_", " ")}
                  </SelectItem>
                ))}
              </CustomFormField>

              <CustomFormField
                control={form.control}
                name="rabHild"
                fieldType={FormFieldType.INPUT}
                label="RAB HILD"
                placeholder="Masukkan RAB HILD"
              />

              <CustomFormField
                control={form.control}
                name="sto"
                fieldType={FormFieldType.INPUT}
                label="STO"
                placeholder="Masukkan STO"
              />

              <CustomFormField
                control={form.control}
                name="tahun"
                fieldType={FormFieldType.INPUT}
                label="Tahun"
                placeholder="Contoh: 2024"
              />
            </form>
          </Form>
        </div>

        <DrawerFooter className="border-t pt-4 gap-2">
          <SubmitButton
            form="filter-form"
            isLoading={form.formState.isSubmitting}
            className="w-full"
          >
            Terapkan Filter
          </SubmitButton>
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="w-full"
          >
            Reset Filter
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
