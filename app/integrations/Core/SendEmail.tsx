interface EmailProps {
  to: string;
  subject: string;
  body: string;
}

export const SendEmail = async ({ to, subject, body }: EmailProps): Promise<void> => {
  try {
    // Open the user's default email client with pre-filled fields
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    // You could also use window.open for a new window:
    // window.open(mailtoLink, '_blank');

  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

// Export other email-related utilities here if needed
export default SendEmail;
