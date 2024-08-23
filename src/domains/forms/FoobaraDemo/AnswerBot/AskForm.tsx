import React, { useState } from 'react'

import { type Outcome } from '../../..//base/Outcome'

import { Ask } from '../../../FoobaraDemo/AnswerBot/Ask'
import type AskInputs from '../../../FoobaraDemo/AnswerBot/Ask/Inputs'
import type AskResult from '../../../FoobaraDemo/AnswerBot/Ask/Result'
import { type Error as AskError } from '../../../FoobaraDemo/AnswerBot/Ask/Errors'

export default function AskForm (): JSX.Element {
  const [question, setQuestion] = useState<string | undefined>(undefined)

  const [service, setService] = useState<'open-ai' | 'anthropic'>('open-ai')

  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function toVoid (fn: () => Promise<void>): () => void {
    return (): void => {
      void (async (): Promise<void> => { await fn() })()
    }
  }

  const run = toVoid(async (): Promise<void> => {
    if (question == null) {
      // TODO: perform some kind of validation error
      return
    }

    if (service == null) {
      // TODO: perform some kind of validation error
      return
    }

    const inputs: AskInputs = {
      question,
      service
    }

    const command = new Ask(inputs)

    try {
      setResult('Thinking...')
      setError(null)
      const outcome: Outcome<AskResult, AskError> = await command.run()

      if (outcome.isSuccess()) {
        const result: AskResult = outcome.result
        setResult(typeof result === 'string' ? result : JSON.stringify(result))
      } else {
        setError(outcome.errorMessage)
        setResult(null)
      }
    } catch (error) {
      setError('Error executing command')
      setResult(null)
    }
  })

  return (
    <div className="CommandForm">
      <div>

        <input
          value={question ?? ''}
          onChange={(e) => { setQuestion(e.target.value) }}
          placeholder="question"
                  />

        <select
          value={service ?? ''}
          onChange={(e) => { setService(e.target.value as 'open-ai' | 'anthropic') }}
                >
          <option value="open-ai">open-ai</option><option value="anthropic">anthropic</option>
        </select>

        <button onClick={run}>Ask</button>
      </div>

      {(result != null) && <p>{result}</p>}
      {(error != null) && <p className="error-message">{error}</p>}
    </div>
  )
}
