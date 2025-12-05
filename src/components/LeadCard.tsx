import { useState, useEffect } from 'react';
import { Lead, LeadStatus } from '../types';

interface LeadCardProps {
  lead: Lead;
  onUpdate: (updatedLead: Lead) => void;
}

const statusOptions: LeadStatus[] = ["Pas_appelé", "Pas_décroché", "Rappel", "Refus", "RDV_fixe"];

const statusColors: Record<LeadStatus, { bg: string; text: string; border: string; borderLeft: string }> = {
  "Pas_appelé": {
    bg: "bg-gray-50",
    text: "text-gray-800",
    border: "border-gray-300",
    borderLeft: "border-l-8 border-l-gray-500"
  },
  "Pas_décroché": {
    bg: "bg-blue-50",
    text: "text-blue-900",
    border: "border-blue-300",
    borderLeft: "border-l-8 border-l-blue-600"
  },
  "Rappel": {
    bg: "bg-orange-50",
    text: "text-orange-900",
    border: "border-orange-300",
    borderLeft: "border-l-8 border-l-orange-600"
  },
  "Refus": {
    bg: "bg-red-50",
    text: "text-red-900",
    border: "border-red-300",
    borderLeft: "border-l-8 border-l-red-600"
  },
  "RDV_fixe": {
    bg: "bg-green-50",
    text: "text-green-900",
    border: "border-green-300",
    borderLeft: "border-l-8 border-l-green-600"
  },
};

