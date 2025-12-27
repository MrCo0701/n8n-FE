export interface Law {
  id: string;
  title: string;
  lawType: string;
  issuingBody: string;
  summary: string;
  affectedEntities: string[];
  keyChanges: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  effectiveDate: string; // ISO Date string
  sourceUrl: string;
}
export interface RiskAssessment {
  riskFactors: string[];
  legalRefs: string[];
  mitigations: string[];
}
export interface Contract {
  id: string;
  title: string;
  contractType: string;
  partnerName: string;
  partnerTaxCode: string;
  contractValue: number;
  currency: string;
  riskScore: number; // 0-100
  riskNote: string;
  riskAssessment: RiskAssessment | null;
  status: 'DRAFT' | 'SIGNED' | 'CANCELLED' | 'COMPLETED';
}
export interface ComplianceTask {
  id: string;
  title: string;
  description: string;
  deadline: string; // ISO Date string
  status: 'PENDING' | 'COMPLETED' | 'OVERDUE';
  contractId: string;
  evidenceUrl?: string;
  contract?: {
    title: string;
  };
}

// Form Types
export interface ContractRequest {
  type: string;
  title: string;
  value: number;
  currency: string;
}
export interface PartyInfo {
  name: string;
  rep: string;
  address?: string;
  tax_code?: string;
}
export interface ContractContext {
  location: string;
  industry: string;
  purpose: string;
  special_notes: string;
}
export interface ContractFormData {
  contract_request: ContractRequest;
  parties: {
    party_a: PartyInfo;
    party_b: PartyInfo;
  };
  context: ContractContext;
}