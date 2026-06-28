import { Territory } from '../types';

export const territories: Territory[] = [
  { id: 'gp', name: 'Guadeloupe', code: 'GP', octroiDeMer: 10.0, taxeRegionale: 2.5, tva: 8.5, shippingMultiplier: 2.8, currency: 'EUR' },
  { id: 'mq', name: 'Martinique', code: 'MQ', octroiDeMer: 10.0, taxeRegionale: 2.5, tva: 8.5, shippingMultiplier: 2.9, currency: 'EUR' },
  { id: 'gf', name: 'Guyane', code: 'GF', octroiDeMer: 0.0, taxeRegionale: 0.0, tva: 0.0, shippingMultiplier: 3.5, currency: 'EUR' },
  { id: 're', name: 'La Réunion', code: 'RE', octroiDeMer: 0.0, taxeRegionale: 0.0, tva: 8.5, shippingMultiplier: 3.2, currency: 'EUR' },
  { id: 'yt', name: 'Mayotte', code: 'YT', octroiDeMer: 0.0, taxeRegionale: 0.0, tva: 0.0, shippingMultiplier: 3.8, currency: 'EUR' },
  { id: 'bl', name: 'Saint-Barthélemy', code: 'BL', octroiDeMer: 5.0, taxeRegionale: 0.0, tva: 0.0, shippingMultiplier: 2.5, currency: 'EUR' },
  { id: 'mf', name: 'Saint-Martin', code: 'MF', octroiDeMer: 5.0, taxeRegionale: 0.0, tva: 0.0, shippingMultiplier: 2.4, currency: 'EUR' },
  { id: 'pm', name: 'Saint-Pierre-et-Miquelon', code: 'PM', octroiDeMer: 0.0, taxeRegionale: 0.0, tva: 0.0, shippingMultiplier: 4.0, currency: 'EUR' },
  { id: 'nc', name: 'Nouvelle-Calédonie', code: 'NC', octroiDeMer: 0.0, taxeRegionale: 0.0, tva: 0.0, shippingMultiplier: 3.5, currency: 'XPF' },
  { id: 'pf', name: 'Polynésie française', code: 'PF', octroiDeMer: 0.0, taxeRegionale: 0.0, tva: 16.0, shippingMultiplier: 4.2, currency: 'XPF' },
  { id: 'wf', name: 'Wallis-et-Futuna', code: 'WF', octroiDeMer: 0.0, taxeRegionale: 0.0, tva: 0.0, shippingMultiplier: 4.5, currency: 'XPF' },
];
