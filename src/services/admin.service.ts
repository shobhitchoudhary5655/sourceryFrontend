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
    throw (error.response?.data) || { message: 'Failed To Get Employees', };
  }
};

export const getEmployeeAttendance = async (employeeId: number,) => {
  try {
    const response = await api.get(`/admin/employee/${employeeId}`,);
    return response.data;
  } catch (error: any) {
    throw (error.response?.data) || {
      message: 'Failed To Fetch All Employee Attendance',
    };
  }
};

export const getAttendanceStatus = async (employeeId: number, month: number, year: number,) => {
  try {
    const response = await api.get(`/admin/getAttendanceStatus/${employeeId}?month=${month}&year=${year}`,);
    return response.data;
  } catch (error: any) {
    throw (error.response?.data) || {
      message: 'Failed To Get Attendance Status',
    };
  }
};

export const getLeaveRequests = async (search: string = '', status: string = 'all', page: number = 1, limit: number = 10,) => {
  try {
    const response = await api.get(`/admin/getAllLeaveRequest?search=${search}&status=${status}&page=${page}&limit=${limit}`,
    );
    return response.data;
  } catch (error: any) {
    throw (error.response?.data) || { message: 'Failed To Get Leave Requests', };
  }
};

export const updateLeaveStatus = async (id: number, status: string) => {
  try {
    const response = await api.patch(`/admin/${id}/updateLeaveStatus/status`,
      { status },
    );
    return response.data;
  } catch (error: any) {
    throw (error.response?.data) || { message: 'Failed To Update Leave Status', };
  }
};

export const getHolidays = async () => {
  try {
    const response = await api.get('/admin/getHolidays',);

    return response.data;
  } catch (error: any) {
    throw (error.response?.data) || {
      message: 'Failed To Get Holidays',
    };
  }
};

export const addHoliday = async (data: any,) => {
  try {
    const response = await api.post('/admin/addHoliday',
      data,
    );
    return response.data;
  } catch (error: any) {
    throw (error.response?.data) || {
      message: 'Failed To Add Holiday',
    };
  }
};

export const deleteHoliday = async (id: number,) => {
  try {
    const response = await api.delete(
      `/admin/deleteHoliday/${id}`,
    );

    return response.data;
  } catch (error: any) {
    throw (error.response?.data) || {
      message: 'Failed To Delete Holiday',
    };
  }
};

export const createEmployee = async (data: any,) => {
  try {
    const response = await api.post('/admin/create-employee',
      data,
    );

    return response.data;
  } catch (error: any) {
    throw (error.response?.data) || {
      message: 'Failed To Create Employee',
    };
  }
};

export const getRoles = async () => {
  try {
    const response = await api.get('/admin/getRole',);
    return response.data;
  } catch (error: any) {
    throw (error.response?.data) || {
      message: 'Failed To Get Roles',
    };
  }
};

export const getEmployeeDetails = async (id: number) => {
  try {
    const response = await api.get(`/admin/getEmployeeDetails/${id}`,
    );
    return response.data;
  } catch (error: any) {
    throw (error.response?.data) || {
      message: 'Failed To Get Employee Details',
    };
  }
};

export const updateEmployee = async (employeeId: number, employeeData: any) => {
  try {
    const response = await api.put(`/admin/editEmployeeDetails/${employeeId}`,
      employeeData,
    );
    return response.data;
  } catch (error: any) {
    throw (error.response?.data) || {
      message: 'Failed To Update Employee Status',
    };
  }
};

export const deleteEmployee = async (employeeId: number,) => {
  try {
    const response = await api.delete(`/admin/deleteEmployee/${employeeId}`,
    );
    return response.data;
  } catch (error: any) {
    throw (error.response?.data) || {
      message: 'Failed To Delete Employee',
    };
  }
};