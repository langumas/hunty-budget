"use client";
import { useRef, type JSX , useState } from "react";

import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Select } from "@/components/select";

export const useSelectAccount= ( ): [() => JSX.Element, () => Promise<unknown>] => {
    const accountQuery = useGetAccount();
    const accountMutation = useCreateAccount();
    const onCreateAccount = (name: string) => accountMutation.mutate({
        name
    });
    const accountOptions = (accountQuery.data ?? []).map((account) => ({
        label: account.name,
        value: account.id,
    }));

    const [promise, setPromise] = useState<{
        resolve: (value: string | undefined) => void}
        | null>(null);
    const selectValue = useRef<string>();

    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve });
    });

    const handleClose = () => {
        setPromise(null);
    };

    const handleConfirm = () => {
        promise?.resolve(selectValue.current);
        handleClose();
    };

    const handleCancel = () => {
        promise?.resolve(undefined);
        handleClose();
    }

    const ConfirmationDialog = () => (
        <Dialog open={promise !== null}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Selecciona la cuenta
                    </DialogTitle>
                    <DialogDescription>
                        Por favor selecciona una cuenta para continuar.
                    </DialogDescription>
                </DialogHeader>
                <Select
                    placeholder="Selecciona una cuenta"
                    options={accountOptions}
                    onCreate={onCreateAccount}
                    onChange={(value) => selectValue.current = value}
                    disabled={accountQuery.isLoading || accountMutation.isPending}
                />
                <DialogFooter className="pt-2">
                    <Button
                        onClick={handleCancel}
                        variant="outline"
                    >
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm}>
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return [ConfirmationDialog, confirm];
}