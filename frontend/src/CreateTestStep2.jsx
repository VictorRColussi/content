import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function CreateTestStep2({ onBack, data, onComplete }) {
  const [emails, setEmails] = useState('')
  const [loading, setLoading] = useState(false)
  const [shareLink, setShareLink] = useState('')

  const handleCreate = async (e) => {
    e.preventDefault()
    setLoading(true)
    // upload logo if provided
    let logoUrl = null
    if (data.logoFile) {
      const { data: upload, error } = await supabase.storage
        .from('logos')
        .upload(`${Date.now()}_${data.logoFile.name}`, data.logoFile)
      if (error) {
        console.error(error)
      } else {
        const { data: url } = supabase.storage
          .from('logos')
          .getPublicUrl(upload.path)
        logoUrl = url.publicUrl
      }
    }

    // insert test record
    const { data: test, error: insertError } = await supabase
      .from('tests')
      .insert({
        name: data.testName,
        company: data.companyName,
        logo_url: logoUrl,
        emails: emails.split(/[\n,]+/).map((e) => e.trim()).filter(Boolean),
      })
      .select()
      .single()

    if (insertError) {
      console.error(insertError)
    } else {
      setShareLink(`${window.location.origin}/test/${test.id}`)
      onComplete(test)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleCreate} className="space-y-4 p-4 max-w-md mx-auto">
      <div>
        <label className="block mb-1 font-medium">Emails (comma or newline separated)</label>
        <textarea
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          className="w-full border px-3 py-2 rounded h-32"
          placeholder="user1@example.com, user2@example.com"
        />
      </div>
      <div className="flex space-x-2">
        <button type="button" onClick={onBack} className="border px-4 py-2 rounded">
          Back
        </button>
        <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded flex-1">
          {loading ? 'Creating...' : 'Create Test'}
        </button>
      </div>
      {shareLink && (
        <p className="mt-4">Shareable Link: <a href={shareLink} className="text-blue-600 underline">{shareLink}</a></p>
      )}
    </form>
  )
}
