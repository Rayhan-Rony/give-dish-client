import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";

const TransactionHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: transactions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["transactions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/transactions?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  if (isError) {
    return (
      <p className="text-center mt-6 text-red-500">
        Failed to load transactions.
      </p>
    );
  }
  console.log(transactions);

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-semibold mb-6">Transaction History</h2>
      <div className="w-full overflow-x-auto">
        <table className="table  min-w-[700px]">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Amount Paid</th>
              <th>Request Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={txn._id}>
                <td>{index + 1}</td>
                <td className="font-medium break-all">{txn.transactionId}</td>
                <td>${(txn.amount / 100).toFixed(2)}</td>
                <td>{new Date(txn.paid_At).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      txn.status === "approved"
                        ? "badge-success"
                        : txn.status === "pending"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
