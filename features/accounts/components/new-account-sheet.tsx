import type { z } from "zod";

import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { AccountForm } from "@/features/accounts/components/account-form";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

import { insertAccountSchema } from "@/db/schema";
import { 
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

const formSchema = insertAccountSchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewAccountSheet = () => {
    const { isOpen, onClose } = useNewAccount();

    const mutation = useCreateAccount();
    
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
                        Nueva Cuenta
                    </SheetTitle>
                    <SheetDescription>
                        Crea una nueva cuenta para trackear tus transacciones.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm 
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