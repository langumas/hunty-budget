import CurrencyInput from "react-currency-input-field";
import {Info, MinusCircle, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
    value: string;
    onChange: (value: string | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
};

export const AmountInput = ({
    value,
    onChange,
    placeholder,
    disabled,
}: Props) => {
    const parsedValue = parseFloat(value);
    const isIncome = parsedValue > 0;
    const isExpense = parsedValue < 0;

    const onReserseValue = () => {
        if (!value) return;

        const newValue = parseFloat(value) * -1;
        onChange(newValue.toString());
    };

    return (
        <div className="relative">
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <button 
                            type="button" 
                            onClick={onReserseValue}
                            className={cn(
                                "bg-slate-400 hover:bg-slate-500 absolute top-1.5 left 1.5 rounded-md p-2 flex items-center justify-center transition",
                                isIncome && "bg-blue-300 hover:bg-blue-400",
                                isExpense && "bg-pink-300 hover:bg-pink-400"
                            )}
                        >
                            {!parsedValue && <Info className="size-3 text-white" />}
                            {isIncome && <PlusCircle className="size-3 text-white" />}
                            {isExpense && <MinusCircle className="size-3 text-white" />}
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Usa [+] para Ingresos y [-] para Gastos
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <CurrencyInput 
                prefix="$"    
                className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "pl-10  aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                )}
                placeholder={placeholder}
                value={value}
                decimalsLimit={2}
                decimalScale={2}
                onValueChange={onChange}
                disabled={disabled}
            />
            <p className="text-xs text-muted-foreground mt-2">
                {isIncome && "Esto contará como ingreso"}
                {isExpense && "Esto contará como gasto"}
            </p>
        </div>
    );
};