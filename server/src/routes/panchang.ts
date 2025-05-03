import express from 'express';
import { nakshatras, karnas, yogas, tithis } from '../data/mockPanchangData';

const router = express.Router();

router.post('/panchang', (req, res) => {
  const { date } = req.body;
  
  // Convert date string to Date object
  const requestDate = new Date(date);
  
  // Calculate day of year for consistent "random" selections
  const dayOfYear = Math.floor(
    (requestDate.getTime() - new Date(requestDate.getFullYear(), 0, 0).getTime()) / 86400000
  );

  // Generate mock data
  const panchangData = {
    nakshatra: nakshatras[dayOfYear % nakshatras.length],
    karna: karnas[dayOfYear % karnas.length],
    yoga: yogas[dayOfYear % yogas.length],
    tithi: tithis[dayOfYear % tithis.length],
    sunrise: "06:15 AM",
    sunset: "06:45 PM",
    moonrise: "08:30 PM",
    moonset: "07:20 AM"
  };

  // Simulate API delay
  setTimeout(() => {
    res.json(panchangData);
  }, 800);
});

export default router;
