import {
  Box, Typography, TextField, MenuItem, Select,
  InputAdornment, CircularProgress, Chip, Skeleton,
} from '@mui/material'
import React, { useState, useEffect, useCallback, useRef } from 'react'

/* ─────────────────────────── CONFIG ─────────────────────────── */
const POLL_INTERVAL_MS = 30_000
const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸', symbol: '$' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', symbol: '£' },
  { code: 'PKR', name: 'Pakistani Rupee', flag: '🇵🇰', symbol: '₨' },
  { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪', symbol: 'د.إ' },
  { code: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦', symbol: '﷼' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵', symbol: '¥' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳', symbol: '₹' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', symbol: '$' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺', symbol: '$' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭', symbol: 'Fr' },
  { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬', symbol: '$' },
  { code: 'TRY', name: 'Turkish Lira', flag: '🇹🇷', symbol: '₺' },
  { code: 'MYR', name: 'Malaysian Ringgit', flag: '🇲🇾', symbol: 'RM' },
]
const QUICK_AMOUNTS = [100, 500, 1000, 5000, 10000]
const CROSS = ['USD', 'EUR', 'GBP', 'PKR', 'AED', 'SAR']

const getCur = (code) => CURRENCIES.find(c => c.code === code) || CURRENCIES[0]
const fmt = (n, d = 2) => n == null || isNaN(n) ? '—'
  : new Intl.NumberFormat('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }).format(n)

/* ─────────────────────────── ANTHROPIC ──────────────────────── */
async function fetchAIInsight(fromCode, toCode, rate, amount) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: `You are a concise forex analyst for cobanq, a modern digital banking app.
Respond ONLY with a valid JSON object — no markdown, no extra text.
Schema: { "summary": string (max 20 words), "sentiment": "bullish"|"bearish"|"neutral", "tips": [string, string, string] (each ≤12 words), "funFact": string (max 20 words) }`,
      messages: [{
        role: 'user',
        content: `Pair: ${fromCode}/${toCode}. Rate: 1 ${fromCode} = ${rate} ${toCode}. Converting: ${amount} ${fromCode}. Give insight.`,
      }],
    }),
  })
  const data = await res.json()
  const text = data.content?.find(b => b.type === 'text')?.text || '{}'
  return JSON.parse(text.replace(/```json|```/g, '').trim())
}

/* ─────────────────────────── ICONS ──────────────────────────── */
const IconSwap = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M7 16V4m0 0L3 8m4-4l4 4" /><path d="M17 8v12m0 0l4-4m-4 4l-4-4" /></svg>
const IconSpark = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
const IconUp = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"><path d="M12 19V5m0 0l-7 7m7-7l7 7" /></svg>
const IconDown = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"><path d="M12 5v14m0 0l-7-7m7 7l7-7" /></svg>
const IconRefresh = ({ spin }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
    style={{ animation: spin ? 'cb-spin 0.9s linear infinite' : 'none' }}>
    <path d="M23 4v6h-6" /><path d="M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
)

/* ─────────────────────────── SUB-COMPONENTS ─────────────────── */
const LiveDot = ({ active }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
    <Box sx={{
      width: 7, height: 7, borderRadius: '50%',
      background: active ? '#22c55e' : '#94a3b8',
      animation: active ? 'cb-pulse 1.8s ease-in-out infinite' : 'none',
    }} />
    <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.tertiary', letterSpacing: '0.04em' }}>
      {active ? 'LIVE' : 'OFFLINE'}
    </Typography>
  </Box>
)

const CountdownBar = ({ pct }) => (
  <Box sx={{ height: '2px', background: '#e8eaf0', borderRadius: '2px', overflow: 'hidden', mt: 0.5 }}>
    <Box sx={{ height: '100%', background: 'linear-gradient(90deg,#3b82f6,#06b6d4)', borderRadius: '2px', width: `${pct}%`, transition: 'width 1s linear' }} />
  </Box>
)

const sentimentColor = { bullish: '#16a34a', bearish: '#dc2626', neutral: '#64748b' }
const sentimentBg = { bullish: '#f0fdf4', bearish: '#fef2f2', neutral: '#f8fafc' }
const sentimentLabel = { bullish: '↑ Bullish', bearish: '↓ Bearish', neutral: '● Neutral' }

