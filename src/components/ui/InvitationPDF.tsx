import React from 'react';
import { jsPDF } from 'jspdf';
import { FaGift } from 'react-icons/fa';

interface InvitationPDFProps {
  coupleNames: string;
  weddingDate?: string;
  venueAddress?: string;
  rsvpUrl?: string;
  websiteUrl?: string;
}

const InvitationPDFButton: React.FC<InvitationPDFProps> = ({
  coupleNames,
  weddingDate = "Saturday, the Twenty-Fifth of June Two Thousand and Twenty-Four at Four O'clock in the Afternoon",
  venueAddress = "The Grand Ballroom\n123 Wedding Avenue\nCity, State 12345",
  rsvpUrl = "www.danielandkathryn.com/rsvp",
  websiteUrl = "www.danielandkathryn.com"
}) => {
  const [groomName, brideName] = coupleNames.split(' & ');

  const generatePDF = () => {
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter'
      });

      // Set up fonts
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);

      // Add decorative border
      pdf.setDrawColor(196, 169, 98);
      pdf.setLineWidth(0.01);
      pdf.rect(0.5, 0.5, 7.5, 10);

      // Add ornament
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(24);
      pdf.setTextColor(196, 169, 98);
      pdf.text('❦', 4.25, 1.5, { align: 'center' });

      // Add pre-title
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      pdf.setTextColor(102, 102, 102);
      pdf.text('Together with their families', 4.25, 2, { align: 'center' });

      // Add names
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(28);
      pdf.setTextColor(51, 51, 51);
      pdf.text(groomName, 4.25, 2.8, { align: 'center' });
      
      pdf.setFontSize(16);
      pdf.setTextColor(196, 169, 98);
      pdf.text('&', 4.25, 3.3, { align: 'center' });
      
      pdf.setFontSize(28);
      pdf.setTextColor(51, 51, 51);
      pdf.text(brideName, 4.25, 3.8, { align: 'center' });

      // Add decorative line
      pdf.setDrawColor(196, 169, 98);
      pdf.setLineWidth(0.01);
      pdf.line(3.25, 4.2, 5.25, 4.2);

      // Add invitation text
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(12);
      pdf.setTextColor(102, 102, 102);
      pdf.text('request the honor of your presence', 4.25, 4.8, { align: 'center' });
      pdf.text('as they join their lives in marriage', 4.25, 5.1, { align: 'center' });

      // Add decorative line
      pdf.line(3.25, 5.4, 5.25, 5.4);

      // Add wedding date
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(14);
      pdf.setTextColor(51, 51, 51);
      const dateLines = pdf.splitTextToSize(weddingDate, 6);
      pdf.text(dateLines, 4.25, 5.8, { align: 'center' });

      // Add decorative line
      pdf.line(3.25, 6.5, 5.25, 6.5);

      // Add venue address
      pdf.setFontSize(12);
      pdf.setTextColor(102, 102, 102);
      const addressLines = pdf.splitTextToSize(venueAddress, 6);
      pdf.text(addressLines, 4.25, 7, { align: 'center' });

      // Add RSVP section
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.setTextColor(196, 169, 98);
      pdf.text('RSVP', 4.25, 7.8, { align: 'center' });

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      pdf.setTextColor(102, 102, 102);
      pdf.text('The favor of a reply is requested', 4.25, 8.2, { align: 'center' });
      pdf.text('by the Twenty-Fifth of May', 4.25, 8.5, { align: 'center' });
      pdf.text(`at ${rsvpUrl}`, 4.25, 8.8, { align: 'center' });

      // Add website
      pdf.setFontSize(10);
      pdf.text('For more information, visit', 4.25, 9.5, { align: 'center' });
      pdf.setTextColor(196, 169, 98);
      pdf.text(websiteUrl, 4.25, 9.8, { align: 'center' });

      // Save the PDF
      pdf.save('wedding-invitation.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    }
  };

  return (
    <button 
      onClick={generatePDF}
      className="flex items-center gap-2 bg-gold/20 hover:bg-gold/30 text-gold px-4 py-2 rounded-lg transition-all duration-300 group transform hover:scale-105"
    >
      <FaGift className="text-sm group-hover:scale-110 transition-transform" />
      <span className="text-sm figtree font-medium">Download Invitation PDF</span>
    </button>
  );
};

export default InvitationPDFButton; 