"use client"; // Ensures this hook runs only on the client side in Next.js

import { useState, useEffect } from "react";

export function useLocalStorage(key: string, initialValue: string) {
  /* State to store the value retrieved from localStorage */
  const [value, setValue] = useState<string>(initialValue);

  /* Loading state to indicate whether the localStorage data has been retrieved */
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      /* Ensure this code runs only in the browser (localStorage is not available on the server) */
      if (typeof window !== "undefined") {
        /* Retrieve the stored value from localStorage */
        const storedValue = localStorage.getItem(key);

        if (storedValue !== null) {
          /* If a value exists, parse and set it in the state */
          setValue(JSON.parse(storedValue));
        } else {
          /* If no value exists, initialize it with the provided default value */
          localStorage.setItem(key, JSON.stringify(initialValue));
        }
      }
    } catch (error) {
      console.error(`Failed to read ${key} from local storage`, error);
    } finally {
      /* Set loading to false after attempting to retrieve the value */
      setIsLoading(false);
    }
  }, [key, initialValue]); // Re-run effect if the key or initialValue changes

  /* Function to update the stored value in localStorage and state */
  const setStoredValue = (newValue: string) => {
    try {
      /* Ensure we are running in the browser */
      if (typeof window !== "undefined") {
        /* Save the new value to localStorage */
        localStorage.setItem(key, JSON.stringify(newValue));
        /* Update the state */
        setValue(newValue);
      }
    } catch (error) {
      console.error(`Failed to write ${key} to local storage`, error);
    }
  };

  /* Return the stored value, function to update it, and loading state */
  return { value, setStoredValue, isLoading };
}
