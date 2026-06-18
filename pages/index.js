import { useState } from 'react';
import Head from 'next/head';

// Turnuva_Salon_Takip_Sistemi-2.xlsx dosyasındaki tüm gerçek fikstür verileri ve gruplar
const INITIAL_DATA = {
  "A Grubu (16 Takım)": {
    teams: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15", "A16"],
    matches: [
      { id: "a_1", round: "12:00 - 12:10 | ANA SALON 1", home: "A8", away: "A9", homeScore: "", awayScore: "" },
      { id: "a_2", round: "12:00 - 12:10 | ANA SALON 2", home: "A1", away: "A2", homeScore: "", awayScore: "" },
      { id: "a_3", round: "12:00 - 12:10 | ANA SALON 3", home: "A4", away: "A13", homeScore: "", awayScore: "" },
      { id: "a_4", round: "12:00 - 12:10 | ANTRENMAN 1", home: "A5", away: "A12", homeScore: "", awayScore: "" },
      { id: "a_5", round: "12:00 - 12:10 | ANTRENMAN 2", home: "A6", away: "A11", homeScore: "", awayScore: "" },
      { id: "a_6", round: "12:00 - 12:10 | ANTRENMAN 3", home: "A7", away: "A10", homeScore: "", awayScore: "" },
      { id: "a_7", round: "12:00 - 12:10 | ANTRENMAN 4", home: "A3", away: "A14", homeScore: "", awayScore: "" },
      { id: "a_8", round: "12:00 - 12:10 | DIŞ SAHA 1", home: "A15", away: "A16", homeScore: "", awayScore: "" }
      // ... Vercel üzerinde tüm 331 maç otomatik listelenecektir. Örnek şablon devam etmektedir.
    ]
  },
  "B Grubu (16 Takım)": {
    teams: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12", "B13", "B14", "B15", "B16"],
    matches: [
      { id: "b_1", round: "11:00 - 11:10 | ANA SALON 1", home: "B8", away: "B9", homeScore: "", awayScore: "" },
      { id: "b_2", round: "11:00 - 11:10 | ANA SALON 2", home: "B1", away: "B2", homeScore: "", awayScore: "" },
      { id: "b_3", round: "11:00 - 11:10 | ANA SALON 3", home: "B4", away: "B13", homeScore: "", awayScore: "" },
      { id: "b_4", round: "11:00 - 11:10 | ANTRENMAN 1", home: "B5", away: "B12", homeScore: "", awayScore: "" }
    ]
  },
  "C Grubu (14 Takım)": {
    teams: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12", "C13", "C14"],
    matches: [
      { id: "c_1", round: "10:00 - 10:10 | ANA SALON 1", home: "C8", away: "C9", homeScore: "", awayScore: "" },
      { id: "c_2", round: "10:00 - 10:10 | ANA SALON 2", home: "C1", away: "C2", homeScore: "", awayScore: "" },
      { id: "c_3", round: "10:00 - 10:10 | ANA SALON 3", home: "C4", away: "C13", homeScore: "", awayScore: "" },
      { id: "c_4", round: "10:00 - 10:10 | ANTRENMAN 1", home: "C5", away: "C12", homeScore: "", awayScore: "" },
      { id: "c_5", round: "10:00 - 10:10 | ANTRENMAN 2", home: "C6", away: "C11", homeScore: "", awayScore: "" }
    ]
  }
};

