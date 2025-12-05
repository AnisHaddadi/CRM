import { useState, useEffect, useMemo } from 'react';
import { Lead } from './types';
import { rawLeads } from './data';
import { loadLeadsFromStorage, saveLeadsToStorage } from './utils/storage';
import { transformRawLeadToLead } from './utils/transform';
import Dashboard from './components/Dashboard';
import Filters from './components/Filters';
import LeadCard from './components/LeadCard';

function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('reviews');
  const [withoutWebsite, setWithoutWebsite] = useState(false);

  // Charger les données au montage
  useEffect(() => {
    const storedLeads = loadLeadsFromStorage();
    
    if (storedLeads && storedLeads.length > 0) {
      // Réinitialiser tous les statuts à "Pas_appelé" pour les données existantes
      const resetLeads = storedLeads.map(lead => ({
        ...lead,
        status: "Pas_appelé" as const,
        lastCallDate: null,
        nextCallDate: null,
      }));
      setLeads(resetLeads);
      saveLeadsToStorage(resetLeads);
    } else {
      // Initialiser avec rawLeads
      const initialLeads = rawLeads.map((rawLead, index) => 
        transformRawLeadToLead(rawLead, index)
      );
      setLeads(initialLeads);
      saveLeadsToStorage(initialLeads);
    }
  }, []);

  // Sauvegarder à chaque modification
  useEffect(() => {
    if (leads.length > 0) {
      saveLeadsToStorage(leads);
    }
  }, [leads]);

  // Extraire les villes uniques
  const cities = useMemo(() => {
    const citySet = new Set<string>();
    leads.forEach((lead: Lead) => {
      if (lead.city) {
        citySet.add(lead.city);
      }
    });
    return Array.from(citySet).sort();
  }, [leads]);

  // Filtrer et trier les leads
  const filteredAndSortedLeads = useMemo(() => {
    let filtered = [...leads];

    // Filtre par recherche (titre et ville)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(lead =>
        lead.title.toLowerCase().includes(query) ||
        (lead.city && lead.city.toLowerCase().includes(query))
      );
    }

    // Filtre par villes (multi-sélection)
    if (selectedCities.length > 0) {
      filtered = filtered.filter(lead => lead.city && selectedCities.includes(lead.city));
    }

    // Filtre par statut (sélection unique)
    if (selectedStatus) {
      filtered = filtered.filter(lead => lead.status === selectedStatus);
    }

    // Filtre sans site web
    if (withoutWebsite) {
      filtered = filtered.filter(lead => !lead.website || lead.website === null);
    }

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'reviews':
          return a.reviewsCount - b.reviewsCount; // Croissant : du moins au plus
        case 'scoreAsc':
          const scoreAAsc = a.totalScore ?? 0;
          const scoreBAsc = b.totalScore ?? 0;
          return scoreAAsc - scoreBAsc; // Croissant : du pire au meilleur
        case 'city':
          const cityA = a.city || '';
          const cityB = b.city || '';
          return cityA.localeCompare(cityB);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return filtered;
  }, [leads, searchQuery, selectedCities, selectedStatus, sortBy, withoutWebsite]);

  const handleLeadUpdate = (updatedLead: Lead) => {
    setLeads((prevLeads: Lead[]) =>
      prevLeads.map((lead: Lead) =>
        lead.id === updatedLead.id ? updatedLead : lead
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            CRM Cold Calling - Coachs Sportifs
          </h1>
          <p className="text-gray-600">
            Gérez vos prospects et effectuez vos appels directement depuis votre téléphone
          </p>
        </header>

        <Dashboard leads={leads} />

        <Filters
          searchQuery={searchQuery}
          selectedCities={selectedCities}
          selectedStatus={selectedStatus}
          sortBy={sortBy}
          withoutWebsite={withoutWebsite}
          cities={cities}
          onSearchChange={setSearchQuery}
          onCitiesChange={setSelectedCities}
          onStatusChange={setSelectedStatus}
          onSortChange={setSortBy}
          onWithoutWebsiteChange={setWithoutWebsite}
        />

        <div className="mb-4 text-sm text-gray-600">
          {filteredAndSortedLeads.length} lead{filteredAndSortedLeads.length > 1 ? 's' : ''} trouvé{filteredAndSortedLeads.length > 1 ? 's' : ''}
        </div>

        <div className="space-y-4">
          {filteredAndSortedLeads.map(lead => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onUpdate={handleLeadUpdate}
            />
          ))}
        </div>

        {filteredAndSortedLeads.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Aucun lead ne correspond à vos critères de recherche.</p>
            <p className="text-sm mt-2">Essayez de modifier vos filtres.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

