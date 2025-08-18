import { useState } from "react";
import { Link } from "wouter";
import { AppShell } from "@/ui/AppShell";
import { Button } from "@/components/Button";
import { StepperDots } from "@/components/StepperDots";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * RELEAF Demo Calendar Booking Page
 * Prototype for investor demos - shows appointment scheduling flow
 * Mock calendar for demonstration - no real bookings made
 * Part of the hunting license application flow demo
 */
export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Mock time slots for demo purposes
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", 
    "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const startDay = 3; // Wednesday

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand to-bone">
      <AppShell>
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-charcoal mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Schedule Site Visit
            </h1>
            <p className="text-gray-600">
              Select a date and time for your environmental assessment
            </p>
          </div>

          {/* Progress Indicator */}
          <StepperDots count={4} active={2} />

          {/* Calendar Section */}
          <div className="re-card p-6 mt-8">
            {/* Month Header */}
            <div className="flex justify-between items-center mb-6">
              <button className="p-2 hover:bg-sand rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5 text-charcoal" />
              </button>
              <h2 className="text-xl font-semibold text-charcoal">January 2025</h2>
              <button className="p-2 hover:bg-sand rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5 text-charcoal" />
              </button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-600">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty cells for start of month */}
              {Array.from({ length: startDay }, (_, i) => (
                <div key={`empty-${i}`} />
              ))}
              
              {/* Date cells */}
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    aspect-square rounded-lg flex items-center justify-center text-sm font-medium
                    transition-all duration-200
                    ${selectedDate === day 
                      ? "bg-olive text-white" 
                      : day < 15 
                      ? "text-gray-400 cursor-not-allowed"
                      : "hover:bg-sand text-charcoal"
                    }
                  `}
                  disabled={day < 15}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div className="re-card p-6 mt-6">
              <h3 className="text-lg font-semibold text-charcoal mb-4">
                Available Times for January {selectedDate}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`
                      py-3 px-4 rounded-xl border-2 text-sm font-medium
                      transition-all duration-200
                      ${selectedTime === time 
                        ? "border-olive bg-sand text-olive" 
                        : "border-sage/40 hover:border-sage text-charcoal"
                      }
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-8">
            <Link href="/permits">
              <Button variant="ghost">
                Back to Permits
              </Button>
            </Link>
            <Button 
              disabled={!selectedDate || !selectedTime}
            >
              Continue to Checkout
            </Button>
          </div>
        </div>
      </AppShell>
    </div>
  );
}