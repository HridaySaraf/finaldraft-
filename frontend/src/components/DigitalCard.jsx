import React, { useState } from 'react';
import { Download, QrCode, Share2, MapPin, Phone, Mail, Globe, Instagram, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from '../hooks/use-toast';

const DigitalCard = () => {
  const [showQR, setShowQR] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const businessData = {
    name: 'Mahadev Printers',
    tagline: 'Pan India Printing Hub - Design Print and Dispatch',
    coverImage: 'https://images.unsplash.com/photo-1676287567550-e875cf4af133?q=80&w=2000&auto=format&fit=crop',
    logo: 'https://customer-assets.emergentagent.com/job_mahadev-printers/artifacts/1nprryny_Mahadev%20Printers%20logo%20design.png',

    services: [
      'Visiting Cards, Letterheads & Envelopes',
      'Brochures, Pamphlets & Presentation Folders',
      'ID Cards, Lanyards & Standees',
      'Corporate Gifting Solutions'
    ],

    contact: {
      person: 'Mahadev Printers',
      phone: '+91 9821149384',
      email: 'npprinters@gmail.com',
      website: 'mahadevprinters.com',
      whatsapp: '919821149384',
      address: '250/252 Bazargate Street, Fort Mumbai -400001',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=250%2F252+Bazargate+Street%2C+Fort%2C+Mumbai+400001'
    },

    social: {
      instagram: 'https://www.instagram.com/mpprinters_fort?igsh=amQ5MG9zNHc4N3Aw',
      facebook: 'https://www.facebook.com/profile.php?id=61574291657914'
    },

    cardUrl: 'https://printpure.preview.emergentagent.com/'
  };

  const handleSaveVCard = () => {

    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${businessData.name}
ORG:${businessData.name}
TITLE:${businessData.tagline}
TEL;TYPE=WORK,VOICE:${businessData.contact.phone}
EMAIL:${businessData.contact.email}
URL:${businessData.contact.website}
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'mahadev-printers.vcf';
    link.click();

    window.URL.revokeObjectURL(url);

    toast({
      title: 'Success',
      description: 'Contact saved successfully!',
    });
  };

  const handleShare = () => {
    setShowShare(true);
  };

  const handleWhatsAppDirect = () => {
    const whatsappUrl = `https://wa.me/${businessData.contact.whatsapp}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareToWhatsApp = () => {
    const message = `Check out Mahadev Printers - Pan India Printing Hub!\n${businessData.cardUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);

    toast({
      title: 'Copied!',
      description: 'Link copied to clipboard',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">

      <div className="max-w-md mx-auto">

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

          <div className="relative h-64 overflow-hidden">
            <img
              src={businessData.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative -mt-16 flex justify-center">
            <div className="w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white p-4">
              <img
                src={businessData.logo}
                alt="Mahadev Printers Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 pb-8 pt-4">

            <h1 className="text-white text-2xl font-bold text-center mb-1">
              {businessData.name}
            </h1>

            <p className="text-blue-100 text-sm text-center mb-4">
              {businessData.tagline}
            </p>

            <div className="space-y-2 mb-6">
              {businessData.services.map((service, index) => (
                <div key={index} className="flex items-start text-white text-sm">
                  <span className="mr-2 mt-1">»</span>
                  <span>{service}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">

              <button
                onClick={handleSaveVCard}
                className="bg-white/10 text-white py-3 rounded-lg flex flex-col items-center gap-1"
              >
                <Download className="w-5 h-5" />
                <span className="text-xs">Save vCard</span>
              </button>

              <button
                onClick={() => setShowQR(true)}
                className="bg-white/10 text-white py-3 rounded-lg flex flex-col items-center gap-1"
              >
                <QrCode className="w-5 h-5" />
                <span className="text-xs">QR Code</span>
              </button>

              <button
                onClick={handleShare}
                className="bg-white/10 text-white py-3 rounded-lg flex flex-col items-center gap-1"
              >
                <Share2 className="w-5 h-5" />
                <span className="text-xs">Share</span>
              </button>

            </div>

          </div>

          <div className="px-6 py-6 space-y-4">

            <a href={`tel:${businessData.contact.phone}`} className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <span>{businessData.contact.phone}</span>
            </a>

            <button onClick={handleWhatsAppDirect} className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-green-600" />
              <span>Chat on WhatsApp</span>
            </button>

            <a href={`mailto:${businessData.contact.email}`} className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <span>{businessData.contact.email}</span>
            </a>

            <a href={businessData.contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>{businessData.contact.address}</span>
            </a>

            <a href={`https://${businessData.contact.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-blue-600" />
              <span>{businessData.contact.website}</span>
            </a>

          </div>

          <div className="px-6 pb-6">

            <div className="border-t pt-4">

              <p className="text-sm text-gray-600 mb-3 text-center">
                Connect with us
              </p>

              <div className="flex justify-center gap-4">

                <a
                  href={businessData.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white"
                >
                  <Instagram className="w-6 h-6" />
                </a>

                <a
                  href={businessData.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white"
                >
                  <Facebook className="w-6 h-6" />
                </a>

                <button
                  onClick={handleWhatsAppDirect}
                  className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white"
                >
                  <MessageCircle className="w-6 h-6" />
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DigitalCard;
