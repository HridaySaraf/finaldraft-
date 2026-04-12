import React, { useState } from 'react';
import { Download, QrCode, Share2, MapPin, Phone, Mail, Globe, Instagram, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from '../hooks/use-toast';

const DigitalCard = () => {
  const [showQR, setShowQR] = useState(false);
  const [showShare, setShowShare] = useState(false);

  // Business data
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
      instagram: 'https://www.instagram.com/mpprinters_fort?igsh=amQ5MG9zNHc4N3Aw'
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

  const handleWhatsApp = () => {
    const message = `Check out Mahadev Printers - Pan India Printing Hub!\n${businessData.cardUrl}`;
    // Try to open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/${businessData.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleWhatsAppDirect = () => {
    // Open WhatsApp chat with business number
    const whatsappUrl = `https://wa.me/${businessData.contact.whatsapp}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareToWhatsApp = () => {
    // Share card to any WhatsApp contact (user chooses recipient)
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
        {/* Digital Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Cover Image */}
          <div className="relative h-64 overflow-hidden">
            <img 
              src={businessData.coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
          </div>

          {/* Logo - Overlapping */}
          <div className="relative -mt-16 flex justify-center">
            <div className="w-32 h-32 bg-white/95 backdrop-blur-sm rounded-full shadow-2xl flex items-center justify-center border-4 border-white/80 p-4">
              <img 
                src={businessData.logo} 
                alt="Mahadev Printers Logo" 
                className="w-full h-full object-contain drop-shadow-md rounded-full"
              />
            </div>
          </div>

          {/* Business Info Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 pb-8 pt-4">
            <h1 className="text-white text-2xl font-bold text-center mb-1">
              {businessData.name}
            </h1>
            <p className="text-blue-100 text-sm text-center mb-4">
              {businessData.tagline}
            </p>

            {/* Services List */}
            <div className="space-y-2 mb-6">
              {businessData.services.map((service, index) => (
                <div key={index} className="flex items-start text-white text-sm">
                  <span className="mr-2 mt-1">»</span>
                  <span>{service}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={handleSaveVCard}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white py-3 rounded-lg transition-all duration-200 flex flex-col items-center gap-1 border border-white/20"
              >
                <Download className="w-5 h-5" />
                <span className="text-xs">Save vCard</span>
              </button>
              <button
                onClick={() => setShowQR(true)}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white py-3 rounded-lg transition-all duration-200 flex flex-col items-center gap-1 border border-white/20"
              >
                <QrCode className="w-5 h-5" />
                <span className="text-xs">QR Code</span>
              </button>
              <button
                onClick={handleShare}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white py-3 rounded-lg transition-all duration-200 flex flex-col items-center gap-1 border border-white/20"
              >
                <Share2 className="w-5 h-5" />
                <span className="text-xs">Share</span>
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="px-6 py-6 space-y-4">
            <a 
              href={`tel:${businessData.contact.phone}`}
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="font-medium">{businessData.contact.phone}</p>
              </div>
            </a>

            <button
              onClick={handleWhatsAppDirect}
              className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors cursor-pointer group w-full"
            >
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500">WhatsApp</p>
                <p className="font-medium">Chat with us</p>
                <p className="text-xs text-gray-400">{businessData.contact.phone}</p>
              </div>
            </button>

            <a 
              href={`mailto:${businessData.contact.email}`}
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium">{businessData.contact.email}</p>
              </div>
            </a>

            <a 
              href={businessData.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500">Address</p>
                <p className="font-medium text-sm">{businessData.contact.address}</p>
              </div>
            </a>

            <a 
              href={`https://${businessData.contact.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Website</p>
                <p className="font-medium">{businessData.contact.website}</p>
              </div>
            </a>
          </div>

          {/* Social Media */}
          <div className="px-6 pb-6">
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-3 text-center">Connect with us</p>
              <div className="flex justify-center gap-4">
                <a 
                  href={businessData.social.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <button
                  onClick={handleWhatsAppDirect}
                  className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                >
                  <MessageCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Save Contact CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <button
              onClick={handleSaveVCard}
              className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Save Contact Details in Your Phone
            </button>
          </div>
        </div>

        {/* QR Code Modal */}
        <Dialog open={showQR} onOpenChange={setShowQR}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-center">Scan QR Code</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="w-64 h-64 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(businessData.cardUrl)}`}
                  alt="QR Code" 
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <p className="text-sm text-gray-600 text-center">
                Scan this QR code to visit our website
              </p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Share Modal */}
        <Dialog open={showShare} onOpenChange={setShowShare}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Share Digital Card</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600 truncate flex-1">
                  {businessData.cardUrl}
                </span>
                <Button
                  size="sm"
                  onClick={() => copyToClipboard(businessData.cardUrl)}
                  className="ml-2"
                >
                  Copy
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleShareToWhatsApp}
                  className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors flex flex-col items-center gap-1"
                >
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs text-gray-600">WhatsApp</span>
                </button>
                <a
                  href={`mailto:?subject=Mahadev Printers&body=${encodeURIComponent('Check out Mahadev Printers: ' + businessData.cardUrl)}`}
                  className="p-3 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors flex flex-col items-center gap-1"
                >
                  <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs text-gray-600">Email</span>
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DigitalCard;
