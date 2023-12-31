import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../Input";

function slugify(input: string | undefined): string {
  if (!input) return "";

  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

const formSchema = z.object({
  slug: z.string().trim().min(3),
  name: z.string().trim().min(3),
  image: z.any(),
  description: z.string().trim().min(3),
  price: z.preprocess((a) => Number(a), z.number().positive()),
});

export type ProductFormValues = z.infer<typeof formSchema>;

type ProductFormProps = {
  defaultValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  onDelete?: () => void;
};

export function ProductForm({
  defaultValues,
  onSubmit,
  onDelete,
}: ProductFormProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const isEditing = !!defaultValues;

  const nameValue = watch("name");

  useEffect(() => {
    if (isEditing) return;

    setValue("slug", slugify(nameValue));
  }, [isEditing, nameValue, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Nome"
        placeholder="Digite um nome..."
        {...register("name")}
        error={errors.name?.message}
      />
      <Input
        label="Slug"
        placeholder="Digite um slug..."
        disabled={isEditing}
        {...register("slug")}
        error={errors.slug?.message}
      />
      <Input
        label="Descrição"
        placeholder="Digite uma descrição..."
        {...register("description")}
        error={errors.description?.message}
      />
      <Input
        type="file"
        label="Imagem"
        accept="image/png, image/jpeg"
        {...register("image")}
        error={errors.image?.message as string}
      />
      <Input
        type="number"
        step="0.01"
        label="Valor"
        placeholder="Digite um valor..."
        {...register("price")}
        error={errors.price?.message}
      />

      <div className="flex justify-end gap-4 text-lg">
        <button type="submit">Enviar</button>
        <button type="button" className="text-red-500" onClick={onDelete}>
          Deletar
        </button>
      </div>
    </form>
  );
}
