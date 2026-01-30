import React, { useState } from 'react';
import { usePayments } from '../hooks/usePayments';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/solid';

export default function PaymentsList() {
  const { data: payments = [], isLoading, addPayment, deletePayment } = usePayments();
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;
  const totalPages = Math.ceil(payments.length / recordsPerPage);

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentPayments = payments.slice(indexOfFirst, indexOfLast);

  if (isLoading) return <p>Loading payments...</p>;

  return (
    <div className="bg-white border rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Pagos</h3>
        {/* <button
          onClick={() =>
            addPayment({ date: "2026-01-25", time: "19:05", amount: 2500, userId: 2 })
          }
          className="flex items-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          <PlusIcon className="h-5 w-5 mr-1" /> Add Payment
        </button> */}
      </div>

      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">Id</th>
            <th className="p-3 border">Fecha</th>
            <th className="p-3 border">Hora</th>
            <th className="p-3 border">Monto</th>
            <th className="p-3 border">Id Usuario</th>
            <th className="p-3 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentPayments.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="p-3 border">{p.id}</td>
              <td className="p-3 border">{p.date}</td>
              <td className="p-3 border">{p.time}</td>
              <td className="p-3 border">${p.amount}</td>
              <td className="p-3 border">{p.userId}</td>
              <td className="p-3 border">
                <button
                  onClick={() => deletePayment(p.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginado */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
