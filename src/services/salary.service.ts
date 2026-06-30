import api from './api';

export interface Salary {
  id: number;
  userId: number;
  month: number;
  year: number;
  salary: number;
  status: 'Pending' | 'Paid';
  paidDate?: string | null;

  user: {
    id: number;
    employeeId: string;
    name: string;
    designation?: string;
  };
}

export interface SalaryResponse {
  salaries: Salary[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export const getSalaryList = async (
  search = '',
  month?: number,
  year?: number,
  status = '',
  page = 1,
  limit = 10
): Promise<SalaryResponse> => {
  const response = await api.get('/admin/salary', {
    params: {
      search,
      month,
      year,
      status,
      page,
      limit,
    },
  });

  return response.data;
};

export const createSalary = async (
  month: number,
  year: number
) => {
  const response = await api.post('/admin/salary', {
    month,
    year,
  });

  return response.data;
};

export const markSalaryPaid = async (
  id: number
) => {
  const response = await api.patch(
    `/admin/salary/${id}/pay`
  );

  return response.data;
};