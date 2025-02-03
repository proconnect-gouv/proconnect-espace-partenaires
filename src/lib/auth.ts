import { createTransport } from 'nodemailer';
import { convert } from 'html-to-text';

import { MagicLink } from '@gouvfr-lasuite/proconnect.email';

export async function sendVerificationRequest(params: any) {
  const { identifier, url, provider } = params;
  const { host } = new URL(url);
  const transport = createTransport(provider.server);

  const html = MagicLink({
    baseurl: host,
    magic_link: url,
  });

  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Lien de connexion à l'Espace Partenaires ProConnect`,
    text: convert(html),
    html,
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
  }
}
