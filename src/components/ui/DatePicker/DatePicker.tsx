'use client';
import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.module.scss';

interface DateTimePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText?: string;
  disabled?: boolean;
  showTimeSelect?: boolean;
  timeFormat?: string;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
}

export const CustomDateTimePicker: React.FC<DateTimePickerProps> = ({
  selected,
  onChange,
  placeholderText = 'Выберите дату и время',
  disabled = false,
  showTimeSelect = true,
  timeFormat = 'HH:mm',
  dateFormat = 'dd.MM.yyyy HH:mm',
  minDate,
  maxDate,
}) => {
  return (
    <div className={styles.datePickerWrapper}>
      <DatePicker
        selected={selected}
        onChange={onChange}
        placeholderText={placeholderText}
        disabled={disabled}
        className={styles.datePickerInput}
        showTimeSelect={showTimeSelect}
        timeFormat={timeFormat}
        dateFormat={dateFormat}
        timeIntervals={1}
        minDate={minDate}
        maxDate={maxDate}
        showYearDropdown
        showMonthDropdown
        dropdownMode={'scroll'}
        popperClassName={styles.popper}
        dayClassName={() => styles.day}
        weekDayClassName={() => styles.weekDay}
        renderDayContents={(day) => (
          <div className={styles.dayContent}>{day}</div>
        )}
        renderCustomHeader={({
          monthDate,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className={styles.customHeader}>
            <button
              type="button"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className={styles.navButton}
            >
              <ChevronLeftIcon />
            </button>

            <div className={styles.monthTitle}>
              {monthDate.toLocaleString('ru', {
                month: 'long',
                year: 'numeric',
              })}
            </div>

            <button
              type="button"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className={styles.navButton}
            >
              <ChevronRightIcon />
            </button>
          </div>
        )}
      />
    </div>
  );
};

// Иконки для навигации
const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="black">
    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="black">
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
  </svg>
);