export default function LeadCard({ lead, onUpdate }: LeadCardProps) {
  const [tempNextCallDate, setTempNextCallDate] = useState(lead.nextCallDate || '');

  // Synchroniser tempNextCallDate avec lead.nextCallDate
  useEffect(() => {
    setTempNextCallDate(lead.nextCallDate || '');
  }, [lead.nextCallDate, lead.status]);

  const handleStatusChange = (newStatus: LeadStatus) => {
    const updatedLead: Lead = {
      ...lead,
      status: newStatus,
    };
    
    // Si on passe à "Pas_appelé", on réinitialise lastCallDate
    if (newStatus === "Pas_appelé") {
      updatedLead.lastCallDate = null;
      updatedLead.nextCallDate = null;
    } else {
      // Pour tous les autres statuts (Pas_décroché, Rappel, Refus, RDV_fixe), on met à jour lastCallDate
      // C'est à ce moment qu'un appel est considéré comme effectué
      updatedLead.lastCallDate = new Date().toISOString();
    }
    
    if (newStatus === "Rappel") {
      // Si on passe en rappel et qu'il n'y a pas de date, proposer +1 jour par défaut
      if (!lead.nextCallDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        updatedLead.nextCallDate = tomorrow.toISOString().split('T')[0];
        setTempNextCallDate(updatedLead.nextCallDate);
      } else {
        updatedLead.nextCallDate = lead.nextCallDate;
        setTempNextCallDate(lead.nextCallDate);
      }
    } else {
      // Pour les autres statuts, on ne garde pas la date de rappel
      updatedLead.nextCallDate = null;
    }
    
    onUpdate(updatedLead);
  };

  const handleNextCallDateChange = (date: string) => {
    const updatedLead: Lead = {
      ...lead,
      nextCallDate: date || null,
    };
    setTempNextCallDate(date);
    onUpdate(updatedLead);
  };

  const handleQuickDateSelect = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const dateStr = date.toISOString().split('T')[0];
    handleNextCallDateChange(dateStr);
  };

  const handleNotesChange = (notes: string) => {
    const updatedLead: Lead = {
      ...lead,
      notes,
    };
    onUpdate(updatedLead);
  };

  const normalizePhone = (phone: string | null) => {
    if (!phone) return '';
    return phone.replace(/\s/g, '');
  };

  const getStatusColor = (status: LeadStatus) => statusColors[status] || statusColors["Pas_appelé"];

  const statusColor = getStatusColor(lead.status);

  return (
    <div className={`rounded-lg shadow-lg p-5 mb-4 border-2 ${statusColor.border} ${statusColor.borderLeft} ${statusColor.bg}`}>
      {/* En-tête */}
      <div className="mb-3">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{lead.title}</h3>
        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          {lead.city && <span>📍 {lead.city}</span>}
          {lead.countryCode && <span>{lead.countryCode}</span>}
        </div>
      </div>

      {/* Note et avis */}
      <div className="mb-3">
        {lead.totalScore !== null ? (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-yellow-500">⭐</span>
            <span className="font-semibold">{lead.totalScore.toFixed(1)}</span>
            <span className="text-gray-600">sur {lead.reviewsCount} avis</span>
          </div>
        ) : (
          <div className="text-sm text-gray-500">Aucune note</div>
        )}
      </div>

      {/* Catégorie */}
      {lead.categoryName && (
        <div className="mb-2">
          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
            {lead.categoryName}
          </span>
        </div>
      )}

      {/* Adresse */}
      {lead.street && (
        <div className="mb-3 text-sm text-gray-600">
          📍 {lead.street}
        </div>
      )}

      {/* Bouton Appeler */}
      {lead.phone && (
        <div className="mb-3">
          <a
            href={`tel:${normalizePhone(lead.phone)}`}
            className="inline-block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            📞 Appeler {lead.phone}
          </a>
        </div>
      )}

      {/* Boutons de statut */}
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-800 mb-2 font-semibold">Statut</label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {statusOptions.map(status => {
            const isActive = lead.status === status;
            const statusColor = getStatusColor(status);
            return (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`py-2.5 px-3 text-xs font-semibold rounded-lg border-2 transition-all ${
                  isActive
                    ? `${statusColor.bg} ${statusColor.text} ${statusColor.border} shadow-md scale-105`
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Date de rappel */}
      {lead.status === "Rappel" && (
        <div className="mb-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
          <label className="block text-sm font-medium text-orange-800 mb-2">
            Date de rappel
          </label>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <button
                onClick={() => handleQuickDateSelect(1)}
                className="flex-1 py-1 px-2 text-xs bg-white border border-orange-300 rounded hover:bg-orange-50"
              >
                +1 jour
              </button>
              <button
                onClick={() => handleQuickDateSelect(3)}
                className="flex-1 py-1 px-2 text-xs bg-white border border-orange-300 rounded hover:bg-orange-50"
              >
                +3 jours
              </button>
              <button
                onClick={() => handleQuickDateSelect(7)}
                className="flex-1 py-1 px-2 text-xs bg-white border border-orange-300 rounded hover:bg-orange-50"
              >
                +7 jours
              </button>
            </div>
            <input
              type="date"
              value={tempNextCallDate}
              onChange={(e) => handleNextCallDateChange(e.target.value)}
              className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {lead.nextCallDate && (
              <div className="text-xs text-orange-700 mt-1">
                Rappel prévu: {new Date(lead.nextCallDate).toLocaleDateString('fr-FR')}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notes */}
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes
        </label>
        <textarea
          value={lead.notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Ajouter des notes après l'appel (motivation, objections, budget, etc.)..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Dernier appel */}
      {lead.lastCallDate && (
        <div className="text-xs text-gray-500 mb-3">
          Dernier appel: {new Date(lead.lastCallDate).toLocaleString('fr-FR')}
        </div>
      )}

      {/* Liens */}
      <div className="flex gap-2 flex-wrap">
        {lead.website && (
          <a
            href={lead.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
          >
            🌐 Site web
          </a>
        )}
        {lead.url && (
          <a
            href={lead.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
            onClick={(e) => {
              // S'assurer que le lien fonctionne même si l'URL est mal formatée
              if (!lead.url?.startsWith('http://') && !lead.url?.startsWith('https://')) {
                e.preventDefault();
                window.open(`https://${lead.url}`, '_blank');
              }
            }}
          >
            🗺️ Google Maps
          </a>
        )}
      </div>
    </div>
  );
}

