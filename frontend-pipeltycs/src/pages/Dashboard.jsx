import Layout from '../components/Layout';

export default function Dashboard() {
    return (
        <Layout>
            {/* Semua kode di bawah ini akan masuk menggantikan {children} di Layout.jsx */}
            <h1 className="text-2xl font-bold mb-6">Sales Overview</h1>
            <p className="text-gray-500">
                Ini adalah halaman utama Dashboard. Grafik rangkuman akan ditaruh di sini.
            </p>
        </Layout>
    );
}