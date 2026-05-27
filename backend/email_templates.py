"""Email templates for GOLFGATE Catalunya"""

LOGO_URL = "https://golfcat-booking.preview.emergentagent.com/golfgate-logo-nav.png"

FOOTER_HTML = """
<div style="background-color: #1a1a1a; padding: 24px 30px; border-radius: 0 0 16px 16px; text-align: center;">
    <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 0 0 4px 0;"><a href="https://golfgatecatalunya.com" style="color: rgba(255,255,255,0.7) !important; text-decoration: none !important;">golfgatecatalunya.com</a></p>
    <p style="color: rgba(255,255,255,0.4); font-size: 11px; margin: 8px 0 0 0;"><a href="mailto:contact@golfgatecatalunya.com" style="color: rgba(255,255,255,0.4) !important; text-decoration: none !important;">contact@golfgatecatalunya.com</a> | <a href="tel:+34620987575" style="color: rgba(255,255,255,0.4) !important; text-decoration: none !important;">+34 620 987 575</a></p>
</div>
"""


def build_admin_email(name, email, dates, message):
    """Build admin notification email HTML"""
    return f"""
    <html>
    <head><meta name="format-detection" content="telephone=no"><meta name="x-apple-disable-message-reformatting"></head>
    <body style="font-family: 'Helvetica Neue', Arial, sans-serif; padding: 0; margin: 0; background-color: #F5FFF0;">
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: linear-gradient(135deg, #f6416c 0%, #d42a52 100%); padding: 20px 30px; text-align: center;">
                <p style="color: rgba(255,255,255,0.95); margin: 0 0 12px 0; font-size: 11px; letter-spacing: 2px;">NEW CONTACT INQUIRY</p>
                <img src="{LOGO_URL}" alt="GOLFGATE Catalunya" style="width: 140px; height: auto; display: block; margin: 0 auto;" />
            </div>
            <div style="background-color: white; padding: 40px 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #E5E5E5; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 120px;">Name</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #E5E5E5; color: #2D2D2D; font-size: 15px; font-weight: 500;">{name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #E5E5E5; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #E5E5E5; color: #2D2D2D; font-size: 15px;"><a href="mailto:{email}" style="color: #2D2D2D !important; text-decoration: none !important;">{email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #E5E5E5; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Travel Dates</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #E5E5E5; color: #2D2D2D; font-size: 15px;">{dates or 'Not specified'}</td>
                    </tr>
                </table>
                <div style="margin-top: 24px;">
                    <p style="color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Message</p>
                    <div style="background-color: #F5FFF0; padding: 20px; border-radius: 8px; border-left: 4px solid #f6416c;">
                        <p style="color: #2D2D2D; font-size: 15px; line-height: 1.7; margin: 0;">{message or 'No message provided'}</p>
                    </div>
                </div>
            </div>
            {FOOTER_HTML}
        </div>
    </body>
    </html>
    """


def build_client_email(name, message):
    """Build client confirmation email HTML"""
    return f"""
    <html>
    <head><meta name="format-detection" content="telephone=no"><meta name="x-apple-disable-message-reformatting"></head>
    <body style="font-family: 'Helvetica Neue', Arial, sans-serif; padding: 0; margin: 0; background-color: #F5FFF0;">
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background-color: #ffffff; padding: 30px 40px; border-radius: 16px 16px 0 0; text-align: center; border-bottom: 2px solid #E5E5E5;">
                <img src="{LOGO_URL}" alt="GOLFGATE Catalunya" style="width: 180px; height: auto; display: block; margin: 0 auto;" />
            </div>
            <div style="background-color: #ffffff; padding: 30px 30px 10px 30px;">
                <h2 style="color: #2D2D2D; font-size: 22px; margin: 0 0 8px 0; font-weight: 500;">Thank you, {name}!</h2>
                <p style="color: #888; font-size: 15px; line-height: 1.6; margin: 0;">
                    We received your inquiry and our team will get back to you within 24 hours with a personalized response.
                </p>
            </div>
            <div style="background-color: #ffffff; padding: 10px 30px 30px 30px;">
                <div style="background-color: #F5FFF0; border-radius: 12px; padding: 24px; margin-top: 16px;">
                    <p style="color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 16px 0;">Why book with GOLFGATE Catalunya?</p>
                    <table style="width: 100%;">
                        <tr><td style="padding: 8px 0; color: #2D2D2D; font-size: 14px;">&#10003; 20 premier golf courses across Catalunya</td></tr>
                        <tr><td style="padding: 8px 0; color: #2D2D2D; font-size: 14px;">&#10003; Exclusive golf &amp; hotel stay packages</td></tr>
                        <tr><td style="padding: 8px 0; color: #2D2D2D; font-size: 14px;">&#10003; Best rate guarantee on green fees</td></tr>
                        <tr><td style="padding: 8px 0; color: #2D2D2D; font-size: 14px;">&#10003; Instant confirmation &amp; local expertise</td></tr>
                    </table>
                </div>
                <div style="text-align: center; margin: 32px 0;">
                    <a href="https://golfgatecatalunya.com" style="display: inline-block; background-color: #f6416c; color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">Explore Golf Courses</a>
                </div>
            </div>
            <div style="background-color: #1a1a1a; padding: 24px 30px; border-radius: 0 0 16px 16px; text-align: center;">
                <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 0 0 4px 0;">Questions? Contact us at</p>
                <a href="mailto:contact@golfgatecatalunya.com" style="color: #ffffff !important; font-size: 13px; text-decoration: none !important;">contact@golfgatecatalunya.com</a>
                <p style="color: rgba(255,255,255,0.4); font-size: 11px; margin: 16px 0 0 0;"><a href="https://golfgatecatalunya.com" style="color: rgba(255,255,255,0.4) !important; text-decoration: none !important;">golfgatecatalunya.com</a> &mdash; Your Gateway to Golf in Catalunya</p>
            </div>
        </div>
    </body>
    </html>
    """
