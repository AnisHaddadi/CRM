import { Lead } from '../types';

const STORAGE_KEY = 'crm_coachs_nantes_v1';

export function loadLeadsFromStorage(): Lead[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Erreur lors du chargement depuis localStorage:', error);
  }
  return null;
}

export function saveLeadsToStorage(leads: Lead[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde dans localStorage:', error);
  }
}

