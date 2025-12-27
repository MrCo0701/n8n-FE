import axios from 'axios';
import { Contract, ComplianceTask, Law, ContractFormData } from '../types';
const api = axios.create({
  baseURL: 'http://n8n-be.lamphamit.site:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});
export const contractApi = {
  getAll: async () => {
    const response = await api.get<Contract[]>('/contracts');
    return response.data.data;
  },
  create: async (data: ContractFormData) => {
    const response = await axios.post<Contract>('http://54.179.111.4:5678/webhook/workflow-2/contract', data);
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get<Contract>(`/contracts/${id}`);
    return response.data;
  },
  updateStatus: async (id: string, status: Contract['status']) => {
    const response = await api.patch<Contract>(`/contracts/${id}/status`, {
      status
    });
    return response.data;
  }
};
export const taskApi = {
  getAll: async () => {
    const response = await api.get<ComplianceTask[]>('/tasks');
    return response.data.data;
  },
  getByContract: async (contractId: string) => {
    const response = await api.get<ComplianceTask[]>(`/tasks/contract/${contractId}`);
    return response.data;
  },
  updateStatus: async (id: string, status: ComplianceTask['status']) => {
    const response = await api.patch<ComplianceTask>(`/tasks/${id}/status`, {
      status
    });
  
    return response.data;
  }
};
export const lawApi = {
  getAll: async () => {
    const response = await api.get<{ data: Law[] }>('/laws/latest');
    return response.data.data ? response.data.data : response.data;
  },
  create: async (data: Omit<Law, 'id'>) => {
    const response = await api.post<Law>('/laws', data);
    return response.data;
  }
};
export default api;