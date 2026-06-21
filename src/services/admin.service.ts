import api from './api';

export interface Holiday {
  id: number;
  holidayName: string;
  date: string;
}

export interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
}

export interface PendingRequest {
  leaveRequest: number;
  wfhReqests: number;
}

export interface DashboardData {
  success?: boolean;
  stats: DashboardStats;
  upcomingHolidays: Holiday[];
  pendingRequest: PendingRequest;
}

export const getDashboardDetails = async (): Promise<DashboardData> => {
  try {
    const response = await api.get('/admin/getDashboardDetails');

    return response.data;
  } catch (error: any) {
    throw error.response?.data || {
      message: 'Failed To Fetch Dashboard Status',
    };
  }
};

export const getEmployees = async (search: string = '', designation: string = '', page: number = 1, limit: number = 10,) => {
  try {
    const response = await api.get(`/admin/employees?search=${search}&designation=${designation}&page=${page}&limit=${limit}`,);
    return response.data;
  } catch (error: any) {
    throw (error.response?.data ) || { message: 'Failed To Get Employees', };
  }
};