import { useObatContext } from "../context/ObatContext";
import { Link } from "react-router-dom";

const DashboardAdmin = () => {
  const { obatData } = useObatContext();

  // Hitung jumlah stok total
  const totalStok = obatData.reduce((sum, obat) => sum + obat.jumlah, 0);

  // Hitung jumlah nama obat yang unik
  const uniqueObatNames = new Set(obatData.map((obat) => obat.nama));
  const totalNamaObat = uniqueObatNames.size;


  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-500 p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-xl font-bold">Jumlah Stok Obat</h3>
          <p className="text-3xl">{totalStok}</p>
        </div>
        <div className="bg-green-500 p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-xl font-bold">Jumlah Nama Obat</h3>
          <p className="text-3xl">{totalNamaObat}</p>
        </div>
      </div>
      <div className="mt-6">
        <Link
          to="/admin/stock"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Lihat Daftar Stok Obat
        </Link>
      </div>
    </div>
  );
};

export default DashboardAdmin;
