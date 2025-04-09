import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins } from "lucide-react";

interface ProfilePointsProps {
  totalPoints: number;
  availablePoints: number;
  transactions: Array<{
    id: string;
    description: string;
    date: string;
    points: number;
  }>;
}

export function ProfilePoints({ totalPoints, availablePoints, transactions }: ProfilePointsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card className="border shadow-sm dark:shadow-md dark:shadow-black/10">
          <CardHeader className="bg-muted/10 dark:bg-muted/5 border-b">
            <CardTitle className="text-lg font-medium">
              Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/5 dark:bg-muted/10 border-b">
                    <th className="text-left font-medium text-muted-foreground p-4">
                      Transaction
                    </th>
                    <th className="text-left font-medium text-muted-foreground p-4 hidden sm:table-cell">
                      Date
                    </th>
                    <th className="text-right font-medium text-muted-foreground p-4">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-muted/5 dark:hover:bg-muted/10 transition-colors">
                      <td className="p-4">
                        <p className="font-medium">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-muted-foreground sm:hidden mt-1">
                          {transaction.date}
                        </p>
                      </td>
                      <td className="p-4 text-muted-foreground hidden sm:table-cell">
                        {transaction.date}
                      </td>
                      <td className={`p-4 text-right font-medium ${
                        transaction.points > 0 
                          ? "text-green-600 dark:text-green-500" 
                          : "text-red-600 dark:text-red-500"
                      }`}>
                        {transaction.points > 0 ? "+" : ""}{transaction.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="border shadow-sm dark:shadow-md dark:shadow-black/10">
          <CardHeader className="bg-muted/10 dark:bg-muted/5 border-b">
            <CardTitle className="text-lg font-medium">
              Points Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <tbody>
                {/* Total Points row */}
                <tr className="border-b hover:bg-muted/5 dark:hover:bg-muted/10 transition-colors">
                  <td className="py-5 pl-6 pr-2 w-12">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-full">
                      <Coins className="h-4 w-4 text-primary" />
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <p className="text-sm font-medium text-foreground">Total Points:</p>
                  </td>
                  <td className="py-5 pr-6 text-right">
                    <p className="text-2xl font-semibold text-foreground">
                      {totalPoints}
                    </p>
                  </td>
                </tr>

                {/* Available Points row */}
                <tr className="hover:bg-muted/5 dark:hover:bg-muted/10 transition-colors">
                  <td className="py-5 pl-6 pr-2 w-12">
                    <div className="flex items-center justify-center w-8 h-8 bg-emerald-100/80 dark:bg-emerald-900/20 rounded-full">
                      <Coins className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <p className="text-sm font-medium text-foreground">Available Points:</p>
                  </td>
                  <td className="py-5 pr-6 text-right">
                    <p className="text-2xl font-semibold text-foreground">
                      {availablePoints}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 