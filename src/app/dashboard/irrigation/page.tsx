import Link from "next/link";

const transactions = [];

export default function TransactionsPage() {
  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/dashboard" className="hover:underline">
          General
        </Link>{" "}
        / Transactions
      </div>

      {/* Title */}
      <h1 className="text-2xl text-zinc-800 font-bold mb-4">Transactions</h1>

      {/* Table */}
      <div className="bg-white p-4 rounded-lg shadow-lg"></div>
    </div>
  );
}
