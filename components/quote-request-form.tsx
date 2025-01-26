'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ReloadIcon } from '@radix-ui/react-icons'

export default function QuoteRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      const response = await fetch('https://formspree.io/f/xnnnylnp', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        setIsSuccess(true)
        e.currentTarget.reset()
      } else {
        throw new Error('Form submission failed')
      }
    } catch (err) {
      setError('An error occurred while submitting the form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <AlertDescription className="text-green-800">
          Thank you for your request! We will contact you as soon as possible.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <Input id="firstName" name="firstName" required />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <Input id="lastName" name="lastName" required />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <Input id="phone" name="phone" type="tel" />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
        <Input id="company" name="company" />
      </div>

      <div>
        <label htmlFor="partNumber" className="block text-sm font-medium text-gray-700 mb-1">Part Number</label>
        <Input id="partNumber" name="partNumber" required />
      </div>

      <div>
        <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
        <Select name="manufacturer">
          <SelectTrigger>
            <SelectValue placeholder="Select a manufacturer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="abb">ABB</SelectItem>
            <SelectItem value="allen-bradley">Allen-Bradley</SelectItem>
            <SelectItem value="siemens">Siemens</SelectItem>
            <SelectItem value="ge">GE</SelectItem>
            <SelectItem value="honeywell">Honeywell</SelectItem>
            <SelectItem value="schneider">Schneider Electric</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <Textarea id="message" name="message" rows={4} />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Quote Request'
        )}
      </Button>
    </form>
  )
}

