import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SITE_TITLE } from "@/lib/constants";
import { format } from "date-fns";
import { Clock, Calendar as CalendarIcon } from "lucide-react";
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from "@/lib/translations";

// Temporary mock data function (will be replaced with API call later)
const getMockPanchangData = (date: Date) => {
  const nakshatras = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
    "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni"
  ];

  const karnas = [
    "Bava", "Balava", "Kaulava", "Taitila", "Garija",
    "Vanija", "Vishti", "Shakuni", "Chatushpada", "Naga"
  ];

  const yogas = [
    "Vishkambha", "Priti", "Ayushman", "Saubhagya", "Shobhana",
    "Atiganda", "Sukarma", "Dhriti", "Shula", "Ganda"
  ];

  const tithis = [
    "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
    "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami"
  ];

  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);

  return {
    nakshatra: nakshatras[dayOfYear % nakshatras.length],
    karna: karnas[dayOfYear % karnas.length],
    yoga: yogas[dayOfYear % yogas.length],
    tithi: tithis[dayOfYear % tithis.length],
    sunrise: "06:15 AM",
    sunset: "06:45 PM",
    moonrise: "08:30 PM",
    moonset: "07:20 AM"
  };
};

export default function TodayPanchangam() {
  const { t, getTranslation, setLanguage } = useLanguage();
  const [date, setDate] = useState<Date>(new Date());
  const [hour, setHour] = useState(date.getHours().toString().padStart(2, '0'));
  const [minute, setMinute] = useState(date.getMinutes().toString().padStart(2, '0'));
  const [timeError, setTimeError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [panchangData, setPanchangData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Generate hours options (00-23)
  const hours = Array.from({ length: 24 }, (_, i) => 
    i.toString().padStart(2, '0')
  );

  // Generate minutes options (00-59)
  const minutes = Array.from({ length: 60 }, (_, i) => 
    i.toString().padStart(2, '0')
  );

  // Validation function for hour
  const validateHour = (value: string) => {
    const hourNum = parseInt(value);
    if (value === '') return true;
    if (isNaN(hourNum)) return false;
    return hourNum >= 0 && hourNum <= 23;
  };

  // Validation function for minute
  const validateMinute = (value: string) => {
    const minuteNum = parseInt(value);
    if (value === '') return true;
    if (isNaN(minuteNum)) return false;
    return minuteNum >= 0 && minuteNum <= 59;
  };

  // Handle hour change
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 2) {
      setHour(value);
      if (!validateHour(value)) {
        setTimeError(t('hourError', 'ui'));
      } else {
        setTimeError('');
      }
    }
  };

  // Handle minute change
  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 2) {
      setMinute(value);
      if (!validateMinute(value)) {
        setTimeError(t('minuteError', 'ui'));
      } else {
        setTimeError('');
      }
    }
  };

  // Handle blur events to format numbers
  const handleHourBlur = () => {
    if (hour === '') {
      setHour('00');
      return;
    }
    const hourNum = parseInt(hour);
    if (!isNaN(hourNum) && hourNum >= 0 && hourNum <= 23) {
      setHour(hourNum.toString().padStart(2, '0'));
      setTimeError('');
    }
  };

  const handleMinuteBlur = () => {
    if (minute === '') {
      setMinute('00');
      return;
    }
    const minuteNum = parseInt(minute);
    if (!isNaN(minuteNum) && minuteNum >= 0 && minuteNum <= 59) {
      setMinute(minuteNum.toString().padStart(2, '0'));
      setTimeError('');
    }
  };

  const fetchPanchang = async () => {
    if (!validateHour(hour) || !validateMinute(minute)) {
      setTimeError(t('invalidTimeError', 'ui'));
      return;
    }

    setLoading(true);
    setError(null);  // Clear any previous errors
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new date object with selected time
      const selectedDate = new Date(date);
      selectedDate.setHours(parseInt(hour));
      selectedDate.setMinutes(parseInt(minute));

      // Get mock data
      const data = getMockPanchangData(selectedDate);
      setPanchangData(data);
    } catch (err) {
      setError('Failed to fetch Panchangam details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

    return (
    <>
      <Helmet>
        <title>Today's Panchangam - {SITE_TITLE}</title>
        <meta 
          name="description" 
          content="View today's Panchangam details including Nakshatra, Yogam, and Karnam" 
        />
      </Helmet>
      <Navbar />
      
      {/* Hero Section with Gradient */}
      <div className="bg-gradient-to-b from-primary/10 via-primary/5 to-background pt-16 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <select
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="rounded-md border border-primary/20 px-3 py-1"
            >
              <option value="en">English</option>
              <option value="ta">தமிழ்</option>
            </select>
          </div>
          <h1 className="text-4xl font-bold text-primary tracking-tight mb-4">
            {t('pageTitle', 'panchangam')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('description', 'panchangam')}
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Selection Card */}
          <Card className="bg-card/50 shadow-xl border-primary/10">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2 text-primary">
                <CalendarIcon className="w-6 h-6" />
                {t('selectDateTime', 'ui')}
              </CardTitle>
              <CardDescription>
                Choose your preferred date and time for Panchangam details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Calendar */}
                <div className="bg-background rounded-lg p-4 shadow-inner">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    className="mx-auto"
                  />
                </div>

                {/* Time Selection */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <h3 className="font-medium">{t('timeSelection', 'ui')}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          type="text"
                          value={hour}
                          onChange={handleHourChange}
                          onBlur={handleHourBlur}
                          placeholder="HH"
                          className="text-center text-lg font-medium"
                          maxLength={2}
                        />
                        <span className="absolute top-1/2 -translate-y-1/2 right-3 text-sm text-muted-foreground">
                          {t('hours', 'ui')}
                        </span>
                      </div>
                      <p className="text-xs text-center text-muted-foreground">
                        {t('hoursRange', 'ui')}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          type="text"
                          value={minute}
                          onChange={handleMinuteChange}
                          onBlur={handleMinuteBlur}
                          placeholder="MM"
                          className="text-center text-lg font-medium"
                          maxLength={2}
                        />
                        <span className="absolute top-1/2 -translate-y-1/2 right-3 text-sm text-muted-foreground">
                          {t('minutes', 'ui')}
                        </span>
                      </div>
                      <p className="text-xs text-center text-muted-foreground">
                        {t('minutesRange', 'ui')}
                      </p>
                    </div>
                  </div>

                  {timeError && (
                    <p className="text-sm text-red-500 text-center bg-red-50 p-2 rounded-md">
                      {timeError}
                    </p>
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      const now = new Date();
                      setHour(now.getHours().toString().padStart(2, '0'));
                      setMinute(now.getMinutes().toString().padStart(2, '0'));
                      setTimeError('');
                    }}
                  >
                    {t('setToCurrentTime', 'ui')}
                  </Button>
                </div>

                <Button 
                  onClick={fetchPanchang}
                  disabled={loading || !!timeError}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {loading ? t('loading', 'ui') : t('getPanchangam', 'ui')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="bg-card/50 shadow-xl border-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">
                {t('title', 'panchangam')}
              </CardTitle>
              <CardDescription>
                For {format(date, "PPP")} at {hour}:{minute}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <p className="mt-4 text-muted-foreground">{t('loading', 'ui')}</p>
                </div>
              ) : panchangData ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { section: 'nakshatra', value: panchangData.nakshatra },
                      { section: 'karna', value: panchangData.karna },
                      { section: 'yoga', value: panchangData.yoga },
                      { section: 'tithi', value: panchangData.tithi }
                    ].map((item) => (
                      <div key={item.section} 
                           className="bg-background/50 p-4 rounded-lg shadow-sm border border-primary/10">
                        <h3 className="text-primary font-semibold mb-2">
                          {t('title', item.section)}
                        </h3>
                        <p className="text-foreground/80">
                          {getTranslation(item.section, item.value)}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-primary/10 pt-6">
                    <h3 className="font-semibold mb-4 text-primary">
                      {t('title', 'timings')}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {[
                        { key: 'sunrise', value: panchangData.sunrise },
                        { key: 'sunset', value: panchangData.sunset },
                        { key: 'moonrise', value: panchangData.moonrise },
                        { key: 'moonset', value: panchangData.moonset }
                      ].map((timing) => (
                        <div key={timing.key} 
                             className="flex justify-between items-center bg-background/30 p-3 rounded-md border border-primary/5">
                          <span className="text-muted-foreground">
                            {t(timing.key, 'timings')}:
                          </span>
                          <span className="font-medium text-foreground">
                            {timing.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>{t('selectDateTimePrompt', 'ui')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
    );
}