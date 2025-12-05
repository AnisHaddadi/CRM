import { Lead } from '../types';

interface DashboardProps {
  leads: Lead[];
}

export default function Dashboard({ leads }: DashboardProps) {
  const totalLeads = leads.length;
  // Un appel est effectué seulement si le statut n'est pas "Pas_appelé" (quand on clique sur un des 4 autres boutons)
  const callsMade = leads.filter(lead => lead.status !== "Pas_appelé").length;
  const contactedLeads = leads.filter(lead => lead.status !== "Pas_décroché" && lead.status !== "Pas_appelé").length;
  const contactRate = totalLeads > 0 ? Math.round((contactedLeads / totalLeads) * 100) : 0;
  const pasDecrocheCount = leads.filter(lead => lead.status === "Pas_décroché").length;
  const remindersCount = leads.filter(lead => lead.nextCallDate !== null).length;
  const rdvFixedCount = leads.filter(lead => lead.status === "RDV_fixe").length;

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-4 sticky top-0 z-10 border-b">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Tableau de bord</h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-700">{totalLeads}</div>
          <div className="text-xs text-blue-600 mt-1">Total leads</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-700">{callsMade}</div>
          <div className="text-xs text-green-600 mt-1">Appels effectués</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-700">{contactRate}%</div>
          <div className="text-xs text-purple-600 mt-1">Taux de décroché</div>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-700">{pasDecrocheCount}</div>
          <div className="text-xs text-yellow-600 mt-1">Pas décroché</div>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
          <div className="text-2xl font-bold text-orange-700">{remindersCount}</div>
          <div className="text-xs text-orange-600 mt-1">Rappels</div>
        </div>
        <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
          <div className="text-2xl font-bold text-emerald-700">{rdvFixedCount}</div>
          <div className="text-xs text-emerald-600 mt-1">RDV fixé</div>
        </div>
      </div>
    </div>
  );
}

