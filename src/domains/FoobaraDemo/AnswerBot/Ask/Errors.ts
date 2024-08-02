import { type CannotCastError } from '../../../base/processors/Foobara/Value/Processor/CannotCastError'

import { type UnexpectedAttributesError } from '../../../base/processors/attributes/SupportedProcessors/UnexpectedAttributesError'

import { type MissingRequiredAttributeError } from '../../../base/processors/attributes/SupportedValidators/MissingRequiredAttributeError'

export interface PossibleErrors {

  'data.cannot_cast': CannotCastError

  'data.missing_required_attribute': MissingRequiredAttributeError

  'data.question.cannot_cast': CannotCastError

  'data.question.missing_required_attribute': MissingRequiredAttributeError

  'data.unexpected_attributes': UnexpectedAttributesError

}

export type Error = CannotCastError |
MissingRequiredAttributeError |
UnexpectedAttributesError
