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