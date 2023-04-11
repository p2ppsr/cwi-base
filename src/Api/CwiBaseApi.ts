export type Chain = "main" | "test"

/**
 * CWI Errors use `code` as the code friendly error identifier,
 * and `description` for the human friendly error description.
 * 
 * Errors which extend CwiErrorBase implement `name` as a getter for `code`,
 * and `message` as a getter for `description`.
 * 
 * This interface can be used in catch handlers that might catch both
 * `Error` derived or `CwiError` derived errors.
 */
export interface CwiErrorApi extends Error {
    code: string
    description: string
}
