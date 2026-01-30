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
import { type Survey, type UpdateSurvey, updateSurveySchema } from "../types";

interface SurveyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UpdateSurvey) => Promise<void>;
  survey: Survey;
}

export const SurveyDialog = ({
  isOpen,
  onOpenChange,
  onSubmit,
  survey,
}: SurveyDialogProps) => {
  const form = useForm<UpdateSurvey>({
    resolver: zodResolver(updateSurveySchema),
    defaultValues: {
      statusJt: "",
      c2r: 0,
      nomorNcx: "",
      alamat: "",
      jenisLayanan: "",
      nilaiKontrak: "",
      rabSurvey: 0,
      noNde: "",
      progresJt: "",
      namaOdp: "",
      jarakOdp: 0,
      keteranganText: "",
    },
  });

  useEffect(() => {
    if (isOpen && survey) {
      form.reset({
        statusJt: survey.statusJt || "",
        c2r: survey.c2r || 0,
        nomorNcx: survey.nomorNcx || "",
        alamat: survey.alamat || "",
        jenisLayanan: survey.jenisLayanan || "",
        nilaiKontrak: survey.nilaiKontrak || "",
        rabSurvey: survey.rabSurvey || 0,
        noNde: survey.noNde || "",
        progresJt: survey.progresJt || "",
        namaOdp: survey.namaOdp || "",
        jarakOdp: Number(survey.jarakOdp) || 0,
        keteranganText: survey.keteranganText || "",
      });
    }
  }, [isOpen, survey, form]);

  const handleSubmit = async (data: UpdateSurvey) => {
    try {
      const submitData = {
        ...data,
        c2r: Number(data.c2r),
        jarakOdp: Number(data.jarakOdp),
      };

      await onSubmit(submitData);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating survey:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto min-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Survey</DialogTitle>
          <DialogDescription>
            Update the survey information below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="statusJt"
                label="Status JT"
                placeholder="APPROVE / NOT_APPROVE"
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="jenisLayanan"
                label="Jenis Layanan"
                placeholder="HSI Bisnis Bundling Netmonk PSB 70% - 200 Mbps"
              />

              <div className="col-span-2">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="nomorNcx"
                  label="Nomor NCX"
                  placeholder="1001645422"
                />
              </div>
              <div className="col-span-2">
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="alamat"
                  label="Alamat"
                  placeholder="Alamat lengkap pelanggan"
                />
              </div>

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="nilaiKontrak"
                label="Nilai Kontrak"
                placeholder="12810000"
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="c2r"
                label="C2R"
                placeholder="39.16"
                type="number"
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="rabSurvey"
                label="RAB Survey"
                placeholder="32713900"
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="noNde"
                label="No NDE"
                placeholder="NDE001"
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="progresJt"
                label="Progres JT"
                placeholder="50%"
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="namaOdp"
                label="Nama ODP"
                placeholder="ODP-001"
              />

              <div className="col-span-2">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="jarakOdp"
                  label="Jarak ODP (meter)"
                  placeholder="100"
                  type="number"
                />
              </div>

              <div className="col-span-2">
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="keteranganText"
                  label="Keterangan"
                  placeholder="Keterangan tambahan (optional)"
                />
              </div>
            </div>

            <DialogFooter>
              <SubmitButton isLoading={form.formState.isSubmitting}>
                Update Survey
              </SubmitButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
