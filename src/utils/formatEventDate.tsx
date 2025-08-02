import { format } from "date-fns";

// Tipe props untuk komponen
type FormattedEventDateProps = {
  startDate: Date; // Contoh: "2025-10-10T10:00:00.000Z"
  endDate: Date; // Contoh: "2025-10-12T20:00:00.000Z"
};

const FormattedEventDate = ({
  startDate,
  endDate,
}: FormattedEventDateProps) => {
  // Ubah string ISO menjadi objek Date
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Format tanggal mulai (contoh: "10 Aug")
  const formattedStart = format(start, "dd MMM");

  // Format tanggal selesai (contoh: "12 Aug")
  const formattedEnd = format(end, "dd MMM");

  return (
    <p>
      {formattedStart} - {formattedEnd}
    </p>
  );
};

export default FormattedEventDate;
