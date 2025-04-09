import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.BOT_EMAIL,
      pass: process.env.BOT_PASSWORD,
    },
  });

  public async registrationNotificationByEmail(
    email: string,
    code: number,
  ): Promise<void> {
    const mailOptions = {
      from: process.env.BOT_EMAIL,
      to: email,
      subject: 'Greetings from Node.js!',
      text: 'Letter for registration',
      html: `<h1>Привіт!</h1><p>Це твій <b>код</b> для реєстрації.</p><p>Код: <b>${code}</b></p>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Помилка надсилання email: ${error.message}`,
        );
      }
      throw new InternalServerErrorException(
        `Помилка надсилання email: ${String(error)}`,
      );
    }
  }
}
