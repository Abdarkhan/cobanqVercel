


import React, { useState, useEffect } from 'react'
import { Box, Typography, Container, Divider, Chip } from '@mui/material'
import { useNavigate } from 'react-router-dom'

/* ── Sections ── */
const SECTIONS = [
    { id: 'intro', label: '1. Introduction' },
    { id: 'collect', label: '2. Information We Collect' },
    { id: 'use', label: '3. How We Use Your Info' },
    { id: 'share', label: '4. Sharing Your Information' },
    { id: 'protect', label: '5. Protecting Your Info' },
    { id: 'rights', label: '6. Your Privacy Rights' },
    { id: 'retention', label: '7. Retention of Information' },
    { id: 'transfers', label: '8. International Transfers' },
    { id: 'children', label: '9. Children\'s Privacy' },
    { id: 'cookies', label: '10. Tracking & Cookies' },
    { id: 'use-data', label: '11. Use of Data' },
    { id: 'data-transfer', label: '12. Data Transfer' },
    { id: 'security', label: '13. Data Security' },
    { id: 'providers', label: '14. Service Providers' },
    { id: 'analytics', label: '15. Analytics' },
    { id: 'links', label: '16. Links to Other Sites' },
    { id: 'modifications', label: '17. Modifications' },
    { id: 'contact', label: '18. Contact Us' },
]

/* ── Reusable components ── */
const H2 = ({ id, children }) => (
    <Typography id={id} component="h2" sx={{
        fontSize: { xs: '17px', md: '21px' }, fontWeight: 700,
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
        fontSize: '15px', fontWeight: 700, color: 'text.primary',
        mt: 3, mb: 1.5, fontFamily: '"DM Sans", sans-serif',
    }}>
        {children}
    </Typography>
)

