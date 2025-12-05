import { LeadStatus } from '../types';

interface FiltersProps {
  searchQuery: string;
  selectedCities: string[];
  selectedStatus: string;
  sortBy: string;
  withoutWebsite: boolean;
  cities: string[];
  onSearchChange: (value: string) => void;
  onCitiesChange: (cities: string[]) => void;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onWithoutWebsiteChange: (value: boolean) => void;
}

const statusOptions: LeadStatus[] = ["Pas_appelé", "Pas_décroché", "Rappel", "Refus", "RDV_fixe"];

export default function Filters({
  searchQuery,
  selectedCities,
  selectedStatus,
  sortBy,
  withoutWebsite,
  cities,
  onSearchChange,
  onCitiesChange,
  onStatusChange,
  onSortChange,
  onWithoutWebsiteChange,
}: FiltersProps) {
  const handleCityToggle = (city: string) => {
    if (selectedCities.includes(city)) {
      onCitiesChange(selectedCities.filter(c => c !== city));
    } else {
      onCitiesChange([...selectedCities, city]);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Filtres et recherche</h3>
      
      {/* Recherche texte */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Recherche
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher par nom ou ville..."
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Statut - en select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Statut
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tous les statuts</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status.replace('_', ' ')}</option>
            ))}
          </select>
        </div>

        {/* Tri */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trier par
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="reviews">Nombre d'avis</option>
            <option value="scoreAsc">Note (du pire au meilleur)</option>
            <option value="city">Ville</option>
            <option value="status">Statut</option>
          </select>
        </div>
      </div>

      {/* Villes en cases à cocher */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Villes ({selectedCities.length} sélectionnée{selectedCities.length > 1 ? 's' : ''})
        </label>
        <div className="flex flex-wrap gap-2">
          {cities.map(city => (
            <label key={city} className="flex items-center cursor-pointer bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors">
              <input
                type="checkbox"
                checked={selectedCities.includes(city)}
                onChange={() => handleCityToggle(city)}
                className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{city}</span>
            </label>
          ))}
        </div>
        {selectedCities.length > 0 && (
          <button
            onClick={() => onCitiesChange([])}
            className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
          >
            Tout désélectionner
          </button>
        )}
      </div>

      {/* Sans site web */}
      <div>
        <label className="flex items-center cursor-pointer bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
          <input
            type="checkbox"
            checked={withoutWebsite}
            onChange={(e) => onWithoutWebsiteChange(e.target.checked)}
            className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Sans site web</span>
        </label>
      </div>
    </div>
  );
}
