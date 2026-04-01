import React, { useState, useEffect } from 'react'
import { Box, Typography, Container, Divider, Chip } from '@mui/material'
import { useNavigate } from 'react-router-dom'

/* ── Sections ── */
const SECTIONS = [
    { id: 'intro', label: '1. Introduction' },
    { id: 'what', label: '2. What Are Cookies' },
    { id: 'types', label: '3. Types of Cookies We Use' },
    { id: 'third-party', label: '4. Third-Party Cookies' },
    { id: 'why', label: '5. Why We Use Cookies' },
    { id: 'manage', label: '6. Managing Your Cookies' },
    { id: 'browser', label: '7. Browser Settings' },
    { id: 'consent', label: '8. Your Consent' },
    { id: 'retention', label: '9. Cookie Retention' },
    { id: 'updates', label: '10. Policy Updates' },
    { id: 'contact', label: '11. Contact Us' },
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

const InfoCard = ({ children }) => (
    <Box sx={{
        background: '#eff6ff', border: '1px solid #bfdbfe',
        borderLeft: '4px solid #3b82f6',
        borderRadius: '10px', px: 2.5, py: 2, mb: 2.5,
    }}>
        <Typography sx={{
            fontSize: '14px', color: '#1e40af', lineHeight: 1.75,
            fontFamily: '"DM Sans", sans-serif',
        }}>
            {children}
        </Typography>
    </Box>
)

/* ── Cookie type card ── */
const CookieCard = ({ icon, name, badge, badgeBg, badgeColor, purpose, examples, retention, required }) => (
    <Box sx={{
        bgcolor: 'background.paper',
        border: '1px solid', borderColor: 'divider',
        borderRadius: '14px', p: 2.5, mb: 2,
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: '0 2px 12px rgba(0,0,0,0.06)' },
    }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{
                    width: 38, height: 38, borderRadius: '10px',
                    background: badgeBg, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0,
                }}>
                    {icon}
                </Box>
                <Box>
                    <Typography sx={{ fontSize: '15px', fontWeight: 700, color: 'text.primary', fontFamily: '"DM Sans", sans-serif' }}>
                        {name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: '2px' }}>
                        <Box sx={{ px: 1, py: '2px', borderRadius: '5px', background: badgeBg, fontSize: '11px', fontWeight: 700, color: badgeColor }}>
                            {badge}
                        </Box>
                        {required && (
                            <Box sx={{ px: 1, py: '2px', borderRadius: '5px', background: '#dcfce7', fontSize: '11px', fontWeight: 700, color: '#15803d' }}>
                                Required
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                <Typography sx={{ fontSize: '12px', color: 'text.disabled', fontWeight: 500, fontFamily: '"DM Sans", sans-serif' }}>
                    {retention}
                </Typography>
            </Box>
        </Box>

        <Typography sx={{ fontSize: '14px', color: 'text.secondary', lineHeight: 1.7, mb: 1.5, fontFamily: '"DM Sans", sans-serif' }}>
            {purpose}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {examples.map(ex => (
                <Box key={ex} sx={{ px: 1.25, py: '3px', borderRadius: '6px', bgcolor: 'action.hover', fontSize: '12px', color: 'text.secondary', fontFamily: '"DM Sans", sans-serif', fontWeight: 500 }}>
                    {ex}
                </Box>
            ))}
        </Box>
    </Box>
)

/* ── Browser steps card ── */
const BrowserCard = ({ name, icon, steps }) => (
    <Box sx={{
        bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider',
        borderRadius: '12px', p: 2, mb: 1.5,
    }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.25 }}>
            <Typography sx={{ fontSize: '20px' }}>{icon}</Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: 700, color: 'text.primary', fontFamily: '"DM Sans", sans-serif' }}>
                {name}
            </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
            {steps.map((step, i) => (
                <React.Fragment key={i}>
                    <Box sx={{ px: 1.25, py: '3px', borderRadius: '6px', bgcolor: 'action.selected', fontSize: '12px', color: 'primary.main', fontWeight: 600, fontFamily: '"DM Sans", sans-serif' }}>
                        {step}
                    </Box>
                    {i < steps.length - 1 && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    )}
                </React.Fragment>
            ))}
        </Box>
    </Box>
)

