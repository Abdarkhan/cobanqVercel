
import React, { useState, useEffect } from 'react'
import { Box, Typography, Container, Divider, Chip } from '@mui/material'
import { useNavigate } from 'react-router-dom'

/* ── Section data ── */
const SECTIONS = [
  { id: 'definitions', label: 'Definitions' },
  { id: 'about', label: 'About Us' },
  { id: 'contract', label: 'Contract' },
  { id: 'services', label: 'Our Services' },
  { id: 'fraud', label: 'Fraud Warning' },
  { id: 'website-use', label: 'Terms of Website Use' },
  { id: 'mobile-access', label: 'Mobile App Access' },
  { id: 'password', label: 'Password & Security' },
  { id: 'fees', label: 'Transfer Fees' },
  { id: 'our-resp', label: 'Our Responsibility' },
  { id: 'your-resp', label: 'Your Responsibility' },
  { id: 'customer', label: 'Customer Service' },
]

/* ── Reusable typography ── */
const H2 = ({ id, children }) => (
  <Typography id={id} component="h2" sx={{
    fontSize: { xs: '18px', md: '22px' }, fontWeight: 700,
    color: 'text.primary', mt: 5, mb: 2, pb: 1.5,
    borderBottom: '2px solid', borderColor: 'divider',
    letterSpacing: '-0.02em', scrollMarginTop: '90px',
    fontFamily: '"DM Sans", sans-serif',
  }}>
    {children}
  </Typography>
)

const H3 = ({ children }) => (
  <Typography component="h3" sx={{
    fontSize: '16px', fontWeight: 700, color: 'text.primary',
    mt: 3, mb: 1.5, fontFamily: '"DM Sans", sans-serif',
  }}>
    {children}
  </Typography>
)

const P = ({ children, sx = {} }) => (
  <Typography sx={{
    fontSize: '15px', color: 'text.secondary', lineHeight: 1.85,
    mb: 2, fontFamily: '"DM Sans", sans-serif', ...sx,
  }}>
    {children}
  </Typography>
)

