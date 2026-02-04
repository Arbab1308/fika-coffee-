import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock, Users, User, Mail, Phone, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30"
];

const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ReservationSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: undefined,
    time: "",
    guests: "",
    special_requests: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Name is required (min 2 characters)";
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = "Valid phone number is required";
    }
    if (!formData.date) {
      newErrors.date = "Please select a date";
    }
    if (!formData.time) {
      newErrors.time = "Please select a time";
    }
    if (!formData.guests) {
      newErrors.guests = "Please select number of guests";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: format(formData.date, "yyyy-MM-dd"),
        time: formData.time,
        guests: parseInt(formData.guests),
        special_requests: formData.special_requests || ""
      };

      await axios.post(`${API}/reservations`, payload);
      setIsSuccess(true);
      toast.success("Reservation submitted successfully! We'll confirm shortly.");
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: undefined,
          time: "",
          guests: "",
          special_requests: ""
        });
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Reservation error:", error);
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section
      id="reserve"
      ref={ref}
      className="py-20 md:py-32 bg-fika-bone"
      data-testid="reservation-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32"
          >
            <span className="font-caveat text-xl text-fika-terracotta">
              Book Your Experience
            </span>
            <h2 className="font-fraunces text-4xl md:text-5xl font-semibold text-fika-coffee mt-2 leading-tight">
              Reserve Your
              <br />
              <span className="text-fika-terracotta">Perfect Moment</span>
            </h2>
            <p className="text-lg text-fika-coffee/70 mt-6 leading-relaxed">
              Whether it's a casual coffee catch-up or a special celebration, 
              we'd love to have you. Reserve your table and let us prepare 
              the perfect Fika experience for you.
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white rounded-2xl p-5 border border-fika-cream">
                <Clock className="w-6 h-6 text-fika-terracotta mb-3" />
                <h4 className="font-fraunces font-semibold text-fika-coffee">Opening Hours</h4>
                <p className="text-sm text-fika-coffee/60 mt-1">Daily: 8AM - 10PM</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-fika-cream">
                <Phone className="w-6 h-6 text-fika-sage mb-3" />
                <h4 className="font-fraunces font-semibold text-fika-coffee">Call Us</h4>
                <p className="text-sm text-fika-coffee/60 mt-1">092898 54326</p>
              </div>
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="mt-8 hidden lg:block"
            >
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=80"
                alt="Cozy cafe setting"
                className="rounded-2xl w-full h-64 object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="reservation-card rounded-3xl p-8 md:p-10 text-center"
              >
                <div className="w-20 h-20 bg-fika-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-fika-sage" />
                </div>
                <h3 className="font-fraunces text-2xl font-semibold text-fika-coffee">
                  Reservation Received!
                </h3>
                <p className="text-fika-coffee/70 mt-3">
                  Thank you, {formData.name}! We've received your reservation request 
                  for {formData.guests} guest(s) on{" "}
                  {formData.date && format(formData.date, "MMMM d, yyyy")} at {formData.time}.
                </p>
                <p className="text-sm text-fika-coffee/50 mt-4">
                  We'll call you shortly to confirm your booking.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="reservation-card rounded-3xl p-8 md:p-10">
                <h3 className="font-fraunces text-2xl font-semibold text-fika-coffee mb-6">
                  Make a Reservation
                </h3>

                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name" className="text-fika-coffee flex items-center gap-2 mb-2">
                      <User className="w-4 h-4" /> Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={`form-input ${errors.name ? "border-red-400" : ""}`}
                      data-testid="reservation-name-input"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-fika-coffee flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4" /> Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`form-input ${errors.email ? "border-red-400" : ""}`}
                        data-testid="reservation-email-input"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-fika-coffee flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4" /> Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={`form-input ${errors.phone ? "border-red-400" : ""}`}
                        data-testid="reservation-phone-input"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-fika-coffee flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4" /> Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal form-input ${
                              !formData.date && "text-fika-coffee/50"
                            } ${errors.date ? "border-red-400" : ""}`}
                            data-testid="reservation-date-trigger"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {formData.date ? format(formData.date, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={formData.date}
                            onSelect={(date) => handleInputChange("date", date)}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            data-testid="reservation-calendar"
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                    </div>
                    <div>
                      <Label className="text-fika-coffee flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4" /> Time
                      </Label>
                      <Select
                        value={formData.time}
                        onValueChange={(value) => handleInputChange("time", value)}
                      >
                        <SelectTrigger 
                          className={`form-input ${errors.time ? "border-red-400" : ""}`}
                          data-testid="reservation-time-trigger"
                        >
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent data-testid="reservation-time-content">
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <Label className="text-fika-coffee flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4" /> Number of Guests
                    </Label>
                    <Select
                      value={formData.guests}
                      onValueChange={(value) => handleInputChange("guests", value)}
                    >
                      <SelectTrigger 
                        className={`form-input ${errors.guests ? "border-red-400" : ""}`}
                        data-testid="reservation-guests-trigger"
                      >
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent data-testid="reservation-guests-content">
                        {guestOptions.map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </SelectItem>
                        ))}
                        <SelectItem value="10+">10+ Guests (Call us)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
                  </div>

                  {/* Special Requests */}
                  <div>
                    <Label htmlFor="special_requests" className="text-fika-coffee flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4" /> Special Requests (Optional)
                    </Label>
                    <Textarea
                      id="special_requests"
                      placeholder="Birthday celebration, dietary requirements, seating preference..."
                      value={formData.special_requests}
                      onChange={(e) => handleInputChange("special_requests", e.target.value)}
                      className="form-input min-h-[100px] resize-none"
                      data-testid="reservation-special-input"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-fika-terracotta hover:bg-fika-terracotta/90 text-white rounded-full py-6 text-lg btn-hover disabled:opacity-50"
                    data-testid="reservation-submit-btn"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Reserve Table"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;
