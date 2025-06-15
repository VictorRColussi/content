import { useState } from 'react'

export default function CreateTestStep1({ onNext, data }) {
  const [testName, setTestName] = useState(data.testName || '')
  const [companyName, setCompanyName] = useState(data.companyName || '')
  const [logoFile, setLogoFile] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    onNext({ testName, companyName, logoFile })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <div>
        <label className="block mb-1 font-medium">Test Name</label>
        <input
          type="text"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Company Logo (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogoFile(e.target.files[0])}
          className="w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Next
      </button>
    </form>
  )
}
