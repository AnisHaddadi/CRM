export type LeadStatus = "Pas_appelé" | "Pas_décroché" | "Rappel" | "Refus" | "RDV_fixe";

export interface RawLead {
  title: string;
  totalScore: number | null;
  reviewsCount: number;
  street: string | null;
  city: string | null;
  state: string | null;
  countryCode: string | null;
  website: string | null;
  phone: string | null;
  categoryName: string | null;
  url: string | null;
}

export interface Lead extends RawLead {
  id: string;
  status: LeadStatus;
  notes: string;
  lastCallDate: string | null;
  nextCallDate: string | null;
}