const UL = ({ items }) => (
  <Box component="ul" sx={{ pl: 3, mb: 2.5, mt: 0.5, display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {items.map((item, i) => (
      <Box key={i} component="li" sx={{
        fontSize: '15px', color: 'text.secondary',
        lineHeight: 1.8, fontFamily: '"DM Sans", sans-serif',
      }}>
        {item}
      </Box>
    ))}
  </Box>
)

const Alert = ({ children }) => (
  <Box sx={{
    background: '#fff8ed', border: '1px solid #fcd34d',
    borderLeft: '4px solid #f59e0b', borderRadius: '10px',
    px: 2.5, py: 2, mb: 2.5,
  }}>
    <Typography sx={{
      fontSize: '14px', color: '#92400e', fontWeight: 600,
      lineHeight: 1.7, fontFamily: '"DM Sans", sans-serif',
    }}>
      {children}
    </Typography>
  </Box>
)

const Bold = ({ children }) => (
  <Box component="strong" sx={{ fontWeight: 700, color: 'text.primary' }}>{children}</Box>
)

/* ── Numbered row used in responsibility sections ── */
const NumRow = ({ n, text }) => (
  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
    <Box sx={{
      width: 26, height: 26, borderRadius: '8px',
      bgcolor: 'primary.light',        // ← theme token
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '12px', fontWeight: 700,
      color: 'primary.main',           // ← theme token
      flexShrink: 0, mt: '2px',
    }}>
      {n}
    </Box>
    <Typography sx={{ fontSize: '15px', color: 'text.secondary', lineHeight: 1.8, fontFamily: '"DM Sans", sans-serif' }}>
      {text}
    </Typography>
  </Box>
)

/* ════════════════════ MAIN COMPONENT ════════════════════ */
export default function Terms_Service() {
  const [active, setActive] = useState('definitions')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => {
      for (const s of [...SECTIONS].reverse()) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= 110) {
          setActive(s.id); break
        }
      }
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <Box sx={{
      fontFamily: '"DM Sans", sans-serif',
      bgcolor: 'background.default',
      color: 'text.primary',
      minHeight: '100vh',
    }}>

      {/* ── Hero Banner ── */}
      <Box sx={{
        background: (theme) => theme.palette.gradient,
        // bgcolor: 'background.paper',
        py: { xs: 5, md: 7 }, px: 2,
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {[
          { w: 320, h: 320, top: -80, right: -60, bottom: undefined, left: undefined },
          { w: 200, h: 200, top: undefined, right: undefined, bottom: -50, left: 40 },
        ].map((c, i) => (
          <Box key={i} sx={{
            position: 'absolute', width: c.w, height: c.h,
            borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)',
            top: c.top, right: c.right, bottom: c.bottom, left: c.left, opacity: 0.05,
          }} />
        ))}

        <Chip label="Legal" sx={{
          bgcolor: 'rgba(255,255,255,0.1)',
          marginTop: '40px',
          color: 'rgba(255,255,255,0.85)',
          fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', mb: 2, height: 26,
        }} />

        <Typography sx={{
          fontSize: { xs: '28px', md: '40px' }, fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.03em', lineHeight: 1.15, mb: 1.5,
        }}>
          Terms of Service
        </Typography>

        <Typography sx={{ fontSize: '15px', color: 'rgba(180,210,255,0.8)', fontWeight: 400 }}>
          Last updated: January 2025
        </Typography>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Alert>
            IT IS IMPORTANT FOR YOU TO READ AND UNDERSTAND OUR TERMS AND CONDITIONS BEFORE YOU ACCEPT THEM.
            THEY CONTAIN LIMITATIONS ON THE SCOPE OF OUR OBLIGATIONS TO YOU, AS WELL AS LIMITATIONS AND EXEMPTIONS
            FROM OUR LIABILITY TO YOU FOR DAMAGE THAT YOU MAY SUFFER AS THE RESULT OF USING CoBanq FINANCIAL SERVICES.
          </Alert>
        </Box>
      </Box>

      {/* ── Body ── */}
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start', mt: 4 }}>

          {/* ── Sticky Sidebar ── */}
          <Box sx={{ display: { xs: 'none', lg: 'block' }, position: 'sticky', top: 24, width: 230, flexShrink: 0 }}>
            <Box sx={{
              bgcolor: 'background.paper',   // ✅ card background
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '16px', p: 2, overflow: 'hidden',
            }}>
              <Typography sx={{
                fontSize: '11px', fontWeight: 700, color: 'text.disabled',
                letterSpacing: '0.08em', textTransform: 'uppercase', mb: 1.5, px: 1,
              }}>
                On this page
              </Typography>

              {SECTIONS.map(s => (
                <Box key={s.id} onClick={() => scrollTo(s.id)} sx={{
                  px: 1.5, py: '7px', borderRadius: '8px', cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: active === s.id ? 700 : 500,
                  color: active === s.id ? 'primary.main' : 'text.secondary',  // ✅ theme tokens
                  bgcolor: active === s.id ? 'action.selected' : 'transparent',  // ✅ theme token
                  borderLeft: active === s.id ? '3px solid' : '3px solid transparent',
                  borderColor: active === s.id ? 'primary.main' : 'transparent',
                  transition: 'all 0.15s',
                  '&:hover': { bgcolor: 'action.hover', color: 'primary.main' },     // ✅ theme tokens
                  mb: '2px',
                }}>
                  {s.label}
                </Box>
              ))}
            </Box>
          </Box>

          {/* ── Main content ── */}
          <Box sx={{ flex: 1, pb: 8, minWidth: 0 }}>

            {/* Mobile TOC toggle */}
            <Box sx={{ display: { xs: 'flex', lg: 'none' }, mb: 3 }}>
              <Box onClick={() => setMenuOpen(v => !v)} sx={{
                display: 'flex', alignItems: 'center', gap: 1,
                px: 2, py: 1, borderRadius: '10px',
                border: '1px solid', borderColor: 'divider',
                bgcolor: 'background.paper',              // ✅ theme token
                cursor: 'pointer', fontSize: '13px',
                fontWeight: 600, color: 'text.secondary', // ✅ theme token
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
                Table of Contents
              </Box>
            </Box>

            {menuOpen && (
              <Box sx={{
                mb: 3,
                bgcolor: 'background.paper',              // ✅ theme token
                color: 'text.primary',                  // ✅ theme token
                border: '1px solid', borderColor: 'divider',
                borderRadius: '12px', p: 1.5,
              }}>
                {SECTIONS.map(s => (
                  <Box key={s.id} onClick={() => scrollTo(s.id)} sx={{
                    px: 1.5, py: '8px', borderRadius: '8px', cursor: 'pointer',
                    fontSize: '14px', fontWeight: 500, color: 'text.secondary',
                    '&:hover': { bgcolor: 'action.hover', color: 'primary.main' },
                  }}>
                    {s.label}
                  </Box>
                ))}
              </Box>
            )}

            {/* ═══ DEFINITIONS ═══ */}
            <H2 id="definitions">Terms and Conditions for using CoBanq</H2>
            <P>Our Terms and Conditions use the following definitions:</P>
            <UL items={[
              <><Bold>"CoBanq", "We", "Our" or "Us"</Bold> refers to CoBanq and also includes CoBanq's affiliates or agents insofar as these assume operations which otherwise would have to be performed by CoBanq in order to provide the Service.</>,
              <><Bold>"CoBanq Website" or "Website"</Bold> refers to the website which We operate in order to provide online money transfer services.</>,
              <><Bold>"You", "Yours" or "Your"</Bold> refers to every person and any person using the CoBanq Website as a Sender.</>,
              <><Bold>"Payment Method"</Bold> refers to the options available to the Sender to fund a money transfer through CoBanq, which may vary from country to country and may include Bank Cards, bank accounts and other payment methods.</>,
              <><Bold>"Prohibited Purpose"</Bold> refers to any unlawful purpose; including but not limited to, making or receiving payments for gambling services, gambling chips or gambling credits; or sending a payment to yourself as the Receiver in order to evidence financial soundness (RISK OF FRAUD); or sending or receiving money on behalf of someone else.</>,
              <><Bold>"Receiver"</Bold> refers to the person named as the beneficiary of the money transfer.</>,
              <><Bold>"Sender"</Bold> refers to the person who initiated a money transfer through CoBanq.</>,
              <><Bold>"Transaction"</Bold> refers to every money transfer that You initiate through CoBanq.</>,
            ]} />

            <Divider sx={{ my: 1 }} />

            {/* ═══ ABOUT ═══ */}
            <H2 id="about">About Us</H2>
            <P>The registered office of CoBanq, a company that provides payment services, is located at One Canada Square, 37th Floor, Canary Wharf, London, United Kingdom, E14 5AA. Under FCA FRN No. 508565, CoBanq is permitted to offer payment services by the FCA.</P>
            <P>International money transfer services are provided by CoBanq. CoBanq delivers the service online through our mobile app/online web portal.</P>

            {/* ═══ CONTRACT ═══ */}
            <H2 id="contract">Contract</H2>
            <P>Every financial transaction between CoBanq and the sender of the funds results in a unique agreement.</P>
            <P>When you send money through CoBanq, you consent to our employing our partners to handle your transaction and to sharing pertinent information with them. The full agreement/contract between CoBanq/its partners and you is set forth in these terms and conditions and other related documentation.</P>
            <P>Depending on changes in the law or regulatory requirements, terms and conditions may change. Any modifications made after a transaction has been completed will not be applicable to the current transaction.</P>
            <P>
              If you would like a copy of the terms and conditions or additional information about our services, please contact us at{' '}
              <Box component="a" href="mailto:admin@cobanq.com" sx={{ color: 'primary.main', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                admin@cobanq.com
              </Box>{' '}
              or by calling us on 020 8175 2519.
            </P>

            {/* ═══ SERVICES ═══ */}
            <H2 id="services">Our Services</H2>
            <P>The service allows you to send money to a recipient designated by you. The money can be collected by a recipient in cash or sent to the recipient's bank account or the customer can send money directly via Mobile App/ Web portal.</P>
            <P>To use the CoBanq service, you must be at least 18 years of age. The service is for personal use only and may not be used for gambling purposes, escrow, or trust purposes.</P>
            <P>When the money transfer is conducted, certain information will be requested including identification details which is a requirement to meet our regulatory responsibilities.</P>
            <P>A control number/PIN is provided to you on the completion of a transaction which must only be provided to the recipient of the transaction to enable the collection of the funds.</P>
            <P>CoBanq will endeavor to make the transaction available for payment to the recipient either in a few minutes, by the end of the next working day or latest by the seventh business day depending on which partner the funds are sent through.</P>
            <P>The sender is responsible for providing the recipient with the details of the transactions to enable the collection of funds. Any errors in the details provided for the recipient could result in a delay in the transaction being paid.</P>
            <P>Payment shall be made when the relevant details required by CoBanq or its partners are provided by the recipient including the name of the sender, transaction number, amount sent and country from where the money was sent along with a valid government-issued ID.</P>
            <P>Applicable laws prohibit money transmission companies from conducting business with certain individuals. CoBanq and its partners are required to screen all transactions against the list of asset freeze targets issued by the office of financial sanctions implementation, HM treasury.</P>

            {/* ═══ FRAUD ═══ */}
            <H2 id="fraud">Fraud Warning</H2>
            <Box sx={{ background: '#fff1f2', border: '1px solid #fecdd3', borderLeft: '4px solid #ef4444', borderRadius: '10px', px: 2.5, py: 2, mb: 3 }}>
              <Typography sx={{ fontSize: '15px', color: '#991b1b', fontWeight: 600, lineHeight: 1.75, fontFamily: '"DM Sans", sans-serif' }}>
                Send funds only to individuals you know or can verify as trustworthy. The service must only be used to send funds to family or friends and not for business purposes. If you suspect you are a victim of fraud, contact CoBanq immediately on{' '}
                <Box component="a" href="tel:02081752519" sx={{ color: '#b91c1c', fontWeight: 700 }}>020 8175 2519</Box>
              </Typography>
            </Box>

            {/* ═══ WEBSITE USE ═══ */}
            <H2 id="website-use">Terms of Use of Website</H2>
            <P>Welcome to CoBanq's website. Before using the website and the information offered by CoBanq, its subsidiaries, and affiliates, please read these terms and conditions. You accept these Terms by accessing or using the website.</P>
            <P>Do not access or use the website if you disagree with any of these terms. CoBanq has the right to change these Terms at any time without providing you with prior notice.</P>

            <H3>Scope of Terms</H3>
            <P>The "CoBanq Websites" refer to the CoBanq website that can be found at www.cobanq.com as well as all CoBanq owned and/or operated websites linked to by CoBanq and its subsidiaries, including secure areas of the websites.</P>

            <H3>Website Usage</H3>
            <P>You agree that you will only use the website in a way that complies with all applicable laws and regulations. You consent to refrain from any actions that might damage, disrupt, or impair the website, such as planting malware, viruses, or other harmful code.</P>

            <H3>Privacy of Your Data</H3>
            <P>CoBanq is dedicated to safeguarding your personal information. Reviewing our Privacy Policy will help you understand how we obtain, use, and share your personal data when you access the website.</P>

            <H3>Links to Third-Party Websites</H3>
            <P>The CoBanq Websites may include links to external websites that are not under the control of CoBanq. You access such Linked Websites at your own risk and CoBanq will not be liable for any damages or losses resulting from your use of their content or services.</P>

            <H3>Intellectual Property Rights</H3>
            <P>The CoBanq Websites, including all content, graphics, text, images, audio, videos, and other materials are protected by intellectual property laws. Without the express prior written consent of CoBanq, the Content may not be copied, reproduced, modified, or disseminated in any way.</P>

            <H3>Disclaimer of Warranties</H3>
            <P>You use and access the CoBanq Websites at your own risk. The Websites and Content are given "AS IS" and "AS AVAILABLE" without any explicit or implied warranty of any kind.</P>

            <H3>Liability Limitation</H3>
            <Box sx={{
              bgcolor: 'background.paper',               // ✅ card background — theme token
              border: '1px solid', borderColor: 'divider',
              borderRadius: '10px', p: 2.5, mb: 3,
            }}>
              <Typography sx={{ fontSize: '14px', fontWeight: 700, color: 'text.primary', mb: 1.5, fontFamily: '"DM Sans", sans-serif' }}>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, CoBanq SHALL NOT BE LIABLE FOR ANY DAMAGES, INCLUDING BUT NOT LIMITED TO:
              </Typography>
              <UL items={[
                'Any direct, indirect, special, incidental, consequential, punitive, or exemplary damages resulting from your use of or in connection with the Websites, even if CoBanq had been previously advised of the possibility of such damages.',
                'Any loss or damage that you may incur, including as a result of any reliance placed by you on the accuracy, completeness, or suitability of the Content.',
                'Parts of the aforementioned limitation or exclusion may not apply because certain jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages.',
              ]} />
            </Box>

            <H3>Indemnity</H3>
            <P>You consent to hold harmless and indemnify CoBanq, its subsidiaries, affiliates, shareholders, officers, directors, agents, employees and representatives from and against any claims and demands made by any third party with respect to your use of the Websites and any violation of these Terms.</P>

            <H3>Trademarks</H3>
            <P>The trademarks, service marks, logos, slogans, and domain names mentioned on the CoBanq Websites are registered service marks of CoBanq or its subsidiaries and are protected by trademark laws in the UK, the EU, and other nations.</P>

            {/* ═══ MOBILE ═══ */}
            <H2 id="mobile-access">Access to Mobile App and Online Web Portal</H2>
            <P>By using our mobile app and online web portal, you represent and warrant that you are 18 years or older. We have the right to cancel access if it comes to our attention that you are under the age of 18.</P>
            <P>On completing the registration requirements, you will be provided with login details that are not transferrable. You are responsible for ensuring that the app and portal are only accessed by you and that login details are kept safe and secure.</P>
            <P>For any suspicions concerning the confidentiality of the app and access to the online web portal, you must notify CoBanq immediately. Any undue delay in contacting CoBanq may result in you becoming liable for any losses.</P>
            <P>Login details must be updated regularly, every month as a minimum. Ensure that you log out after conducting the transaction. We reserve the right to disable access at any time for any reason including failure to abide by the terms and conditions.</P>
            <P>Please note that we do not provide service for credit card users. We accept payment by debit card only.</P>

            {/* ═══ PASSWORD ═══ */}
            <H2 id="password">Password and Security</H2>
            <P>You will be required to provide a password and a legitimate email address as Your username prior to placing your first money transfer transaction. Other than you, no one else is permitted to use the username or the password.</P>
            <Alert>NEVER TELL ANYONE YOUR PASSWORD AND DON'T EVER WRITE IT DOWN! You agree to immediately alert Us by phone of any unauthorised use of your username, password, or other security breach.</Alert>
            <P>We will immediately take all necessary steps to stop any further use of this information once You have let Us know about the unauthorised use. We are not responsible for any loss or harm that arises from Your failure to carry out Your obligation under this clause.</P>

            {/* ═══ FEES ═══ */}
            <H2 id="fees">Transfer Fees</H2>
            <P>Prior to completing the money transfer transaction, the sender is shown information outlining how CoBanq charges the sender for making the transfer. Money transfer payments may occasionally be subject to back-end fees such as service fees and local taxes.</P>
            <P>The recipient institution may convert the funds at its own exchange rate or may even refuse the money transfer if it is not sent to the recipient's local currency account. CoBanq has the right to impose additional charges for using a particular account to send or receive money transfers.</P>

            {/* ═══ OUR RESPONSIBILITY ═══ */}
            <H2 id="our-resp">Our Responsibility to You</H2>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
              {[
                { n: '1', text: 'We pledge Our willingness to offer You individual payments in line with these terms and conditions, along with the necessary information and money transfer services, and to take appropriate precautions.' },
                { n: '2', text: 'We disclaim all responsibility for goods or services that You purchase through CoBanq including their delivery; malfunctions in communication facilities over which We have no control; data loss or transmission delays; viruses originating from third parties; mistakes made by the CoBanq Website as a result of inaccurate information supplied by You.' },
                { n: '3', text: 'We are under no obligation towards You to initiate or execute a money transfer if We are unable to gather enough proof of Your identity; You have provided Us with incorrect or incomplete information; We have reason to believe that the Transaction information is incorrect, unauthorised, or forged.' },
                { n: '4', text: 'We do not assume any liability for loss or damages caused to You or any third party from the non-payment or late payment of a money transfer to a Receiver or if the CoBanq online service fails or declines to execute a Transaction.' },
                { n: '5', text: 'If your use is prohibited by CoBanq regulations (such as those aimed at preventing fraud, money laundering, or financing terrorism), we have the right to refuse to provide you, cancel or suspend a Transaction.' },
                { n: '6', text: 'We may, in our absolute discretion, impose limits on the Transaction amount, either on a per Transaction basis or on an aggregated basis.' },
                { n: '7', text: 'If circumstances outside of our control force us to take this action ("Force Majeure"), we have the right to partially or completely stop operating the CoBanq Website or the CoBanq Online Service.' },
              ].map(({ n, text }) => <NumRow key={n} n={n} text={text} />)}
            </Box>

            {/* ═══ YOUR RESPONSIBILITY ═══ */}
            <H2 id="your-resp">Your Responsibility Towards Us</H2>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
              {[
                { n: '1', text: 'You acknowledge and agree that You will pay Us Our fees for each money transfer You start using the CoBanq Service.' },
                { n: '2', text: 'If CoBanq allows an account-based money transfer, you must pay the basic amount of the transfer plus Our fees using a bank card or money from your bank account.' },
                { n: '4', text: 'You must contact us right away by phone if the Transaction data is lost, stolen, copied, or used inappropriately. You shall equally notify Us immediately upon learning of a money transfer which You did not authorize or which was executed erroneously.' },
                { n: '5', text: 'You consent that We may forward any particulars about You and the Receiver to regulatory or government authorities if we are obligated by law to do so or if we believe such a disclosure may assist in the prevention of fraud, money laundering or other crimes.' },
                { n: '6', text: "It is your duty to check that all information is correct before submitting a Transaction request. A Transaction request's details cannot often be changed once it has been filed." },
              ].map(({ n, text }) => <NumRow key={n} n={n} text={text} />)}
            </Box>
            <P>You consent to and acknowledge the following obligations:</P>
            <UL items={[
              'The information provided in order to effect an online money transfer is true, accurate, current and complete.',
              'You will provide Us with any identity, verification or further information or documents as may be requested by Us.',
              'You must share the Transaction data (amount of money, Your name, Your country, name of Receiver and PIN) with the Receiver only.',
              'You shall not provide false, inaccurate or misleading information.',
              'You shall not use any anonymizing tool that attempts to make your activities untraceable.',
              'You shall not use the CoBanq Service for Prohibited Purposes.',
              'You are personally responsible for keeping Your password and Your username safe.',
            ]} />

            {/* ═══ CUSTOMER SERVICE ═══ */}
            <H2 id="customer">Customer Service</H2>
            <P>If You detect errors or encounter problems on the CoBanq Website or with the CoBanq Service, please contact Us by e-mail or by telephone.</P>
            <Box sx={{
              bgcolor: 'background.paper',               // ✅ card background — theme token
              border: '1px solid', borderColor: 'divider',
              borderRadius: '14px', p: 3,
              display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3,
            }}>
              {[
                { icon: '📞', label: 'Phone', value: '020 8175 2519', href: 'tel:02081752519' },
                { icon: '✉️', label: 'Email', value: 'admin@cobanq.com', href: 'mailto:admin@cobanq.com' },
              ].map(({ icon, label, value, href }) => (
                <Box key={label} sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography sx={{ fontSize: '16px' }}>{icon}</Typography>
                    <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif' }}>
                      {label}
                    </Typography>
                  </Box>
                  <Box component="a" href={href} sx={{ fontSize: '16px', fontWeight: 700, color: 'primary.main', textDecoration: 'none', fontFamily: '"DM Sans", sans-serif', '&:hover': { textDecoration: 'underline' } }}>
                    {value}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* ── Footer ── */}
            <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
              <Typography sx={{ fontSize: '13px', color: 'text.disabled', fontFamily: '"DM Sans", sans-serif' }}>
                © 2026 CoBanq. All rights reserved. &nbsp;·&nbsp;
                <Box
                  onClick={() => {
                    navigate('/Privacy_Policy')
                    window.scrollTo(0, 0)
                  }}
                  sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy
                </Box>
              </Typography>
            </Box>

          </Box>{/* end main content */}
        </Box>
      </Container>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');`}</style>
    </Box>
  )
}