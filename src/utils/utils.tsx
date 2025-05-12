import { twMerge } from "tailwind-merge"; // Merges Tailwind classes intelligently, avoiding conflicts.
import { clsx, type ClassValue } from "clsx"; // Utility to conditionally join classNames.

/**
 * Utility function to merge class names conditionally.
 *
 * Combines `clsx` for conditional className logic and `tailwind-merge`
 * to intelligently resolve Tailwind CSS class conflicts.
 *
 * @param inputs - Any number of className values (string, array, object).
 * @returns A single optimized className string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
