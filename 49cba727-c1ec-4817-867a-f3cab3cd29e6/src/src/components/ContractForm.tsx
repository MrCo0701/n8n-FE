import React, { useState } from 'react';
import { ContractFormData } from '../types';
import { contractApi } from '../services/api';
import toast from 'react-hot-toast';
import { Save, Loader2 } from 'lucide-react';

interface ContractFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function ContractForm({ onSuccess, onCancel }: ContractFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // KHỚP HOÀN TOÀN VỚI DATA MẪU CỦA BẠN
  const [formData, setFormData] = useState<ContractFormData>({
    contract_request: {
      type: 'Hợp đồng Dịch vụ',
      title: '',
      value: 0,
      currency: 'VND'
    },
    parties: {
      party_a: {
        name: '',
        representative: '', // Đã sửa từ 'rep' thành 'representative'
        address: ''
      },
      party_b: {
        name: '',
        representative: '', // Đã sửa từ 'rep' thành 'representative'
        tax_code: ''
      }
    },
    context: {
      location: '',
      industry: '',
      purpose: '',
      special_notes: ''
    }
  });

  const handleChange = (section: keyof ContractFormData, field: string, value: any, subSection?: string) => {
    setFormData(prev => {
      if (subSection && section === 'parties') {
        return {
          ...prev,
          parties: {
            ...prev.parties,
            [subSection]: {
              //@ts-ignore
              ...prev.parties[subSection],
              [field]: value
            }
          }
        };
      }
      return {
        ...prev,
        [section]: {
          //@ts-ignore
          ...prev[section],
          [field]: value
        }
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await contractApi.create(formData);
      toast.success('Tạo hợp đồng thành công!');
      onSuccess();
    } catch (error) {
      toast.error('Lỗi khi tạo hợp đồng');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      {/* PHẦN 1: THÔNG TIN CHUNG */}
      <div>
        <h3 className="text-lg font-medium text-slate-900 border-b border-slate-200 pb-2 mb-4">
          Thông tin hợp đồng
        </h3>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label className="block text-sm font-medium text-slate-700">Tên hợp đồng</label>
            <input type="text" required className="mt-1 block w-full rounded-md border-slate-300 p-2 border sm:text-sm" 
              value={formData.contract_request.title} 
              onChange={e => handleChange('contract_request', 'title', e.target.value)} 
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Loại</label>
            <select className="mt-1 block w-full rounded-md border-slate-300 p-2 border sm:text-sm" 
              value={formData.contract_request.type} 
              onChange={e => handleChange('contract_request', 'type', e.target.value)}
            >
              <option>Hợp đồng Dịch vụ</option>
              <option>Hợp đồng thuê kho bãi</option>
              <option>Thỏa thuận Bảo mật (NDA)</option>
              <option>Hợp đồng Mua bán</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-slate-700">Giá trị</label>
            <input type="number" required className="mt-1 block w-full rounded-md border-slate-300 p-2 border sm:text-sm" 
              value={formData.contract_request.value} 
              onChange={e => handleChange('contract_request', 'value', Number(e.target.value))} 
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-slate-700">Tiền tệ</label>
            <select className="mt-1 block w-full rounded-md border-slate-300 p-2 border sm:text-sm" 
              value={formData.contract_request.currency} 
              onChange={e => handleChange('contract_request', 'currency', e.target.value)}
            >
              <option>VND</option>
              <option>USD</option>
            </select>
          </div>
        </div>
      </div>

      {/* PHẦN 2: CÁC BÊN THAM GIA */}
      <div>
        <h3 className="text-lg font-medium text-slate-900 border-b border-slate-200 pb-2 mb-4">Các bên tham gia</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bên A */}
          <div className="space-y-4 bg-slate-50 p-4 rounded-md">
            <h4 className="font-medium text-blue-700">Bên A (Chúng ta)</h4>
            <input placeholder="Tên công ty" type="text" required className="w-full rounded-md border-slate-300 p-2 border text-sm" 
              value={formData.parties.party_a.name} 
              onChange={e => handleChange('parties', 'name', e.target.value, 'party_a')} 
            />
            <input placeholder="Người đại diện" type="text" required className="w-full rounded-md border-slate-300 p-2 border text-sm" 
              value={formData.parties.party_a.representative} 
              onChange={e => handleChange('parties', 'representative', e.target.value, 'party_a')} 
            />
            <input placeholder="Địa chỉ" type="text" className="w-full rounded-md border-slate-300 p-2 border text-sm" 
              value={formData.parties.party_a.address} 
              onChange={e => handleChange('parties', 'address', e.target.value, 'party_a')} 
            />
          </div>

          {/* Bên B */}
          <div className="space-y-4 bg-slate-50 p-4 rounded-md">
            <h4 className="font-medium text-emerald-700">Bên B (Đối tác)</h4>
            <input placeholder="Tên đối tác" type="text" required className="w-full rounded-md border-slate-300 p-2 border text-sm" 
              value={formData.parties.party_b.name} 
              onChange={e => handleChange('parties', 'name', e.target.value, 'party_b')} 
            />
            <input placeholder="Người đại diện" type="text" required className="w-full rounded-md border-slate-300 p-2 border text-sm" 
              value={formData.parties.party_b.representative} 
              onChange={e => handleChange('parties', 'representative', e.target.value, 'party_b')} 
            />
            <input placeholder="Mã số thuế" type="text" required className="w-full rounded-md border-slate-300 p-2 border text-sm" 
              value={formData.parties.party_b.tax_code} 
              onChange={e => handleChange('parties', 'tax_code', e.target.value, 'party_b')} 
            />
          </div>
        </div>
      </div>

      {/* PHẦN 3: BỐI CẢNH */}
      <div>
        <h3 className="text-lg font-medium text-slate-900 border-b border-slate-200 pb-2 mb-4">Bối cảnh & Mục đích</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <input placeholder="Địa điểm" type="text" className="w-full rounded-md border-slate-300 p-2 border text-sm" 
            value={formData.context.location} onChange={e => handleChange('context', 'location', e.target.value)} 
          />
          <input placeholder="Ngành nghề" type="text" className="w-full rounded-md border-slate-300 p-2 border text-sm" 
            value={formData.context.industry} onChange={e => handleChange('context', 'industry', e.target.value)} 
          />
          <textarea placeholder="Mục đích" className="sm:col-span-2 w-full rounded-md border-slate-300 p-2 border text-sm" rows={2} 
            value={formData.context.purpose} onChange={e => handleChange('context', 'purpose', e.target.value)} 
          />
          <textarea placeholder="Ghi chú đặc biệt" className="sm:col-span-2 w-full rounded-md border-slate-300 p-2 border text-sm" rows={3} 
            value={formData.context.special_notes} onChange={e => handleChange('context', 'special_notes', e.target.value)} 
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50">
          Hủy bỏ
        </button>
        <button type="submit" disabled={isSubmitting} className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50">
          {isSubmitting ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Tạo hợp đồng
        </button>
      </div>
    </form>
  );
}