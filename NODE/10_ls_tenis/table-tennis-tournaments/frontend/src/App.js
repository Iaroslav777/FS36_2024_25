import React, { useState, useEffect } from "react";
import {
  getTournaments,
  getStatistics,
  getCities,
  getTopTournaments,
  getAboveAveragePrizePoolTournaments,
} from "./services/api";

function App() {
  // Стан для зберігання даних про турніри
  const [tournaments, setTournaments] = useState([]);
  // Стан для зберігання статистичних даних
  const [statistics, setStatistics] = useState(null);
  // Стан для зберігання списку міст
  const [cities, setCities] = useState([]);
  // Стан для зберігання топ-турнірів
  const [topTournaments, setTopTournaments] = useState([]);
  // Стан для зберігання турнірів з призовим фондом вище середнього
  const [aboveAverageTournaments, setAboveAverageTournaments] = useState([]);
  // Стан для індикації завантаження
  const [loading, setLoading] = useState(true);
  // Стан для обробки помилок
  const [error, setError] = useState(null);

  useEffect(() => {
    // Асинхронна функція для завантаження всіх даних
    const loadData = async () => {
      try {
        // Отримуємо всі турніри
        const tournamentsData = await getTournaments();
        setTournaments(tournamentsData);

        // Отримуємо статистику
        const statisticsData = await getStatistics();
        setStatistics(statisticsData);

        // Отримуємо міста
        const citiesData = await getCities();
        setCities(citiesData);

        // Отримуємо топ-турніри
        const topTournamentsData = await getTopTournaments();
        setTopTournaments(topTournamentsData);

        // Отримуємо турніри з призовим фондом вище середнього
        const aboveAverageData = await getAboveAveragePrizePoolTournaments();
        setAboveAverageTournaments(aboveAverageData);
      } catch (err) {
        // Обробляємо помилки, якщо вони виникли під час завантаження даних
        setError("Не вдалося завантажити дані: " + err.message);
        console.error("Помилка завантаження даних:", err);
      } finally {
        // Завершуємо стан завантаження незалежно від успіху чи помилки
        setLoading(false);
      }
    };

    loadData(); // Викликаємо функцію завантаження даних при монтуванні компонента
  }, []); // Пустий масив залежностей означає, що ефект запускається лише один раз при монтуванні

  // Відображення стану завантаження
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Завантаження даних...</p>
      </div>
    );
  }

  // Відображення стану помилки
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100">
        <p className="text-xl text-red-700">Помилка: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-8 font-inter">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Турніри з настільного тенісу
        </h1>
        <p className="text-xl text-gray-600">
          Інформація про турніри, статистику та багато іншого
        </p>
      </header>

      {/* Секція статистики */}
      {statistics && (
        <section className="bg-white shadow-2xl rounded-xl p-8 mb-12 border border-gray-300 transform transition-all duration-300 hover:scale-[1.01]">
          <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b-2 pb-2 border-blue-300">
            Загальна статистика
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-blue-50 rounded-lg shadow-md">
              <p className="text-5xl font-extrabold text-blue-600">
                {statistics.TotalTournaments}
              </p>
              <p className="text-lg text-gray-600 mt-2">Всього турнірів</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg shadow-md">
              <p className="text-5xl font-extrabold text-green-600">
                {statistics.AveragePrizePool}€
              </p>
              <p className="text-lg text-gray-600 mt-2">
                Середній призовий фонд
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg shadow-md">
              <p className="text-5xl font-extrabold text-purple-600">
                {statistics.TotalPlayers}
              </p>
              <p className="text-lg text-gray-600 mt-2">
                Всього зареєстрованих гравців
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Секція всіх турнірів */}
      <section className="bg-white shadow-2xl rounded-xl p-8 mb-12 border border-gray-300 transform transition-all duration-300 hover:scale-[1.01]">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b-2 pb-2 border-blue-300">
          Всі турніри
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Назва</th>
                <th className="py-3 px-6 text-left">Місто</th>
                <th className="py-3 px-6 text-left">Дата</th>
                <th className="py-3 px-6 text-left">Призовий фонд (€)</th>
                <th className="py-3 px-6 text-left">Гравців</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {tournaments.map((tournament) => (
                <tr
                  key={tournament.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {tournament.id}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {tournament.tournament_name}
                  </td>
                  <td className="py-3 px-6 text-left">{tournament.city}</td>
                  <td className="py-3 px-6 text-left">
                    {new Date(tournament.tournament_date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {tournament.prize_pool}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {tournament.players_registered}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Секція унікальних міст */}
      <section className="bg-white shadow-2xl rounded-xl p-8 mb-12 border border-gray-300 transform transition-all duration-300 hover:scale-[1.01]">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b-2 pb-2 border-blue-300">
          Унікальні міста
        </h2>
        <div className="flex flex-wrap gap-2">
          {cities.map((city, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full shadow-md"
            >
              {city}
            </span>
          ))}
        </div>
      </section>

      {/* Секція топ-турнірів */}
      <section className="bg-white shadow-2xl rounded-xl p-8 mb-12 border border-gray-300 transform transition-all duration-300 hover:scale-[1.01]">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b-2 pb-2 border-blue-300">
          Топ-5 турнірів (за призовим фондом, пропускаючи перші 2)
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Назва</th>
                <th className="py-3 px-6 text-left">Місто</th>
                <th className="py-3 px-6 text-left">Призовий фонд (€)</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {topTournaments.map((tournament) => (
                <tr
                  key={tournament.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {tournament.id}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {tournament.tournament_name}
                  </td>
                  <td className="py-3 px-6 text-left">{tournament.city}</td>
                  <td className="py-3 px-6 text-left">
                    {tournament.prize_pool}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Секція турнірів з призовим фондом вище середнього */}
      <section className="bg-white shadow-2xl rounded-xl p-8 mb-12 border border-gray-300 transform transition-all duration-300 hover:scale-[1.01]">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b-2 pb-2 border-blue-300">
          Турніри з призовим фондом вище середнього
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Назва</th>
                <th className="py-3 px-6 text-left">Місто</th>
                <th className="py-3 px-6 text-left">Призовий фонд (€)</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {aboveAverageTournaments.map((tournament) => (
                <tr
                  key={tournament.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {tournament.id}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {tournament.tournament_name}
                  </td>
                  <td className="py-3 px-6 text-left">{tournament.city}</td>
                  <td className="py-3 px-6 text-left">
                    {tournament.prize_pool}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="text-center text-gray-600 mt-12">
        <p>
          &copy; {new Date().getFullYear()} Турніри з настільного тенісу. Всі
          права захищені.
        </p>
      </footer>
    </div>
  );
}

export default App;
