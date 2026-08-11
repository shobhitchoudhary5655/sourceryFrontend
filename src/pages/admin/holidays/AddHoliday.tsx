import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/Header/PageHeader';
import { addHoliday, getEmployees } from '@/services/admin.service';
import PageLoader from '@/components/common/Loader/PageLoader';

const AddHoliday = () => {
  const navigate = useNavigate();
  const [holidayName, setHolidayName] = useState('');
  const [date, setDate] = useState('');
  const [holidayType, setHolidayType] = useState<"PUBLIC" | "SPECIAL_HOLIDAY" | "SPECIAL_WFH">("PUBLIC");
  const [description, setDescription] = useState("");
  const [employees, setEmployees] = useState<any[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const isValid = holidayName.trim() && date && (holidayType === "PUBLIC" || selectedEmployees.length > 0);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await getEmployees();

      setEmployees(res.users || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (!isValid || loading) return;

    try {
      setLoading(true);
      await addHoliday({
        holidayName: holidayName.trim(),
        date,
        holidayType,
        description,
        employeeIds: selectedEmployees,
      });
      navigate('/holidays');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#7F26FD] focus:ring-2 focus:ring-[#7F26FD]/30 sm:text-base';

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 sm:space-y-6">
      <PageHeader title="Add Holiday" />

      <div className="space-y-5 rounded-xl border bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          <div className="min-w-0">
            <label
              htmlFor="holidayName"
              className="text-sm font-medium text-gray-600"
            >
              Holiday Name <span className="text-red-500">*</span>
            </label>

            <input
              id="holidayName"
              type="text"
              placeholder="e.g. Independence Day"
              value={holidayName}
              onChange={(e) => setHolidayName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="min-w-0">
            <label
              htmlFor="holidayDate"
              className="text-sm font-medium text-gray-600"
            >
              Date <span className="text-red-500">*</span>
            </label>

            <input
              id="holidayDate"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Holiday Type
            </label>

            <select
              value={holidayType}
              onChange={(e) =>
                setHolidayType(
                  e.target.value as
                  | "PUBLIC"
                  | "SPECIAL_HOLIDAY"
                  | "SPECIAL_WFH"
                )
              }
              className={inputClass}
            >
              <option value="PUBLIC">
                Public Holiday
              </option>

              <option value="SPECIAL_HOLIDAY">
                Special Holiday
              </option>

              <option value="SPECIAL_WFH">
                Special Work From Home
              </option>
            </select>
          </div>

          <div className="md:col-span-2">

            <label className="text-sm font-medium text-gray-600">
              Description
            </label>

            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputClass}
            />

          </div>

          {
            holidayType !== "PUBLIC" && (

              <div className="md:col-span-2">

                <label className="text-sm font-medium">

                  Employees

                </label>

                <div className="mt-3 max-h-64 overflow-auto border rounded-lg">

                  {
                    employees.map((item: any) => {

                      const checked =
                        selectedEmployees.includes(item.id);

                      return (

                        <label
                          key={item.id}
                          className="flex items-center gap-3 p-3 border-b"
                        >

                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => {

                              if (e.target.checked) {

                                setSelectedEmployees(prev => [
                                  ...prev,
                                  item.id,
                                ]);

                              } else {

                                setSelectedEmployees(prev =>
                                  prev.filter(id => id !== item.id)
                                );

                              }

                            }}
                          />

                          <span>

                            {item.name}

                          </span>

                        </label>

                      );

                    })
                  }

                </div>

              </div>

            )
          }
        </div>

        <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate('/holidays')}
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className="w-full rounded-lg bg-[#7F26FD] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#6a1ee0] disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto"
          >
            {loading ? 'Saving...' : 'Add Holiday'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddHoliday;