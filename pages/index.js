import { useState, useEffect } from 'react';
import Head from 'next/head';

// Excel dosyanızdan çıkarılan takımlar ve eşleşme şablonları
const INITIAL_DATA = {
  "Grup A": {
    teams: ["c1", "c2", "c3", "c4", "team5", "team6", "team7", "team8", "team9", "team10", "team11", "team12", "team13", "team14"],
    matches: [
      { id: "a1", home: "c4", away: "team5", homeScore: "", awayScore: "" },
      { id: "a2", home: "team11", away: "team13", homeScore: "", awayScore: "" },
      { id: "a3", home: "team6", away: "c2", homeScore: "", awayScore: "" },
      { id: "a4", home: "team12", away: "team14", homeScore: "", awayScore: "" },
      { id: "a5", home: "team14", away: "c4", homeScore: "", awayScore: "" },
      { id: "a6", home: "c2", away: "team10", homeScore: "", awayScore: "" },
      { id: "a7", home: "team5", away: "team11", homeScore: "", awayScore: "" },
      { id: "a8", home: "c3", away: "team13", homeScore: "", awayScore: "" },
      { id: "a9", home: "team7", away: "team6", homeScore: "", awayScore: "" },
      { id: "a10", home: "team8", away: "team12", homeScore: "", awayScore: "" },
    ]
  },
  "Grup B": {
    teams: ["team1", "team2", "team3", "team4", "team5", "team6", "team7", "team8", "team9", "team10", "team11", "team12", "team13", "team14"],
    matches: [
      { id: "b1", home: "team6", away: "team2", homeScore: "", awayScore: "" },
      { id: "b2", home: "team12", away: "team14", homeScore: "", awayScore: "" },
      { id: "b3", home: "team14", away: "team4", homeScore: "", awayScore: "" },
      { id: "b4", home: "team2", away: "team10", homeScore: "", awayScore: "" },
      { id: "b5", home: "team5", away: "team11", homeScore: "", awayScore: "" },
    ]
  },
  "Grup C": {
    teams: ["team1", "team2", "team3", "team4", "team5", "team6", "team7", "team8", "team9", "team10", "team11", "team12", "team13", "team14"],
    matches: [
      { id: "c1", home: "team7", away: "team6", homeScore: "", awayScore: "" },
      { id: "c2", home: "team8", away: "team12", homeScore: "", awayScore: "" },
    ]
  },
  "Grup D": {
    teams: ["team1", "team2", "team3", "team4", "team5", "team6", "team7", "team8", "team9", "team10", "team11", "team12", "team13", "team14"],
    matches: [
      { id: "d1", home: "team1", away: "team9", homeScore: "", awayScore: "" },
      { id: "d2", home: "team11", away: "team7", homeScore: "", awayScore: "" },
    ]
  }
};

export default function Home() {
  const [data, setData] = useState(INITIAL_DATA);
  const [activeGroup, setActiveGroup] = useState("Grup A");
  const [pointsConfig, setPointsConfig] = useState({ win: 3, draw: 1, loss: 0 }); // Excel kuralları özelleştirilebilir

  // Skor Değişimi Yönetimi
  const handleScoreChange = (group, matchId, field, value) => {
    setData(prev => {
      const updatedMatches = prev[group].matches.map(m => {
        if (m.id === matchId) {
          return { ...m, [field]: value === "" ? "" : parseInt(value, 10) };
        }
        return m;
      });
      return { ...prev, [group]: { ...prev[group], matches: updatedMatches } };
    });
  };

  // Dinamik Puan Durumu Hesaplama Fonksiyonu
  const calculateTable = (groupName) => {
    const group = data[groupName];
    const table = {};

    group.teams.forEach(t => {
      table[t] = { name: t, gp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 };
    });

    group.matches.forEach(m => {
      if (m.homeScore !== "" && m.awayScore !== "") {
        const hs = m.homeScore;
        const as = m.awayScore;

        table[m.home].gp += 1;
        table[m.away].gp += 1;
        table[m.home].gf += hs;
        table[m.home].ga += as;
        table[m.away].gf += as;
        table[m.away].ga += hs;

        if (hs > as) {
          table[m.home].w += 1;
          table[m.home].pts += pointsConfig.win;
          table[m.away].l += 1;
          table[m.away].pts += pointsConfig.loss;
        } else if (hs < as) {
          table[m.away].w += 1;
          table[m.away].pts += pointsConfig.win;
          table[m.home].l += 1;
          table[m.home].pts += pointsConfig.loss;
        } else {
          table[m.home].d += 1;
          table[m.home].pts += pointsConfig.draw;
          table[m.away].d += 1;
          table[m.away].pts += pointsConfig.draw;
        }

        table[m.home].gd = table[m.home].gf - table[m.home].ga;
        table[m.away].gd = table[m.away].gf - table[m.away].ga;
      }
    });

    return Object.values(table).sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
  };

  const currentTable = calculateTable(activeGroup);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <Head>
        <title>14 Takımlı Spor Turnuvası Dashboard</title>
      </Head>

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            🏆 Turnuva Yönetim Paneli
          </h1>
          {/* Kurallar Modülü */}
          <div className="flex gap-4 text-xs bg-slate-800 p-2 rounded-lg border border-slate-700">
            <div>Galibiyet: <span className="text-emerald-400 font-bold">{pointsConfig.win} Puan</span></div>
            <div>Beraberlik: <span className="text-amber-400 font-bold">{pointsConfig.draw} Puan</span></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Grup Sekmeleri */}
        <div className="flex gap-2 mb-8 bg-slate-800/50 p-1.5 rounded-xl w-fit border border-slate-800">
          {Object.keys(data).map(group => (
            <button
              key={group}
              onClick={() => setActiveGroup(group)}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeGroup === group 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-950/50' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {group}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SKOR GİRİŞ ALANI */}
          <div className="lg:col-span-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 backdrop-blur">
            <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
              ⚽ Maç Skorlarını Girin
            </h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {data[activeGroup].matches.map(match => (
                <div key={match.id} className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 hover:border-slate-700 transition">
                  <span className="w-1/3 text-right font-medium text-sm text-slate-300 truncate">{match.home}</span>
                  
                  <div className="flex items-center gap-2 mx-4">
                    <input
                      type="number"
                      min="0"
                      value={match.homeScore}
                      onChange={(e) => handleScoreChange(activeGroup, match.id, 'homeScore', e.target.value)}
                      className="w-12 h-9 bg-slate-800 text-center rounded-lg border border-slate-700 font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                    />
                    <span className="text-slate-600 font-bold">:</span>
                    <input
                      type="number"
                      min="0"
                      value={match.awayScore}
                      onChange={(e) => handleScoreChange(activeGroup, match.id, 'awayScore', e.target.value)}
                      className="w-12 h-9 bg-slate-800 text-center rounded-lg border border-slate-700 font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <span className="w-1/3 text-left font-medium text-sm text-slate-300 truncate">{match.away}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PUAN DURUMU ALANI */}
          <div className="lg:col-span-7 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 backdrop-blur">
            <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
              📊 Canlı Puan Durumu ({activeGroup})
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-xs uppercase bg-slate-900/80 text-slate-400">
                  <tr>
                    <th className="px-3 py-3 rounded-l-lg text-center w-10">Sıra</th>
                    <th className="px-4 py-3">Takım</th>
                    <th className="px-3 py-3 text-center">O</th>
                    <th className="px-3 py-3 text-center">G</th>
                    <th className="px-3 py-3 text-center">B</th>
                    <th className="px-3 py-3 text-center">M</th>
                    <th className="px-3 py-3 text-center">AG</th>
                    <th className="px-3 py-3 text-center">YG</th>
                    <th className="px-3 py-3 text-center">AV</th>
                    <th className="px-3 py-3 text-center rounded-r-lg text-emerald-400 font-bold">PTS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {currentTable.map((row, idx) => (
                    <tr key={row.name} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-3 py-3.5 font-bold text-center text-slate-500">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-white">
                        {row.name}
                      </td>
                      <td className="px-3 py-3.5 text-center">{row.gp}</td>
                      <td className="px-3 py-3.5 text-center text-emerald-400">{row.w}</td>
                      <td className="px-3 py-3.5 text-center text-amber-400">{row.d}</td>
                      <td className="px-3 py-3.5 text-center text-rose-400">{row.l}</td>
                      <td className="px-3 py-3.5 text-center text-slate-400">{row.gf}</td>
                      <td className="px-3 py-3.5 text-center text-slate-400">{row.ga}</td>
                      <td className="px-3 py-3.5 text-center font-medium">{row.gd > 0 ? `+${row.gd}` : row.gd}</td>
                      <td className="px-3 py-3.5 text-center font-bold text-emerald-400 bg-emerald-950/10">{row.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
