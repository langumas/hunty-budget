import { format } from "date-fns";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { CustomTooltip } from "@/components/custom-tooltip";

type Props = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export const LineVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => {
            const dateValue = new Date(value); 
            if (!isNaN(dateValue.getTime())) {
             
              return format(dateValue, "dd MMM");
            }
            console.error("Invalid date value:", value);
            return "";
          }}
          style={{fontSize: "12px",}}
          tickMargin={16}
        />

        <Tooltip
          content={({ active, payload }) => (
            <CustomTooltip active={active} payload={payload} />
          )}
        />

        <Line 
        dot={false}
        dataKey="income" 
        stroke="#3d82f6" 
        strokeWidth={2}
        className="drop-shadow-sm" 
        />
        <Line 
        dot={false}
        dataKey="expenses" 
        stroke="#f43f5e" 
        strokeWidth={2}
        className="drop-shadow-sm" 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};