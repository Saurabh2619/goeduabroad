export const gtag_report_conversion = (conversionId, callback) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: conversionId,
        event_callback: callback
      });
    }
  };