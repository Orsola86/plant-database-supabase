/**
 * Generates an accessible ARIA label for a link, optionally indicating if it opens in a new tab.
 *
 * This function returns a label that screen readers can use to describe a link's behavior.
 * If the link opens in a new tab (`isBlank` is true), a message indicating this will be
 * appended to the base label according to WCAG guidelines.
 * Reference: WCAG technique for informing users about new windows/tabs:
 * https://www.w3.org/TR/WCAG20-TECHS/H83.html
 *
 * @param {Object} options - The input options.
 * @param {string} [options.baseLabel] - The base label for the link.
 * @param {boolean} options.isBlank - Whether the link opens in a new tab.
 * @param {function} options.t - The translation function used to fetch localized text.
 * @returns {string} The ARIA label for the link, indicating if it opens in a new tab.
 */
import { type Formats, type TranslationValues } from "next-intl";

export default function getLinkAriaLabel({
  baseLabel,
  isBlank,
  t,
}: {
  baseLabel?: string;
  isBlank: boolean;
  t: (key: string, values?: TranslationValues, formats?: Formats) => string;
}) {
  const OPEN_NEW_TAB_MESSAGE = t("buttons.open-new-tabs");

  return `${baseLabel}${isBlank ? ` ${OPEN_NEW_TAB_MESSAGE}` : ""}`;
}
