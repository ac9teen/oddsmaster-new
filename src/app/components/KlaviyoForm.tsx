'use client'

import { useState } from 'react'

// Declare global window interface for Klaviyo
declare global {
  interface Window {
    _learnq?: unknown[]
  }
}

interface KlaviyoFormProps {
  className?: string
  buttonText?: string
  successMessage?: string
  showName?: boolean
}

export default function KlaviyoForm({
  className = '',
  buttonText = 'Subscribe To Daily Newsletter',
  successMessage = 'Check your inbox',
  showName = true
}: KlaviyoFormProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [bettingExperience, setBettingExperience] = useState<'experienced' | 'new' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError('Please enter your email address')
      return
    }

    if (!bettingExperience) {
      setError('Please select your betting experience')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // Call our secure server endpoint; it reads KLAVIYO_* env vars
      const response = await fetch('/api/klaviyo-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName: name,
          bettingExperience
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        setEmail('')
        setName('')
        setBettingExperience(null)


        // Leave the success state active so they can clearly read the spam/confirmation instructions
      } else {
        const err = await response.json().catch(() => ({}))
        setError(err?.error || 'Subscription failed. Please try again.')
      }
    } catch (error) {
      console.error('Klaviyo submission error:', error)
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {showName && (
        <div className="hero-input-container">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="input-name-icon">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <input
            type="text"
            placeholder="Enter your name"
            className="hero-name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
      )}

      <div className="hero-input-container">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="input-email-icon">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
        <input
          type="email"
          placeholder="Enter your email"
          className="hero-email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>

      {/* Betting Experience radios */}
      <div className="betting-experience-section">
        <div className="experience-label">What is your experience with betting?</div>
        <div className="experience-options">
          <label className="experience-option">
            <input
              type="radio"
              name="bettingExperience"
              value="experienced"
              checked={bettingExperience === 'experienced'}
              onChange={(e) => setBettingExperience(e.target.value as 'experienced' | 'new')}
              disabled={isSubmitting}
            />
            <span className="checkmark"></span>
            <span className="option-text">placed bets before</span>
          </label>
          <label className="experience-option">
            <input
              type="radio"
              name="bettingExperience"
              value="new"
              checked={bettingExperience === 'new'}
              onChange={(e) => setBettingExperience(e.target.value as 'experienced' | 'new')}
              disabled={isSubmitting}
            />
            <span className="checkmark"></span>
            <span className="option-text">haven&apos;t placed bets before</span>
          </label>
        </div>
      </div>

      {error && (
        <div className="error-message" style={{ color: '#ff4444', fontSize: '14px', marginTop: '8px' }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        className="hero-cta-button"
        disabled={isSubmitting}
      >
        {isSuccess ? (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="button-icon">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            {successMessage}
          </>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="button-icon">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            {isSubmitting ? 'Subscribing...' : buttonText}
          </>
        )}
      </button>

      {isSuccess && (
        <div className="mt-6 p-4 md:p-5 rounded-xl bg-[#07b57e]/10 border border-[#07b57e]/20 text-center animate-in fade-in zoom-in-95 duration-500 shadow-[0_0_20px_rgba(7,181,126,0.1)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="text-[#07b57e] font-black uppercase tracking-widest text-sm mb-2 flex items-center justify-center gap-2 drop-shadow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              Action Required
            </div>
            <p className="text-muted/90 text-[13px] font-medium leading-relaxed mb-3">
              We just sent a confirmation link to your email. You <strong className="text-white font-black underline decoration-[#07b57e]/40 underline-offset-4">MUST click it</strong> to be added to the list.
            </p>
            <p className="text-[#f7d849] text-xs font-black uppercase tracking-[0.15em] bg-[#f7d849]/10 py-2 px-3 rounded-lg border border-[#f7d849]/20 inline-block shadow-sm">
              ⚠️ Check your Spam/Junk folder!
            </p>
          </div>
        </div>
      )}
    </form>
  )
}
