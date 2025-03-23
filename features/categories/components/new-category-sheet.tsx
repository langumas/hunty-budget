import type { z } from "zod";

import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { CategoryForm } from "@/features/categories/components/category-form";
import { useCreateCategory } from "@/features/categories/api/use-create-category";

import { insertCategorySchema } from "@/db/schema";
import { 
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

const formSchema = insertCategorySchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewCategorySheet = () => {
    const { isOpen, onClose } = useNewCategory();

    const mutation = useCreateCategory();
    
    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        })
    }

    return(
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader className="space-y-4">
                    <SheetTitle>
                        Nueva Categoría
                    </SheetTitle>
                    <SheetDescription>
                        Crea una nueva categoría para organizar tus transacciones.
                    </SheetDescription>
                </SheetHeader>
                <CategoryForm 
                    onSubmit={onSubmit} 
                    disabled={mutation.isPending} 
                    defaultValues={{
                        name: "",
                }}
                />  
            </SheetContent>
        </Sheet>
    )
}