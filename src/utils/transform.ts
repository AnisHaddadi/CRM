import { RawLead, Lead } from '../types';

export function transformRawLeadToLead(rawLead: RawLead, index: number): Lead {
  // Générer un ID unique basé sur le titre et le téléphone, ou l'index
  const id = rawLead.title && rawLead.phone
    ? `${rawLead.title}-${rawLead.phone}`.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()
    : `lead-${index}`;

  return {
    ...rawLead,
    id,
    status: "Pas_appelé",
    notes: "",
    lastCallDate: null,
    nextCallDate: null,
  };
}

