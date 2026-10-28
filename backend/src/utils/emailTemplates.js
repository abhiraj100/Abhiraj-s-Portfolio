/**
 * HTML Email Templates for Abhiraj Yadav's Portfolio
 */

export const getAdminNotificationTemplate = ({ name, email, subject, message, receivedAt, ip }) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject || 'Portfolio Inquiry');
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Message</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050816; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #050816; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #0d1226; border-radius: 20px; border: 1px solid rgba(148, 163, 184, 0.15); overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 36px; background: linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(99, 102, 241, 0.15)); border-bottom: 1px solid rgba(148, 163, 184, 0.1);">
              <span style="display: inline-block; padding: 4px 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #22d3ee; background: rgba(34, 211, 238, 0.1); border-radius: 100px; margin-bottom: 12px;">
                New Contact Form Submission
              </span>
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                ${safeSubject}
              </h1>
            </td>
          </tr>

          <!-- Sender Details -->
          <tr>
            <td style="padding: 28px 36px 12px 36px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(15, 23, 42, 0.6); border-radius: 14px; border: 1px solid rgba(148, 163, 184, 0.1); padding: 18px 22px;">
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #94a3b8; width: 80px; font-weight: 600;">Sender:</td>
                  <td style="padding: 6px 0; font-size: 15px; color: #f8fafc; font-weight: 700;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #94a3b8; font-weight: 600;">Email:</td>
                  <td style="padding: 6px 0; font-size: 14px;">
                    <a href="mailto:${safeEmail}" style="color: #22d3ee; text-decoration: none; font-weight: 600;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #94a3b8; font-weight: 600;">Received:</td>
                  <td style="padding: 6px 0; font-size: 13px; color: #cbd5e1;">${new Date(receivedAt).toLocaleString()}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 16px 36px 28px 36px;">
              <p style="margin: 0 0 10px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8;">
                Message Content:
              </p>
              <div style="background: rgba(2, 6, 23, 0.7); border-radius: 14px; border: 1px solid rgba(34, 211, 238, 0.15); padding: 22px; font-size: 15px; line-height: 1.7; color: #e2e8f0; white-space: pre-wrap;">
                ${safeMessage}
              </div>
            </td>
          </tr>

          <!-- Action Button -->
          <tr>
            <td style="padding: 0 36px 32px 36px;">
              <a href="mailto:${safeEmail}?subject=Re: ${encodeURIComponent(subject || 'Portfolio Inquiry')}" style="display: inline-block; background: linear-gradient(135deg, #22d3ee, #6366f1); color: #04111c; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 12px; box-shadow: 0 6px 20px rgba(34, 211, 238, 0.3);">
                Reply to ${safeName} &rarr;
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 36px; background-color: #090d1d; border-top: 1px solid rgba(148, 163, 184, 0.1); font-size: 12px; color: #64748b;">
              Delivered by Abhiraj Yadav's Portfolio Backend &bull; IP: ${ip || 'N/A'}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

export const getAutoReplyTemplate = ({ name, message }) => {
  const safeName = escapeHtml(name);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Reaching Out</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050816; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #050816; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #0d1226; border-radius: 20px; border: 1px solid rgba(148, 163, 184, 0.15); overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);">
          <!-- Header -->
          <tr>
            <td style="padding: 36px 36px 24px 36px; background: linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(99, 102, 241, 0.15)); border-bottom: 1px solid rgba(148, 163, 184, 0.1);">
              <div style="display: inline-block; width: 42px; height: 42px; line-height: 42px; text-align: center; border-radius: 12px; background: linear-gradient(135deg, #22d3ee, #6366f1); color: #050816; font-weight: 900; font-size: 18px; margin-bottom: 16px;">
                AY
              </div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                Message Received!
              </h1>
              <p style="margin: 8px 0 0 0; font-size: 14px; color: #94a3b8;">
                Hi ${safeName}, thanks for connecting with me.
              </p>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 28px 36px;">
              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.7; color: #e2e8f0;">
                I've received your note and will review it promptly. I typically get back to inquiries within 24 hours.
              </p>
              
              <p style="margin: 24px 0 10px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8;">
                Summary of your message:
              </p>
              <div style="background: rgba(15, 23, 42, 0.7); border-radius: 12px; border-left: 3px solid #22d3ee; padding: 18px; font-size: 14px; line-height: 1.6; color: #cbd5e1; margin-bottom: 24px;">
                ${safeMessage}
              </div>

              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.7; color: #e2e8f0;">
                In the meantime, feel free to explore my latest open-source projects or connect with me on LinkedIn and GitHub:
              </p>

              <!-- Social Links -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top: 10px;">
                <tr>
                  <td style="padding-right: 12px;">
                    <a href="https://www.linkedin.com/in/abhiraj-yadav-86a232215/" style="display: inline-block; padding: 10px 18px; font-size: 13px; font-weight: 600; color: #ffffff; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px; text-decoration: none;">
                      LinkedIn &rarr;
                    </a>
                  </td>
                  <td>
                    <a href="https://github.com/abhiraj100" style="display: inline-block; padding: 10px 18px; font-size: 13px; font-weight: 600; color: #ffffff; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px; text-decoration: none;">
                      GitHub &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td style="padding: 24px 36px; background-color: #090d1d; border-top: 1px solid rgba(148, 163, 184, 0.1);">
              <p style="margin: 0; font-size: 14px; font-weight: 700; color: #ffffff;">Abhiraj Yadav</p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #94a3b8;">Software Engineer &bull; Full Stack + AI</p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #22d3ee;">abhirajyadav303@gmail.com</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

function escapeHtml(text = '') {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