/* ════════════════════ MAIN ════════════════════ */
export default function Cookies() {
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
                background: 'linear-gradient(135deg, #0f1e3d 0%, #1a3565 60%, #1e4080 100%)',
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
                    bgcolor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)',
                    fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', mb: 2, height: 26,
                }} />

                <Typography sx={{
                    fontSize: { xs: '28px', md: '40px' }, fontWeight: 800,
                    color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.15, mb: 1.5,
                }}>
                    Cookies Policy
                </Typography>

                <Typography sx={{ fontSize: '15px', color: 'rgba(180,210,255,0.8)', fontWeight: 400 }}>
                    Last updated: January 2025
                </Typography>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{
                        background: '#fff8ed', border: '1px solid #fcd34d',
                        borderLeft: '4px solid #f59e0b', borderRadius: '10px',
                        px: 2.5, py: 2, maxWidth: 720, textAlign: 'left',
                    }}>
                        <Typography sx={{ fontSize: '14px', color: '#92400e', fontWeight: 600, lineHeight: 1.7, fontFamily: '"DM Sans", sans-serif' }}>
                            This Cookies Policy explains how CoBanq Ltd T/A BURQ FX uses cookies and similar
                            tracking technologies when you visit our website or use our mobile application.
                            By continuing to use our Service, you consent to our use of cookies as described in this policy.
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
                            CoBanq Mobile Application to enhance your experience, analyze usage, and ensure the security
                            of our money transfer services.
                        </P>
                        <P>
                            This Cookies Policy explains what cookies are, what types we use, why we use them, and
                            how you can control them. Please read this policy carefully alongside our{' '}
                            <Bold>Privacy Policy</Bold> and <Bold>Terms and Conditions</Bold>.
                        </P>

                        <Divider sx={{ my: 1 }} />

                        {/* ═══ 2. WHAT ARE COOKIES ═══ */}
                        <H2 id="what">2. What Are Cookies</H2>
                        <P>
                            Cookies are small text files that are placed on your device (computer, smartphone, or tablet)
                            when you visit a website. They are widely used to make websites work more efficiently, provide
                            a better user experience, and give website owners information about how their site is being used.
                        </P>
                        <InfoCard>
                            Cookies do not contain any information that personally identifies you directly. However, the
                            personal information we store about you may be linked to the information stored in and obtained
                            from cookies.
                        </InfoCard>
                        <P>
                            In addition to cookies, we may use other tracking technologies such as:
                        </P>
                        <UL items={[
                            <><Bold>Web Beacons:</Bold> Small transparent image files embedded in web pages or emails used to track activity.</>,
                            <><Bold>Pixel Tags:</Bold> Similar to web beacons, used to understand user behavior and measure campaign effectiveness.</>,
                            <><Bold>Local Storage:</Bold> Browser-based storage that allows us to save data on your device for session continuity.</>,
                            <><Bold>Device Fingerprinting:</Bold> Collecting device attributes for fraud detection and security purposes.</>,
                        ]} />

                        {/* ═══ 3. TYPES OF COOKIES ═══ */}
                        <H2 id="types">3. Types of Cookies We Use</H2>
                        <P>We use the following categories of cookies on our Service:</P>

                        <CookieCard
                            icon="⚙️"
                            name="Strictly Necessary Cookies"
                            badge="Essential"
                            badgeBg="#dbeafe"
                            badgeColor="#1e40af"
                            required={true}
                            retention="Session / Up to 1 year"
                            purpose="These cookies are essential for the website to function properly. They enable core features such as page navigation, secure login, and access to protected areas of the site. The website cannot function properly without these cookies."
                            examples={['session_id', 'csrf_token', 'auth_token', 'secure_login', 'lang_pref']}
                        />

                        <CookieCard
                            icon="🎛️"
                            name="Preference Cookies"
                            badge="Functional"
                            badgeBg="#ede9fe"
                            badgeColor="#5b21b6"
                            required={false}
                            retention="Up to 1 year"
                            purpose="These cookies allow the website to remember choices you have made in the past, like your language, region, or username, so we can provide you with a more personalized experience."
                            examples={['user_lang', 'currency_pref', 'theme_mode', 'region_code', 'last_visited']}
                        />

                        <CookieCard
                            icon="📊"
                            name="Analytics Cookies"
                            badge="Performance"
                            badgeBg="#d1fae5"
                            badgeColor="#065f46"
                            required={false}
                            retention="Up to 2 years"
                            purpose="These cookies collect information about how visitors use our website, which pages are visited most, and whether users receive error messages. All information these cookies collect is aggregated and therefore anonymous."
                            examples={['_ga', '_gid', '_gat', 'utm_source', 'page_views']}
                        />

                        <CookieCard
                            icon="🛡️"
                            name="Security Cookies"
                            badge="Security"
                            badgeBg="#fef3c7"
                            badgeColor="#92400e"
                            required={true}
                            retention="Session / Up to 90 days"
                            purpose="These cookies help us identify and prevent security risks such as fraudulent logins, unauthorized access attempts, and suspicious transaction patterns. They are critical to the safety of your account and our platform."
                            examples={['fraud_check', 'device_id', 'risk_score', 'ip_hash', 'session_flag']}
                        />

                        <CookieCard
                            icon="📣"
                            name="Marketing Cookies"
                            badge="Marketing"
                            badgeBg="#fce7f3"
                            badgeColor="#9d174d"
                            required={false}
                            retention="Up to 90 days"
                            purpose="These cookies track your browsing habits to deliver advertising that is relevant to your interests. They are placed by third-party advertising networks with our permission and remember that you have visited a website."
                            examples={['_fbp', 'ads_session', 'retargeting_id', 'campaign_ref', 'ad_click']}
                        />

                        {/* ═══ 4. THIRD-PARTY COOKIES ═══ */}
                        <H2 id="third-party">4. Third-Party Cookies</H2>
                        <P>
                            In some cases, we use cookies provided by trusted third parties. The following section details
                            which third-party cookies you might encounter through our Service:
                        </P>

                        <Box sx={{
                            bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider',
                            borderRadius: '12px', overflow: 'hidden', mb: 3,
                        }}>
                            {[
                                { provider: 'Google Analytics', purpose: 'Website usage analytics and performance monitoring', badge: 'Analytics', bg: '#d1fae5', color: '#065f46' },
                                { provider: 'Google Tag Manager', purpose: 'Tag management and conversion tracking', badge: 'Analytics', bg: '#d1fae5', color: '#065f46' },
                                { provider: 'Meta Pixel', purpose: 'Social media advertising and campaign effectiveness', badge: 'Marketing', bg: '#fce7f3', color: '#9d174d' },
                                { provider: 'Cloudflare', purpose: 'Security, DDoS protection, and performance optimization', badge: 'Security', bg: '#fef3c7', color: '#92400e' },
                                { provider: 'Stripe / Adyen', purpose: 'Payment processing and fraud prevention', badge: 'Essential', bg: '#dbeafe', color: '#1e40af' },
                            ].map(({ provider, purpose, badge, bg, color }, i, arr) => (
                                <Box key={provider} sx={{
                                    display: 'flex', alignItems: 'center', gap: 2,
                                    px: 2, py: 1.5,
                                    borderBottom: i < arr.length - 1 ? '1px solid' : 'none',
                                    borderColor: 'divider',
                                    flexWrap: 'wrap',
                                }}>
                                    <Typography sx={{ fontSize: '14px', fontWeight: 700, color: 'text.primary', fontFamily: '"DM Sans", sans-serif', minWidth: 140 }}>
                                        {provider}
                                    </Typography>
                                    <Typography sx={{ fontSize: '13px', color: 'text.secondary', fontFamily: '"DM Sans", sans-serif', flex: 1 }}>
                                        {purpose}
                                    </Typography>
                                    <Box sx={{ px: 1.25, py: '3px', borderRadius: '6px', background: bg, color, fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>
                                        {badge}
                                    </Box>
                                </Box>
                            ))}
                        </Box>

                        {/* ═══ 5. WHY WE USE COOKIES ═══ */}
                        <H2 id="why">5. Why We Use Cookies</H2>
                        <P>We use cookies and tracking technologies for the following purposes:</P>
                        <UL items={[
                            <><Bold>Authentication & Security:</Bold> To verify your identity when you log in and protect your account from unauthorized access.</>,
                            <><Bold>Transaction Processing:</Bold> To maintain your session during money transfer transactions and ensure they complete securely.</>,
                            <><Bold>Compliance & Fraud Prevention:</Bold> To meet our AML/CTF regulatory obligations by detecting and preventing fraudulent activity.</>,
                            <><Bold>Performance Optimization:</Bold> To understand how our website is being used so we can make improvements to speed and functionality.</>,
                            <><Bold>Personalization:</Bold> To remember your preferences such as language, currency, and region settings.</>,
                            <><Bold>Analytics:</Bold> To analyze aggregate user behavior and improve our overall service offering.</>,
                            <><Bold>Marketing:</Bold> To serve relevant promotional content to users who have expressed interest in our services (with your consent).</>,
                        ]} />

                        {/* ═══ 6. MANAGING COOKIES ═══ */}
                        <H2 id="manage">6. Managing Your Cookies</H2>
                        <P>
                            You have control over the cookies placed on your device. You can choose to accept all cookies,
                            reject non-essential cookies, or manage your preferences at any time. Please note that disabling
                            certain cookies may impact the functionality of our Service.
                        </P>

                        <Box sx={{ background: '#fff1f2', border: '1px solid #fecdd3', borderLeft: '4px solid #ef4444', borderRadius: '10px', px: 2.5, py: 2, mb: 3 }}>
                            <Typography sx={{ fontSize: '14px', color: '#991b1b', fontWeight: 600, lineHeight: 1.75, fontFamily: '"DM Sans", sans-serif' }}>
                                Important: Disabling <Bold>Strictly Necessary</Bold> or <Bold>Security Cookies</Bold> will prevent you from logging in, completing transactions, or using core features of our money transfer service.
                            </Typography>
                        </Box>

                        <H3>Cookie Consent Banner</H3>
                        <P>
                            When you first visit our website, you will be shown a cookie consent banner that allows you
                            to accept or decline non-essential cookies. You can update your preferences at any time by
                            clicking the "Cookie Settings" link in the footer of our website.
                        </P>

                        <H3>Opt-Out of Analytics</H3>
                        <P>
                            You can opt out of Google Analytics tracking by installing the{' '}
                            <Box component="a" href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.main', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                Google Analytics Opt-Out Browser Add-on
                            </Box>.
                        </P>

                        {/* ═══ 7. BROWSER SETTINGS ═══ */}
                        <H2 id="browser">7. Browser Settings</H2>
                        <P>
                            Most web browsers allow you to control cookies through their settings. Below are instructions
                            for managing cookies in popular browsers:
                        </P>

                        <BrowserCard
                            name="Google Chrome"
                            icon="🌐"
                            steps={['Settings', 'Privacy and security', 'Cookies and other site data', 'Manage preferences']}
                        />
                        <BrowserCard
                            name="Mozilla Firefox"
                            icon="🦊"
                            steps={['Settings', 'Privacy & Security', 'Cookies and Site Data', 'Manage Data']}
                        />
                        <BrowserCard
                            name="Apple Safari"
                            icon="🧭"
                            steps={['Preferences', 'Privacy', 'Manage Website Data', 'Remove All']}
                        />
                        <BrowserCard
                            name="Microsoft Edge"
                            icon="🔷"
                            steps={['Settings', 'Cookies and site permissions', 'Cookies and site data', 'See all cookies']}
                        />

                        {/* ═══ 8. CONSENT ═══ */}
                        <H2 id="consent">8. Your Consent</H2>
                        <P>
                            By continuing to browse and use our website after being shown the cookie consent banner, you
                            are agreeing to our use of cookies in accordance with this Cookies Policy.
                        </P>
                        <InfoCard>
                            You may withdraw your consent for non-essential cookies at any time by updating your
                            preferences via the Cookie Settings panel or by adjusting your browser settings. Withdrawal
                            of consent will not affect the lawfulness of processing that took place before withdrawal.
                        </InfoCard>
                        <P>
                            For <Bold>Strictly Necessary</Bold> and <Bold>Security Cookies</Bold>, consent is not required
                            as they are essential to provide the service you have requested. These cookies will always be
                            active while you use our platform.
                        </P>

                        {/* ═══ 9. RETENTION ═══ */}
                        <H2 id="retention">9. Cookie Retention</H2>
                        <P>Cookies are either <Bold>session cookies</Bold> or <Bold>persistent cookies</Bold>:</P>
                        <UL items={[
                            <><Bold>Session Cookies:</Bold> These are temporary and are deleted from your device automatically when you close your browser. They are used to maintain your session while you navigate our website.</>,
                            <><Bold>Persistent Cookies:</Bold> These remain on your device for a set period or until you delete them manually. They are used to remember your preferences and settings across multiple visits.</>,
                        ]} />

                        <Box sx={{
                            bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider',
                            borderRadius: '12px', overflow: 'hidden', mb: 3,
                        }}>
                            <Box sx={{ px: 2, py: 1.25, bgcolor: 'action.hover', borderBottom: '1px solid', borderColor: 'divider' }}>
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
                                    {['Cookie Type', 'Duration', 'Deletion'].map(h => (
                                        <Typography key={h} sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: '"DM Sans", sans-serif' }}>
                                            {h}
                                        </Typography>
                                    ))}
                                </Box>
                            </Box>
                            {[
                                { type: 'Session', duration: 'Until browser closed', deletion: 'Automatic' },
                                { type: 'Functional', duration: 'Up to 1 year', deletion: 'Manual or expired' },
                                { type: 'Analytics', duration: 'Up to 2 years', deletion: 'Manual or expired' },
                                { type: 'Security', duration: 'Up to 90 days', deletion: 'Automatic' },
                                { type: 'Marketing', duration: 'Up to 90 days', deletion: 'Manual or expired' },
                            ].map(({ type, duration, deletion }, i, arr) => (
                                <Box key={type} sx={{
                                    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2,
                                    px: 2, py: 1.25,
                                    borderBottom: i < arr.length - 1 ? '1px solid' : 'none',
                                    borderColor: 'divider',
                                }}>
                                    <Typography sx={{ fontSize: '13px', fontWeight: 600, color: 'text.primary', fontFamily: '"DM Sans", sans-serif' }}>{type}</Typography>
                                    <Typography sx={{ fontSize: '13px', color: 'text.secondary', fontFamily: '"DM Sans", sans-serif' }}>{duration}</Typography>
                                    <Typography sx={{ fontSize: '13px', color: 'text.secondary', fontFamily: '"DM Sans", sans-serif' }}>{deletion}</Typography>
                                </Box>
                            ))}
                        </Box>

                        {/* ═══ 10. UPDATES ═══ */}
                        <H2 id="updates">10. Policy Updates</H2>
                        <P>
                            We may update this Cookies Policy from time to time to reflect changes in technology, legislation,
                            or our data practices. Any changes will be communicated by posting the updated policy on this page
                            with a revised "Last updated" date.
                        </P>
                        <P>
                            We encourage you to review this policy periodically to stay informed about how we use cookies.
                            Your continued use of the Service after any changes to this policy constitutes your acceptance
                            of those changes.
                        </P>

                        {/* ═══ 11. CONTACT ═══ */}
                        <H2 id="contact">11. Contact Us</H2>
                        <P>If you have any questions about our use of cookies or this Cookies Policy, please contact us:</P>
                        <Box sx={{
                            bgcolor: 'background.paper',
                            border: '1px solid', borderColor: 'divider',
                            borderRadius: '14px', p: 3,
                            display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3,
                        }}>
                            {[
                                { icon: '🛡️', label: 'Data Protection Officer', value: 'Mr. Abdur Nabeel', href: null },
                                { icon: '✉️', label: 'Compliance Email', value: 'abdur4422@gmail.com', href: 'mailto:abdur4422@gmail.com' },
                                { icon: '📞', label: 'Phone', value: '020 8175 2519', href: 'tel:02081752519' },
                            ].map(({ icon, label, value, href }) => (
                                <Box key={label} sx={{ flex: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                        <Typography sx={{ fontSize: '16px' }}>{icon}</Typography>
                                        <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif' }}>
                                            {label}
                                        </Typography>
                                    </Box>
                                    {href
                                        ? <Box component="a" href={href} sx={{ fontSize: '14px', fontWeight: 700, color: 'primary.main', textDecoration: 'none', fontFamily: '"DM Sans", sans-serif', '&:hover': { textDecoration: 'underline' } }}>{value}</Box>
                                        : <Typography sx={{ fontSize: '14px', fontWeight: 700, color: 'text.primary', fontFamily: '"DM Sans", sans-serif' }}>{value}</Typography>
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
                                        navigate('/Privacy_Policy')
                                        window.scrollTo(0, 0)
                                    }}
                                    sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy
                                </Box>
                                {/* <Box component="a" href="#" sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600 }}>Terms of Service</Box> */}
                                {/* &nbsp;·&nbsp; */}
                                <Box
                                    onClick={() => {
                                        navigate('/Terms_Service')
                                        window.scrollTo(0, 0)
                                    }}
                                    sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600 }}>Terms of Service
                                </Box>
                                {/* <Box component="a" href="#" sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</Box> */}
                            </Typography>
                        </Box>

                    </Box>
                </Box>
            </Container>

            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');`}</style>
        </Box>
    )
}