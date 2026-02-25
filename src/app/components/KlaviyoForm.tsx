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
        
        // Reset success state after 5 seconds
        setTimeout(() => {
          setIsSuccess(false)
        }, 5000)
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
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
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
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
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
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            {successMessage}
          </>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="button-icon">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            {isSubmitting ? 'Subscribing...' : buttonText}
          </>
        )}
      </button>
    </form>
  )
}
