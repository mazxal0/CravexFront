export interface DateTimePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText?: string;
  disabled?: boolean;
  showTimeSelect?: boolean; // Новая опция для времени
  timeFormat?: string; // Формат времени (например, "HH:mm")
  dateFormat?: string; // Общий формат даты и времени
}
