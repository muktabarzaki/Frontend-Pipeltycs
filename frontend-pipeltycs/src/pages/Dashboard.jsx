import { useEffect, useState } from "react";
import axios from "axios";

import Layout from '../components/Layout';

export default function Dashboard() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const getUser = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://127.0.0.1:8000/api/user",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUser(response.data);

                console.log(response.data);

            } catch (error) {

                console.log(error.response?.data);

            }
        };

        getUser();

    }, []);

    return (
        <Layout>

            {/* Semua kode di bawah ini akan masuk menggantikan {children} di Layout.jsx */}

            <h1 className="text-2xl font-bold mb-2">
                Sales Overview
            </h1>

            <p className="text-gray-500 mb-6">
                Ini adalah halaman utama Dashboard. Grafik rangkuman akan ditaruh di sini.
            </p>

            {/* CARD USER LOGIN */}
            <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">

                <h2 className="text-lg font-semibold mb-3">
                    User Login
                </h2>

                {user ? (

                    <div className="space-y-2">

                        <p>
                            <span className="font-semibold">Nama:</span>{" "}
                            {user.name}
                        </p>

                        <p>
                            <span className="font-semibold">Email:</span>{" "}
                            {user.email}
                        </p>

                    </div>

                ) : (

                    <p className="text-gray-500">
                        Loading user...
                    </p>

                )}

            </div>

        </Layout>
    );
}