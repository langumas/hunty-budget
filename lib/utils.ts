import { twMerge } from "tailwind-merge"
import { clsx, type ClassValue } from "clsx"
import { subDays, eachDayOfInterval, isSameDay, format, isValid, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertAmountFromMiliunits(amount: number) { // convierte una cantidad desde milésimas a su valor original
  return amount / 1000;
};

export function convertAmountToMiliunits(amount: number) { //lo contrario, ejemplo 10.50 pasa a la base como 10500
  return Math.round(amount * 1000);
};

export function formatCurrency(value: number) {5
  return Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP", 
    minimumFractionDigits: 2,
  }).format(value);
};

export function calculatePercentageChange( 
    current: number,
    previous: number
) {
  if (previous === 0) {
    return previous === current ? 0 : 100;
  }

  return ((current - previous) / previous) * 100;
}

export function fillMissingDays(
  activeDays: {
    date: Date,
    income: number;
    expenses: number;
  }[],
  startDate: Date,
  endDate: Date,
) {
  if (activeDays.length === 0) {
    return [];
  }

  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const transactionsByDay = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day));

    if (found) return found;
    else {
      return {
        date: day,
        income: 0,
        expenses: 0,
      };
    }
  });

  return transactionsByDay;
};

type Period = {
  from: string| Date | undefined;
  to: string | Date | undefined;
};

function toValidDate(date: string | Date | undefined, fallback: Date): Date {
  if (typeof date === "string") {
    const parsedDate = parseISO(date); // convertir la fecha en date
    return isValid(parsedDate) ? parsedDate : fallback;
  }
  return date instanceof Date && isValid(date) ? date : fallback;
}

export function formatDateRange(period?: Period) {
  const defaultTo = new Date(); // hoy
  const defaultFrom = subDays(defaultTo, 30);  // hoy - 30 dias

  const fromDate = toValidDate(period?.from, defaultFrom);
  const toDate = toValidDate(period?.to, defaultTo);

  if (period?.from && period?.to) {
    return `${format(fromDate, "LLL dd")} - ${format(toDate, "LLL dd, y")}`; // fecha inicial a la final
  }

  if (period?.from) {
    return format(fromDate, "LLL dd, y"); // solo fecha inicial, solo muestra esa fecha
  }
  return `${format(defaultFrom, "LLL dd")} - ${format(defaultTo, "LLL dd, y")}`;  //en caso de que no haya ninguna, usamos los default
}

export function formatPercentage(
  value: number,
  options: { addPrefix?: boolean } = { addPrefix: false }
) {
  const result = new Intl.NumberFormat("en-US", {
    style: "percent",
  }).format(value / 100);

  if (options.addPrefix && value > 0) return `+${result}`;

  return result;
}