export const formatCurrency = (amount: number, currency: string = 'VND') => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: currency
  }).format(amount);
};
export const formatDate = (dateString: string) => {
  if (!dateString) return '';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(dateString));
};
export const getDaysRemaining = (deadline: string) => {
  const today = new Date();
  const due = new Date(deadline);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
export const getRiskColor = (score: number) => {
  if (score <= 30) return 'bg-green-500';
  if (score <= 70) return 'bg-orange-500';
  return 'bg-red-500';
};
export const getRiskTextColor = (score: number) => {
  if (score <= 30) return 'text-green-600';
  if (score <= 70) return 'text-orange-600';
  return 'text-red-600';
};