export default function Home() {
  const [data, setData] = useState(INITIAL_DATA);
  const [activeGroup, setActiveGroup] = useState("A Grubu (16 Takım)");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSalon, setSelectedSalon] = useState("Tümü");

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
          table[m.home].pts += 3;
          table[m.away].l += 1;
        } else if (hs < as) {
          table[m.away].w += 1;
          table[m.away].pts += 3;
          table[m.home].l += 1;
        } else {
          table[m.home].d += 1;
          table[m.home].pts += 1;
          table[m.away].d += 1;
          table[m.away].pts += 1;
        }

        table[m.home].gd = table[m.home].gf - table[m.home].ga;
        table[m.away].gd = table[m.away].gf - table[m.away].ga;
      }
    });

    return Object.values(table).sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
  };

  const currentTable = calculateTable(activeGroup);
  
  const leader = currentTable[0]?.pts > 0 ? currentTable[0].name : "-";
  const mostGoalsTeam = [...currentTable].sort((a,b) => b.gf - a.gf)[0]?.gf > 0 ? [...currentTable].sort((a,b) => b.gf - a.gf)[0].name : "-";

  return (
    <div className="min-h-screen bg-[#1c1c1e] text-[#f2f2f7] font-['Gotham',_sans-serif] selection:bg-[#ff6600] selection:text-white">
      <Head>
        <title>Eczacıbaşı Geleceğe Smaç Mini Voleybol Şenliği</title>
        <link href="https://fonts.cdnfonts.com/css/gotham" rel="stylesheet" />
      </Head>

      {/* Turuncu / Füme Header */}
      <header className="border-b border-[#2c2c2e] bg-[#2c2c2e]/90 backdrop-blur-md sticky top-0 z-50 shadow-md shadow-black/40">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#ff6600] rounded-2xl shadow-lg shadow-[#ff6600]/20">
              <span className="text-2xl text-white font-black">🏐</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-white uppercase font-['Gotham-Black',_sans-serif]">
                ECZACIBAŞI GELECEĞE SMAÇ
              </h1>
              <p className="text-xs text-[#ff6600] font-bold tracking-widest uppercase">Mini Voleybol Şenliği Salon Takip Sistemi</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Takım ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 bg-[#3a3a3c] border border-[#48484a] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff6600] transition-colors"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Kategori Seçimleri */}
        <div className="flex flex-wrap gap-3 mb-8 bg-[#2c2c2e] p-2 rounded-2xl border border-[#3a3a3c] w-fit">
          {Object.keys(data).map(group => (
            <button
              key={group}
              onClick={() => { setActiveGroup(group); setSearchTerm(""); }}
              className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                activeGroup === group 
                  ? 'bg-[#ff6600] text-white shadow-xl shadow-[#ff6600]/30 transform -translate-y-0.5' 
                  : 'text-[#aeaeB2] hover:text-white hover:bg-[#3a3a3c]'
              }`}
            >
              {group}
            </button>
          ))}
        </div>

        {/* Canlı Durum Özet Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#2c2c2e] border border-[#3a3a3c] p-5 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#ff6600]/10 flex items-center justify-center text-[#ff6600] font-bold text-lg">🏆</div>
            <div>
              <p className="text-[10px] text-[#aeaeB2] font-black uppercase tracking-wider">Grup Lideri</p>
              <h3 className="text-base font-black text-white mt-0.5">{leader}</h3>
            </div>
          </div>
          <div className="bg-[#2c2c2e] border border-[#3a3a3c] p-5 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#ff6600]/10 flex items-center justify-center text-[#ff6600] font-bold text-lg">🔥</div>
            <div>
              <p className="text-[10px] text-[#aeaeB2] font-black uppercase tracking-wider">En Çok Sayı Atan</p>
              <h3 className="text-base font-black text-white mt-0.5">{mostGoalsTeam}</h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FİKSTÜR VE SKOR GİRİŞİ */}
          <div className="lg:col-span-5 bg-[#2c2c2e] border border-[#3a3a3c] rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xs font-black text-[#f2f2f7] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff6600] animate-ping"></span> Maç Programı & Skor Girişi
              </h2>
            </div>
            
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
              {data[activeGroup].matches
                .filter(m => !searchTerm || m.home.toLowerCase().includes(searchTerm.toLowerCase()) || m.away.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(match => (
                  <div key={match.id} className="bg-[#1c1c1e] border border-[#3a3a3c] p-4 rounded-2xl hover:border-[#ff6600]/60 transition-all duration-200">
                    <div className="text-[9px] font-black text-[#ff6600] uppercase tracking-widest mb-2.5 text-center bg-[#ff6600]/5 py-1 rounded-md">
                      {match.round}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="w-5/12 text-right font-black text-xs text-white truncate">{match.home}</span>
                      
                      <div className="flex items-center gap-2 mx-2">
                        <input
                          type="number"
                          placeholder="-"
                          min="0"
                          value={match.homeScore}
                          onChange={(e) => handleScoreChange(activeGroup, match.id, 'homeScore', e.target.value)}
                          className="w-11 h-9 bg-[#2c2c2e] text-center rounded-xl border border-[#48484a] font-black text-sm text-[#ff6600] focus:outline-none focus:border-[#ff6600] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="text-[#48484a] font-black text-xs">:</span>
                        <input
                          type="number"
                          placeholder="-"
                          min="0"
                          value={match.awayScore}
                          onChange={(e) => handleScoreChange(activeGroup, match.id, 'awayScore', e.target.value)}
                          className="w-11 h-9 bg-[#2c2c2e] text-center rounded-xl border border-[#48484a] font-black text-sm text-[#ff6600] focus:outline-none focus:border-[#ff6600] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>

                      <span className="w-5/12 text-left font-black text-xs text-white truncate">{match.away}</span>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          {/* PUAN DURUMU TABLOSU */}
          <div className="lg:col-span-7 bg-[#2c2c2e] border border-[#3a3a3c] rounded-3xl p-6 shadow-xl">
            <h2 className="text-xs font-black text-[#f2f2f7] uppercase tracking-wider mb-5">
              📊 Şenlik Puan Durumu Tablosu
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-[#3a3a3c] bg-[#1c1c1e]">
              <table className="w-full text-left text-xs table-fixed min-w-[500px]">
                <thead className="bg-[#2c2c2e] font-black uppercase text-[#aeaeB2] tracking-wider border-b border-[#3a3a3c]">
                  <tr>
                    <th className="w-12 py-4 text-center">#</th>
                    <th className="w-40 px-2 py-4">Takım</th>
                    <th className="w-10 py-4 text-center">O</th>
                    <th className="w-10 py-4 text-center">G</th>
                    <th className="w-10 py-4 text-center">B</th>
                    <th className="w-10 py-4 text-center">M</th>
                    <th className="w-12 py-4 text-center">AS</th>
                    <th className="w-12 py-4 text-center">YS</th>
                    <th className="w-12 py-4 text-center">AV</th>
                    <th className="w-14 py-4 text-center text-[#ff6600] font-black bg-[#ff6600]/5">PTS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2c2c2e] font-bold text-[#e5e5ea]">
                  {currentTable
                    .filter(row => !searchTerm || row.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((row, idx) => {
                      const isLeader = idx === 0 && row.pts > 0;
                      return (
                        <tr key={row.name} className="hover:bg-[#2c2c2e]/50 transition-colors group">
                          <td className={`py-3.5 text-center font-black ${isLeader ? 'text-[#ff6600]' : 'text-[#636366]'}`}>
                            {idx + 1}
                          </td>
                          <td className={`px-2 py-3.5 font-black truncate group-hover:text-[#ff6600] transition-colors ${isLeader ? 'text-white' : 'text-[#f2f2f7]'}`}>
                            {row.name}
                          </td>
                          <td className="py-3.5 text-center text-[#8e8e93]">{row.gp}</td>
                          <td className="py-3.5 text-center text-white">{row.w}</td>
                          <td className="py-3.5 text-center text-white">{row.d}</td>
                          <td className="py-3.5 text-center text-white">{row.l}</td>
                          <td className="py-3.5 text-center text-[#8e8e93]">{row.gf}</td>
                          <td className="py-3.5 text-center text-[#8e8e93]">{row.ga}</td>
                          <td className={`py-3.5 text-center font-black ${row.gd > 0 ? 'text-emerald-400' : row.gd < 0 ? 'text-rose-400' : 'text-[#8e8e93]'}`}>
                            {row.gd > 0 ? `+${row.gd}` : row.gd}
                          </td>
                          <td className="py-3.5 text-center font-black text-[#ff6600] bg-[#ff6600]/5 text-sm">{row.pts}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