const P = ({ children }) => (
    <Typography sx={{
        fontSize: '15px', color: 'text.secondary', lineHeight: 1.85,
        mb: 2, fontFamily: '"DM Sans", sans-serif',
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

const Bold = ({ children }) => (
    <Box component="strong" sx={{ fontWeight: 700, color: 'text.primary' }}>{children}</Box>
)

/* info-style card (blue tint) */
const InfoCard = ({ children }) => (
    <Box sx={{
        background: '#eff6ff', border: '1px solid #bfdbfe',
        borderLeft: '4px solid #3b82f6',
        borderRadius: '10px', px: 2.5, py: 2, mb: 2.5,
    }}>
        <Typography sx={{ fontSize: '14px', color: '#1e40af', lineHeight: 1.75, fontFamily: '"DM Sans", sans-serif' }}>
            {children}
        </Typography>
    </Box>
)

/* numbered badge row */
const NumRow = ({ n, children }) => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        <Box sx={{
            width: 26, height: 26, borderRadius: '8px',
            bgcolor: 'primary.light',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 700, color: 'primary.main',
            flexShrink: 0, mt: '2px',
        }}>
            {n}
        </Box>
        <Typography sx={{ fontSize: '15px', color: 'text.secondary', lineHeight: 1.8, fontFamily: '"DM Sans", sans-serif' }}>
            {children}
        </Typography>
    </Box>
)

/* ════════════════════ MAIN ════════════════════ */
export default function Privacy_Policy() {
    const [active, setActive] = useState('intro')
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

            {/* ── Hero ── */}
            <Box sx={{
                 background: (theme) => theme.palette.gradient,
                // background: 'linear-gradient(135deg, #0f1e3d 0%, #1a3565 60%, #1e4080 100%)',
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
                    bgcolor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)', marginTop: '40px',
                    fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', mb: 2, height: 26,
                }} />

                <Typography sx={{
                    fontSize: { xs: '28px', md: '40px' }, fontWeight: 800,
                    color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.15, mb: 1.5,
                }}>
                    Privacy Policy
                </Typography>

                <Typography sx={{ fontSize: '15px', color: 'rgba(180,210,255,0.8)', fontWeight: 400 }}>
                    Last updated: January 2025
                </Typography>

                {/* intro highlight box inside hero */}
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{
                        background: '#fff8ed', border: '1px solid #fcd34d',
                        borderLeft: '4px solid #f59e0b', borderRadius: '10px',
                        px: 2.5, py: 2, maxWidth: 720, textAlign: 'left',
                    }}>
                        <Typography sx={{ fontSize: '14px', color: '#92400e', fontWeight: 600, lineHeight: 1.7, fontFamily: '"DM Sans", sans-serif' }}>
                            This Privacy Policy explains how CoBanq Ltd T/A BURQ FX collects, uses, discloses,
                            and protects your personal information when you use our money transfer services.
                            By using our Service, you acknowledge that you have read and agree to this policy.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* ── Body ── */}
            <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
                <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start', mt: 4 }}>

                    {/* ── Sticky Sidebar ── */}
                    <Box sx={{ display: { xs: 'none', lg: 'block' }, position: 'sticky', top: 24, width: 240, flexShrink: 0 }}>
                        <Box sx={{
                            bgcolor: 'background.paper',
                            border: '1px solid', borderColor: 'divider',
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
                                    px: 1.5, py: '6px', borderRadius: '8px', cursor: 'pointer',
                                    fontSize: '12.5px',
                                    fontWeight: active === s.id ? 700 : 500,
                                    color: active === s.id ? 'primary.main' : 'text.secondary',
                                    bgcolor: active === s.id ? 'action.selected' : 'transparent',
                                    borderLeft: active === s.id ? '3px solid' : '3px solid transparent',
                                    borderColor: active === s.id ? 'primary.main' : 'transparent',
                                    transition: 'all 0.15s',
                                    '&:hover': { bgcolor: 'action.hover', color: 'primary.main' },
                                    mb: '1px',
                                }}>
                                    {s.label}
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* ── Main content ── */}
                    <Box sx={{ flex: 1, pb: 8, minWidth: 0 }}>

                        {/* Mobile TOC */}
                        <Box sx={{ display: { xs: 'flex', lg: 'none' }, mb: 3 }}>
                            <Box onClick={() => setMenuOpen(v => !v)} sx={{
                                display: 'flex', alignItems: 'center', gap: 1,
                                px: 2, py: 1, borderRadius: '10px',
                                border: '1px solid', borderColor: 'divider',
                                bgcolor: 'background.paper',
                                cursor: 'pointer', fontSize: '13px',
                                fontWeight: 600, color: 'text.secondary',
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
                                mb: 3, bgcolor: 'background.paper', color: 'text.primary',
                                border: '1px solid', borderColor: 'divider',
                                borderRadius: '12px', p: 1.5,
                            }}>
                                {SECTIONS.map(s => (
                                    <Box key={s.id} onClick={() => scrollTo(s.id)} sx={{
                                        px: 1.5, py: '8px', borderRadius: '8px', cursor: 'pointer',
                                        fontSize: '13px', fontWeight: 500, color: 'text.secondary',
                                        '&:hover': { bgcolor: 'action.hover', color: 'primary.main' },
                                    }}>
                                        {s.label}
                                    </Box>
                                ))}
                            </Box>
                        )}

                        {/* ═══ 1. INTRODUCTION ═══ */}
                        <H2 id="intro">1. Introduction</H2>
                        <P>
                            Thank you for choosing <Bold>CoBanq Ltd T/A BURQ FX</Bold> ("we," "us," "our").
                            Protecting your privacy and maintaining the confidentiality of your personal information
                            is of utmost importance to us. This Privacy Policy explains how we collect, use, disclose,
                            and protect your personal information when you use our money transfer services, the
                            CoBanq website (<Box component="a" href="https://cobanq.com/" sx={{ color: 'primary.main', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>https://cobanq.com/</Box>),
                            or the <Bold>CoBanq Mobile Application</Bold> (collectively referred to as the "Service").
                        </P>
                        <P>
                            By using our Service, you acknowledge that you have read, understood, and agree to the
                            collection, use, and disclosure of your personal information in accordance with this
                            Privacy Policy. Terms used in this Privacy Policy, unless otherwise defined, carry the same
                            meanings as in our <Bold>Terms and Conditions</Bold>.
                        </P>

                        <Divider sx={{ my: 1 }} />

                        {/* ═══ 2. INFORMATION WE COLLECT ═══ */}
                        <H2 id="collect">2. Information We Collect</H2>
                        <P>We may collect the following types of personal information from you:</P>

                        <H3>Information You Provide Directly</H3>
                        <UL items={[
                            <><Bold>Personal Identification Information:</Bold> Name, address, phone number, email address, date of birth, and government-issued identification (e.g., passport, driver's license).</>,
                            <><Bold>Transaction Information:</Bold> Details about the money transfers you perform, including the amount, currency, recipient details, and transaction history.</>,
                            <><Bold>Payment Information:</Bold> Bank account details, credit/debit card information, or other payment method details.</>,
                        ]} />

                        <H3>Information Collected Automatically</H3>
                        <P>When you interact with our Service, we may collect information automatically, including:</P>
                        <UL items={[
                            <><Bold>Device Information:</Bold> IP address, browser type, operating system, and device identifiers.</>,
                            <><Bold>Usage Data:</Bold> Pages visited, time spent on the Service, and other diagnostic data to understand how you interact with our Service.</>,
                            <><Bold>Location Data:</Bold> If you permit, we may collect location information to enhance the Service.</>,
                        ]} />

                        <H3>Information from Third Parties</H3>
                        <P>We may receive personal information about you from third-party sources, such as:</P>
                        <UL items={[
                            'Financial institutions and payment processors.',
                            'Fraud prevention agencies or compliance databases.',
                        ]} />

                        {/* ═══ 3. HOW WE USE ═══ */}
                        <H2 id="use">3. How We Use Your Information</H2>
                        <P>We collect and use your personal information to:</P>

                        {[
                            {
                                label: 'i. Provide the Service',
                                items: [
                                    'Process transactions and deliver money transfer services.',
                                    'Verify your identity to comply with legal and regulatory requirements.',
                                ],
                            },
                            {
                                label: 'ii. Improve the Service',
                                items: [
                                    'Understand user behavior to optimize functionality and user experience.',
                                    'Diagnose technical issues and ensure service reliability.',
                                ],
                            },
                            {
                                label: 'iii. Ensure Security',
                                items: [
                                    'Monitor for fraudulent, unauthorized, or illegal activities.',
                                    'Protect your account and our systems from misuse.',
                                ],
                            },
                            {
                                label: 'iv. Communicate with You',
                                items: [
                                    'Send transaction confirmations, service updates, or customer support communications.',
                                    'Share promotional offers (only with your explicit consent).',
                                ],
                            },
                        ].map(({ label, items }) => (
                            <Box key={label} sx={{ mb: 2 }}>
                                <H3>{label}</H3>
                                <UL items={items} />
                            </Box>
                        ))}

                        {/* ═══ 4. SHARING ═══ */}
                        <H2 id="share">4. Sharing Your Information</H2>
                        <P>We may share your personal information under the following circumstances:</P>

                        <H3>With Service Providers</H3>
                        <P>Third-party vendors who assist in delivering the Service, such as payment processors, customer support providers, and IT infrastructure providers.</P>

                        <H3>For Legal and Regulatory Purposes</H3>
                        <UL items={[
                            'To comply with legal obligations, such as anti-money laundering (AML) or counter terrorism financing (CTF) regulations.',
                            'To respond to lawful requests from government authorities or law enforcement agencies.',
                        ]} />

                        <H3>With Your Consent</H3>
                        <P>When you explicitly consent to sharing your information with specific parties.</P>

                        {/* ═══ 5. PROTECTING ═══ */}
                        <H2 id="protect">5. Protecting Your Information</H2>
                        <InfoCard>
                            We take reasonable measures to protect the confidentiality and security of your personal
                            information. However, please be aware that no security measures are perfect, and we
                            cannot guarantee the absolute security of your information.
                        </InfoCard>

                        {/* ═══ 6. RIGHTS ═══ */}
                        <H2 id="rights">6. Your Privacy Rights</H2>
                        <P>You have rights regarding your personal information, which include:</P>
                        <UL items={[
                            <><Bold>Access and Correction:</Bold> Request access to or correction of the personal information we hold about you.</>,
                            <><Bold>Data Portability:</Bold> Obtain a copy of your personal information in a structured, commonly used format.</>,
                            <><Bold>Withdraw Consent:</Bold> Withdraw your consent for certain data processing activities (e.g., marketing).</>,
                            <><Bold>Delete Data:</Bold> Request the deletion of your personal information, subject to legal and regulatory obligations.</>,
                        ]} />

                        {/* ═══ 7. RETENTION ═══ */}
                        <H2 id="retention">7. Retention of Information</H2>
                        <P>We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy or to comply with legal, regulatory, and compliance requirements.</P>

                        {/* ═══ 8. INTERNATIONAL TRANSFERS ═══ */}
                        <H2 id="transfers">8. International Transfers</H2>
                        <P>Your personal information may be transferred to and processed in countries outside of your country of residence, including countries that may have different data protection laws. We will take appropriate measures to ensure that your personal information receives an adequate level of protection as required by applicable laws.</P>

                        {/* ═══ 9. CHILDREN ═══ */}
                        <H2 id="children">9. Children's Privacy</H2>
                        <Box sx={{
                            background: '#fff1f2', border: '1px solid #fecdd3',
                            borderLeft: '4px solid #ef4444',
                            borderRadius: '10px', px: 2.5, py: 2, mb: 3,
                        }}>
                            <Typography sx={{ fontSize: '15px', color: '#991b1b', fontWeight: 600, lineHeight: 1.75, fontFamily: '"DM Sans", sans-serif' }}>
                                Our services are not intended for individuals under the age of 18. We do not knowingly
                                collect personal information from children. If we become aware that we have collected
                                personal information from a child without parental consent, we will take steps to delete
                                such information as soon as possible.
                            </Typography>
                        </Box>

                        {/* ═══ 10. COOKIES ═══ */}
                        <H2 id="cookies">10. Tracking & Cookies Data</H2>
                        <P>We track activities on our Service and store certain information using cookies and other tracking technologies. Cookies are small data files that could contain an anonymous unique identification. Cookies are small text files that a website sends to your browser and stores there.</P>
                        <P>You can tell your browser to always reject cookies or to let you know when one is being sent. However, you might not be able to utilize all of our Service if you refuse to accept cookies.</P>
                        <P>Examples of Cookies we use:</P>

                        <Box sx={{
                            bgcolor: 'background.paper',
                            border: '1px solid', borderColor: 'divider',
                            borderRadius: '12px', overflow: 'hidden', mb: 3,
                        }}>
                            {[
                                { type: 'Session Cookies', color: '#dbeafe', text: '#1e40af', desc: 'Used to operate our Service during your active session.' },
                                { type: 'Preference Cookies', color: '#ede9fe', text: '#5b21b6', desc: 'Used to remember your preferences and various settings.' },
                                { type: 'Security Cookies', color: '#d1fae5', text: '#065f46', desc: 'Used for security purposes to protect your account and our systems.' },
                            ].map(({ type, color, text, desc }, i, arr) => (
                                <Box key={type} sx={{
                                    display: 'flex', alignItems: 'flex-start', gap: 2,
                                    px: 2, py: 1.5,
                                    borderBottom: i < arr.length - 1 ? '1px solid' : 'none',
                                    borderColor: 'divider',
                                }}>
                                    <Box sx={{ px: 1.5, py: 0.4, borderRadius: '6px', background: color, color: text, fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap', mt: '2px', flexShrink: 0 }}>
                                        {type}
                                    </Box>
                                    <Typography sx={{ fontSize: '14px', color: 'text.secondary', lineHeight: 1.7, fontFamily: '"DM Sans", sans-serif' }}>
                                        {desc}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        {/* ═══ 11. USE OF DATA ═══ */}
                        <H2 id="use-data">11. Use of Data</H2>
                        <P>BURQ FX uses the information collected for a variety of purposes, including:</P>
                        <UL items={[
                            'Delivering and maintaining the Service.',
                            'Updating you about changes to our Service.',
                            'To provide customer service and support.',
                            'To enable you to engage with our Services interactive elements when you choose to do so.',
                            'To give analysis or helpful information so that we can enhance the Service.',
                            'To track how the Service is being used.',
                            'To identify, prevent, and resolve technical issues.',
                        ]} />

                        {/* ═══ 12. DATA TRANSFER ═══ */}
                        <H2 id="data-transfer">12. Data Transfer</H2>
                        <P>Your data, including Personal Data, may be moved to and kept on computers situated outside of your state, province, nation, or another governmental jurisdiction, where the data protection rules may be different from those in your jurisdiction.</P>
                        <P>Please be aware that if you choose to send information to us while residing outside of the United Kingdom, we will transfer and process your data there, including any Personal Data.</P>
                        <InfoCard>
                            Your permission to that transfer is shown by your acceptance of this Privacy Policy and your submission of the requested information. We will take all reasonable measures to protect your data and treat it securely in line with this Privacy Policy.
                        </InfoCard>

                        {/* ═══ 13. DATA SECURITY ═══ */}
                        <H2 id="security">13. Data Security</H2>
                        <P>We care about the security of your data, but keep in mind that no form of electronic data storage or transfer via the Internet is completely safe. While we make an effort to protect your Personal Data with commercially reasonable measures, we cannot provide perfect assurance of security.</P>

                        {/* ═══ 14. SERVICE PROVIDERS ═══ */}
                        <H2 id="providers">14. Service Providers</H2>
                        <P>We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.</P>
                        <InfoCard>
                            These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                        </InfoCard>

                        {/* ═══ 15. ANALYTICS ═══ */}
                        <H2 id="analytics">15. Analytics</H2>
                        <P>We may use third-party Service Providers to monitor and analyze the use of our Service.</P>

                        {/* ═══ 16. LINKS ═══ */}
                        <H2 id="links">16. Links to Other Sites</H2>
                        <P>There is a chance that our service will link to websites we do not control. A link from a third party will take you to their website if you click on it. We strongly advise you to carefully read the privacy statement on every website you visit.</P>
                        <P>The content, privacy practices, or other policies of any third-party websites or services are outside our control and accountability.</P>

                        {/* ═══ 17. MODIFICATIONS ═══ */}
                        <H2 id="modifications">17. Any Modifications to Privacy Policy</H2>
                        <P>Our privacy policy may occasionally be updated. Any modifications will be communicated to you by posting the updated Privacy Policy on this page. Prior to the modification going into effect, we'll notify you via email and/or a clear notice on our service, and we'll also change the "effective date" at the top of this privacy statement.</P>
                        <P>It is encouraged that you routinely check this privacy statement for updates. Any modifications to this privacy statement take effect when they are published on this page.</P>

                        {/* ═══ 18. CONTACT ═══ */}
                        <H2 id="contact">18. Contact Us</H2>
                        <P>If you have any questions about this Privacy Policy, please contact our Data Protection Office:</P>
                        <Box sx={{
                            bgcolor: 'background.paper',
                            border: '1px solid', borderColor: 'divider',
                            borderRadius: '14px', p: 3,
                            display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3,
                        }}>
                            {[
                                { icon: '🛡️', label: 'Data Protection Officer', value: 'Mr. Abdur Nabeel', href: null },
                                { icon: '✉️', label: 'Compliance Email', value: 'abdur4422@gmail.com', href: 'mailto:abdur4422@gmail.com' },
                            ].map(({ icon, label, value, href }) => (
                                <Box key={label} sx={{ flex: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                        <Typography sx={{ fontSize: '16px' }}>{icon}</Typography>
                                        <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif' }}>
                                            {label}
                                        </Typography>
                                    </Box>
                                    {href
                                        ? <Box component="a" href={href} sx={{ fontSize: '15px', fontWeight: 700, color: 'primary.main', textDecoration: 'none', fontFamily: '"DM Sans", sans-serif', '&:hover': { textDecoration: 'underline' } }}>{value}</Box>
                                        : <Typography sx={{ fontSize: '15px', fontWeight: 700, color: 'text.primary', fontFamily: '"DM Sans", sans-serif' }}>{value}</Typography>
                                    }
                                </Box>
                            ))}
                        </Box>

                        {/* ── Footer ── */}
                        <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
                            <Typography sx={{ fontSize: '13px', color: 'text.disabled', fontFamily: '"DM Sans", sans-serif' }}>
                                © 2026 CoBanq. All rights reserved. &nbsp;·&nbsp;
                                <Box
                                    onClick={() => {
                                        navigate('/Terms_Service')
                                        window.scrollTo(0, 0)
                                    }}
                                    sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600 }}>Terms of Service
                                </Box>

                            </Typography>
                        </Box>

                    </Box>
                </Box>
            </Container>

            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');`}</style>
        </Box>
    )
}