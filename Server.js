const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://portpholio-frontend-7zr7.vercel.app'], 
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.post('/api/contact', async (req, res) => {
  const { fullName, email, subject, message, phone } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send email to YOU (admin)
    await transporter.sendMail({
      from: `"${fullName}" <${email}>`,
      to: 'tejaspatil77777@gmail.com',
      subject: subject || 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    // Send confirmation email to user
    await transporter.sendMail({
  from: `"Tejas Harne" <${process.env.MAIL_USER}>`,
  to: email,
  subject: 'Thanks for contacting me! 🚀',
  html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting Me</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f8fafc;
            }
            
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            }
            
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 40px 30px;
                text-align: center;
                color: white;
            }
            
            .header h1 {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 8px;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }
            
            .header p {
                font-size: 16px;
                opacity: 0.9;
                font-weight: 300;
            }
            
            .content {
                background: white;
                padding: 40px 30px;
            }
            
            .greeting {
                font-size: 20px;
                font-weight: 600;
                color: #2d3748;
                margin-bottom: 20px;
            }
            
            .message {
                font-size: 16px;
                color: #4a5568;
                margin-bottom: 30px;
                line-height: 1.8;
            }
            
            .summary-section {
                background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
                border-left: 4px solid #667eea;
                border-radius: 8px;
                padding: 25px;
                margin: 30px 0;
            }
            
            .summary-title {
                font-size: 18px;
                font-weight: 600;
                color: #2d3748;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
            }
            
            .summary-title::before {
                content: "📋";
                margin-right: 8px;
            }
            
            .summary-item {
                margin-bottom: 15px;
            }
            
            .summary-item:last-child {
                margin-bottom: 0;
            }
            
            .summary-label {
                font-weight: 600;
                color: #4a5568;
                display: inline-block;
                min-width: 80px;
            }
            
            .summary-value {
                color: #2d3748;
                margin-top: 5px;
                padding: 12px 16px;
                background: white;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
                word-wrap: break-word;
            }
            
            .response-time {
                background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                text-align: center;
                margin: 25px 0;
                font-weight: 500;
            }
            
            .signature {
                margin-top: 40px;
                padding-top: 25px;
                border-top: 2px solid #e2e8f0;
            }
            
            .signature-name {
                font-size: 18px;
                font-weight: 600;
                color: #2d3748;
                margin-bottom: 5px;
            }
            
            .signature-title {
                font-size: 14px;
                color: #667eea;
                font-weight: 500;
                margin-bottom: 15px;
            }
            
            .contact-info {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                margin-top: 15px;
            }
            
            .contact-item {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: #4a5568;
            }
            
            .contact-item::before {
                margin-right: 6px;
            }
            
            .email-icon::before { content: "📧"; }
            .phone-icon::before { content: "📱"; }
            .location-icon::before { content: "📍"; }
            .linkedin-icon::before { content: "💼"; }
            
            .footer {
                background: #f7fafc;
                padding: 25px 30px;
                text-align: center;
                font-size: 12px;
                color: #718096;
                border-top: 1px solid #e2e8f0;
            }
            
            .tech-badge {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 500;
                margin: 2px;
            }
            
            @media (max-width: 600px) {
                .email-container {
                    margin: 10px;
                    border-radius: 12px;
                }
                
                .header, .content {
                    padding: 25px 20px;
                }
                
                .contact-info {
                    flex-direction: column;
                    gap: 10px;
                }
                
                .header h1 {
                    font-size: 24px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Thank You for Reaching Out! 🚀</h1>
                <p>Your message has been received successfully</p>
            </div>
            
            <div class="content">
                <div class="greeting">
                    Hello ${fullName}, 👋
                </div>
                
                <div class="message">
                    Thank you for taking the time to contact me! I truly appreciate your interest in working together. 
                    I have received your message and will review it carefully.
                </div>
                
                <div class="response-time">
                    ⚡ I'll get back to you within 24-48 hours!
                </div>
                
                <div class="summary-section">
                    <div class="summary-title">
                        Your Message Summary
                    </div>
                    
                    <div class="summary-item">
                        <div class="summary-label">Subject:</div>
                        <div class="summary-value">${subject}</div>
                    </div>
                    
                    <div class="summary-item">
                        <div class="summary-label">Message:</div>
                        <div class="summary-value">${message.replace(/\n/g, '<br>')}</div>
                    </div>
                </div>
                
                <div class="message">
                    As a MERN Stack Developer with 1.5+ years of experience, I'm excited to learn more about your project. 
                    I specialize in building scalable web applications using:
                </div>
                
                <div style="text-align: center; margin: 20px 0;">
                    <span class="tech-badge">Node.js</span>
                    <span class="tech-badge">React.js</span>
                    <span class="tech-badge">MongoDB</span>
                    <span class="tech-badge">Express.js</span>
                    <span class="tech-badge">JavaScript</span>
                    <span class="tech-badge">REST APIs</span>
                </div>
                
                <div class="signature">
                    <div class="signature-name">Best regards,</div>
                    <div class="signature-name">Tejas Harne</div>
                    <div class="signature-title">Full-Stack MERN Developer</div>
                    
                    <div class="contact-info">
                        <div class="contact-item email-icon">tejaspatil77777@gmail.com</div><br/>
                        <div class="contact-item phone-icon">+91 7028692735</div><br/>
                        <div class="contact-item location-icon">Pune, Maharashtra</div><br/>
                        <div class="contact-item linkedin-icon">https://www.linkedin.com/in/mr-tejas-harne/</div><br/>
                    </div>
                </div>
            </div>
            
            <div class="footer">
                <p>This is an automated response to confirm receipt of your message.</p>
                <p>© 2025 Tejas Harne. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `,
});

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ success: false, message: 'Something went wrong!' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
