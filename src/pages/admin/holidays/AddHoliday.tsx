import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/Header/PageHeader';
import { addHoliday } from '@/services/admin.service';

const AddHoliday = () => {
  const navigate = useNavigate();
  const [holidayName, setHolidayName] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!holidayName || !date) return;

    try {
      setLoading(true);
      await addHoliday({ holidayName, date });
      navigate('/holidays');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Add Holiday" />

      <div className="bg-white p-6 rounded-2xl border space-y-4">
        <input
          type="text"
          placeholder="Holiday Name"
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

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="bg-[#7F26FD] text-white px-4 py-2 rounded-lg"
          >
            {loading ? 'Saving...' : 'Add Holiday'}
          </button>

          <button
            onClick={() => navigate('/holidays')}
            className="border px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddHoliday;