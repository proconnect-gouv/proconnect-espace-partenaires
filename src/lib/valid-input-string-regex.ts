/**
 * Same regex as the ProConnect federation admin
 * @see https://github.com/proconnect-gouv/federation/pull/1830
 *
 * Allows latin letters (with Latin-1 and Latin Extended-A accents), digits,
 * whitespace and the following punctuation:
 * , . : ; ! ? _ ' ’ « » “ ” – — … & * + ( ) / -
 *
 * \s already covers the French non-breaking spaces (U+00A0, U+202F, U+2009).
 *
 * À-Ö, Ø-ö and ø-ž are split to exclude × (U+00D7) and ÷ (U+00F7).
 */
export const VALID_INPUT_STRING_REGEX = /^[A-Za-z0-9À-ÖØ-öø-ž\s,.:;!?_'’«»“”–—…&*+\(\)\/\-]+$/;

export const INVALID_NAME_MESSAGE =
  "Caractères autorisés : lettres, chiffres, espaces et , . : ; ! ? _ ' ’ « » “ ” – — … & * + ( ) / -";
