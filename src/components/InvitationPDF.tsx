import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const InvitationContent = () => {
  const invitationRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!invitationRef.current) return;

    const canvas = await html2canvas(invitationRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter'
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('wedding-invitation.pdf');
  };

  return (
    <div className="invitation-container">
      <button 
        onClick={generatePDF}
        className="download-button"
      >
        Download Invitation PDF
      </button>

      <div ref={invitationRef} className="invitation">
        <div className="invitation-content">
          <div className="ornament">❦</div>
          <div className="pre-title">Together with their families</div>
          <div className="names">
            Daniel
            <div className="ornament-small">&</div>
            Kathryn
          </div>
          <div className="divider"></div>
          <div className="invitation-text">
            request the honor of your presence<br/>
            as they join their lives in marriage
          </div>
          <div className="divider"></div>
          <div className="date-time">
            Saturday, the Twenty-Fifth of June<br/>
            Two Thousand and Twenty-Four<br/>
            <span className="italic">at</span><br/>
            Four O'clock in the Afternoon
          </div>
          <div className="divider"></div>
          <div className="venue">
            The Grand Ballroom<br/>
            123 Wedding Avenue<br/>
            City, State 12345
          </div>
          <div className="rsvp">
            <div className="rsvp-title">RSVP</div>
            The favor of a reply is requested<br/>
            by the Twenty-Fifth of May<br/>
            <span className="italic">at</span> www.danielandkathryn.com/rsvp
          </div>
          <div className="footer">
            <div>For more information, visit</div>
            <a href="https://www.danielandkathryn.com">www.danielandkathryn.com</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .invitation-container {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          background: #f8f8f8;
        }

        .download-button {
          padding: 1rem 2rem;
          background: #C4A962;
          color: white;
          border: none;
          border-radius: 8px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(196, 169, 98, 0.2);
        }

        .download-button:hover {
          background: #B39952;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(196, 169, 98, 0.3);
        }

        .invitation {
          width: 8.5in;
          height: 11in;
          background: white;
          padding: 0.5in;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .invitation::before {
          content: '';
          position: absolute;
          top: 0.25in;
          left: 0.25in;
          right: 0.25in;
          bottom: 0.25in;
          border: 2px solid #C4A962;
        }

        .invitation-content {
          border: 1px solid rgba(196, 169, 98, 0.3);
          height: 100%;
          padding: 1in;
          text-align: center;
          position: relative;
          background-image: 
            radial-gradient(circle at top left, rgba(196, 169, 98, 0.05) 0%, transparent 50%),
            radial-gradient(circle at bottom right, rgba(196, 169, 98, 0.05) 0%, transparent 50%);
        }

        .ornament {
          font-family: 'Great Vibes', cursive;
          color: #C4A962;
          font-size: 2.5rem;
          margin: 1rem 0;
        }

        .ornament-small {
          font-family: 'Great Vibes', cursive;
          color: #C4A962;
          font-size: 2rem;
          margin: 0.5rem 0;
        }

        .pre-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          color: #666;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin: 1rem 0;
        }

        .names {
          font-family: 'Great Vibes', cursive;
          font-size: 3.5rem;
          color: #333;
          line-height: 1.2;
          margin: 1.5rem 0;
        }

        .divider {
          width: 2in;
          height: 1px;
          background: rgba(196, 169, 98, 0.3);
          margin: 1rem auto;
        }

        .invitation-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          color: #666;
          line-height: 1.8;
          font-style: italic;
          margin: 1.5rem 0;
        }

        .date-time {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          color: #333;
          line-height: 1.8;
          letter-spacing: 1px;
          margin: 1.5rem 0;
        }

        .venue {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          color: #666;
          line-height: 1.8;
          margin: 1.5rem 0;
        }

        .rsvp {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          color: #666;
          line-height: 1.8;
          margin: 1.5rem 0;
          border-top: 1px solid rgba(196, 169, 98, 0.3);
          border-bottom: 1px solid rgba(196, 169, 98, 0.3);
          padding: 1rem 0;
        }

        .rsvp-title {
          font-family: 'Great Vibes', cursive;
          font-size: 2rem;
          color: #C4A962;
          margin-bottom: 0.5rem;
        }

        .italic {
          font-style: italic;
        }

        .footer {
          position: absolute;
          bottom: 1in;
          left: 0;
          right: 0;
          text-align: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          color: #666;
        }

        .footer a {
          color: #C4A962;
          text-decoration: none;
          font-style: italic;
          margin-top: 0.3rem;
          display: block;
        }

        @media print {
          .download-button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default InvitationContent; 