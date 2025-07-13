import { serve } from "inngest/next";
import { inngest } from "../../../main/client";
import { checkBudgetAlerts, generateMonthlyReports, processRecurringTransaction, triggerRecurringTransactions} from "../../../main/function";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [checkBudgetAlerts,triggerRecurringTransactions,processRecurringTransaction,generateMonthlyReports]

});
