"use client";

import { useState } from "react";
import { format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { ChevronDown } from "lucide-react";
import qs from "query-string";
import { 
    usePathname, 
    useRouter, 
    useSearchParams 
} from "next/navigation";

import { useGetSummary } from "@/features/summary/api/use-get-summary";

import { cn, formatDateRange } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const DateFilter = () => {
    const router = useRouter();
    const pathname = usePathname();

    const params = useSearchParams();
    const accountId = params.get("accountId");
    const from = params.get("from") || "";
    const to = params.get("to") || "";

    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    const paramState = {
        from: from ? new Date(from) : defaultFrom,
        to: to ? new Date(to) : defaultTo,
    };

    const [date, setDate] = useState<DateRange | undefined>(
        paramState
    );

    const pushToUrl = (dateRange: DateRange | undefined) => {
        const query = {
          from: format(dateRange?.from || defaultFrom, "yyyy-MM-dd"),
          to: format(dateRange?.to || defaultTo, "yyyy-MM-dd"),
          accountId,
        };
    
        const url = qs.stringifyUrl(
          {
            url: pathname,
            query,
          }, { skipEmptyString: true, skipNull: true }
        );
    
        router.push(url);
      };
    
      const onReset = () => {
        setDate(undefined);
        pushToUrl(undefined);
      };

    return(
        <Popover>
            <PopoverTrigger asChild>
                <Button
                disabled={false}
                size="sm"
                variant="outline"
                className="h-9 w-full rounded-md border-none bg-white/10 px-3 font-normal text-white outline-none transition hover:bg-white/30 hover:text-white focus:bg-white/30 focus:ring-transparent focus:ring-offset-0 lg:w-auto"
                >
                    <span>{formatDateRange(paramState)}</span>
                    <ChevronDown className="ml-2 size-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 lg:w-auto" align="start">
              <Calendar
                disabled={false}
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />

              <div className="border-t border-gray-200 p-4 flex justify-end gap-2 bg-white">
                <PopoverClose asChild>
                  <Button
                    onClick={onReset}
                    disabled={!date?.from || !date?.to}
                    className="w-full lg:w-auto"
                    variant="outline"
                  >
                    Reiniciar
                  </Button>
                </PopoverClose>

                <PopoverClose asChild>
                  <Button
                    onClick={() => pushToUrl(date)}
                    disabled={!date?.from || !date?.to}
                    className="w-full lg:w-auto"
                  >
                    Aplicar
                  </Button>
                </PopoverClose>
              </div>
            </PopoverContent>

        </Popover>
    )
}
  