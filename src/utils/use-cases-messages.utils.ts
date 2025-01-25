export enum UseCasesMessages {
  INVALID_DATE_FUTURE = 'The transaction date and time cannot be in the future.',
  INVALID_STARTER_DATE_GREATER_THEN_END_DATE = 'The filter starter date grater than filter end date.',
  INVALID_VALUE = 'The value of a transaction must be greater than 0.',
  INVALID_ID = 'Invalid format for MongoDB id.',
  NOT_FOUND_MONGODB_ID = 'Non-exist or not-found MongoDB id.',
  NOT_FOUND_CPF = 'Non-exist or not-found CPF.',
  INVALID_CPF = 'Invalid format for CPF.',
  SAME_CPF = 'The origin and receiving cpf cannot be the same.',
}