/* ─────────────────────────── MAIN ───────────────────────────── */
export default function ExchangeRate() {
  const [fromCurr, setFromCurr] = useState('USD')
  const [toCurr, setToCurr] = useState('PKR')
  const [amount, setAmount] = useState('1000')
  const [rates, setRates] = useState({})
  const [prevRate, setPrevRate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [updatedAt, setUpdatedAt] = useState(null)
  const [countdown, setCountdown] = useState(100)
  const [flash, setFlash] = useState(null)
  const [aiInsight, setAiInsight] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState(null)
  const tickRef = useRef(0)

  const fetchRates = useCallback(async (base, silent = false) => {
    if (!silent) setLoading(true)
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${base}`)
      const data = await res.json()
      if (data.result === 'success') {
        setRates(prev => {
          const old = prev[toCurr]
          const nw = data.rates[toCurr]
          if (old && nw && old !== nw) {
            setFlash(nw > old ? 'up' : 'down')
            setTimeout(() => setFlash(null), 2200)
            setPrevRate(old)
          }
          return data.rates
        })
        setUpdatedAt(new Date())
        tickRef.current = 0
        setCountdown(100)
      }
    } catch { /* silent */ }
    finally { if (!silent) setLoading(false) }
  }, [toCurr])

  /* poll */
  useEffect(() => {
    fetchRates(fromCurr)
    const id = setInterval(() => fetchRates(fromCurr, true), POLL_INTERVAL_MS)
    return () => clearInterval(id)
  }, [fromCurr])



  /* countdown bar */
  useEffect(() => {
    const id = setInterval(() => {
      tickRef.current += 1
      setCountdown(Math.max(0, 100 - (tickRef.current / (POLL_INTERVAL_MS / 1000)) * 100))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const handleSwap = () => {
    setFromCurr(toCurr); setToCurr(fromCurr)
    setRates({}); setAiInsight(null); setPrevRate(null)
  }

  const handleAskAI = async () => {
    const rate = rates[toCurr]
    if (!rate) return
    setAiLoading(true); setAiError(null); setAiInsight(null)
    try {
      setAiInsight(await fetchAIInsight(fromCurr, toCurr, rate.toFixed(4), amount || '1000'))
    } catch {
      setAiError('Could not fetch AI insight. Please try again.')
    } finally { setAiLoading(false) }
  }

  const rate = rates[toCurr] || null
  const numAmount = parseFloat(amount) || 0
  const converted = rate != null ? numAmount * rate : null
  const fromObj = getCur(fromCurr)
  const toObj = getCur(toCurr)
  const toDecimals = converted != null && converted >= 1000 ? 2 : 4
  const rateChange = prevRate && rate ? ((rate - prevRate) / prevRate * 100) : null
  const hasRates = Object.keys(rates).length > 0

  const selectSx = (light) => ({
    background: 'Background.main',
    borderRadius: '12px',
    border: light ? '1px solid rgba(255,255,255,0.18)' : '1px solid #e2e6ef',
    minWidth: 100,
    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
    '& .MuiSelect-select': { py: '8px', px: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: 'text.tertiary', fontWeight: 700, fontSize: '14px' },
    '& .MuiSvgIcon-root': { color: 'text.tertiary' },
  })
  const menuProps = { PaperProps: { sx: { borderRadius: '14px', mt: 1, maxHeight: 300 } } }

  return (
    <Box
      sx={{
        bgcolor: "Background.main",
        color: "text.tertairy",
        minHeight: "100vh",
        px: { xs: 2, sm: 2.5 }, py: 2.5,
        display: 'flex', flexDirection: 'column', gap: 2
      }}
    >
      {/* // <Box sx={{ fontFamily: '"DM Sans",sans-serif', px: { xs: 2, sm: 2.5 }, py: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }} minHeight={window.innerHeight - 425}> */}

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontSize: '23px', fontWeight: "bold", letterSpacing: '-0.03em' }}>
            <Box
              component="span"
              sx={{
                background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Exchange Calculator
            </Box>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.4 }}>
            <LiveDot active={!loading && hasRates} />
            {updatedAt && <Typography sx={{ fontSize: '11px', color: 'text.tertiary' }}>· {updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</Typography>}
          </Box>
          <CountdownBar pct={countdown} />
        </Box>
        <Box onClick={() => { tickRef.current = 0; fetchRates(fromCurr) }}
          sx={{ display: 'flex', alignItems: 'center', gap: 0.6, cursor: 'pointer', color: 'text.tertiary', fontSize: '12px', fontWeight: 600, mt: 0.5, '&:hover': { opacity: 0.7 } }}>
          <IconRefresh spin={loading} /> Refresh
        </Box>
      </Box>

      {/* Quick amounts */}
      <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
        {QUICK_AMOUNTS.map(q => (
          <Chip key={q} label={`${fromObj.symbol}${q.toLocaleString()}`} onClick={() => setAmount(String(q))} size="small"
            sx={{
              borderRadius: '9px', fontSize: '12px', fontWeight: 700, border: '1px solid', cursor: 'pointer', height: 28,
              ...(String(q) === amount
                ? { borderColor: '#0f1e3d', background: 'Background.secondary', color: 'text.tertairy' }
                : { borderColor: '#e2e6ef', background: 'Background.main', color: 'text.tertiary' })
            }} />
        ))}
      </Box>

      {/* FROM */}
      <Box sx={{ bgcolor: 'Background.secondary', color: 'text.tertiary', borderRadius: '20px', p: 2.5, border: '1px solid #eaecf0' }}>
        <Typography sx={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'text.tertiary', mb: 1 }}>You send</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Select value={fromCurr} onChange={e => { setFromCurr(e.target.value); setRates({}); setAiInsight(null) }}
           sx={selectSx(false)} MenuProps={menuProps}>
            {CURRENCIES.map(c => (
              <MenuItem key={c.code} value={c.code} sx={{ display: 'flex', gap: 1.5, fontSize: '13px', fontWeight: 600, borderRadius: '8px', mx: 0.5 }}>
                <span style={{ fontSize: 17,}}>{c.flag}</span><span>{c.code}</span>
                <span style={{  fontWeight: 400, fontSize: '11px', marginLeft: 'auto' }}>{c.name}</span>
              </MenuItem>
            ))}
          </Select>
          <TextField value={amount}
            onChange={e => { const v = e.target.value.replace(/[^0-9.]/g, ''); if ((v.match(/\./g) || []).length <= 1) setAmount(v) }}
            placeholder="0.00" type="text" inputMode="decimal" fullWidth
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', background: 'Background.main', fontSize: '22px', fontWeight: 800, color: 'text.tertiary', letterSpacing: '-0.02em', '& fieldset': { border: '1px solid #e2e6ef' }, '&:hover fieldset': { borderColor: '#b0bacc' }, '&.Mui-focused fieldset': { borderColor: '#3b82f6', borderWidth: '1.5px' } }, '& input': { py: '12px' } }}
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <Typography sx={{ color: 'text.tertiary', fontWeight: 700, fontSize: '18px' }}>{fromObj.symbol}</Typography>
              </InputAdornment>
            }}
          />
        </Box>
        <Typography sx={{ fontSize: '11px', color: 'text.tertiary', mt: 1 }}>{fromObj.flag} {fromObj.name}</Typography>
      </Box>

      {/* Swap */}
      <Box sx={{ display: 'flex', justifyContent: 'center', my: -0.75, zIndex: 2, position: 'relative' }}>
        <Box onClick={handleSwap} sx={{ width: 42, height: 42, borderRadius: '50%', background: '#0f1e3d', border: '3px solid #f5f7fa', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.35s ease, background 0.2s', '&:hover': { background: '#1e3a6e', transform: 'rotate(180deg)' } }}>
          <IconSwap />
        </Box>
      </Box>

      {/* TO (dark) */}
      <Box sx={{
        bgcolor: 'Background.secondary',
        borderRadius: '20px', p: 2.5, border: '1px solid rgba(99,179,255,0.15)',
        boxShadow: flash === 'up' ? '0 0 0 2px rgba(34,197,94,0.5)' : flash === 'down' ? '0 0 0 2px rgba(239,68,68,0.5)' : 'none',
        transition: 'box-shadow 0.4s ease',
      }}>
        <Typography sx={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'text.tertiary', mb: 1 }}>They receive</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Select value={toCurr} onChange={e => { setToCurr(e.target.value); setAiInsight(null) }} sx={selectSx(true)} MenuProps={menuProps}>
            {CURRENCIES.map(c => (
              <MenuItem key={c.code} value={c.code} sx={{ display: 'flex', gap: 1.5, fontSize: '13px', fontWeight: 600, borderRadius: '8px', mx: 0.5 }}>
                <span style={{ fontSize: 17 }}>{c.flag}</span><span>{c.code}</span>
                <span style={{ color: 'text.tertiary', fontWeight: 400, fontSize: '11px', marginLeft: 'auto' }}>{c.name}</span>
              </MenuItem>
            ))}
          </Select>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
            <Typography sx={{ color: 'text.tertiary', fontWeight: 700, fontSize: '16px', pb: '4px' }}>{toObj.symbol}</Typography>
            {loading && !hasRates
              ? <CircularProgress size={26} sx={{ color: 'text.tertiary' }} />
              : <Typography sx={{ fontSize: 'clamp(26px,5vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'text.tertiary', transition: 'color 0.4s ease', lineHeight: 1.1 }}>
                {converted != null ? fmt(converted, toDecimals) : '—'}
              </Typography>
            }
          </Box>
        </Box>
        {rateChange != null && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
            {rateChange > 0 ? <IconUp /> : <IconDown />}
            <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.tertiary' }}>
              {rateChange > 0 ? '+' : ''}{rateChange.toFixed(4)}% since last poll
            </Typography>
          </Box>
        )}
        <Typography sx={{ fontSize: '11px', color: 'text.tertiary', mt: 1 }}>{toObj.flag} {toObj.name}</Typography>
      </Box>

      {/* Rate bar */}
      <Box sx={{ bgcolor: 'Background.secondary', border: '1px solid #e8eaf0', borderRadius: '14px', px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontSize: '11px', color: 'text.tertiary', fontWeight: 500, mb: 0.25 }}>Mid-market rate</Typography>
          <Typography sx={{ fontSize: '13px', color: 'text.tertiary', fontWeight: 800 }}>
            {rate != null ? `1 ${fromCurr} = ${fmt(rate, rate >= 100 ? 2 : 4)} ${toCurr}` : '—'}
          </Typography>
        </Box>
        <Box sx={{ background: '#909caaff', color: 'text.tertiary', borderRadius: '8px', px: 1.5, py: 0.5, fontSize: '12px', fontWeight: 700 }}>
          {rate != null ? `× ${fmt(rate, rate >= 100 ? 2 : 6)}` : '…'}
        </Box>
      </Box>

      {/* Cross rates */}
      {hasRates && (
        <Box sx={{ bgcolor: 'Background.secondary', border: '1px solid #e8eaf0', borderRadius: '16px', p: 2 }}>
          <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.tertiary', letterSpacing: '0.06em', textTransform: 'uppercase', mb: 1.5 }}>{fromCurr} cross rates</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(110px,1fr))', gap: 0.75 }}>
            {CROSS.filter(c => c !== fromCurr).map(code => {
              const r = rates[code]; const cur = getCur(code); const sel = toCurr === code
              return (
                <Box key={code} onClick={() => { setToCurr(code); setAiInsight(null) }} sx={{ p: '9px 12px', borderRadius: '10px', cursor: 'pointer', border: sel ? '1.5px solid #3b82f6' : '1px solid #e8eaf0', bgcolor: 'Background.secondary', color: "text.tertiary", transition: 'all 0.15s', '&:hover': { border: '1px solid #b0c4de' } }}>
                  <Typography sx={{ fontSize: '11px', mb: 0.25 }}>{cur.flag} {code}</Typography>
                  <Typography sx={{ fontSize: '13px', fontWeight: 800, }}>{r ? fmt(r, r >= 100 ? 2 : 4) : '—'}</Typography>
                </Box>
              )
            })}
          </Box>
        </Box>
      )}


      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap');
        @keyframes cb-spin  { to { transform: rotate(360deg); } }
        @keyframes cb-pulse { 0%,100% { box-shadow:0 0 0 2px rgba(34,197,94,0.25); } 50% { box-shadow:0 0 0 5px rgba(34,197,94,0.08); } }
      `}</style>
    </Box>
  )
}