'use client';

import React, { useState } from 'react';
import { Card, Button, Input, Badge } from '@/components/ui';
import { Mail, Phone, MapPin, CheckCircle2, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Student / Parent',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <Badge variant="purple">Get in Touch</Badge>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Contact Genius Test Team
          </h1>
          <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Have questions about student testing, school licenses, or counselor certification? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 bg-slate-900 text-white space-y-6">
              <h2 className="text-lg font-bold">GeniusPie Global Office</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect directly with our psychological assessment team and institutional advisory board.
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-indigo-400" />
                  <span>support@geniuspie.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-emerald-400" />
                  <span>+91 (0) 11 4982 3000 / +1 (800) 555-PIE</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-rose-400" />
                  <span>Connaught Place, New Delhi & San Jose, CA</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border border-slate-200">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">School & Institutional Inquiries</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                For bulk institutional licensing at ₹49 per student or bespoke counselor workshops, contact our partnership desk at <strong className="text-indigo-600">partnerships@geniuspie.com</strong>.
              </p>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Card className="p-8 bg-white border border-slate-200">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="h-14 w-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you, {formData.name}. Our guidance coordinators will review your inquiry and respond within 24 business hours.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', role: 'Student / Parent', subject: 'General Inquiry', message: '' });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Send Us an Inquiry</h3>

                  <Input
                    label="Full Name"
                    required
                    placeholder="e.g. Dr. Ramesh Narayan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    required
                    placeholder="e.g. ramesh@institution.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Your Role
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      >
                        <option>Student / Candidate</option>
                        <option>Parent / Guardian</option>
                        <option>Career Counselor</option>
                        <option>School / College Administrator</option>
                        <option>Corporate Talent Lead</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Inquiry Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      >
                        <option>General Inquiry</option>
                        <option>Institutional School Licensing (₹49/student)</option>
                        <option>Counselor Certification</option>
                        <option>Report Reading Assistance</option>
                        <option>Privacy / Data Removal</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="How can we assist your educational or assessment goals?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                    />
                  </div>

                  <Button type="submit" variant="gradient" className="w-full font-bold">
                    <Send className="h-4 w-4 mr-2" />
                    <span>Submit Inquiry</span>
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
