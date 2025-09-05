import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, User } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { formatTime } from '../../utils/helpers';

interface BookingSlot {
  time: string;
  available: boolean;
  barberId?: string;
  barberName?: string;
}

interface BookingCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onSlotSelect: (slot: BookingSlot) => void;
  availableSlots: BookingSlot[];
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  selectedDate,
  onDateSelect,
  onSlotSelect,
  availableSlots
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = isSameDay(date, selectedDate);
      const isCurrentDay = isToday(date);
      const isPast = date < new Date();

      days.push(
        <button
          key={day}
          onClick={() => onDateSelect(date)}
          disabled={isPast}
          className={`p-2 rounded-lg text-sm font-medium transition-colors ${
            isSelected
              ? 'bg-violet-600 text-white'
              : isCurrentDay
              ? 'bg-violet-100 text-violet-700'
              : isPast
              ? 'text-gray-300 cursor-not-allowed'
              : 'hover:bg-gray-100 text-gray-900'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Selecionar Data
          </h3>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('prev')}
              icon={<ChevronLeft size={16} />}
            />
            <span className="text-sm font-medium text-gray-900 px-3">
              {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('next')}
              icon={<ChevronRight size={16} />}
            />
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-500 mb-2">
          <div>Dom</div>
          <div>Seg</div>
          <div>Ter</div>
          <div>Qua</div>
          <div>Qui</div>
          <div>Sex</div>
          <div>Sáb</div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {renderCalendar()}
        </div>
      </Card>

      {/* Available Time Slots */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Horários Disponíveis
          </h3>
          <div className="text-sm text-gray-500">
            {selectedDate.toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long' 
            })}
          </div>
        </div>

        {availableSlots.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Nenhum horário disponível para esta data</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {availableSlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => onSlotSelect(slot)}
                disabled={!slot.available}
                className={`p-3 rounded-lg border-2 transition-all ${
                  slot.available
                    ? 'border-gray-200 hover:border-violet-300 hover:bg-violet-50'
                    : 'border-gray-100 bg-gray-50 cursor-not-allowed'
                }`}
              >
                <div className="text-sm font-medium text-gray-900">
                  {formatTime(slot.time)}
                </div>
                {slot.barberName && (
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <User className="w-3 h-3 mr-1" />
                    {slot.barberName}
                  </div>
                )}
                <Badge
                  variant={slot.available ? 'success' : 'default'}
                  size="sm"
                  className="mt-2"
                >
                  {slot.available ? 'Disponível' : 'Ocupado'}
                </Badge>
              </button>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default BookingCalendar;