import React, { useState, useEffect } from 'react';
import { fetchUnavailableIntervals } from "../../../services/apiService";

const OrderBanner = () => {
  const [isOrderAvailable, setIsOrderAvailable] = useState(true);
  const [unavailableIntervals, setUnavailableIntervals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIntervals = async () => {
      try {
        const intervals = await fetchUnavailableIntervals();
        setUnavailableIntervals(intervals);
      } catch (error) {
        console.error('Failed to fetch unavailable intervals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIntervals();
  }, []);

  useEffect(() => {
    const checkOrderAvailability = () => {
      if (!unavailableIntervals.length) return;

      const currentTime = new Date();
      const currentHours = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();

      const isUnavailable = unavailableIntervals.some(interval => {
        const [startHours, startMinutes] = interval.start.split(':').map(Number);
        const [endHours, endMinutes] = interval.end.split(':').map(Number);
        const startTime = startHours * 60 + startMinutes;
        const endTime = endHours * 60 + endMinutes;
        const now = currentHours * 60 + currentMinutes;
        return now >= startTime && now < endTime;
      });

      setIsOrderAvailable(!isUnavailable);
    };

    const interval = setInterval(checkOrderAvailability, 60000);
    checkOrderAvailability();

    return () => clearInterval(interval);
  }, [unavailableIntervals]);

  return (
    <div>
      {!isOrderAvailable && (
        <div style={{ backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'center' }}>
          Nyní není možné vytvářet objednávky. Přijďte prosím později.
        </div>
      )}
    </div>
  );
};

export default OrderBanner;
