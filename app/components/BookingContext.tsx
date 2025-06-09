import React, { createContext, useContext, useState } from 'react';

// Define a type for the selected flight
export type SelectedFlight = {
  id: string;
  status?: string;
  extras?: any;
};

// Context for booking state
const BookingContext = createContext<{
  selectedFlight: SelectedFlight | null;
  setSelectedFlight: (flight: SelectedFlight | null) => void;
}>({
  selectedFlight: null,
  setSelectedFlight: () => {},
});

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedFlight, setSelectedFlight] = useState<SelectedFlight | null>(null);
  return (
    <BookingContext.Provider value={{ selectedFlight, setSelectedFlight }}>
      {children}
    </BookingContext.Provider>
  );
}; export default BookingProvider;

export const useBooking = () => useContext(BookingContext);
