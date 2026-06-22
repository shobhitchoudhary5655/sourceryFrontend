import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '@/components/common/Header/PageHeader';
import api from '@/services/api';

const EditHoliday = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [holidayName, setHolidayName] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get('/admin/getHolidays');
      const holiday = res.data.holidays.find((h: any) => h.id == id);
      setHolidayName(holiday.holidayName);
      setDate(holiday.date);
    };
    fetch();
  }, [id]);

  const handleUpdate = async () => {
    await api.patch(`/admin/updateHoliday/${id}`, {
      holidayName,
      date,
    });
    navigate('/holidays');
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Holiday" />

      <div className="bg-white p-6 rounded-2xl border space-y-4">
        <input
          value={holidayName}
          onChange={(e) => setHolidayName(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <button
          onClick={handleUpdate}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Update Holiday
        </button>
      </div>
    </div>
  );
};

export default EditHoliday;