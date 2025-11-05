'use client'

import { useState } from 'react'

interface CalculatorResult {
  daysUntilPump: number
  monthsUntilPump: number
  isOverdue: boolean
  nextPumpDate: Date
  recommendations: string[]
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical'
}

export default function SepticPumpingCalculator() {
  const [householdSize, setHouseholdSize] = useState<string>('')
  const [tankSize, setTankSize] = useState<string>('')
  const [lastPumpDate, setLastPumpDate] = useState<string>('')
  const [hasGarbageDisposal, setHasGarbageDisposal] = useState<boolean>(false)
  const [result, setResult] = useState<CalculatorResult | null>(null)
  const [showResults, setShowResults] = useState<boolean>(false)

  const calculateSchedule = () => {
    if (!householdSize || !tankSize || !lastPumpDate) {
      alert('Please fill in all required fields.')
      return
    }

    const household = parseInt(householdSize)
    const tankCapacity = parseInt(tankSize)
    const lastPump = new Date(lastPumpDate)
    const today = new Date()

    if (isNaN(household) || isNaN(tankCapacity) || isNaN(lastPump.getTime())) {
      alert('Please enter valid numbers and dates.')
      return
    }

    // Calculate days since last pump
    const daysSinceLastPump = Math.floor((today.getTime() - lastPump.getTime()) / (1000 * 60 * 60 * 24))

    // Standard calculation: Average person produces ~50 gallons/day of wastewater
    // Septic tank accumulates solids at ~0.05-0.1 gallons per person per day
    // Pumping needed when tank is ~25-30% full of solids
    
    // Base pumping interval: 3-5 years depending on tank size and household
    // Formula: Tank size (gallons) / (household size * 0.08 gallons/day * 365 days)
    const dailyAccumulationRate = household * 0.08 // gallons per day
    const recommendedIntervalDays = Math.floor((tankCapacity * 0.25) / dailyAccumulationRate) // Pump at 25% capacity
    
    // Adjust for garbage disposal (increases accumulation by 20%)
    const adjustedIntervalDays = hasGarbageDisposal 
      ? Math.floor(recommendedIntervalDays * 0.8)
      : recommendedIntervalDays

    // Ensure minimum interval of 2 years, maximum of 5 years
    const finalIntervalDays = Math.max(730, Math.min(1825, adjustedIntervalDays))
    
    const daysUntilPump = finalIntervalDays - daysSinceLastPump
    const isOverdue = daysUntilPump < 0
    
    const nextPumpDate = new Date(lastPump)
    nextPumpDate.setDate(nextPumpDate.getDate() + finalIntervalDays)

    // Determine urgency level
    let urgencyLevel: 'low' | 'medium' | 'high' | 'critical' = 'low'
    if (isOverdue) {
      if (Math.abs(daysUntilPump) > 365) {
        urgencyLevel = 'critical'
      } else if (Math.abs(daysUntilPump) > 180) {
        urgencyLevel = 'high'
      } else {
        urgencyLevel = 'medium'
      }
    } else if (daysUntilPump < 90) {
      urgencyLevel = 'medium'
    }

    // Generate recommendations
    const recommendations: string[] = []
    
    if (isOverdue) {
      recommendations.push(`⚠️ Your septic tank is overdue for pumping by ${Math.abs(daysUntilPump)} days. Schedule service immediately.`)
      if (urgencyLevel === 'critical') {
        recommendations.push('🚨 Your system is at risk of failure. Contact us today for emergency service.')
      }
    } else {
      recommendations.push(`✅ Your next pumping is recommended in ${Math.floor(daysUntilPump / 30)} months.`)
    }

    if (hasGarbageDisposal) {
      recommendations.push('💡 Consider reducing garbage disposal usage to extend time between pumpings.')
    }

    if (household > 4) {
      recommendations.push('👥 With a larger household, consider annual inspections to catch issues early.')
    }

    recommendations.push(`📅 Mark your calendar: Next pump recommended around ${nextPumpDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.`)

    setResult({
      daysUntilPump,
      monthsUntilPump: Math.floor(daysUntilPump / 30),
      isOverdue,
      nextPumpDate,
      recommendations,
      urgencyLevel,
    })
    setShowResults(true)
  }

  const resetCalculator = () => {
    setHouseholdSize('')
    setTankSize('')
    setLastPumpDate('')
    setHasGarbageDisposal(false)
    setResult(null)
    setShowResults(false)
  }

  return (
    <div className="bg-surface-white border-2 border-border-light rounded-lg p-8 shadow-lg">
      <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-6">
        Calculate Your Pumping Schedule
      </h2>

      <div className="space-y-6">
        {/* Household Size */}
        <div>
          <label htmlFor="household-size" className="block text-body font-semibold text-charcoal mb-2">
            Number of People in Household <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="household-size"
            min="1"
            max="20"
            value={householdSize}
            onChange={(e) => setHouseholdSize(e.target.value)}
            className="w-full px-4 py-3 border border-border-default rounded-md text-body text-body-text focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
            placeholder="e.g., 4"
          />
          <p className="text-small text-muted-text mt-1">
            Include all permanent residents in your home
          </p>
        </div>

        {/* Tank Size */}
        <div>
          <label htmlFor="tank-size" className="block text-body font-semibold text-charcoal mb-2">
            Septic Tank Capacity (Gallons) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="tank-size"
            min="500"
            max="5000"
            step="100"
            value={tankSize}
            onChange={(e) => setTankSize(e.target.value)}
            className="w-full px-4 py-3 border border-border-default rounded-md text-body text-body-text focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
            placeholder="e.g., 1000"
          />
          <p className="text-small text-muted-text mt-1">
            Common sizes: 750-1000 gallons (1-2 bedrooms), 1000-1500 gallons (3-4 bedrooms), 1500+ gallons (5+ bedrooms)
          </p>
        </div>

        {/* Last Pump Date */}
        <div>
          <label htmlFor="last-pump-date" className="block text-body font-semibold text-charcoal mb-2">
            Last Pumping Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="last-pump-date"
            value={lastPumpDate}
            onChange={(e) => setLastPumpDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-border-default rounded-md text-body text-body-text focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
          />
          <p className="text-small text-muted-text mt-1">
            If unsure, estimate based on property records or inspection reports
          </p>
        </div>

        {/* Garbage Disposal */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="garbage-disposal"
            checked={hasGarbageDisposal}
            onChange={(e) => setHasGarbageDisposal(e.target.checked)}
            className="w-5 h-5 text-accent-green border-border-default rounded focus:ring-accent-green"
          />
          <label htmlFor="garbage-disposal" className="ml-3 text-body text-body-text">
            I use a garbage disposal regularly
          </label>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateSchedule}
          className="w-full bg-accent-green text-white px-8 py-4 rounded-sm font-sans-ui font-semibold hover:bg-accent-green-hover transition-colors shadow-md text-lg"
        >
          Calculate My Pumping Schedule
        </button>

        {showResults && (
          <button
            onClick={resetCalculator}
            className="w-full bg-surface-light border border-border-default text-charcoal px-8 py-4 rounded-sm font-sans-ui font-semibold hover:bg-surface-gray-50 transition-colors"
          >
            Calculate Again
          </button>
        )}
      </div>

      {/* Results Section */}
      {result && (
        <div className={`mt-8 p-6 rounded-lg border-2 ${
          result.urgencyLevel === 'critical' ? 'border-red-500 bg-red-50' :
          result.urgencyLevel === 'high' ? 'border-orange-500 bg-orange-50' :
          result.urgencyLevel === 'medium' ? 'border-yellow-500 bg-yellow-50' :
          'border-green-500 bg-green-50'
        }`}>
          <h3 className="text-h3 font-serif-headings font-semibold text-charcoal mb-4">
            Your Pumping Schedule Results
          </h3>

          {result.isOverdue ? (
            <div className="mb-6">
              <div className={`text-2xl font-bold mb-2 ${
                result.urgencyLevel === 'critical' ? 'text-red-600' :
                result.urgencyLevel === 'high' ? 'text-orange-600' :
                'text-yellow-600'
              }`}>
                ⚠️ Overdue for Pumping
              </div>
              <p className="text-body-lg text-body-text">
                Your septic tank is <strong>{Math.abs(result.daysUntilPump)} days overdue</strong> for pumping.
              </p>
            </div>
          ) : (
            <div className="mb-6">
              <div className="text-2xl font-bold text-green-600 mb-2">
                ✅ On Schedule
              </div>
              <p className="text-body-lg text-body-text">
                Your next pumping is recommended in <strong>{result.monthsUntilPump} months</strong> ({result.daysUntilPump} days).
              </p>
            </div>
          )}

          <div className="mb-6">
            <h4 className="text-h4 font-semibold text-charcoal mb-3">Recommended Actions:</h4>
            <ul className="space-y-2">
              {result.recommendations.map((rec, idx) => (
                <li key={idx} className="text-body text-body-text flex items-start">
                  <span className="mr-2">{rec.split(' ')[0]}</span>
                  <span>{rec.substring(rec.indexOf(' ') + 1)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <a
              href="/book"
              className="bg-accent-green text-white text-center px-6 py-3 rounded-sm font-sans-ui font-semibold hover:bg-accent-green-hover transition-colors shadow-md"
            >
              Schedule Pumping Service
            </a>
            <a
              href="tel:+13055550100"
              className="bg-white border-2 border-accent-green text-accent-green text-center px-6 py-3 rounded-sm font-sans-ui font-semibold hover:bg-accent-green hover:text-white transition-colors"
            >
              Call (305) 555-0100
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

