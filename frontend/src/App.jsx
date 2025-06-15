import { useState } from 'react'
import CreateTestStep1 from './CreateTestStep1'
import CreateTestStep2 from './CreateTestStep2'
import './index.css'

function App() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [createdTest, setCreatedTest] = useState(null)

  const handleNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setStep(2)
  }

  const handleBack = () => setStep(1)

  const handleComplete = (test) => {
    setCreatedTest(test)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-center text-2xl font-bold p-4">Create Excel Test</h1>
      {createdTest ? (
        <div className="p-4 text-center">
          <p className="text-green-700 font-medium">Test created successfully!</p>
          {formData.logoFile && createdTest.logo_url && (
            <img src={createdTest.logo_url} alt="logo" className="h-20 mx-auto mt-4" />
          )}
          <p className="mt-2">Share link: <a href={`${window.location.origin}/test/${createdTest.id}`} className="text-blue-600 underline">{`${window.location.origin}/test/${createdTest.id}`}</a></p>
        </div>
      ) : step === 1 ? (
        <CreateTestStep1 onNext={handleNext} data={formData} />
      ) : (
        <CreateTestStep2 onBack={handleBack} data={formData} onComplete={handleComplete} />
      )}
    </div>
  )
}

export default App
