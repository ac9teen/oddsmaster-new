'use client'

import { useEffect } from 'react'

export default function MobileBackgroundController() {
  useEffect(() => {
    const detectMobileDevice = () => {
      // Multiple detection methods for better accuracy
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches
      const hasNoHover = window.matchMedia('(hover: none)').matches
      
      // Device is considered mobile if it meets multiple criteria
      const isMobile = isMobileUserAgent && isTouchDevice && (hasCoarsePointer || hasNoHover)
      
      // Apply or remove mobile background
      // Always ensure clean background
      document.body.style.backgroundImage = 'none'
      document.body.style.backgroundSize = ''
      document.body.style.backgroundPosition = ''
      document.body.style.backgroundRepeat = ''
      document.body.style.backgroundAttachment = ''
      document.body.setAttribute('data-mobile-device', isMobile ? 'true' : 'false')
    }

    // Initial detection
    detectMobileDevice()
    
    // Re-detect on orientation change (mobile devices)
    const handleOrientationChange = () => {
      setTimeout(detectMobileDevice, 100) // Small delay for orientation change
    }
    
    window.addEventListener('orientationchange', handleOrientationChange)
    window.addEventListener('resize', detectMobileDevice)
    
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange)
      window.removeEventListener('resize', detectMobileDevice)
    }
  }, [])

  return null // This component doesn't render anything
}